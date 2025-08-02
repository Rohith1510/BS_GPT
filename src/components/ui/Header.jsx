import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userProfile, signOut } = useAuth();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Upload Files', path: '/pdf-upload-management', icon: 'FileText' },
    { label: 'Analysis', path: '/financial-data-analysis', icon: 'TrendingUp' },
    { label: 'AI Assistant', path: '/ai-query-interface', icon: 'Bot' },
  ];

  const moreItems = [
    { label: 'User Management', path: '/user-management', icon: 'Users' },
  ];

  const isActivePath = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    window.location.href = path;
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  };

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      navigate('/');
    }
    setProfileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-morphic shadow-elevation-2">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
              <Icon name="Calculator" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">BalanceSheet</span>
              <span className="text-xs text-secondary font-medium -mt-1">GPT</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground shadow-elevation-1'
                    : 'text-muted-foreground hover:text-foreground hover:bg-glass-hover'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </button>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-glass-hover transition-all duration-200">
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
              </button>
              
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 glass-morphic rounded-lg shadow-elevation-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {moreItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`flex items-center space-x-3 w-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActivePath(item.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-glass-hover'
                      }`}
                    >
                      <Icon name={item.icon} size={16} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* User Profile & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* User Profile */}
            <div className="hidden md:flex items-center space-x-3 relative">
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{userProfile?.full_name || 'Guest'}</div>
                <div className="text-xs text-muted-foreground capitalize">{userProfile?.role || 'User'}</div>
              </div>
              <button 
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                <Icon name="User" size={16} color="white" />
              </button>
              
              {/* Profile Dropdown */}
              {profileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 glass-morphic rounded-lg shadow-elevation-3 z-50">
                  <div className="py-2">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-glass-hover transition-all duration-200"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-16 left-0 right-0 glass-morphic shadow-elevation-4 mx-4 rounded-lg">
            <nav className="py-4">
              {[...navigationItems, ...moreItems].map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center space-x-3 w-full px-6 py-3 text-sm font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-glass-hover'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
              
              {/* Mobile User Profile */}
              <div className="border-t border-glass-border mt-4 pt-4 px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <Icon name="User" size={18} color="white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{userProfile?.full_name || 'Guest'}</div>
                      <div className="text-xs text-muted-foreground capitalize">{userProfile?.role || 'User'}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-glass-hover transition-all duration-200"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;