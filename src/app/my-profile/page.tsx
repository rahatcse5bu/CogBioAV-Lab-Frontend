'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Member {
  _id: string;
  name: string;
  degree: string;
  award: string;
  description: string;
  type: string;
  image: string;
  email: string;
  phone: string;
  office: string;
  research: string;
  socialLinks: { label: string; url: string }[];
}

interface CurrentUser {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'member' | 'super_admin';
  memberId: string | null;
}

const IMGBB_API_KEY = '8dc087e2ff84abdb4021d6eb977ba589';

export default function MyProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/login');
      const data = await res.json();
      
      if (!data.success || !data.user) {
        router.push('/admin/login');
        return;
      }
      
      setUser(data.user);
      
      // If user is a member with linked profile, fetch member data
      if (data.user.memberId) {
        const memberRes = await fetch(`/api/members/${data.user.memberId}`);
        const memberData = await memberRes.json();
        if (memberData.success) {
          setMember(memberData.data);
        }
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      router.push('/admin/login');
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const handleLogout = async () => {
    await fetch('/api/auth/login', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !member) return;
    
    setUploadingImage(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setMember({ ...member, image: data.data.url });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    setUploadingImage(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;
    
    setSaving(true);
    try {
      const res = await fetch(`/api/members/${member._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
      });
      
      const data = await res.json();
      if (data.success) {
        alert('Profile updated successfully!');
      } else {
        alert(data.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('An error occurred while saving');
    }
    setSaving(false);
  };

  const addSocialLink = () => {
    if (!member) return;
    setMember({
      ...member,
      socialLinks: [...(member.socialLinks || []), { label: '', url: '' }],
    });
  };

  const removeSocialLink = (index: number) => {
    if (!member) return;
    const newLinks = [...(member.socialLinks || [])];
    newLinks.splice(index, 1);
    setMember({ ...member, socialLinks: newLinks });
  };

  const updateSocialLink = (index: number, field: 'label' | 'url', value: string) => {
    if (!member) return;
    const newLinks = [...(member.socialLinks || [])];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setMember({ ...member, socialLinks: newLinks });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Show access to admin for admin/super_admin users
  if (user.role === 'admin' || user.role === 'super_admin') {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Welcome, {user.name}</h1>
                <p className="text-gray-300 text-sm mt-1">You have admin access</p>
              </div>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <p className="text-gray-600 mb-6">As an admin, you have full access to the admin dashboard.</p>
          <Link href="/admin" className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700">
            Go to Admin Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Member users without linked profile
  if (!user.memberId || !member) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Welcome, {user.name}</h1>
                <p className="text-gray-300 text-sm mt-1">{user.email}</p>
              </div>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-lg font-medium text-yellow-800 mb-2">No Profile Linked</h2>
            <p className="text-yellow-700">Your account is not linked to a member profile yet. Please contact the administrator.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">My Profile</h1>
              <p className="text-gray-300 text-sm mt-1">Edit your public profile information</p>
            </div>
            <div className="flex gap-3">
              <Link href="/" className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm">View Site</Link>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Profile Photo</h2>
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                {member.image ? (
                  <Image src={member.image} alt={member.name} className="w-full h-full object-cover" width={128} height={128} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Photo</div>
                )}
              </div>
              <div>
                <label className="cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 inline-block">
                  {uploadingImage ? 'Uploading...' : 'Change Photo'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">Recommended: Square image, at least 300x300px</p>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Basic Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  value={member.name}
                  onChange={(e) => setMember({ ...member, name: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={member.email || ''}
                  onChange={(e) => setMember({ ...member, email: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree / Position</label>
                <input
                  value={member.degree || ''}
                  onChange={(e) => setMember({ ...member, degree: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="e.g., PhD Student, Research Associate"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Award / Achievement</label>
                <input
                  value={member.award || ''}
                  onChange={(e) => setMember({ ...member, award: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  value={member.phone || ''}
                  onChange={(e) => setMember({ ...member, phone: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Office Location</label>
                <input
                  value={member.office || ''}
                  onChange={(e) => setMember({ ...member, office: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Room 123, Building A"
                />
              </div>
            </div>
          </div>

          {/* Research & Description */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Research & Bio</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Research Interests</label>
                <input
                  value={member.research || ''}
                  onChange={(e) => setMember({ ...member, research: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Machine Learning, Computer Vision, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Description</label>
                <textarea
                  value={member.description || ''}
                  onChange={(e) => setMember({ ...member, description: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  rows={4}
                  placeholder="Write a brief bio about yourself..."
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Social / Academic Links</h2>
              <button
                type="button"
                onClick={addSocialLink}
                className="text-sm text-purple-600 hover:underline"
              >
                + Add Link
              </button>
            </div>

            {(!member.socialLinks || member.socialLinks.length === 0) ? (
              <p className="text-gray-500 text-sm">No social links added yet.</p>
            ) : (
              <div className="space-y-3">
                {member.socialLinks.map((link, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      value={link.label}
                      onChange={(e) => updateSocialLink(index, 'label', e.target.value)}
                      placeholder="Label (e.g., Google Scholar)"
                      className="flex-1 border rounded-lg px-3 py-2 text-sm"
                    />
                    <input
                      value={link.url}
                      onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                      placeholder="URL"
                      className="flex-[2] border rounded-lg px-3 py-2 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeSocialLink(index)}
                      className="text-red-600 hover:text-red-700 px-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
