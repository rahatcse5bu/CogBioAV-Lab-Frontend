'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ResearchArea {
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface HomepageData {
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutContent: string[];
  researchTitle: string;
  researchAreas: ResearchArea[];
  contactTitle: string;
  contactEmail: string;
  contactLocation: string[];
  piName: string;
  piTitle: string;
  department: string;
  footerText: string;
}

const defaultData: HomepageData = {
  heroTitle: 'Cog-Bio',
  heroHighlight: 'AV',
  heroSubtitle: 'Cognitive Audio-Visual Biomedical Research Laboratory',
  aboutTitle: 'About the Laboratory',
  aboutContent: [
    'The <strong>Cognitive Audio-Visual Biomedical Research Laboratory (CogBioAV Lab)</strong> conducts collaborative and interdisciplinary research on audio-based, video-based, and integrated audio–video signal analysis for biomedical and healthcare applications.',
    'Our mission is to develop intelligent, reliable, and clinically relevant technologies through collaboration with academic, clinical, and industry partners.'
  ],
  researchTitle: 'Research Focus Areas',
  researchAreas: [
    { title: 'Audio Signal Processing', description: 'Analysis of respiratory sounds, heart sounds, speech signals, and acoustic biomarkers.', icon: 'audio', color: 'blue' },
    { title: 'Video Analysis', description: 'Patient monitoring, movement analysis, facial expression recognition.', icon: 'video', color: 'purple' },
    { title: 'Multimodal Fusion', description: 'Integration of audio and visual information for enhanced diagnostics.', icon: 'data', color: 'orange' }
  ],
  contactTitle: 'Contact Information',
  contactEmail: 'mmenoor@bu.ac.bd',
  contactLocation: ['Department of Computer Science & Engineering', 'University of Barishal', 'Kornakathi, Barishal, Bangladesh'],
  piName: 'Md Mahbub E Noor',
  piTitle: 'Assistant Professor',
  department: 'Computer Science & Engineering',
  footerText: 'University of Barishal'
};

export default function AdminHomepage() {
  const [data, setData] = useState<HomepageData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/homepage');
      const result = await res.json();
      if (result.success && result.data) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching homepage data:', error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.success) {
        alert('Homepage updated successfully!');
      } else {
        alert('Failed to update homepage');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save changes');
    }
    setSaving(false);
  };

  const updateResearchArea = (index: number, field: keyof ResearchArea, value: string) => {
    const updated = [...data.researchAreas];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, researchAreas: updated });
  };

  const addResearchArea = () => {
    setData({
      ...data,
      researchAreas: [...data.researchAreas, { title: '', description: '', icon: 'audio', color: 'blue' }]
    });
  };

  const removeResearchArea = (index: number) => {
    setData({
      ...data,
      researchAreas: data.researchAreas.filter((_, i) => i !== index)
    });
  };

  const updateAboutContent = (index: number, value: string) => {
    const updated = [...data.aboutContent];
    updated[index] = value;
    setData({ ...data, aboutContent: updated });
  };

  const addAboutParagraph = () => {
    setData({ ...data, aboutContent: [...data.aboutContent, ''] });
  };

  const removeAboutParagraph = (index: number) => {
    setData({ ...data, aboutContent: data.aboutContent.filter((_, i) => i !== index) });
  };

  const updateLocation = (index: number, value: string) => {
    const updated = [...data.contactLocation];
    updated[index] = value;
    setData({ ...data, contactLocation: updated });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const tabs = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'about', label: 'About' },
    { id: 'research', label: 'Research Areas' },
    { id: 'contact', label: 'Contact' },
    { id: 'footer', label: 'Footer' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold">Edit Homepage</h1>
            <div className="flex gap-3">
              <Link href="/" target="_blank" className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-500">
                Preview
              </Link>
              <Link href="/admin" className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Hero Section */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Hero Section</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title (before highlight)</label>
                  <input
                    type="text"
                    value={data.heroTitle}
                    onChange={e => setData({ ...data, heroTitle: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Cog-Bio"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Highlighted Text</label>
                  <input
                    type="text"
                    value={data.heroHighlight}
                    onChange={e => setData({ ...data, heroHighlight: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="AV"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={data.heroSubtitle}
                  onChange={e => setData({ ...data, heroSubtitle: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Cognitive Audio-Visual Biomedical Research Laboratory"
                />
              </div>

              {/* Preview */}
              <div className="mt-6 p-4 bg-gradient-to-r from-gray-900 via-blue-900 to-black rounded-lg">
                <div className="text-center py-8">
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {data.heroTitle}<span className="text-blue-400">{data.heroHighlight}</span>
                  </h1>
                  <p className="text-gray-200">{data.heroSubtitle}</p>
                </div>
              </div>
            </div>
          )}

          {/* About Section */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-2">About Section</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                <input
                  type="text"
                  value={data.aboutTitle}
                  onChange={e => setData({ ...data, aboutTitle: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Content Paragraphs</label>
                  <button
                    onClick={addAboutParagraph}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    + Add Paragraph
                  </button>
                </div>
                {data.aboutContent.map((paragraph, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex gap-2">
                      <textarea
                        value={paragraph}
                        onChange={e => updateAboutContent(index, e.target.value)}
                        className="flex-1 border rounded-lg px-3 py-2 min-h-[100px]"
                        placeholder="Enter paragraph (HTML supported for <strong>, <em>, etc.)"
                      />
                      {data.aboutContent.length > 1 && (
                        <button
                          onClick={() => removeAboutParagraph(index)}
                          className="text-red-500 hover:text-red-700 px-2"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Research Areas */}
          {activeTab === 'research' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Research Focus Areas</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                <input
                  type="text"
                  value={data.researchTitle}
                  onChange={e => setData({ ...data, researchTitle: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div className="space-y-4">
                {data.researchAreas.map((area, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm font-medium text-gray-500">Research Area #{index + 1}</span>
                      <button
                        onClick={() => removeResearchArea(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                        <input
                          type="text"
                          value={area.title}
                          onChange={e => updateResearchArea(index, 'title', e.target.value)}
                          className="w-full border rounded px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Color</label>
                        <select
                          value={area.color}
                          onChange={e => updateResearchArea(index, 'color', e.target.value)}
                          className="w-full border rounded px-3 py-2 text-sm"
                        >
                          <option value="blue">Blue</option>
                          <option value="purple">Purple</option>
                          <option value="orange">Orange</option>
                          <option value="green">Green</option>
                          <option value="red">Red</option>
                          <option value="cyan">Cyan</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                      <textarea
                        value={area.description}
                        onChange={e => updateResearchArea(index, 'description', e.target.value)}
                        className="w-full border rounded px-3 py-2 text-sm"
                        rows={2}
                      />
                    </div>
                    <div className="mt-3">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Icon Type</label>
                      <select
                        value={area.icon}
                        onChange={e => updateResearchArea(index, 'icon', e.target.value)}
                        className="w-full border rounded px-3 py-2 text-sm"
                      >
                        <option value="audio">Audio</option>
                        <option value="video">Video</option>
                        <option value="data">Data/Fusion</option>
                        <option value="brain">Brain/AI</option>
                        <option value="heart">Heart/Medical</option>
                      </select>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addResearchArea}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  + Add Research Area
                </button>
              </div>
            </div>
          )}

          {/* Contact Section */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Contact Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                <input
                  type="text"
                  value={data.contactTitle}
                  onChange={e => setData({ ...data, contactTitle: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={data.contactEmail}
                    onChange={e => setData({ ...data, contactEmail: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={data.department}
                    onChange={e => setData({ ...data, department: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PI Name</label>
                  <input
                    type="text"
                    value={data.piName}
                    onChange={e => setData({ ...data, piName: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PI Title</label>
                  <input
                    type="text"
                    value={data.piTitle}
                    onChange={e => setData({ ...data, piTitle: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location (one line per field)</label>
                {data.contactLocation.map((line, index) => (
                  <input
                    key={index}
                    type="text"
                    value={line}
                    onChange={e => updateLocation(index, e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 mb-2"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Footer Section */}
          {activeTab === 'footer' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Footer</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Footer Text (appears under lab name)</label>
                <input
                  type="text"
                  value={data.footerText}
                  onChange={e => setData({ ...data, footerText: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              {/* Preview */}
              <div className="mt-6 p-4 bg-gradient-to-r from-gray-900 via-blue-900 to-black rounded-lg">
                <div className="flex justify-between items-center text-white">
                  <div>
                    <p className="font-bold text-xl">{data.heroTitle}<span className="text-blue-400">{data.heroHighlight}</span> Lab</p>
                    <p className="text-gray-300 text-sm">{data.footerText}</p>
                  </div>
                  <div className="text-right text-gray-300 text-sm">
                    <p>© 2026 CogBioAV Laboratory</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-colors font-medium"
            >
              {saving ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
