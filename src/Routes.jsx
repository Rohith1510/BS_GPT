import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Login from './pages/login';
import UserManagement from './pages/user-management';
import Dashboard from './pages/dashboard';
import AIQueryInterface from './pages/ai-query-interface';
import PDFUploadManagement from './pages/pdf-upload-management';
import FinancialDataAnalysis from './pages/financial-data-analysis';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        {/* <Route path="/" element={<AIQueryInterface />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/ai-query-interface" element={<AIQueryInterface />} />
        <Route path="/pdf-upload-management" element={<PDFUploadManagement />} />
        <Route path="/financial-data-analysis" element={<FinancialDataAnalysis />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
