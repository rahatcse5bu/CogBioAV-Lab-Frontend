'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { uploadToImgBB } from '@/lib/imgbb';

interface Education {
  degree: string;
  field: string;
  institution: string;
  year: string;
  thesis: string;
}

interface Experience {
  position: string;
  organization: string;
  startYear: string;
  endYear: string;
  description: string;
}

interface Award {
  title: string;
  organization: string;
  year: string;
  description: string;
}

interface Course {
  code: string;
  name: string;
  semester: string;
}

interface MemberForm {
  name: string;
  degree: string;
  award: string;
  description: string;
  type: string;
  email: string;
  title: string;
  department: string;
  institution: string;
  photo: string;
  phone: string;
  website: string;
  googleScholar: string;
  researchGate: string;
  linkedin: string;
  github: string;
  orcid: string;
  biography: string;
  researchInterests: string;
  education: Education[];
  experience: Experience[];
  selectedPublications: string;
  awards: Award[];
  skills: string;
  courses: Course[];
  status: string;
  joinDate: string;
  graduationDate: string;
  currentPosition: string;
  order: number;
}

const emptyForm: MemberForm = {
  name: '', degree: '', award: '', description: '', type: 'member',
  email: '', title: '', department: '', institution: '', photo: '',
  phone: '', website: '', googleScholar: '', researchGate: '', linkedin: '',
  github: '', orcid: '', biography: '', researchInterests: '', education: [],
  experience: [], selectedPublications: '', awards: [], skills: '', courses: [],
  status: 'active', joinDate: '', graduationDate: '', currentPosition: '', order: 0
};

export default function AdminMembers() {
  const [members, setMembers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState<MemberForm>(emptyForm);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch('/api/members');
    const data = await res.json();
    if (data.success) setMembers(data.data);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const imageUrl = await uploadToImgBB(file);
      if (imageUrl) {
        setFormData({ ...formData, photo: imageUrl });
      } else {
        alert('Failed to upload image.');
      }
    } catch (error) {
      alert('Failed to upload image.');
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert string fields to arrays before saving
    const dataToSave = {
      ...formData,
      researchInterests: formData.researchInterests.split(',').map(s => s.trim()).filter(s => s),
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      selectedPublications: formData.selectedPublications.split('\n').map(s => s.trim()).filter(s => s),
    };
    
    const url = editingId ? `/api/members/${editingId}` : '/api/members';
    await fetch(url, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSave),
    });
    fetchData();
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
    setActiveTab('basic');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this member?')) return;
    await fetch(`/api/members/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleEdit = (member: any) => {
    setFormData({
      name: member.name || '',
      degree: member.degree || '',
      award: member.award || '',
      description: member.description || '',
      type: member.type || 'member',
      email: member.email || '',
      title: member.title || '',
      department: member.department || '',
      institution: member.institution || '',
      photo: member.photo || '',
      phone: member.phone || '',
      website: member.website || '',
      googleScholar: member.googleScholar || '',
      researchGate: member.researchGate || '',
      linkedin: member.linkedin || '',
      github: member.github || '',
      orcid: member.orcid || '',
      biography: member.biography || '',
      researchInterests: Array.isArray(member.researchInterests) ? member.researchInterests.join(', ') : (member.researchInterests || ''),
      education: member.education || [],
      experience: member.experience || [],
      selectedPublications: Array.isArray(member.selectedPublications) ? member.selectedPublications.join('\n') : (member.selectedPublications || ''),
      awards: member.awards || [],
      skills: Array.isArray(member.skills) ? member.skills.join(', ') : (member.skills || ''),
      courses: member.courses || [],
      status: member.status || 'active',
      joinDate: member.joinDate ? member.joinDate.split('T')[0] : '',
      graduationDate: member.graduationDate ? member.graduationDate.split('T')[0] : '',
      currentPosition: member.currentPosition || '',
      order: member.order || 0
    });
    setEditingId(member._id);
    setShowForm(true);
    setActiveTab('basic');
  };

  // Helper functions for arrays
  const addEducation = () => setFormData({ ...formData, education: [...formData.education, { degree: '', field: '', institution: '', year: '', thesis: '' }] });
  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...formData.education];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, education: updated });
  };
  const removeEducation = (index: number) => setFormData({ ...formData, education: formData.education.filter((_, i) => i !== index) });

  const addExperience = () => setFormData({ ...formData, experience: [...formData.experience, { position: '', organization: '', startYear: '', endYear: '', description: '' }] });
  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = [...formData.experience];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, experience: updated });
  };
  const removeExperience = (index: number) => setFormData({ ...formData, experience: formData.experience.filter((_, i) => i !== index) });

  const addAward = () => setFormData({ ...formData, awards: [...formData.awards, { title: '', organization: '', year: '', description: '' }] });
  const updateAward = (index: number, field: keyof Award, value: string) => {
    const updated = [...formData.awards];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, awards: updated });
  };
  const removeAward = (index: number) => setFormData({ ...formData, awards: formData.awards.filter((_, i) => i !== index) });

  const addCourse = () => setFormData({ ...formData, courses: [...formData.courses, { code: '', name: '', semester: '' }] });
  const updateCourse = (index: number, field: keyof Course, value: string) => {
    const updated = [...formData.courses];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, courses: updated });
  };
  const removeCourse = (index: number) => setFormData({ ...formData, courses: formData.courses.filter((_, i) => i !== index) });

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'contact', label: 'Contact & Links' },
    { id: 'bio', label: 'Biography' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'research', label: 'Research' },
    { id: 'awards', label: 'Awards' },
    { id: 'teaching', label: 'Teaching' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold">Manage Members</h1>
            <Link href="/admin" className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm">Back</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData(emptyForm); setActiveTab('basic'); }} 
          className="mb-6 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
          {showForm ? 'Cancel' : '+ Add Member'}
        </button>

        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Member' : 'Add New Member'}</h2>
            
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Basic Info Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  {/* Photo Upload */}
                  <div className="flex items-start gap-4">
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50 flex items-center justify-center">
                      {formData.photo ? (
                        <Image src={formData.photo} alt="Preview" fill className="object-cover" />
                      ) : (
                        <span className="text-gray-400 text-xs">No photo</span>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
                      <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:bg-blue-300">
                        {uploading ? 'Uploading...' : 'Upload Photo'}
                      </button>
                      {formData.photo && (
                        <button type="button" onClick={() => setFormData({ ...formData, photo: '' })} className="text-red-600 text-sm">Remove</button>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2" placeholder="e.g., Assistant Professor" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Degree *</label>
                      <input value={formData.degree} onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2" placeholder="e.g., PhD, Computer Science" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Member Type</label>
                      <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2">
                        <option value="pi">Principal Investigator</option>
                        <option value="member">Current Member</option>
                        <option value="alumni">Alumni</option>
                        <option value="collaborator">Collaborator</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                      <input value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="graduated">Graduated</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                      <input type="date" value={formData.joinDate} onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                      <input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                        className="w-full border rounded-lg px-3 py-2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2" rows={3} required placeholder="Brief description shown on members list" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Award/Achievement Highlight</label>
                    <input value={formData.award} onChange={(e) => setFormData({ ...formData, award: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2" placeholder="Featured award or achievement" />
                  </div>

                  {formData.type === 'alumni' && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Date</label>
                        <input type="date" value={formData.graduationDate} onChange={(e) => setFormData({ ...formData, graduationDate: e.target.value })}
                          className="w-full border rounded-lg px-3 py-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Position</label>
                        <input value={formData.currentPosition} onChange={(e) => setFormData({ ...formData, currentPosition: e.target.value })}
                          className="w-full border rounded-lg px-3 py-2" placeholder="e.g., Data Scientist at Google" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Contact & Links Tab */}
              {activeTab === 'contact' && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Personal Website</label>
                    <input value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2" placeholder="https://" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Google Scholar</label>
                      <input value={formData.googleScholar} onChange={(e) => setFormData({ ...formData, googleScholar: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2" placeholder="Profile URL" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ResearchGate</label>
                      <input value={formData.researchGate} onChange={(e) => setFormData({ ...formData, researchGate: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2" placeholder="Profile URL" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                      <input value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                      <input value={formData.github} onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ORCID</label>
                      <input value={formData.orcid} onChange={(e) => setFormData({ ...formData, orcid: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2" placeholder="0000-0000-0000-0000" />
                    </div>
                  </div>
                </div>
              )}

              {/* Biography Tab */}
              {activeTab === 'bio' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Biography</label>
                    <textarea value={formData.biography} onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2" rows={10} placeholder="Detailed biography (HTML supported)" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                    <input value={formData.skills} 
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2" placeholder="Python, Machine Learning, TensorFlow" />
                  </div>
                </div>
              )}

              {/* Education Tab */}
              {activeTab === 'education' && (
                <div className="space-y-4">
                  {formData.education.map((edu, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600">Education #{index + 1}</span>
                        <button type="button" onClick={() => removeEducation(index)} className="text-red-500 text-sm">Remove</button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        <input placeholder="Degree (e.g., PhD)" value={edu.degree} onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                          className="border rounded px-3 py-2 text-sm" />
                        <input placeholder="Field of Study" value={edu.field} onChange={(e) => updateEducation(index, 'field', e.target.value)}
                          className="border rounded px-3 py-2 text-sm" />
                        <input placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                          className="border rounded px-3 py-2 text-sm" />
                        <input placeholder="Year" value={edu.year} onChange={(e) => updateEducation(index, 'year', e.target.value)}
                          className="border rounded px-3 py-2 text-sm" />
                      </div>
                      <input placeholder="Thesis Title (optional)" value={edu.thesis} onChange={(e) => updateEducation(index, 'thesis', e.target.value)}
                        className="w-full border rounded px-3 py-2 text-sm mt-3" />
                    </div>
                  ))}
                  <button type="button" onClick={addEducation} className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-gray-500 hover:border-purple-400 hover:text-purple-600">
                    + Add Education
                  </button>
                </div>
              )}

              {/* Experience Tab */}
              {activeTab === 'experience' && (
                <div className="space-y-4">
                  {formData.experience.map((exp, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600">Experience #{index + 1}</span>
                        <button type="button" onClick={() => removeExperience(index)} className="text-red-500 text-sm">Remove</button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        <input placeholder="Position/Title" value={exp.position} onChange={(e) => updateExperience(index, 'position', e.target.value)}
                          className="border rounded px-3 py-2 text-sm" />
                        <input placeholder="Organization" value={exp.organization} onChange={(e) => updateExperience(index, 'organization', e.target.value)}
                          className="border rounded px-3 py-2 text-sm" />
                        <input placeholder="Start Year" value={exp.startYear} onChange={(e) => updateExperience(index, 'startYear', e.target.value)}
                          className="border rounded px-3 py-2 text-sm" />
                        <input placeholder="End Year (or Present)" value={exp.endYear} onChange={(e) => updateExperience(index, 'endYear', e.target.value)}
                          className="border rounded px-3 py-2 text-sm" />
                      </div>
                      <textarea placeholder="Description" value={exp.description} onChange={(e) => updateExperience(index, 'description', e.target.value)}
                        className="w-full border rounded px-3 py-2 text-sm mt-3" rows={2} />
                    </div>
                  ))}
                  <button type="button" onClick={addExperience} className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-gray-500 hover:border-purple-400 hover:text-purple-600">
                    + Add Experience
                  </button>
                </div>
              )}

              {/* Research Tab */}
              {activeTab === 'research' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Research Interests (comma separated)</label>
                    <textarea value={formData.researchInterests}
                      onChange={(e) => setFormData({ ...formData, researchInterests: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2" rows={3} placeholder="Machine Learning, Deep Learning, Medical Imaging" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Selected Publications (one per line)</label>
                    <textarea value={formData.selectedPublications}
                      onChange={(e) => setFormData({ ...formData, selectedPublications: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2" rows={6} placeholder="Enter publication citations, one per line" />
                  </div>
                </div>
              )}

              {/* Awards Tab */}
              {activeTab === 'awards' && (
                <div className="space-y-4">
                  {formData.awards.map((award, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600">Award #{index + 1}</span>
                        <button type="button" onClick={() => removeAward(index)} className="text-red-500 text-sm">Remove</button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        <input placeholder="Award Title" value={award.title} onChange={(e) => updateAward(index, 'title', e.target.value)}
                          className="border rounded px-3 py-2 text-sm" />
                        <input placeholder="Organization" value={award.organization} onChange={(e) => updateAward(index, 'organization', e.target.value)}
                          className="border rounded px-3 py-2 text-sm" />
                        <input placeholder="Year" value={award.year} onChange={(e) => updateAward(index, 'year', e.target.value)}
                          className="border rounded px-3 py-2 text-sm" />
                      </div>
                      <textarea placeholder="Description" value={award.description} onChange={(e) => updateAward(index, 'description', e.target.value)}
                        className="w-full border rounded px-3 py-2 text-sm mt-3" rows={2} />
                    </div>
                  ))}
                  <button type="button" onClick={addAward} className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-gray-500 hover:border-purple-400 hover:text-purple-600">
                    + Add Award
                  </button>
                </div>
              )}

              {/* Teaching Tab */}
              {activeTab === 'teaching' && (
                <div className="space-y-4">
                  {formData.courses.map((course, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600">Course #{index + 1}</span>
                        <button type="button" onClick={() => removeCourse(index)} className="text-red-500 text-sm">Remove</button>
                      </div>
                      <div className="grid md:grid-cols-3 gap-3">
                        <input placeholder="Course Code" value={course.code} onChange={(e) => updateCourse(index, 'code', e.target.value)}
                          className="border rounded px-3 py-2 text-sm" />
                        <input placeholder="Course Name" value={course.name} onChange={(e) => updateCourse(index, 'name', e.target.value)}
                          className="border rounded px-3 py-2 text-sm" />
                        <input placeholder="Semester" value={course.semester} onChange={(e) => updateCourse(index, 'semester', e.target.value)}
                          className="border rounded px-3 py-2 text-sm" />
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={addCourse} className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-gray-500 hover:border-purple-400 hover:text-purple-600">
                    + Add Course
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-6 pt-6 border-t flex justify-end gap-3">
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setFormData(emptyForm); }}
                  className="px-6 py-2 rounded-lg border text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                  {editingId ? 'Update Member' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Members List */}
        <div className="grid gap-4">
          {members.map((member) => (
            <div key={member._id} className="bg-white rounded-lg shadow p-4 flex items-start gap-4">
              {member.photo ? (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={member.photo} alt={member.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-400 text-xs">No photo</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.title || member.degree}</p>
                    <div className="flex gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        member.type === 'pi' ? 'bg-green-100 text-green-700' : 
                        member.type === 'alumni' ? 'bg-orange-100 text-orange-700' :
                        member.type === 'collaborator' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {member.type === 'pi' ? 'PI' : member.type === 'alumni' ? 'Alumni' : member.type === 'collaborator' ? 'Collaborator' : 'Member'}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        member.status === 'active' ? 'bg-green-100 text-green-700' : 
                        member.status === 'graduated' ? 'bg-blue-100 text-blue-700' : 
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {member.status || 'active'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(member)} className="text-blue-600 text-sm hover:underline">Edit</button>
                    <button onClick={() => handleDelete(member._id)} className="text-red-600 text-sm hover:underline">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
