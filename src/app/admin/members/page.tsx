'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminMembers() {
  const [members, setMembers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', degree: '', award: '', description: '', type: 'member',
    email: '', title: '', department: '', institution: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch('/api/members');
    const data = await res.json();
    if (data.success) setMembers(data.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/members/${editingId}` : '/api/members';
    await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    fetchData();
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', degree: '', award: '', description: '', type: 'member', email: '', title: '', department: '', institution: '' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this member?')) return;
    await fetch(`/api/members/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Manage Members</h1>
            <Link href="/admin" className="bg-white text-gray-800 px-4 py-2 rounded-lg">Back</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <button onClick={() => setShowForm(!showForm)} className="mb-6 bg-purple-600 text-white px-6 py-3 rounded-lg">
          {showForm ? 'Cancel' : '+ Add Member'}
        </button>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded-lg px-4 py-2" required />
              <input placeholder="Degree" value={formData.degree} onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full border rounded-lg px-4 py-2" required />
              <input placeholder="Award (optional)" value={formData.award} onChange={(e) => setFormData({ ...formData, award: e.target.value })}
                className="w-full border rounded-lg px-4 py-2" />
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded-lg px-4 py-2" rows={4} required />
              <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full border rounded-lg px-4 py-2">
                <option value="member">Member</option>
                <option value="pi">Principal Investigator</option>
              </select>
              <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg">
                {editingId ? 'Update' : 'Add'}
              </button>
            </form>
          </div>
        )}

        <div className="grid gap-4">
          {members.map((member) => (
            <div key={member._id} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.degree}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => { setFormData(member); setEditingId(member._id); setShowForm(true); }}
                  className="text-blue-600 text-sm">Edit</button>
                <button onClick={() => handleDelete(member._id)} className="text-red-600 text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
