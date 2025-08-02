import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';

const UserModal = ({ isOpen, onClose, user, onSave, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'analyst',
    companies: [],
    status: 'active',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const roleOptions = [
    { value: 'analyst', label: 'Analyst', description: 'Can view and analyze assigned company data' },
    { value: 'ceo', label: 'CEO', description: 'Full access to own company data and insights' },
    { value: 'group_admin', label: 'Group Admin', description: 'Manage users and access across all companies' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  const companyOptions = [
    { value: 'tech_corp', label: 'Tech Corp' },
    { value: 'finance_ltd', label: 'Finance Ltd' },
    { value: 'retail_inc', label: 'Retail Inc' },
    { value: 'manufacturing_co', label: 'Manufacturing Co' },
    { value: 'healthcare_group', label: 'Healthcare Group' },
    { value: 'energy_solutions', label: 'Energy Solutions' }
  ];

  useEffect(() => {
    if (user && mode === 'edit') {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'analyst',
        companies: user.companies || [],
        status: user.status || 'active',
        password: '',
        confirmPassword: ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'analyst',
        companies: [],
        status: 'active',
        password: '',
        confirmPassword: ''
      });
    }
    setErrors({});
  }, [user, mode, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    if (formData.companies.length === 0) {
      newErrors.companies = 'At least one company must be assigned';
    }

    if (mode === 'create') {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (mode === 'edit' && formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const userData = {
        ...formData,
        id: user?.id || `user_${Date.now()}`
      };
      
      // Remove password fields if empty in edit mode
      if (mode === 'edit' && !formData.password) {
        delete userData.password;
        delete userData.confirmPassword;
      }
      
      await onSave(userData);
      onClose();
    } catch (error) {
      setErrors({ submit: 'Failed to save user. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleCompanyChange = (companyValue, checked) => {
    setFormData(prev => ({
      ...prev,
      companies: checked 
        ? [...prev.companies, companyValue]
        : prev.companies.filter(c => c !== companyValue)
    }));
    
    if (errors.companies) {
      setErrors(prev => ({
        ...prev,
        companies: ''
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />      
      <div className="relative w-full max-w-2xl min-h-[50vh] max-h-[90vh] glass-morphic rounded-lg shadow-elevation-4 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-glass-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {mode === 'create' ? 'Add New User' : 'Edit User'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === 'create' ?'Create a new user account with role-based permissions' :'Update user information and permissions'
              }
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={errors.name}
                  required
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                  required
                />
              </div>
            </div>

            {/* Role & Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Role & Status</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="User Role"
                  options={roleOptions}
                  value={formData.role}
                  onChange={(value) => handleInputChange('role', value)}
                  error={errors.role}
                  required
                />
                
                <Select
                  label="Account Status"
                  options={statusOptions}
                  value={formData.status}
                  onChange={(value) => handleInputChange('status', value)}
                  required
                />
              </div>
            </div>

            {/* Company Access */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Company Access</h3>
              <p className="text-sm text-muted-foreground">
                Select which companies this user can access
              </p>
              
              <CheckboxGroup 
                label="Assigned Companies" 
                error={errors.companies}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {companyOptions.map((company) => (
                  <Checkbox
                    key={company.value}
                    label={company.label}
                    checked={formData.companies.includes(company.value)}
                    onChange={(e) => handleCompanyChange(company.value, e.target.checked)}
                  />
                ))}
              </CheckboxGroup>
            </div>

            {/* Password Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                {mode === 'create' ? 'Password' : 'Change Password'}
              </h3>
              {mode === 'edit' && (
                <p className="text-sm text-muted-foreground">
                  Leave blank to keep current password
                </p>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  error={errors.password}
                  required={mode === 'create'}
                  description={mode === 'create' ? 'Minimum 8 characters' : ''}
                />
                
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  error={errors.confirmPassword}
                  required={mode === 'create' || formData.password}
                />
              </div>
            </div>

            {errors.submit && (
              <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
                <p className="text-sm text-error">{errors.submit}</p>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-4 sm:p-6 border-t border-glass-border sticky bottom-0 bg-surface z-10 shadow-elevation-1">
          <Button 
            variant="outline" 
            onClick={onClose} 
            disabled={loading}
            size="lg"
            className="min-w-[100px] font-medium"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            loading={loading}
            iconName={mode === 'create' ? 'Plus' : 'Save'}
            iconPosition="left"
            size="lg"
            className="min-w-[140px] font-medium"
          >
            {mode === 'create' ? 'Create User' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;