'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminResources() {
  const [resources, setResources] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', link: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch('/api/resources');
    const data = await res.json();
    if (data.success) setResources(data.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/resources/${editingId}` : '/api/resources';
    await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    fetchData();
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: '', description: '', link: '' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this resource?')) return;
    await fetch(`/api/resources/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Manage Resources</h1>
            <Link href="/admin" className="bg-white text-gray-800 px-4 py-2 rounded-lg">Back</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <button onClick={() => setShowForm(!showForm)} className="mb-6 bg-orange-600 text-white px-6 py-3 rounded-lg">
          {showForm ? 'Cancel' : '+ Add Resource'}
        </button>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border rounded-lg px-4 py-2" required />
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded-lg px-4 py-2" rows={3} required />
              <input placeholder="Link" value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full border rounded-lg px-4 py-2" required />
              <button type="submit" className="bg-orange-600 text-white px-6 py-2 rounded-lg">
                {editingId ? 'Update' : 'Add'}
              </button>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {resources.map((resource) => (
            <div key={resource._id} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold">{resource.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => { setFormData(resource); setEditingId(resource._id); setShowForm(true); }}
                  className="text-blue-600 text-sm">Edit</button>
                <button onClick={() => handleDelete(resource._id)} className="text-red-600 text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
