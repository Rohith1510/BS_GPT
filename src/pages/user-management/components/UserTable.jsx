import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserTable = ({ users, onEditUser, onDeleteUser, onBulkAction, selectedUsers, onUserSelect, onSelectAll }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');

  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'analyst', label: 'Analyst' },
    { value: 'ceo', label: 'CEO' },
    { value: 'group_admin', label: 'Group Admin' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  const companyOptions = [
    { value: '', label: 'All Companies' },
    { value: 'tech_corp', label: 'Tech Corp' },
    { value: 'finance_ltd', label: 'Finance Ltd' },
    { value: 'retail_inc', label: 'Retail Inc' },
    { value: 'manufacturing_co', label: 'Manufacturing Co' }
  ];

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = !roleFilter || user.role === roleFilter;
      const matchesStatus = !statusFilter || user.status === statusFilter;
      const matchesCompany = !companyFilter || user.companies.some(company => 
        company.toLowerCase().includes(companyFilter.toLowerCase())
      );
      
      return matchesSearch && matchesRole && matchesStatus && matchesCompany;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'lastLogin') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [users, searchTerm, roleFilter, statusFilter, companyFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="opacity-50" />;
    }
    return sortConfig.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} />
      : <Icon name="ArrowDown" size={14} />;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-success/20', text: 'text-success', label: 'Active' },
      inactive: { bg: 'bg-error/20', text: 'text-error', label: 'Inactive' },
      pending: { bg: 'bg-warning/20', text: 'text-warning', label: 'Pending' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      analyst: { bg: 'bg-primary/20', text: 'text-primary', label: 'Analyst' },
      ceo: { bg: 'bg-secondary/20', text: 'text-secondary', label: 'CEO' },
      group_admin: { bg: 'bg-accent/20', text: 'text-accent', label: 'Group Admin' }
    };
    
    const config = roleConfig[role] || roleConfig.analyst;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const formatLastLogin = (date) => {
    const now = new Date();
    const loginDate = new Date(date);
    const diffInHours = Math.floor((now - loginDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return loginDate.toLocaleDateString();
  };

  const isAllSelected = selectedUsers.length === filteredAndSortedUsers.length && filteredAndSortedUsers.length > 0;
  const isIndeterminate = selectedUsers.length > 0 && selectedUsers.length < filteredAndSortedUsers.length;

  return (
    <div className="space-y-6 relative">
      {/* Filters */}
      <div className="glass-morphic rounded-lg p-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Select
            placeholder="Filter by role"
            options={roleOptions}
            value={roleFilter}
            onChange={setRoleFilter}
          />
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
          />
          <Select
            placeholder="Filter by company"
            options={companyOptions}
            value={companyFilter}
            onChange={setCompanyFilter}
          />
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-glass-border">
          <div className="text-sm text-muted-foreground">
            Showing {filteredAndSortedUsers.length} of {users.length} users
          </div>
          {selectedUsers.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedUsers.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('deactivate')}
              >
                Bulk Deactivate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('activate')}
              >
                Bulk Activate
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="glass-morphic rounded-lg overflow-hidden relative z-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/10 border-b border-glass-border">
              <tr>
                <th className="px-6 py-4 text-left">
                  <Checkbox
                    checked={isAllSelected}
                    indeterminate={isIndeterminate}
                    onChange={(e) => onSelectAll(e.target.checked)}
                  />
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <span>Name</span>
                    {getSortIcon('name')}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('email')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <span>Email</span>
                    {getSortIcon('email')}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('role')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <span>Role</span>
                    {getSortIcon('role')}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-sm font-medium text-foreground">Companies</span>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('lastLogin')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <span>Last Login</span>
                    {getSortIcon('lastLogin')}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <span>Status</span>
                    {getSortIcon('status')}
                  </button>
                </th>
                <th className="px-6 py-4 text-right">
                  <span className="text-sm font-medium text-foreground">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {filteredAndSortedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-glass-hover transition-colors">
                  <td className="px-6 py-4">
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => onUserSelect(user.id, e.target.checked)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-foreground">
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{user.name}</div>
                        <div className="text-xs text-muted-foreground">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-foreground">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.companies.slice(0, 2).map((company, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted/20 text-muted-foreground">
                          {company}
                        </span>
                      ))}
                      {user.companies.length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted/20 text-muted-foreground">
                          +{user.companies.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-muted-foreground">
                      {formatLastLogin(user.lastLogin)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditUser(user)}
                        className="h-8 w-8"
                      >
                        <Icon name="Edit" size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteUser(user.id)}
                        className="h-8 w-8 text-error hover:text-error"
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredAndSortedUsers.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;