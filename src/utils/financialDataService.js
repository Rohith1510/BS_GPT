import { supabase } from './supabaseClient';

class FinancialDataService {
  // Get companies based on user role
  async getCompanies() {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('name');

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load companies' };
    }
  }

  // Get balance sheets for a company
  async getBalanceSheets(companyId, filters = {}) {
    try {
      let query = supabase
        .from('balance_sheets')
        .select(`
          *,
          company:companies(*),
          document:documents(*)
        `)
        .eq('company_id', companyId)
        .order('fiscal_year', { ascending: false });

      if (filters?.startYear) {
        query = query.gte('fiscal_year', filters.startYear);
      }

      if (filters?.endYear) {
        query = query.lte('fiscal_year', filters.endYear);
      }

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load balance sheets' };
    }
  }

  // Get documents for a company
  async getDocuments(companyId) {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select(`
          *,
          company:companies(*),
          uploader:user_profiles(full_name, email)
        `)
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load documents' };
    }
  }

  // Upload document
  async uploadDocument(file, companyId, userId) {
    try {
      // Upload file to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        return { success: false, error: uploadError.message };
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(fileName);

      // Create document record
      const { data, error } = await supabase
        .from('documents')
        .insert({
          filename: fileName,
          original_filename: file.name,
          file_size: file.size,
          file_url: publicUrl,
          company_id: companyId,
          uploaded_by: userId,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to storage service. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to upload document' };
    }
  }

  // Save query to history
  async saveQuery(userId, companyId, queryText, responseText, chartData = null) {
    try {
      const { data, error } = await supabase
        .from('query_history')
        .insert({
          user_id: userId,
          company_id: companyId,
          query_text: queryText,
          response_text: responseText,
          chart_data: chartData
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to save query' };
    }
  }

  // Get query history
  async getQueryHistory(userId, limit = 20) {
    try {
      const { data, error } = await supabase
        .from('query_history')
        .select(`
          *,
          company:companies(name)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load query history' };
    }
  }

  // Get financial metrics for dashboard
  async getFinancialMetrics(companyIds, years = 3) {
    try {
      const currentYear = new Date().getFullYear();
      const startYear = currentYear - years;

      const { data, error } = await supabase
        .from('balance_sheets')
        .select(`
          *,
          company:companies(name, parent_group)
        `)
        .in('company_id', companyIds)
        .gte('fiscal_year', startYear)
        .eq('status', 'processed')
        .order('fiscal_year', { ascending: true });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load financial metrics' };
    }
  }

  // Real-time subscription for documents
  subscribeToDocuments(companyId, callback) {
    const channel = supabase
      .channel('documents')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'documents',
          filter: `company_id=eq.${companyId}`
        },
        callback
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }

  // Real-time subscription for balance sheets
  subscribeToBalanceSheets(companyId, callback) {
    const channel = supabase
      .channel('balance_sheets')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'balance_sheets',
          filter: `company_id=eq.${companyId}`
        },
        callback
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }
}

const financialDataService = new FinancialDataService();
export default financialDataService;