'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Publication {
  _id: string;
  citation: string;
  note: string;
  doi: string;
  type: string;
}

export default function AdminPublications() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    citation: '',
    note: '',
    doi: '',
    type: 'article',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch('/api/publications');
    const data = await res.json();
    if (data.success) setPublications(data.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/publications/${editingId}` : '/api/publications';
    const method = editingId ? 'PUT' : 'POST';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    fetchData();
    setShowForm(false);
    setEditingId(null);
    setFormData({ citation: '', note: '', doi: '', type: 'article' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this publication?')) return;
    await fetch(`/api/publications/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Manage Publications</h1>
            <Link href="/admin" className="bg-white text-gray-800 px-4 py-2 rounded-lg">Back</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <button onClick={() => setShowForm(!showForm)} className="mb-6 bg-green-600 text-white px-6 py-3 rounded-lg">
          {showForm ? 'Cancel' : '+ Add Publication'}
        </button>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Citation</label>
                <textarea value={formData.citation} onChange={(e) => setFormData({ ...formData, citation: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2" rows={3} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Note</label>
                <input value={formData.note} onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">DOI/Link</label>
                <input value={formData.doi} onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2">
                  <option value="article">Article</option>
                  <option value="book-chapter">Book Chapter</option>
                </select>
              </div>
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">
                {editingId ? 'Update' : 'Add'}
              </button>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {publications.map((pub) => (
            <div key={pub._id} className="bg-white rounded-lg shadow p-4">
              <p className="text-sm text-gray-700 mb-2">{pub.citation}</p>
              {pub.note && <p className="text-xs text-blue-600 mb-2">{pub.note}</p>}
              <div className="flex gap-2">
                <button onClick={() => { setFormData(pub); setEditingId(pub._id); setShowForm(true); }}
                  className="text-blue-600 text-sm">Edit</button>
                <button onClick={() => handleDelete(pub._id)} className="text-red-600 text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
