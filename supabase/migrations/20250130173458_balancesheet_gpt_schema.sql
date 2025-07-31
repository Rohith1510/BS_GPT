-- Location: supabase/migrations/20250130173458_balancesheet_gpt_schema.sql
-- BalanceSheet-GPT: AI-Powered Financial Analysis Platform
-- Complete schema for financial data management with role-based access

-- 1. Types and Enums
CREATE TYPE public.user_role AS ENUM ('analyst', 'ceo', 'group_admin');
CREATE TYPE public.document_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE public.data_status AS ENUM ('raw', 'processed', 'validated');

-- 2. Core Tables

-- User profiles table (intermediary for auth)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'analyst'::public.user_role,
    assigned_company TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Companies table
CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    parent_group TEXT,
    industry TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Documents table (for uploaded PDFs)
CREATE TABLE public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_url TEXT NOT NULL,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    uploaded_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    status public.document_status DEFAULT 'pending'::public.document_status,
    processing_error TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Balance sheets table (extracted financial data)
CREATE TABLE public.balance_sheets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
    fiscal_year INTEGER NOT NULL,
    quarter INTEGER CHECK (quarter >= 1 AND quarter <= 4),
    raw_data JSONB NOT NULL DEFAULT '{}',
    parsed_data JSONB NOT NULL DEFAULT '{}',
    revenue DECIMAL(15,2),
    assets DECIMAL(15,2),
    liabilities DECIMAL(15,2),
    equity DECIMAL(15,2),
    status public.data_status DEFAULT 'raw'::public.data_status,
    created_at TIMESTAMPZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- AI query history table
CREATE TABLE public.query_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
    query_text TEXT NOT NULL,
    response_text TEXT,
    chart_data JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Vector embeddings table (for semantic search)
CREATE TABLE public.document_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
    chunk_text TEXT NOT NULL,
    embedding VECTOR(384),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_companies_name ON public.companies(name);
CREATE INDEX idx_companies_parent_group ON public.companies(parent_group);
CREATE INDEX idx_documents_company_id ON public.documents(company_id);
CREATE INDEX idx_documents_uploaded_by ON public.documents(uploaded_by);
CREATE INDEX idx_documents_status ON public.documents(status);
CREATE INDEX idx_balance_sheets_company_id ON public.balance_sheets(company_id);
CREATE INDEX idx_balance_sheets_fiscal_year ON public.balance_sheets(fiscal_year);
CREATE INDEX idx_balance_sheets_company_year ON public.balance_sheets(company_id, fiscal_year);
CREATE INDEX idx_query_history_user_id ON public.query_history(user_id);
CREATE INDEX idx_query_history_company_id ON public.query_history(company_id);
CREATE INDEX idx_document_embeddings_document_id ON public.document_embeddings(document_id);

-- 4. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.balance_sheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.query_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_embeddings ENABLE ROW LEVEL SECURITY;

-- 5. Helper Functions for RLS
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT
LANGUAGE sql STABLE SECURITY DEFINER AS $$
SELECT COALESCE(
    (SELECT role::TEXT FROM public.user_profiles WHERE id = auth.uid()),
    'none'
)
$$;

CREATE OR REPLACE FUNCTION public.get_user_company()
RETURNS TEXT
LANGUAGE sql STABLE SECURITY DEFINER AS $$
SELECT COALESCE(
    (SELECT assigned_company FROM public.user_profiles WHERE id = auth.uid()),
    ''
)
$$;

CREATE OR REPLACE FUNCTION public.can_access_company(company_name TEXT)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER AS $$
SELECT 
    CASE 
        WHEN public.get_user_role() = 'group_admin' THEN true
        WHEN public.get_user_role() = 'ceo' AND public.get_user_company() = company_name THEN true
        WHEN public.get_user_role() = 'analyst' AND public.get_user_company() = company_name THEN true
        ELSE false
    END
$$;

CREATE OR REPLACE FUNCTION public.can_access_document(doc_company_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER AS $$
SELECT EXISTS (
    SELECT 1 FROM public.companies c
    WHERE c.id = doc_company_id
    AND public.can_access_company(c.name)
)
$$;

-- 6. RLS Policies
CREATE POLICY "users_own_profile" ON public.user_profiles
FOR ALL
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "company_access_control" ON public.companies
FOR SELECT
TO authenticated
USING (public.can_access_company(name));

CREATE POLICY "document_access_control" ON public.documents
FOR ALL
TO authenticated
USING (public.can_access_document(company_id))
WITH CHECK (public.can_access_document(company_id));

CREATE POLICY "balance_sheet_access_control" ON public.balance_sheets
FOR ALL
TO authenticated
USING (public.can_access_document(company_id))
WITH CHECK (public.can_access_document(company_id));

CREATE POLICY "user_query_history" ON public.query_history
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "embedding_access_control" ON public.document_embeddings
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.documents d
        WHERE d.id = document_id
        AND public.can_access_document(d.company_id)
    )
);

-- 7. Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'analyst')::public.user_role
  );  
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Mock Data
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    ceo_uuid UUID := gen_random_uuid();
    analyst_uuid UUID := gen_random_uuid();
    reliance_uuid UUID := gen_random_uuid();
    jio_uuid UUID := gen_random_uuid();
    retail_uuid UUID := gen_random_uuid();
    doc_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@ambani.com', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Mukesh Ambani", "role": "group_admin"}'::jsonb, 
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (ceo_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'ceo@reliancejio.com', crypt('ceo123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Akash Ambani", "role": "ceo"}'::jsonb, 
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (analyst_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'analyst@reliance.com', crypt('analyst123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Financial Analyst", "role": "analyst"}'::jsonb, 
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create companies
    INSERT INTO public.companies (id, name, parent_group, industry) VALUES
        (reliance_uuid, 'Reliance Industries', 'Reliance Group', 'Conglomerate'),
        (jio_uuid, 'Reliance Jio', 'Reliance Group', 'Telecommunications'),
        (retail_uuid, 'Reliance Retail', 'Reliance Group', 'Retail');

    -- Update user profiles with company assignments
    UPDATE public.user_profiles SET assigned_company = 'Reliance Group' WHERE id = admin_uuid;
    UPDATE public.user_profiles SET assigned_company = 'Reliance Jio' WHERE id = ceo_uuid;
    UPDATE public.user_profiles SET assigned_company = 'Reliance Industries' WHERE id = analyst_uuid;

    -- Create sample document
    INSERT INTO public.documents (id, filename, original_filename, file_size, file_url, company_id, uploaded_by, status)
    VALUES (doc_uuid, 'reliance-annual-report-2023-24.pdf', 'Reliance Annual Report 2023-24.pdf', 
            2048000, '/storage/documents/reliance-annual-report-2023-24.pdf', reliance_uuid, analyst_uuid, 'completed');

    -- Create sample balance sheet data
    INSERT INTO public.balance_sheets (company_id, document_id, fiscal_year, quarter, revenue, assets, liabilities, equity, status)
    VALUES
        (reliance_uuid, doc_uuid, 2024, 4, 9500000000000, 15200000000000, 8700000000000, 6500000000000, 'processed'),
        (reliance_uuid, doc_uuid, 2023, 4, 8900000000000, 14800000000000, 8500000000000, 6300000000000, 'processed'),
        (jio_uuid, doc_uuid, 2024, 4, 1200000000000, 2800000000000, 1600000000000, 1200000000000, 'processed'),
        (retail_uuid, doc_uuid, 2024, 4, 2800000000000, 4200000000000, 2400000000000, 1800000000000, 'processed');

    -- Create sample query history
    INSERT INTO public.query_history (user_id, company_id, query_text, response_text)
    VALUES
        (admin_uuid, reliance_uuid, 'What is the YoY revenue growth for Reliance Industries?', 'Reliance Industries showed a 6.7% YoY revenue growth from ₹8.9 trillion in FY2023 to ₹9.5 trillion in FY2024.'),
        (analyst_uuid, reliance_uuid, 'Compare asset vs liability for the last 2 years', 'Assets increased from ₹14.8T to ₹15.2T while liabilities grew from ₹8.5T to ₹8.7T, showing improved financial health.');

END $$;