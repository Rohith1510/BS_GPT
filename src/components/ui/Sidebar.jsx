import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  // Get user role from auth context
  const userRole = userProfile?.role || 'analyst';

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/dashboard', 
      icon: 'LayoutDashboard',
      roles: ['analyst', 'ceo', 'admin']
    },
    { 
      label: 'Data Management', 
      path: '/pdf-upload-management', 
      icon: 'FileText',
      roles: ['analyst', 'ceo', 'admin']
    },
    { 
      label: 'Analysis', 
      path: '/financial-data-analysis', 
      icon: 'TrendingUp',
      roles: ['analyst', 'ceo', 'admin']
    },
    { 
      label: 'AI Assistant', 
      path: '/ai-query-interface', 
      icon: 'Bot',
      roles: ['analyst', 'ceo', 'admin']
    },
    { 
      label: 'User Management', 
      path: '/user-management', 
      icon: 'Users',
      roles: ['admin']
    },
  ];

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActivePath = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Mobile overlay
  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden glass-morphic"
          onClick={toggleSidebar}
        >
          <Icon name="Menu" size={20} />
        </Button>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div 
              className="fixed inset-0 bg-background/80 backdrop-blur-sm" 
              onClick={() => setMobileMenuOpen(false)} 
            />
            <aside className="fixed left-0 top-0 h-full w-80 glass-morphic shadow-elevation-4">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-glass-border">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary shadow-elevation-1">
                      <Icon name="Calculator" size={24} color="white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl font-semibold text-foreground">BalanceSheet</span>
                      <span className="text-sm text-secondary font-medium -mt-1">GPT</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-6 space-y-2">
                  {filteredNavItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActivePath(item.path)
                          ? 'bg-primary text-primary-foreground shadow-elevation-1'
                          : 'text-muted-foreground hover:text-foreground hover:bg-glass-hover glass-hover'
                      }`}
                    >
                      <Icon name={item.icon} size={20} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>

                {/* User Profile */}
                <div className="p-6 border-t border-glass-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <Icon name="User" size={18} color="white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{userProfile?.full_name || 'Guest'}</div>
                      <div className="text-xs text-muted-foreground capitalize">{userRole}</div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Icon name="Settings" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside className={`fixed left-0 top-0 h-full z-30 glass-morphic shadow-elevation-2 transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-80'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-glass-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary shadow-elevation-1">
                <Icon name="Calculator" size={24} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-foreground">BalanceSheet</span>
                <span className="text-sm text-secondary font-medium -mt-1">GPT</span>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="flex items-center justify-center w-full">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary shadow-elevation-1">
                <Icon name="Calculator" size={24} color="white" />
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          {filteredNavItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground shadow-elevation-1'
                  : 'text-muted-foreground hover:text-foreground hover:bg-glass-hover glass-hover'
              } ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
              title={isCollapsed ? item.label : ''}
            >
              <Icon name={item.icon} size={20} />
              {!isCollapsed && <span>{item.label}</span>}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-elevation-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-6 border-t border-glass-border">
          {!isCollapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Icon name="User" size={18} color="white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{userProfile?.full_name || 'Guest'}</div>
                <div className="text-xs text-muted-foreground capitalize">{userRole}</div>
              </div>
              <Button variant="ghost" size="icon">
                <Icon name="Settings" size={16} />
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center group relative">
                <Icon name="User" size={18} color="white" />
                <div className="absolute left-full ml-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-elevation-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  {userProfile?.full_name || 'Guest'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;