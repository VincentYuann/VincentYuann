import React, { useState, useEffect } from 'react';
import { X, Lock, CheckCircle2, AlertCircle, Trash2, LogOut, User, FolderKanban, Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/useAuth';
import type { FlagshipProject } from '../data/projects';
import type { ProfileData } from '../lib/useProfile';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: FlagshipProject[];
  profile?: ProfileData;
  onRefresh: () => void;
  onRefreshProfile?: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  projects,
  profile,
  onRefresh,
  onRefreshProfile,
}) => {
  const { user, isAdmin, signInWithGitHub, signInWithEmail, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'profile'>('projects');
  const [emailInput, setEmailInput] = useState('');
  const [authMsg, setAuthMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('new');
  
  // Project Form State
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [category, setCategory] = useState('Full-Stack Web App');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [highlightsText, setHighlightsText] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [stat1Label, setStat1Label] = useState('Latency');
  const [stat1Val, setStat1Val] = useState('<30ms');
  const [stat2Label, setStat2Label] = useState('Protocol');
  const [stat2Val, setStat2Val] = useState('WebSockets');
  const [stat3Label, setStat3Label] = useState('Database');
  const [stat3Val, setStat3Val] = useState('Postgres RLS');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [stoneAccent, setStoneAccent] = useState('#3894B3');
  const [isFlagship, setIsFlagship] = useState(true);
  const [detailsMarkdown, setDetailsMarkdown] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Profile Form State
  const [profName, setProfName] = useState(profile?.name || 'Vincent Yuann');
  const [profRole, setProfRole] = useState(profile?.role || 'Software & AI Engineer');
  const [profStatus, setProfStatus] = useState(profile?.status || 'Open to Full-Stack & AI Roles');
  const [profTagline, setProfTagline] = useState(profile?.tagline || '');
  const [profAbout, setProfAbout] = useState(profile?.about || '');
  const [profLocation, setProfLocation] = useState(profile?.location || 'New York, USA');
  const [profEmail, setProfEmail] = useState(profile?.email || '');
  const [profGithub, setProfGithub] = useState(profile?.github || 'https://github.com/VincentYuann');
  const [profLinkedin, setProfLinkedin] = useState(profile?.linkedin || 'https://linkedin.com/in/vincentyuann');

  useEffect(() => {
    if (profile) {
      setProfName(profile.name);
      setProfRole(profile.role);
      setProfStatus(profile.status);
      setProfTagline(profile.tagline);
      setProfAbout(profile.about);
      setProfLocation(profile.location);
      setProfEmail(profile.email);
      setProfGithub(profile.github);
      setProfLinkedin(profile.linkedin);
    }
  }, [profile]);

  if (!isOpen) return null;

  const handleSelectProject = (projId: string) => {
    setSelectedProjectId(projId);
    if (projId === 'new') {
      setId('');
      setTitle('');
      setCategory('Full-Stack Web App');
      setSubtitle('');
      setDescription('');
      setHighlightsText('');
      setTagsText('');
      setStat1Label('Latency');
      setStat1Val('<30ms');
      setStat2Label('Protocol');
      setStat2Val('WebSockets');
      setStat3Label('Database');
      setStat3Val('Postgres RLS');
      setGithubUrl('');
      setLiveUrl('');
      setImageUrl('');
      setIsFlagship(true);
      setDetailsMarkdown('');
      setStoneAccent('#3894B3');
      return;
    }

    const proj = projects.find((p) => p.id === projId);
    if (proj) {
      setId(proj.id);
      setTitle(proj.title);
      setCategory(proj.category);
      setSubtitle(proj.subtitle);
      setDescription(proj.description);
      setHighlightsText(proj.highlights?.join('\n') || '');
      setTagsText(proj.tags?.map((t) => t.name).join(', ') || '');
      setStat1Label(proj.stats?.[0]?.label || 'Metric 1');
      setStat1Val(proj.stats?.[0]?.value || '');
      setStat2Label(proj.stats?.[1]?.label || 'Metric 2');
      setStat2Val(proj.stats?.[1]?.value || '');
      setStat3Label(proj.stats?.[2]?.label || 'Metric 3');
      setStat3Val(proj.stats?.[2]?.value || '');
      setGithubUrl(proj.githubUrl || '');
      setLiveUrl(proj.liveUrl || '');
      setImageUrl(proj.imageUrl || '');
      setIsFlagship(proj.isFlagship ?? true);
      setDetailsMarkdown(proj.detailsMarkdown || '');
      setStoneAccent(proj.stoneAccent || '#3894B3');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `project-covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
      setImageUrl(data.publicUrl);
      setSaveStatus('Image uploaded to Supabase Storage!');
    } catch (err: any) {
      setSaveStatus(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProject = async () => {
    if (!id || !title) {
      setSaveStatus('Error: Project ID and Title are required.');
      return;
    }

    setSaveStatus('Saving to Supabase...');
    const highlights = highlightsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const tags = tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => ({ name: t, icon: t.toLowerCase().replace(/[^a-z0-9]/g, '') }));

    const stats = [
      { label: stat1Label, value: stat1Val },
      { label: stat2Label, value: stat2Val },
      { label: stat3Label, value: stat3Val },
    ].filter((s) => s.label && s.value);

    const record = {
      id: id.toLowerCase().replace(/\s+/g, '-'),
      title,
      subtitle,
      category,
      description,
      highlights,
      tags,
      stats,
      stone_accent: stoneAccent,
      github_url: githubUrl || null,
      live_url: liveUrl || null,
      image_url: imageUrl || null,
      is_flagship: isFlagship,
      details_markdown: detailsMarkdown || null,
      is_published: true,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('projects').upsert(record);
    if (error) {
      setSaveStatus(`Save failed: ${error.message}`);
    } else {
      setSaveStatus('Project saved successfully to Supabase Database!');
      onRefresh();
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleSaveProfile = async () => {
    setSaveStatus('Updating Profile Info in Supabase...');
    const record = {
      id: 'vincent',
      name: profName,
      role: profRole,
      status: profStatus,
      tagline: profTagline,
      about: profAbout,
      location: profLocation,
      email: profEmail,
      github: profGithub,
      linkedin: profLinkedin,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('profile_info').upsert(record);
    if (error) {
      setSaveStatus(`Profile update failed: ${error.message}`);
    } else {
      setSaveStatus('Profile updated successfully in Supabase!');
      onRefreshProfile?.();
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleDeleteProject = async () => {
    if (selectedProjectId === 'new') return;
    if (!window.confirm(`Are you sure you want to delete ${title}?`)) return;

    setSaveStatus('Deleting project...');
    const { error } = await supabase.from('projects').delete().eq('id', selectedProjectId);
    if (error) {
      setSaveStatus(`Delete failed: ${error.message}`);
    } else {
      setSaveStatus('Project deleted.');
      onRefresh();
      handleSelectProject('new');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white rounded-2xl border border-gray-300 shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-700" />
            <span className="font-mono text-sm font-bold text-gray-900">Supabase Admin Console</span>
          </div>

          <div className="flex items-center gap-3">
            {user && isAdmin && (
              <div className="flex items-center bg-gray-200/80 p-0.5 rounded-lg text-xs font-mono">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                    activeTab === 'projects' ? 'bg-white text-gray-900 shadow-xs font-bold' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FolderKanban className="w-3.5 h-3.5" />
                  <span>Projects</span>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                    activeTab === 'profile' ? 'bg-white text-gray-900 shadow-xs font-bold' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profile Info</span>
                </button>
              </div>
            )}
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700" title="Close (Esc)">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!user ? (
            /* Auth Login Box */
            <div className="max-w-md mx-auto py-8 text-center space-y-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                <Lock className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Sign in to edit portfolio</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Access is protected by Supabase Row-Level Security. Only authorized admin account can mutate data.
                </p>
              </div>

              {/* GitHub OAuth Button */}
              <button
                onClick={() => signInWithGitHub()}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-medium text-xs shadow-xs transition-colors cursor-pointer"
              >
                <span>Sign in with GitHub OAuth</span>
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-mono">Or Magic Link</span></div>
              </div>

              {/* Magic Link Email Form */}
              <div className="flex gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@example.com"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs font-mono focus:outline-none focus:border-gray-900"
                />
                <button
                  onClick={async () => {
                    if (!emailInput) return;
                    const { error } = await signInWithEmail(emailInput);
                    if (error) setAuthMsg({ type: 'error', text: error.message });
                    else setAuthMsg({ type: 'success', text: 'Check your email inbox for login link!' });
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-medium cursor-pointer"
                >
                  Send Link
                </button>
              </div>

              {authMsg && (
                <div className={`p-3 rounded-lg text-xs flex items-center gap-2 ${authMsg.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {authMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{authMsg.text}</span>
                </div>
              )}
            </div>
          ) : !isAdmin ? (
            /* Non-Admin Logged in */
            <div className="p-6 text-center space-y-4">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <h3 className="font-bold text-gray-900">Unauthorized Account</h3>
              <p className="text-xs text-gray-600">
                You are signed in as <strong>{user.email}</strong>. This account does not have administrator privileges to edit portfolio content.
              </p>
              <button onClick={signOut} className="px-4 py-2 bg-gray-900 text-white rounded text-xs">Sign Out</button>
            </div>
          ) : activeTab === 'projects' ? (
            /* Projects Tab */
            <div className="space-y-6">
              {/* Top Bar: User & Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-mono text-gray-700">Admin: <strong>{user.email}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedProjectId}
                    onChange={(e) => handleSelectProject(e.target.value)}
                    className="text-xs border border-gray-300 rounded px-2 py-1 bg-white font-mono"
                  >
                    <option value="new">+ Create New System / Milestone</option>
                    <optgroup label="All Projects (Flagships & River Pebbles)">
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.isFlagship ? '★ [Flagship]' : '• [Pebble]'} {p.title}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  <button onClick={signOut} title="Sign out" className="p-1.5 text-gray-500 hover:text-gray-900"><LogOut className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Flagship Toggle */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-xs">
                <label className="flex items-center gap-2 font-semibold text-[#1B2127] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFlagship}
                    onChange={(e) => setIsFlagship(e.target.checked)}
                    className="w-4 h-4 rounded text-[#3894B3] border-gray-300 focus:ring-[#3894B3]"
                  />
                  <span>Mark as Flagship Boulder (appears prominent on the main river stream)</span>
                </label>
                <span className="text-gray-500 text-[11px] ml-auto">
                  {isFlagship ? 'Displayed as Boulder' : 'Displayed as Riverbank Pebble'}
                </span>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="block text-gray-600 mb-1">Project ID (slug)</label>
                  <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="e.g. foodfinder"
                    className="w-full px-3 py-1.5 border border-gray-300 rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. FoodFinder"
                    className="w-full px-3 py-1.5 border border-gray-300 rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Real-Time Distributed System"
                    className="w-full px-3 py-1.5 border border-gray-300 rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Short punchy tagline"
                    className="w-full px-3 py-1.5 border border-gray-300 rounded bg-white"
                  />
                </div>
              </div>

              <div className="text-xs font-mono">
                <label className="block text-gray-600 mb-1">Description (Executive Problem Statement)</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded bg-white"
                  placeholder="Full project description..."
                />
              </div>

              <div className="text-xs font-mono">
                <label className="block text-gray-600 mb-1">Architecture Highlights (one per line)</label>
                <textarea
                  rows={3}
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded bg-white"
                  placeholder="Sub-30ms WebSocket sync...&#10;Prisma 7 migrations...&#10;Jenkins Docker CI/CD..."
                />
              </div>

              <div className="text-xs font-mono">
                <label className="block text-gray-600 mb-1">Longform Architectural Deep-Dive (Markdown)</label>
                <textarea
                  rows={5}
                  value={detailsMarkdown}
                  onChange={(e) => setDetailsMarkdown(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-white leading-relaxed"
                  placeholder="## Architecture Overview&#10;&#10;Detailed breakdown of design patterns, benchmarks, and lessons learned..."
                />
              </div>

              <div className="text-xs font-mono">
                <label className="block text-gray-600 mb-1">Tech Stack Tags (comma-separated)</label>
                <input
                  type="text"
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                  placeholder="React 19, Socket.IO, PostgreSQL, Prisma, Docker, Jenkins"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded bg-white"
                />
              </div>

              {/* Stats Inputs */}
              <div className="text-xs font-mono border-t border-gray-200 pt-3">
                <span className="block text-gray-600 mb-2 font-bold">Metrics Grid (Up to 3 Cells)</span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <input type="text" value={stat1Label} onChange={(e) => setStat1Label(e.target.value)} placeholder="Label 1" className="w-full mb-1 px-2 py-1 border border-gray-300 rounded text-[11px]" />
                    <input type="text" value={stat1Val} onChange={(e) => setStat1Val(e.target.value)} placeholder="Value 1" className="w-full px-2 py-1 border border-gray-300 rounded text-[11px] font-bold" />
                  </div>
                  <div>
                    <input type="text" value={stat2Label} onChange={(e) => setStat2Label(e.target.value)} placeholder="Label 2" className="w-full mb-1 px-2 py-1 border border-gray-300 rounded text-[11px]" />
                    <input type="text" value={stat2Val} onChange={(e) => setStat2Val(e.target.value)} placeholder="Value 2" className="w-full px-2 py-1 border border-gray-300 rounded text-[11px] font-bold" />
                  </div>
                  <div>
                    <input type="text" value={stat3Label} onChange={(e) => setStat3Label(e.target.value)} placeholder="Label 3" className="w-full mb-1 px-2 py-1 border border-gray-300 rounded text-[11px]" />
                    <input type="text" value={stat3Val} onChange={(e) => setStat3Val(e.target.value)} placeholder="Value 3" className="w-full px-2 py-1 border border-gray-300 rounded text-[11px] font-bold" />
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono border-t border-gray-200 pt-3">
                <div>
                  <label className="block text-gray-600 mb-1">GitHub URL</label>
                  <input type="text" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/VincentYuann/..." className="w-full px-3 py-1.5 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Live URL</label>
                  <input type="text" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} placeholder="https://..." className="w-full px-3 py-1.5 border border-gray-300 rounded" />
                </div>
              </div>

              {/* Supabase Storage Upload */}
              <div className="text-xs font-mono border-t border-gray-200 pt-3 space-y-2">
                <label className="block text-gray-600 font-bold">Screenshot / Diagram (Supabase Bucket: <code>portfolio-assets</code>)</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg cursor-pointer text-gray-700">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  {uploading && <span className="text-gray-500 animate-pulse">Uploading to Supabase...</span>}
                  {imageUrl && <span className="text-green-600 font-semibold">✓ Image Linked</span>}
                </div>
                {imageUrl && (
                  <div className="mt-2 p-2 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-3">
                    <img src={imageUrl} alt="Uploaded preview" className="w-16 h-12 object-cover rounded border border-gray-200" />
                    <span className="text-[11px] text-gray-600 truncate flex-1">{imageUrl}</span>
                    <button onClick={() => setImageUrl('')} className="text-red-500 text-xs hover:underline">Remove</button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Profile Tab */
            <div className="space-y-4 text-xs font-mono">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="font-bold text-gray-800">Dynamic Profile Information</span>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Stored securely in <code>public.profile_info</code>. Updates Hero header and Footer bio immediately.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profName}
                    onChange={(e) => setProfName(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Primary Role</label>
                  <input
                    type="text"
                    value={profRole}
                    onChange={(e) => setProfRole(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Status Pill</label>
                  <input
                    type="text"
                    value={profStatus}
                    onChange={(e) => setProfStatus(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Location</label>
                  <input
                    type="text"
                    value={profLocation}
                    onChange={(e) => setProfLocation(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Hero Tagline Headline</label>
                <input
                  type="text"
                  value={profTagline}
                  onChange={(e) => setProfTagline(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">About / Bio Paragraph</label>
                <textarea
                  rows={3}
                  value={profAbout}
                  onChange={(e) => setProfAbout(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-gray-200 pt-3">
                <div>
                  <label className="block text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    value={profEmail}
                    onChange={(e) => setProfEmail(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">GitHub Profile</label>
                  <input
                    type="text"
                    value={profGithub}
                    onChange={(e) => setProfGithub(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={profLinkedin}
                    onChange={(e) => setProfLinkedin(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {user && isAdmin && (
          <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            {saveStatus ? (
              <span className="text-xs font-mono text-gray-700">{saveStatus}</span>
            ) : <span />}
            <div className="flex items-center gap-3">
              {activeTab === 'projects' ? (
                <>
                  {selectedProjectId !== 'new' && (
                    <button onClick={handleDeleteProject} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  )}
                  <button onClick={handleSaveProject} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium cursor-pointer shadow-xs">
                    <span>Save Project</span>
                  </button>
                </>
              ) : (
                <button onClick={handleSaveProfile} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium cursor-pointer shadow-xs">
                  <span>Save Profile Info</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
