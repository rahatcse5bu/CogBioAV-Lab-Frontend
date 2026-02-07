'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { uploadToImgBB } from '@/lib/imgbb';

interface Photo {
  url: string;
  caption: string;
  order: number;
}

interface Album {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  photos: Photo[];
  category: string;
  date: string;
  isPublished: boolean;
  order: number;
}

interface AlbumForm {
  title: string;
  description: string;
  coverImage: string;
  photos: Photo[];
  category: string;
  date: string;
  isPublished: boolean;
  order: number;
}

const emptyForm: AlbumForm = {
  title: '',
  description: '',
  coverImage: '',
  photos: [],
  category: 'General',
  date: new Date().toISOString().split('T')[0],
  isPublished: true,
  order: 0,
};

const categories = ['General', 'Events', 'Conferences', 'Lab Activities', 'Celebrations', 'Field Trips', 'Workshops'];

export default function AdminAlbums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AlbumForm>(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const coverInputRef = useRef<HTMLInputElement>(null);
  const photosInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    const res = await fetch('/api/albums');
    const data = await res.json();
    if (data.success) setAlbums(data.data);
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const imageUrl = await uploadToImgBB(file);
      if (imageUrl) {
        setFormData({ ...formData, coverImage: imageUrl });
      } else {
        alert('Failed to upload image.');
      }
    } catch {
      alert('Failed to upload image.');
    }
    setUploading(false);
  };

  const handlePhotosUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingPhotos(true);
    
    const newPhotos: Photo[] = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const imageUrl = await uploadToImgBB(files[i]);
        if (imageUrl) {
          newPhotos.push({
            url: imageUrl,
            caption: '',
            order: formData.photos.length + i,
          });
        }
      } catch {
        console.error('Failed to upload photo:', files[i].name);
      }
    }
    
    setFormData({ ...formData, photos: [...formData.photos, ...newPhotos] });
    setUploadingPhotos(false);
    if (photosInputRef.current) photosInputRef.current.value = '';
  };

  const updatePhotoCaption = (index: number, caption: string) => {
    const updated = [...formData.photos];
    updated[index] = { ...updated[index], caption };
    setFormData({ ...formData, photos: updated });
  };

  const removePhoto = (index: number) => {
    setFormData({ ...formData, photos: formData.photos.filter((_, i) => i !== index) });
  };

  const movePhoto = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === formData.photos.length - 1)) return;
    const newPhotos = [...formData.photos];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newPhotos[index], newPhotos[swapIndex]] = [newPhotos[swapIndex], newPhotos[index]];
    setFormData({ ...formData, photos: newPhotos });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/albums/${editingId}` : '/api/albums';
    await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    fetchAlbums();
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
    setActiveTab('details');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this album and all its photos?')) return;
    await fetch(`/api/albums/${id}`, { method: 'DELETE' });
    fetchAlbums();
  };

  const handleEdit = (album: Album) => {
    setFormData({
      title: album.title || '',
      description: album.description || '',
      coverImage: album.coverImage || '',
      photos: album.photos || [],
      category: album.category || 'General',
      date: album.date ? album.date.split('T')[0] : new Date().toISOString().split('T')[0],
      isPublished: album.isPublished ?? true,
      order: album.order || 0,
    });
    setEditingId(album._id);
    setShowForm(true);
    setActiveTab('details');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold">Manage Albums</h1>
            <Link href="/admin" className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm">Back</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData(emptyForm); setActiveTab('details'); }}
          className="mb-6 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          {showForm ? 'Cancel' : '+ Create Album'}
        </button>

        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Album' : 'Create New Album'}</h2>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b pb-4">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeTab === 'details' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Album Details
              </button>
              <button
                onClick={() => setActiveTab('photos')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeTab === 'photos' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Photos ({formData.photos.length})
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Details Tab */}
              {activeTab === 'details' && (
                <div className="space-y-4">
                  {/* Cover Image */}
                  <div className="flex items-start gap-4">
                    <div className="relative w-40 h-28 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50 flex items-center justify-center">
                      {formData.coverImage ? (
                        <Image src={formData.coverImage} alt="Cover" fill className="object-cover" />
                      ) : (
                        <span className="text-gray-400 text-xs">No cover</span>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <input type="file" ref={coverInputRef} onChange={handleCoverUpload} accept="image/*" className="hidden" />
                      <button type="button" onClick={() => coverInputRef.current?.click()} disabled={uploading}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:bg-blue-300">
                        {uploading ? 'Uploading...' : 'Upload Cover'}
                      </button>
                      {formData.coverImage && (
                        <button type="button" onClick={() => setFormData({ ...formData, coverImage: '' })} className="text-red-600 text-sm">
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Album Title *</label>
                    <input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                      placeholder="e.g., Lab Picnic 2024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                      rows={3}
                      placeholder="Brief description of the album"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      <span className="text-sm text-gray-700">Published (visible on website)</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Photos Tab */}
              {activeTab === 'photos' && (
                <div className="space-y-4">
                  {/* Upload Button */}
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      ref={photosInputRef}
                      onChange={handlePhotosUpload}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => photosInputRef.current?.click()}
                      disabled={uploadingPhotos}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:bg-blue-300"
                    >
                      {uploadingPhotos ? 'Uploading...' : '+ Add Photos'}
                    </button>
                    <span className="text-sm text-gray-500">You can select multiple photos at once</span>
                  </div>

                  {/* Photos Grid */}
                  {formData.photos.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 mb-2">No photos added yet.</p>
                      <p className="text-sm text-gray-400">Click &quot;Add Photos&quot; to upload images to this album.</p>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden bg-gray-50">
                          <div className="relative h-40">
                            <Image src={photo.url} alt={`Photo ${index + 1}`} fill className="object-cover" />
                          </div>
                          <div className="p-3">
                            <input
                              placeholder="Caption (optional)"
                              value={photo.caption}
                              onChange={(e) => updatePhotoCaption(index, e.target.value)}
                              className="w-full border rounded px-2 py-1 text-sm mb-2"
                            />
                            <div className="flex items-center justify-between">
                              <div className="flex gap-1">
                                <button
                                  type="button"
                                  onClick={() => movePhoto(index, 'up')}
                                  disabled={index === 0}
                                  className="text-gray-500 hover:text-gray-700 disabled:opacity-30 px-2 py-1 text-sm"
                                >
                                  ←
                                </button>
                                <button
                                  type="button"
                                  onClick={() => movePhoto(index, 'down')}
                                  disabled={index === formData.photos.length - 1}
                                  className="text-gray-500 hover:text-gray-700 disabled:opacity-30 px-2 py-1 text-sm"
                                >
                                  →
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                className="text-red-500 hover:text-red-700 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-6 pt-6 border-t flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingId(null); setFormData(emptyForm); }}
                  className="px-6 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                  {editingId ? 'Update Album' : 'Create Album'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Albums Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <div key={album._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-40 bg-gray-100">
                {album.coverImage ? (
                  <Image src={album.coverImage} alt={album.title} fill className="object-cover" />
                ) : album.photos && album.photos.length > 0 ? (
                  <Image src={album.photos[0].url} alt={album.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  {!album.isPublished && (
                    <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">Draft</span>
                  )}
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">
                    {album.photos?.length || 0} photos
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-1">{album.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{album.category} • {new Date(album.date).toLocaleDateString()}</p>
                {album.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{album.description}</p>
                )}
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(album)} className="text-blue-600 text-sm hover:underline">Edit</button>
                  <button onClick={() => handleDelete(album._id)} className="text-red-600 text-sm hover:underline">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {albums.length === 0 && !showForm && (
          <div className="text-center py-16 bg-white rounded-xl shadow">
            <p className="text-gray-500 mb-4">No albums created yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-purple-600 hover:underline font-medium"
            >
              Create your first album
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
