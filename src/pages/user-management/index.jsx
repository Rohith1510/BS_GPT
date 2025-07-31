import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';
import UserDetailPanel from './components/UserDetailPanel';
import StatsCards from './components/StatsCards';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data
  const mockUsers = [
    {
      id: 'user_001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      role: 'analyst',
      companies: ['Tech Corp', 'Finance Ltd'],
      status: 'active',
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      createdAt: new Date('2024-01-15'),
      loginCount: 156,
      queriesCount: 89
    },
    {
      id: 'user_002',
      name: 'Michael Chen',
      email: 'michael.chen@financeltd.com',
      role: 'ceo',
      companies: ['Finance Ltd'],
      status: 'active',
      lastLogin: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      createdAt: new Date('2024-02-20'),
      loginCount: 234,
      queriesCount: 145
    },
    {
      id: 'user_003',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@retailinc.com',
      role: 'analyst',
      companies: ['Retail Inc', 'Manufacturing Co'],
      status: 'active',
      lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      createdAt: new Date('2024-03-10'),
      loginCount: 98,
      queriesCount: 67
    },
    {
      id: 'user_004',
      name: 'David Thompson',
      email: 'david.thompson@group.com',
      role: 'group_admin',
      companies: ['Tech Corp', 'Finance Ltd', 'Retail Inc', 'Manufacturing Co'],
      status: 'active',
      lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      createdAt: new Date('2023-12-01'),
      loginCount: 445,
      queriesCount: 278
    },
    {
      id: 'user_005',
      name: 'Lisa Wang',
      email: 'lisa.wang@manufacturingco.com',
      role: 'ceo',
      companies: ['Manufacturing Co'],
      status: 'inactive',
      lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      createdAt: new Date('2024-01-25'),
      loginCount: 67,
      queriesCount: 34
    },
    {
      id: 'user_006',
      name: 'James Wilson',
      email: 'james.wilson@techcorp.com',
      role: 'analyst',
      companies: ['Tech Corp'],
      status: 'pending',
      lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      createdAt: new Date('2024-07-28'),
      loginCount: 12,
      queriesCount: 5
    },
    {
      id: 'user_007',
      name: 'Anna Kowalski',
      email: 'anna.kowalski@healthcaregroup.com',
      role: 'analyst',
      companies: ['Healthcare Group'],
      status: 'active',
      lastLogin: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      createdAt: new Date('2024-04-15'),
      loginCount: 134,
      queriesCount: 78
    },
    {
      id: 'user_008',
      name: 'Robert Martinez',
      email: 'robert.martinez@energysolutions.com',
      role: 'ceo',
      companies: ['Energy Solutions'],
      status: 'active',
      lastLogin: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      createdAt: new Date('2024-05-20'),
      loginCount: 89,
      queriesCount: 56
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCreateUser = () => {
    setModalMode('create');
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setModalMode('edit');
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
      if (selectedUser?.id === userId) {
        setSelectedUser(null);
      }
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    }
  };

  const handleSaveUser = async (userData) => {
    if (modalMode === 'create') {
      const newUser = {
        ...userData,
        createdAt: new Date(),
        lastLogin: new Date(),
        loginCount: 0,
        queriesCount: 0
      };
      setUsers(prev => [...prev, newUser]);
    } else {
      setUsers(prev => prev.map(user => 
        user.id === userData.id ? { ...user, ...userData } : user
      ));
      if (selectedUser?.id === userData.id) {
        setSelectedUser({ ...selectedUser, ...userData });
      }
    }
  };

  const handleUserSelect = (userId, checked) => {
    if (checked) {
      setSelectedUsers(prev => [...prev, userId]);
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleBulkAction = (action) => {
    if (selectedUsers.length === 0) return;

    const actionText = action === 'activate' ? 'activate' : 'deactivate';
    if (window.confirm(`Are you sure you want to ${actionText} ${selectedUsers.length} user(s)?`)) {
      const newStatus = action === 'activate' ? 'active' : 'inactive';
      setUsers(prev => prev.map(user => 
        selectedUsers.includes(user.id) ? { ...user, status: newStatus } : user
      ));
      setSelectedUsers([]);
    }
  };

  const handleResetPassword = (userId) => {
    if (window.confirm('Are you sure you want to reset this user\'s password? They will receive an email with reset instructions.')) {
      // In a real app, this would trigger a password reset email
      alert('Password reset email sent successfully!');
    }
  };

  const handleToggleStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const actionText = newStatus === 'active' ? 'activate' : 'deactivate';
    
    if (window.confirm(`Are you sure you want to ${actionText} this user?`)) {
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      ));
      if (selectedUser?.id === userId) {
        setSelectedUser({ ...selectedUser, status: newStatus });
      }
    }
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        <main className="ml-0 md:ml-80 pt-16">
          <div className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Icon name="Loader2" size={32} className="animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Loading user management...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="ml-0 md:ml-80 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">User Management</h1>
              <p className="text-muted-foreground mt-2">
                Manage user accounts, roles, and company access permissions
              </p>
            </div>
            <Button
              onClick={handleCreateUser}
              iconName="Plus"
              iconPosition="left"
              className="shadow-elevation-1"
            >
              Add New User
            </Button>
          </div>

          {/* Stats Cards */}
          <StatsCards users={users} />

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* User Table */}
            <div className="xl:col-span-2">
              <UserTable
                users={users}
                onEditUser={handleEditUser}
                onDeleteUser={handleDeleteUser}
                onBulkAction={handleBulkAction}
                selectedUsers={selectedUsers}
                onUserSelect={handleUserSelect}
                onSelectAll={handleSelectAll}
                onRowClick={handleRowClick}
              />
            </div>

            {/* User Detail Panel */}
            <div className="xl:col-span-1">
              <UserDetailPanel
                selectedUser={selectedUser}
                onEditUser={handleEditUser}
                onResetPassword={handleResetPassword}
                onToggleStatus={handleToggleStatus}
              />
            </div>
          </div>
        </div>
      </main>

      {/* User Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={editingUser}
        onSave={handleSaveUser}
        mode={modalMode}
      />
    </div>
  );
};

export default UserManagement;