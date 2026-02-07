'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'member';
  memberId: { _id: string; name: string; email: string } | null;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
}

interface Member {
  _id: string;
  name: string;
  email: string;
}

interface UserForm {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'member';
  memberId: string;
  isActive: boolean;
}

const emptyForm: UserForm = {
  email: '',
  password: '',
  name: '',
  role: 'member',
  memberId: '',
  isActive: true,
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserForm>(emptyForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, membersRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/members'),
      ]);
      const usersData = await usersRes.json();
      const membersData = await membersRes.json();
      if (usersData.success) setUsers(usersData.data);
      if (membersData.success) setMembers(membersData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData: any = {
      email: formData.email,
      name: formData.name,
      role: formData.role,
      memberId: formData.memberId || null,
      isActive: formData.isActive,
    };

    // Only include password if provided
    if (formData.password.trim() !== '') {
      submitData.password = formData.password;
    }

    const url = editingId ? `/api/users/${editingId}` : '/api/users';
    const res = await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submitData),
    });

    const data = await res.json();
    if (!data.success) {
      alert(data.error || 'An error occurred');
      return;
    }

    fetchData();
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this user? They will no longer be able to login.')) return;
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleEdit = (user: User) => {
    setFormData({
      email: user.email,
      password: '', // Don't show password
      name: user.name,
      role: user.role,
      memberId: user.memberId?._id || '',
      isActive: user.isActive,
    });
    setEditingId(user._id);
    setShowForm(true);
  };

  // Get members that don't have a user account yet
  const availableMembers = members.filter(member => {
    const isUsed = users.some(user => user.memberId?._id === member._id);
    const isCurrentlyEditing = editingId && formData.memberId === member._id;
    return !isUsed || isCurrentlyEditing;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Manage Users</h1>
              <p className="text-gray-300 text-sm mt-1">Create login accounts for lab members</p>
            </div>
            <Link href="/admin" className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm">Back</Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData(emptyForm); }}
          className="mb-6 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          {showForm ? 'Cancel' : '+ Add User'}
        </button>

        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit User' : 'Create New User'}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                    placeholder="user@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password {editingId ? '(leave blank to keep current)' : '*'}
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    required={!editingId}
                    placeholder={editingId ? '••••••••' : 'Enter password'}
                    minLength={6}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'member' })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="member">Member (can edit own profile only)</option>
                    <option value="admin">Admin (full access)</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link to Member Profile</label>
                  <select
                    value={formData.memberId}
                    onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">-- No linked member profile --</option>
                    {availableMembers.map((member) => (
                      <option key={member._id} value={member._id}>
                        {member.name} ({member.email || 'No email'})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Member users can only edit their linked profile</p>
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span className="text-sm text-gray-700">Account Active (can login)</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingId(null); setFormData(emptyForm); }}
                  className="px-6 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                  {editingId ? 'Update User' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-800 mb-2">How User Roles Work</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>Admin:</strong> Full access to all admin features</li>
            <li>• <strong>Member:</strong> Can only view and edit their own linked member profile</li>
            <li>• Link a user to a member profile so they can manage their own information</li>
          </ul>
        </div>

        {/* Users List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <p className="text-gray-500 mb-4">No users created yet.</p>
            <button onClick={() => setShowForm(true)} className="text-purple-600 hover:underline font-medium">
              Create your first user account
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">User</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 hidden sm:table-cell">Role</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 hidden md:table-cell">Linked Member</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 hidden lg:table-cell">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      {user.memberId ? (
                        <span className="text-sm text-gray-600">{user.memberId.name}</span>
                      ) : (
                        <span className="text-sm text-gray-400">Not linked</span>
                      )}
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleEdit(user)} className="text-blue-600 text-sm hover:underline mr-3">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(user._id)} className="text-red-600 text-sm hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
