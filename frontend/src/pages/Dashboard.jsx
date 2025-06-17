// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import UserTable from '../components/UserTable';
import PermissionPanel from '../components/PermissionPanel';
import CreateUserForm from '../components/CreateUserForm';

const mockUsers = [
  {
    id: 1,
    email: 'user1@example.com',
    permissions: {
      'Products List': ['View'],
      'Order List': ['View', 'Edit'],
    },
  },
  {
    id: 2,
    email: 'user2@example.com',
    permissions: {
      'Marketing List': ['View', 'Create'],
    },
  },
];

function Dashboard() {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handlePermissionChange = (page, updatedPermissions) => {
    const updatedUsers = users.map((u) =>
      u.id === selectedUser.id
        ? {
            ...u,
            permissions: { ...u.permissions, [page]: updatedPermissions },
          }
        : u
    );
    setUsers(updatedUsers);
    setSelectedUser((prev) => ({
      ...prev,
      permissions: { ...prev.permissions, [page]: updatedPermissions },
    }));
  };

  const handleCreateUser = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setShowCreateForm(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Super Admin Dashboard</h1>
      <div className="mb-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => setShowCreateForm(true)}
        >
          Create New User
        </button>
      </div>
      <UserTable users={users} onEdit={handleEdit} />
      {selectedUser && (
        <PermissionPanel
          selectedUser={selectedUser}
          onChangePermission={handlePermissionChange}
          onClose={() => setSelectedUser(null)}
        />
      )}
      {showCreateForm && (
        <CreateUserForm
          onCreate={handleCreateUser}
          onCancel={() => setShowCreateForm(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
