import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import BrandingSection from './components/BrandingSection';
import BackgroundVisualization from './components/BackgroundVisualization';
import Aurora from 'blocks/Backgrounds/Aurora/Aurora';


const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Aurora Background */}
     <div className="absolute inset-0 h-[100vh]">
  <Aurora
    colorStops={["#1D1D1F", "#007AFF", "#30D158"]}
    blend={0.5}
    amplitude={1.0}
    speed={0.5}
  />
</div>
      
      {/* Main content - Centered login form */}
      <div className="relative z-10 min-h-screen flex  items-center justify-center p-8 ">
        <div className="w-full max-w-md">
          {/* Mobile branding header */}
          {/* <div className="mb-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary shadow-elevation-1">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">BalanceSheet</h1>
                <p className="text-lg text-secondary font-semibold -mt-1">GPT</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered financial analysis platform
            </p>
          </div> */}
          
          {/* Login form card */}
          <div className="glass-morphic rounded-2xl shadow-elevation-3 p-8">
            <LoginForm />
          </div>
          
          {/* Trust indicators */}
          {/* <div className="mt-6 glass-morphic rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="flex flex-col items-center space-y-1">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10.5V11.5C15.4,11.5 16,12.4 16,13V16C16,16.6 15.6,17 15,17H9C8.4,17 8,16.6 8,16V13C8,12.4 8.4,11.5 9,11.5V10.5C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,8.7 10.2,10.5V11.5H13.8V10.5C13.8,8.7 12.8,8.2 12,8.2Z"/>
                  </svg>
                </div>
                <span className="text-xs text-foreground font-medium">Secure</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9,10H7V12H9V10M13,10H11V12H13V10M17,10H15V12H17V10M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19Z"/>
                  </svg>
                </div>
                <span className="text-xs text-foreground font-medium">Compliant</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      
      {/* Footer */}
      {/* <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BalanceSheet GPT. Secure financial analysis platform.
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default Login;