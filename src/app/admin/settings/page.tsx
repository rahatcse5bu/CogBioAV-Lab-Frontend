'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { uploadToImgBB } from '@/lib/imgbb';

interface SocialLink {
  id: string;
  label: string;
  url: string;
  openInNewTab: boolean;
}

export default function AdminSettings() {
  const [logo, setLogo] = useState('');
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [avColor, setAvColor] = useState('text-blue-400');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('logo');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const colorOptions = [
    { label: 'Blue', value: 'text-blue-400' },
    { label: 'Orange', value: 'text-orange-500' },
    { label: 'Green', value: 'text-green-400' },
    { label: 'Red', value: 'text-red-500' },
    { label: 'Pink', value: 'text-pink-400' },
    { label: 'Purple', value: 'text-purple-400' },
    { label: 'Yellow', value: 'text-yellow-400' },
    { label: 'Cyan', value: 'text-cyan-400' },
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success) {
        if (data.data.logo) setLogo(data.data.logo);
        if (data.data.socialLinks) setSocialLinks(data.data.socialLinks);
        if (data.data.avColor) setAvColor(data.data.avColor);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadToImgBB(file);
      if (imageUrl) {
        setLogo(imageUrl);
      } else {
        alert('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
    }
    setUploading(false);
  };

  const handleSaveLogo = async () => {
    setSaving(true);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'logo', value: logo }),
      });
      alert('Logo saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save logo. Please try again.');
    }
    setSaving(false);
  };

  // Social Links Functions
  const addSocialLink = () => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      label: '',
      url: '',
      openInNewTab: true,
    };
    setSocialLinks([...socialLinks, newLink]);
  };

  const updateSocialLink = (id: string, field: keyof SocialLink, value: string | boolean) => {
    setSocialLinks(socialLinks.map(link =>
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const removeSocialLink = (id: string) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  const moveSocialLink = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === socialLinks.length - 1)) return;
    const newLinks = [...socialLinks];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newLinks[index], newLinks[swapIndex]] = [newLinks[swapIndex], newLinks[index]];
    setSocialLinks(newLinks);
  };

  const handleSaveSocialLinks = async () => {
    setSaving(true);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'socialLinks', value: socialLinks }),
      });
      alert('Social links saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save social links. Please try again.');
    }
    setSaving(false);
  };

  const handleSaveAvColor = async () => {
    setSaving(true);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'avColor', value: avColor }),
      });
      alert('Header color saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save header color. Please try again.');
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold">Site Settings</h1>
            <Link href="/admin" className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm sm:text-base">
              Back
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('logo')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'logo' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
          >
            Logo
          </button>
          <button
            onClick={() => setActiveTab('header')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'header' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
          >
            Header Format
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'social' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
          >
            Social Links
          </button>
        </div>

        {/* Logo Tab */}
        {activeTab === 'logo' && (
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Lab Logo</h2>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Logo Preview */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-indigo-200 shadow-lg bg-gray-100 flex items-center justify-center">
                {logo ? (
                  <Image src={logo} alt="Lab Logo" fill className="object-cover" />
                ) : (
                  <span className="text-gray-400 text-sm text-center px-2">No logo uploaded</span>
                )}
              </div>

              {/* Upload Controls */}
              <div className="flex flex-col gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                >
                  {uploading ? 'Uploading...' : 'Upload New Logo'}
                </button>
                {logo && (
                  <button
                    type="button"
                    onClick={() => setLogo('')}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Remove Logo
                  </button>
                )}
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleSaveLogo}
                disabled={saving}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-colors font-medium"
              >
                {saving ? 'Saving...' : 'Save Logo'}
              </button>
            </div>

            {/* Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Tip:</strong> For best results, use a square image (e.g., 200x200 pixels).
                The logo will appear in the navigation bar on all pages.
              </p>
            </div>
          </div>
        )}

        {/* Header Format Tab */}
        {activeTab === 'header' && (
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Header Formatting</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">AV Color</label>
                <p className="text-sm text-gray-600 mb-4">Select the color for &quot;AV&quot; in the header &quot;Cog-BioAV Lab&quot;</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setAvColor(color.value)}
                      className={`p-4 rounded-lg border-2 transition-all ${avColor === color.value
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded ${color.value}`}></div>
                        <span className="text-sm font-medium text-gray-700">{color.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs font-semibold text-gray-600 uppercase mb-3">Preview</p>
                <h3 className="text-lg sm:text-xl font-bold tracking-wide">
                  Cog-Bio<span className={avColor}>AV</span> Lab
                </h3>
              </div>

              {/* Save Button */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={handleSaveAvColor}
                  disabled={saving}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-colors font-medium"
                >
                  {saving ? 'Saving...' : 'Save Header Color'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Social Links Tab */}
        {activeTab === 'social' && (
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Social Links</h2>
              <button
                onClick={addSocialLink}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                + Add Link
              </button>
            </div>

            {socialLinks.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-4">No social links added yet.</p>
                <button
                  onClick={addSocialLink}
                  className="text-purple-600 hover:underline font-medium"
                >
                  Add your first social link
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <div key={link.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className="text-sm font-medium text-gray-600 bg-white px-2 py-1 rounded">
                        #{index + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => moveSocialLink(index, 'up')}
                          disabled={index === 0}
                          className="text-gray-500 hover:text-gray-700 disabled:opacity-30 p-1"
                          title="Move up"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => moveSocialLink(index, 'down')}
                          disabled={index === socialLinks.length - 1}
                          className="text-gray-500 hover:text-gray-700 disabled:opacity-30 p-1"
                          title="Move down"
                        >
                          ▼
                        </button>
                        <button
                          onClick={() => removeSocialLink(link.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Label *</label>
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => updateSocialLink(link.id, 'label', e.target.value)}
                          placeholder="e.g., YouTube, LinkedIn"
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL *</label>
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                          placeholder="https://..."
                          className="w-full border rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={link.openInNewTab}
                          onChange={(e) => updateSocialLink(link.id, 'openInNewTab', e.target.checked)}
                          className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">Open in new tab</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleSaveSocialLinks}
                disabled={saving}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-colors font-medium"
              >
                {saving ? 'Saving...' : 'Save Social Links'}
              </button>
            </div>

            {/* Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Tip:</strong> Social links will appear in the navigation bar under a &quot;Social&quot; dropdown menu.
                You can reorder them using the arrow buttons.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
