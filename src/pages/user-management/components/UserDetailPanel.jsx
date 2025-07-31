import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserDetailPanel = ({ selectedUser, onEditUser, onResetPassword, onToggleStatus }) => {
  if (!selectedUser) {
    return (
      <div className="glass-morphic rounded-lg p-8 text-center">
        <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No User Selected</h3>
        <p className="text-muted-foreground">
          Select a user from the table to view their details and perform actions.
        </p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      active: 'text-success',
      inactive: 'text-error',
      pending: 'text-warning'
    };
    return colors[status] || 'text-muted-foreground';
  };

  const getRoleColor = (role) => {
    const colors = {
      analyst: 'text-primary',
      ceo: 'text-secondary',
      group_admin: 'text-accent'
    };
    return colors[role] || 'text-muted-foreground';
  };

  const formatLastLogin = (date) => {
    const now = new Date();
    const loginDate = new Date(date);
    const diffInHours = Math.floor((now - loginDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} days ago`;
    return loginDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatJoinDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <div className="glass-morphic rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xl font-semibold text-primary-foreground">
              {selectedUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground">{selectedUser.name}</h3>
            <p className="text-muted-foreground">{selectedUser.email}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className={`text-sm font-medium capitalize ${getRoleColor(selectedUser.role)}`}>
                {selectedUser.role.replace('_', ' ')}
              </span>
              <span className={`text-sm font-medium capitalize ${getStatusColor(selectedUser.status)}`}>
                {selectedUser.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-morphic rounded-lg p-6">
        <h4 className="text-lg font-medium text-foreground mb-4">Quick Actions</h4>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            iconName="Edit"
            iconPosition="left"
            onClick={() => onEditUser(selectedUser)}
          >
            Edit User Details
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            iconName="Key"
            iconPosition="left"
            onClick={() => onResetPassword(selectedUser.id)}
          >
            Reset Password
          </Button>
          <Button
            variant="outline"
            className={`w-full justify-start ${
              selectedUser.status === 'active' ? 'text-error hover:text-error' : 'text-success hover:text-success'
            }`}
            iconName={selectedUser.status === 'active' ? 'UserX' : 'UserCheck'}
            iconPosition="left"
            onClick={() => onToggleStatus(selectedUser.id, selectedUser.status)}
          >
            {selectedUser.status === 'active' ? 'Deactivate User' : 'Activate User'}
          </Button>
        </div>
      </div>

      {/* User Information */}
      <div className="glass-morphic rounded-lg p-6">
        <h4 className="text-lg font-medium text-foreground mb-4">User Information</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-glass-border">
            <span className="text-sm text-muted-foreground">User ID</span>
            <span className="text-sm font-medium text-foreground">{selectedUser.id}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-glass-border">
            <span className="text-sm text-muted-foreground">Role</span>
            <span className={`text-sm font-medium capitalize ${getRoleColor(selectedUser.role)}`}>
              {selectedUser.role.replace('_', ' ')}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-glass-border">
            <span className="text-sm text-muted-foreground">Status</span>
            <span className={`text-sm font-medium capitalize ${getStatusColor(selectedUser.status)}`}>
              {selectedUser.status}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-glass-border">
            <span className="text-sm text-muted-foreground">Last Login</span>
            <span className="text-sm font-medium text-foreground">
              {formatLastLogin(selectedUser.lastLogin)}
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-muted-foreground">Joined</span>
            <span className="text-sm font-medium text-foreground">
              {formatJoinDate(selectedUser.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Company Access */}
      <div className="glass-morphic rounded-lg p-6">
        <h4 className="text-lg font-medium text-foreground mb-4">Company Access</h4>
        <div className="space-y-2">
          {selectedUser.companies.map((company, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/10 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Icon name="Building" size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{company}</div>
                <div className="text-xs text-muted-foreground">Full Access</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Summary */}
      <div className="glass-morphic rounded-lg p-6">
        <h4 className="text-lg font-medium text-foreground mb-4">Activity Summary</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-muted/10 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {selectedUser.loginCount || 0}
            </div>
            <div className="text-xs text-muted-foreground">Total Logins</div>
          </div>
          <div className="text-center p-4 bg-muted/10 rounded-lg">
            <div className="text-2xl font-bold text-secondary">
              {selectedUser.queriesCount || 0}
            </div>
            <div className="text-xs text-muted-foreground">AI Queries</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPanel;