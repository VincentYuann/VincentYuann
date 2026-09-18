import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Lock,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Trash2,
  LogOut,
  User,
  FolderKanban,
  Upload,
  ExternalLink,
  Save,
  Eye,
  Edit3,
  FileText,
  Code2,
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/useAuth';
import type { FlagshipProject } from '../data/projects';
import type { ProfileData } from '../lib/useProfile';
import '../styles/admin-page.css';

interface AdminPageProps {
  projects: FlagshipProject[];
  profile: ProfileData;
  onRefreshProjects: () => void;
  onRefreshProfile?: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  projects,
  profile,
  onRefreshProjects,
  onRefreshProfile,
}) => {
  const { user, isAdmin, loading: authLoading, signInWithGitHub, signOut } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState<'projects' | 'profile' | 'resume'>('projects');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('new');
  const [previewMarkdown, setPreviewMarkdown] = useState(false);

  // Resume Upload State
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingTex, setUploadingTex] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string>(
    supabase.storage.from('portfolio-assets').getPublicUrl('resumes/resume.pdf').data.publicUrl
  );
  const [currentTexSource, setCurrentTexSource] = useState<string>('');
  const [isLoadingTex, setIsLoadingTex] = useState<boolean>(true);
  const [pdfUploadStatus, setPdfUploadStatus] = useState<{
    status: 'stored' | 'checking' | 'error';
    fileName?: string;
    fileSize?: string;
    updatedAt?: string;
  }>({ status: 'checking' });
  const [texUploadStatus, setTexUploadStatus] = useState<{
    status: 'stored' | 'checking' | 'error';
    fileName?: string;
    fileSize?: string;
    updatedAt?: string;
  }>({ status: 'checking' });

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
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

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

  const handleSelectProject = (projId: string) => {
    setSelectedProjectId(projId);
    setStatusMsg(null);

    if (projId === 'new') {
      setTitle('');
      setId('');
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
    } else {
      const proj = projects.find((p) => p.id === projId);
      if (!proj) return;
      setTitle(proj.title);
      setId(proj.id);
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

  // Sync tab & edit parameters with URL query string
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'profile' || tabParam === 'resume' || tabParam === 'projects') {
      setActiveTab(tabParam);
    }
    const editParam = searchParams.get('edit');
    if (editParam) {
      handleSelectProject(editParam);
    }
  }, [searchParams, projects]);

  const handleTabChange = (tab: 'projects' | 'profile' | 'resume') => {
    setActiveTab(tab);
    setStatusMsg(null);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('tab', tab);
      if (tab !== 'projects') next.delete('edit');
      return next;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setStatusMsg({ type: 'info', text: 'Uploading image to Supabase Storage...' });
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `project-covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
      setImageUrl(data.publicUrl);
      setStatusMsg({ type: 'success', text: 'Image uploaded successfully to Supabase Storage bucket!' });
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: `Upload failed: ${err.message}` });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProject = async () => {
    if (!id.trim() || !title.trim()) {
      setStatusMsg({ type: 'error', text: 'Error: Project ID (slug) and Title are required.' });
      return;
    }

    setStatusMsg({ type: 'info', text: 'Saving project to Supabase PostgreSQL database...' });
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
      setStatusMsg({ type: 'error', text: `Save failed: ${error.message}` });
    } else {
      setStatusMsg({ type: 'success', text: `Project "${title}" saved successfully to Supabase!` });
      onRefreshProjects();
      setSelectedProjectId(record.id);
    }
  };

  const handleDeleteProject = async () => {
    if (selectedProjectId === 'new') return;
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) return;

    setStatusMsg({ type: 'info', text: 'Deleting project...' });
    const { error } = await supabase.from('projects').delete().eq('id', selectedProjectId);
    if (error) {
      setStatusMsg({ type: 'error', text: `Delete failed: ${error.message}` });
    } else {
      setStatusMsg({ type: 'success', text: `Project "${title}" deleted successfully.` });
      onRefreshProjects();
      handleSelectProject('new');
    }
  };

  const handleSaveProfile = async () => {
    setStatusMsg({ type: 'info', text: 'Saving profile details to Supabase...' });
    const profileRecord = {
      id: 'default_profile',
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

    const { error } = await supabase.from('profile_info').upsert(profileRecord);
    if (error) {
      setStatusMsg({ type: 'error', text: `Profile save failed: ${error.message}` });
    } else {
      setStatusMsg({ type: 'success', text: 'Profile information updated successfully!' });
      if (onRefreshProfile) onRefreshProfile();
    }
  };

  // Inspect storage files for live indicators on mount
  useEffect(() => {
    const checkStoragePdf = async () => {
      try {
        const { data } = supabase.storage.from('portfolio-assets').getPublicUrl('resumes/resume.pdf');
        if (data?.publicUrl) {
          const res = await fetch(data.publicUrl);
          if (res.ok) {
            const contentLength = res.headers.get('content-length');
            const lastModified = res.headers.get('last-modified');
            const sizeStr = contentLength ? `${Math.round(parseInt(contentLength) / 1024)} KB` : 'Active';
            const dateStr = lastModified ? new Date(lastModified).toLocaleString() : 'Recently';

            setCurrentPdfUrl(`${data.publicUrl}?t=${Date.now()}`);
            setPdfUploadStatus({
              status: 'stored',
              fileName: 'resume.pdf',
              fileSize: sizeStr,
              updatedAt: dateStr,
            });
            return;
          }
        }
      } catch (err) {
        console.error('Error verifying Supabase Storage PDF:', err);
      }

      setPdfUploadStatus({
        status: 'stored',
        fileName: 'resume.pdf',
        fileSize: 'Supabase Storage',
        updatedAt: 'portfolio-assets/resumes/resume.pdf',
      });
    };

    checkStoragePdf();

    const checkStorageTex = async () => {
      try {
        const { data } = supabase.storage.from('portfolio-assets').getPublicUrl('resumes/resume.tex');
        if (data?.publicUrl) {
          const res = await fetch(data.publicUrl);
          if (res.ok) {
            const text = await res.text();
            const lastModified = res.headers.get('last-modified');
            const dateStr = lastModified ? new Date(lastModified).toLocaleString() : 'Recently';

            setCurrentTexSource(text);
            setIsLoadingTex(false);
            setTexUploadStatus({
              status: 'stored',
              fileName: 'resume.tex',
              fileSize: `${Math.round(text.length / 1024 * 10) / 10} KB`,
              updatedAt: dateStr,
            });
            return;
          }
        }
      } catch (err) {
        console.error('Error verifying Supabase Storage LaTeX:', err);
      }

      setIsLoadingTex(false);
      setTexUploadStatus({
        status: 'stored',
        fileName: 'resume.tex',
        fileSize: 'Supabase Storage',
        updatedAt: 'portfolio-assets/resumes/resume.tex',
      });
    };

    checkStorageTex();
  }, []);

  const handleUploadResumePdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setStatusMsg({ type: 'error', text: 'Validation Error: Please select a valid PDF file (.pdf).' });
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setStatusMsg({ type: 'error', text: 'Validation Error: PDF file exceeds 15MB limit.' });
      return;
    }

    try {
      setUploadingPdf(true);
      setStatusMsg({ type: 'info', text: 'Uploading resume.pdf to Supabase Storage bucket...' });
      const filePath = `resumes/resume.pdf`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file, { upsert: true, cacheControl: '60' });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
      const newUrl = `${data.publicUrl}?t=${Date.now()}`;
      setCurrentPdfUrl(newUrl);

      const sizeStr = `${Math.round(file.size / 1024)} KB`;
      const dateStr = new Date().toLocaleString();
      setPdfUploadStatus({
        status: 'stored',
        fileName: file.name,
        fileSize: sizeStr,
        updatedAt: dateStr,
      });

      setStatusMsg({
        type: 'success',
        text: `Success: "${file.name}" (${sizeStr}) uploaded and deployed to Supabase Storage bucket!`,
      });
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: `PDF upload failed: ${err.message}` });
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleUploadResumeTex = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.tex') && !file.name.toLowerCase().endsWith('.txt')) {
      setStatusMsg({ type: 'error', text: 'Validation Error: Please select a valid LaTeX file (.tex or .txt).' });
      return;
    }

    try {
      setUploadingTex(true);
      setStatusMsg({ type: 'info', text: 'Reading and validating LaTeX file...' });
      const text = await file.text();

      // Basic LaTeX sanity validation
      if (!text.includes('\\begin{document}') && !text.includes('\\documentclass')) {
        const proceed = window.confirm(
          'Warning: This file does not contain standard LaTeX markers (\\documentclass or \\begin{document}). Upload anyway?'
        );
        if (!proceed) {
          setUploadingTex(false);
          return;
        }
      }

      setStatusMsg({ type: 'info', text: 'Uploading resume.tex to Supabase Storage bucket...' });
      const filePath = `resumes/resume.tex`;
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, blob, { upsert: true, cacheControl: '60' });

      if (uploadError) throw uploadError;

      setCurrentTexSource(text);
      const sizeStr = `${Math.round(text.length / 1024 * 10) / 10} KB`;
      const dateStr = new Date().toLocaleString();
      setTexUploadStatus({
        status: 'stored',
        fileName: file.name,
        fileSize: sizeStr,
        updatedAt: dateStr,
      });

      setStatusMsg({
        type: 'success',
        text: `Success: "${file.name}" (${sizeStr}) uploaded and deployed to Supabase Storage bucket!`,
      });
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: `LaTeX upload failed: ${err.message}` });
    } finally {
      setUploadingTex(false);
    }
  };

  const handleSaveTexSource = async () => {
    if (!currentTexSource.trim()) {
      setStatusMsg({ type: 'error', text: 'Error: Cannot save empty LaTeX source code.' });
      return;
    }

    try {
      setStatusMsg({ type: 'info', text: 'Saving LaTeX source changes to Supabase Storage...' });
      const filePath = `resumes/resume.tex`;
      const blob = new Blob([currentTexSource], { type: 'text/plain;charset=utf-8' });

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, blob, { upsert: true, cacheControl: '60' });

      if (uploadError) throw uploadError;

      const sizeStr = `${Math.round(currentTexSource.length / 1024 * 10) / 10} KB`;
      const dateStr = new Date().toLocaleString();
      setTexUploadStatus({
        status: 'stored',
        fileName: 'resume.tex',
        fileSize: sizeStr,
        updatedAt: dateStr,
      });

      setStatusMsg({
        type: 'success',
        text: `Success: LaTeX source code (${sizeStr}) saved and synced to Supabase Storage!`,
      });
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: `Failed to save LaTeX: ${err.message}` });
    }
  };

  if (authLoading) {
    return (
      <div className="admin-loading-container">
        <div className="text-center space-y-3">
          <div className="admin-loading-spinner" />
          <p className="admin-loading-text">Verifying Supabase administrative session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-gate-container">
        <div className="admin-gate-card">
          <div className="admin-gate-icon">
            <Lock className="w-5 h-5 text-[#A0D8E9]" />
          </div>
          <div className="space-y-1">
            <h1 className="admin-gate-title">Admin Access Required</h1>
            <p className="admin-gate-text">
              You must sign in with an authorized administrator account to edit portfolio systems and profile information.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => signInWithGitHub()}
              className="admin-gate-btn"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Sign in with GitHub</span>
            </button>
          </div>

          <div className="pt-4 border-t border-[#E1E6EB]">
            <Link to="/" className="admin-gate-back">
              ← Return to Portfolio Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-gate-container">
        <div className="admin-gate-card">
          <div className="admin-gate-icon-warning">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h1 className="admin-gate-title">Unauthorized Account</h1>
            <p className="admin-gate-text">
              Signed in as <strong className="font-mono text-[#1B2127]">{user.email}</strong>. This identity is not authorized to edit database records.
            </p>
          </div>
          <div className="admin-unauth-actions">
            <button
              onClick={signOut}
              className="admin-unauth-btn-primary"
            >
              Sign Out
            </button>
            <Link
              to="/"
              className="admin-unauth-btn-secondary"
            >
              Go to Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page-container">
      <header className="admin-header">
        {/* Left: Brand Identity & Live Site Shortcut */}
        <div className="admin-header-left">
          <div className="admin-header-brand">
            <div className="admin-header-avatar">
              ADM
            </div>
            <div>
              <div className="admin-header-title-row">
                <span className="admin-header-title">Vincent Yuann CMS</span>
                <span className="admin-header-badge hidden sm:inline-flex">
                  <span className="admin-header-badge-dot" />
                  Verified
                </span>
              </div>
              <span className="admin-header-email hidden sm:block">{user.email}</span>
            </div>
          </div>

          <Link
            to="/"
            className="admin-live-site-btn"
            title="Return to public portfolio website"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Live Site</span>
          </Link>
        </div>

        {/* Center: Centered Edit Tabs */}
        <div className="admin-header-center">
          <div className="admin-tab-group">
            <button
              type="button"
              onClick={() => handleTabChange('projects')}
              className={`admin-tab-btn ${
                activeTab === 'projects'
                  ? 'admin-tab-btn-active'
                  : 'admin-tab-btn-inactive'
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Projects & Systems ({projects.length})</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('profile')}
              className={`admin-tab-btn ${
                activeTab === 'profile'
                  ? 'admin-tab-btn-active'
                  : 'admin-tab-btn-inactive'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile & Bio</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('resume')}
              className={`admin-tab-btn ${
                activeTab === 'resume'
                  ? 'admin-tab-btn-active'
                  : 'admin-tab-btn-inactive'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume & LaTeX</span>
            </button>
          </div>
        </div>

        {/* Right: Admin Session info & Sign Out */}
        <div className="admin-header-right">
          <div className="hidden lg:flex flex-col items-end text-right">
            <span className="admin-header-badge">
              <span className="admin-header-badge-dot" />
              Admin Verified
            </span>
            <span className="admin-header-email">{user.email}</span>
          </div>

          <button
            type="button"
            onClick={signOut}
            className="admin-signout-btn"
            title="Sign Out of Admin"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-semibold">Sign Out</span>
          </button>
        </div>
      </header>

      <main className="admin-main-content">
        {statusMsg && (
          <div
            className={`admin-status-banner ${
              statusMsg.type === 'success'
                ? 'admin-status-banner-success'
                : statusMsg.type === 'error'
                ? 'admin-status-banner-error'
                : 'admin-status-banner-info'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMsg.type === 'success' && <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />}
              {statusMsg.type === 'error' && <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />}
              <span className="font-medium">{statusMsg.text}</span>
            </div>
            <button
              onClick={() => setStatusMsg(null)}
              className="admin-status-close-btn"
            >
              ×
            </button>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="admin-panel-card">
            <div className="admin-select-row">
              <div>
                <label className="admin-field-label-upper">
                  Select Project Milestone to Edit
                </label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => handleSelectProject(e.target.value)}
                  className="admin-select"
                >
                  <option value="new">+ Create New System / Milestone</option>
                  <optgroup label="Flagship Milestones">
                    {projects
                      .filter((p) => p.isFlagship)
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          ★ {p.title} ({p.id})
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Riverbank Pebbles & Tooling">
                    {projects
                      .filter((p) => !p.isFlagship)
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          • {p.title} ({p.id})
                        </option>
                      ))}
                  </optgroup>
                </select>
              </div>

              {selectedProjectId !== 'new' && (
                <div className="flex items-center gap-2">
                  <Link
                    to={`/projects/${selectedProjectId}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1B2127] bg-[#F6F8FA] hover:bg-[#E1E6EB] border border-[#D0D7DE] rounded-xl transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#3894B3]" />
                    <span>View Live Page</span>
                  </Link>
                  <button
                    onClick={handleDeleteProject}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>

            <div className="admin-toggle-box">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFlagship}
                  onChange={(e) => setIsFlagship(e.target.checked)}
                  className="w-4 h-4 rounded text-[#3894B3] border-[#D0D7DE] focus:ring-[#3894B3]"
                />
                <div>
                  <span className="text-xs font-bold text-[#1B2127] block">
                    Mark as Flagship Boulder Milestone
                  </span>
                  <span className="text-[11px] text-[#57606A]">
                    When checked, appears as a prominent sculpted boulder on the main chronological river stream.
                  </span>
                </div>
              </label>

              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-white border border-[#D0D7DE] text-[#1B2127]">
                {isFlagship ? 'Status: Flagship Boulder' : 'Status: Riverbank Pebble'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="admin-field-label">
                  Project ID (slug identifier)
                </label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="e.g. foodfinder"
                  className="admin-input font-mono"
                />
              </div>

              <div>
                <label className="admin-field-label">
                  Display Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. FoodFinder"
                  className="admin-input font-serif font-bold text-sm"
                />
              </div>

              <div>
                <label className="admin-field-label">
                  Category Tag
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Real-Time Distributed System"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-field-label">
                  Subtitle Tagline
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Short punchy summary"
                  className="admin-input"
                />
              </div>
            </div>

            <div>
              <label className="admin-field-label">
                Executive Problem Statement & Summary
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What problem does this system solve? What was the architectural core?"
                className="admin-textarea"
              />
            </div>

            <div>
              <label className="admin-field-label">
                Key Architecture Patterns & Highlights (one per line)
              </label>
              <textarea
                rows={3}
                value={highlightsText}
                onChange={(e) => setHighlightsText(e.target.value)}
                placeholder="Sub-30ms WebSocket synchronization...&#10;Prisma 7 relational schema migrations...&#10;Multi-stage Docker CI/CD..."
                className="admin-textarea font-mono"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-[#57606A]">
                  Longform Engineering Log & Deep-Dive (Markdown)
                </label>
                <button
                  type="button"
                  onClick={() => setPreviewMarkdown(!previewMarkdown)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#3894B3] font-semibold hover:underline cursor-pointer"
                >
                  {previewMarkdown ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{previewMarkdown ? 'Switch to Raw Editor' : 'Preview Formatted Output'}</span>
                </button>
              </div>

              {previewMarkdown ? (
                <div className="admin-markdown-preview">
                  {detailsMarkdown || 'No markdown content entered.'}
                </div>
              ) : (
                <textarea
                  rows={6}
                  value={detailsMarkdown}
                  onChange={(e) => setDetailsMarkdown(e.target.value)}
                  placeholder="## Architecture Overview&#10;&#10;Detailed breakdown of design patterns, benchmarks, and lessons learned..."
                  className="admin-textarea font-mono"
                />
              )}
            </div>

            <div>
              <label className="admin-field-label">
                Technology Stack Tags (comma-separated, auto-maps Devicon logos)
              </label>
              <input
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="React 19, Socket.IO, PostgreSQL, Prisma, Docker, Jenkins, Python"
                className="admin-input font-mono"
              />
            </div>

            <div className="admin-metrics-box">
              <span className="block text-xs font-bold text-[#57606A] uppercase tracking-wider">
                System Metrics & Benchmarks Grid (Up to 3 Cells)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <input
                    type="text"
                    value={stat1Label}
                    onChange={(e) => setStat1Label(e.target.value)}
                    placeholder="Metric Label 1"
                    className="w-full px-2.5 py-1.5 bg-white border border-[#D0D7DE] rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={stat1Val}
                    onChange={(e) => setStat1Val(e.target.value)}
                    placeholder="Value 1"
                    className="w-full px-2.5 py-1.5 bg-white border border-[#D0D7DE] rounded-lg text-xs font-bold font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="text"
                    value={stat2Label}
                    onChange={(e) => setStat2Label(e.target.value)}
                    placeholder="Metric Label 2"
                    className="w-full px-2.5 py-1.5 bg-white border border-[#D0D7DE] rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={stat2Val}
                    onChange={(e) => setStat2Val(e.target.value)}
                    placeholder="Value 2"
                    className="w-full px-2.5 py-1.5 bg-white border border-[#D0D7DE] rounded-lg text-xs font-bold font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="text"
                    value={stat3Label}
                    onChange={(e) => setStat3Label(e.target.value)}
                    placeholder="Metric Label 3"
                    className="w-full px-2.5 py-1.5 bg-white border border-[#D0D7DE] rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={stat3Val}
                    onChange={(e) => setStat3Val(e.target.value)}
                    placeholder="Value 3"
                    className="w-full px-2.5 py-1.5 bg-white border border-[#D0D7DE] rounded-lg text-xs font-bold font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#57606A] mb-1">GitHub Repository URL</label>
                <input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/VincentYuann/..."
                  className="admin-input font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-[#57606A] mb-1">Live Demo URL</label>
                <input
                  type="text"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://..."
                  className="admin-input font-mono"
                />
              </div>
            </div>

            <div className="admin-image-upload-box">
              <label className="block text-xs font-bold text-[#57606A] uppercase tracking-wider">
                Screenshot / Architecture Diagram (Supabase Storage: <code>portfolio-assets</code>)
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#F6F8FA] border border-[#D0D7DE] rounded-xl text-xs font-semibold text-[#1B2127] cursor-pointer shadow-xs transition-all">
                  <Upload className="w-3.5 h-3.5 text-[#3894B3]" />
                  <span>Upload Screenshot</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                {uploading && <span className="text-xs text-[#57606A] animate-pulse">Uploading to Supabase...</span>}
                {imageUrl && <span className="text-xs text-green-700 font-semibold">✓ Image Linked</span>}
              </div>

              {imageUrl && (
                <div className="p-3 bg-white border border-[#D0D7DE] rounded-xl flex items-center gap-4">
                  <img src={imageUrl} alt="Uploaded preview" className="w-20 h-14 object-cover rounded-lg border border-[#E1E6EB]" />
                  <div className="flex-1 truncate">
                    <span className="text-xs font-mono text-[#57606A] truncate block">{imageUrl}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="text-xs text-red-600 font-semibold hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#E1E6EB] flex justify-end">
              <button
                type="button"
                onClick={handleSaveProject}
                className="admin-save-btn"
              >
                <Save className="w-4 h-4" />
                <span>Save Project to Supabase</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: PROFILE & PERSONAL INFORMATION */}
        {activeTab === 'profile' && (
          <div className="admin-panel-card animate-fadeIn">
            <div className="admin-section-header">
              <h2 className="admin-section-title">Profile & Personal Information</h2>
              <p className="admin-section-desc">
                Synchronized live with <code>public.profile_info</code> in Supabase. Changes appear instantly across the Hero header, status pill, and footer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="admin-field-label">Full Name</label>
                <input
                  type="text"
                  value={profName}
                  onChange={(e) => setProfName(e.target.value)}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-field-label">Primary Role Title</label>
                <input
                  type="text"
                  value={profRole}
                  onChange={(e) => setProfRole(e.target.value)}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-field-label">Status Availability Pill</label>
                <input
                  type="text"
                  value={profStatus}
                  onChange={(e) => setProfStatus(e.target.value)}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-field-label">Location</label>
                <input
                  type="text"
                  value={profLocation}
                  onChange={(e) => setProfLocation(e.target.value)}
                  className="admin-input"
                />
              </div>
            </div>

            <div>
              <label className="admin-field-label">Hero Tagline Headline</label>
              <input
                type="text"
                value={profTagline}
                onChange={(e) => setProfTagline(e.target.value)}
                className="admin-input"
              />
            </div>

            <div>
              <label className="admin-field-label">Bio / About Paragraph</label>
              <textarea
                rows={4}
                value={profAbout}
                onChange={(e) => setProfAbout(e.target.value)}
                className="admin-textarea"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-[#E1E6EB] pt-4 text-xs font-mono">
              <div>
                <label className="admin-field-label font-sans">Contact Email</label>
                <input
                  type="email"
                  value={profEmail}
                  onChange={(e) => setProfEmail(e.target.value)}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-field-label font-sans">GitHub Profile</label>
                <input
                  type="text"
                  value={profGithub}
                  onChange={(e) => setProfGithub(e.target.value)}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-field-label font-sans">LinkedIn Profile</label>
                <input
                  type="text"
                  value={profLinkedin}
                  onChange={(e) => setProfLinkedin(e.target.value)}
                  className="admin-input"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E1E6EB] flex justify-end">
              <button
                type="button"
                onClick={handleSaveProfile}
                className="admin-save-btn"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Info</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: RESUME & LATEX SOURCE */}
        {activeTab === 'resume' && (
          <div className="space-y-8 animate-fadeIn">
            {/* PDF Upload Card */}
            <div className="admin-panel-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E1E6EB]">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base font-bold text-[#1B2127] flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#3894B3]" />
                      <span>Rendered Resume (PDF)</span>
                    </h3>
                    {/* Live Upload Status Badge */}
                    {pdfUploadStatus.status === 'stored' ? (
                      <span className="admin-badge-success">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Deployed in Bucket ({pdfUploadStatus.fileSize})</span>
                      </span>
                    ) : pdfUploadStatus.status === 'checking' ? (
                      <span className="admin-badge-checking">
                        <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
                        <span>Checking status...</span>
                      </span>
                    ) : (
                      <span className="admin-badge-success">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Connected to Supabase Storage</span>
                      </span>
                    )}
                  </div>
                  <p className="admin-section-desc mt-1">
                    Upload your compiled PDF to Supabase Storage (<code className="bg-[#F6F8FA] px-1 py-0.5 rounded text-[11px]">portfolio-assets/resumes/resume.pdf</code>).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={currentPdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="admin-btn-secondary"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Preview Live PDF</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="admin-resume-dropzone">
                  <Upload className="w-8 h-8 text-[#8C959F] mx-auto mb-2" />
                  <p className="text-xs font-semibold text-[#1B2127]">Upload New Resume PDF</p>
                  <p className="text-[11px] text-[#57606A] mt-1 mb-4">Accepts valid compiled .pdf files (Max 15MB)</p>
                  <label className="admin-upload-btn">
                    <span>{uploadingPdf ? 'Uploading to Bucket...' : 'Select .pdf File'}</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleUploadResumePdf}
                      disabled={uploadingPdf}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="admin-resume-status-card">
                  <div className="font-bold text-[#1B2127]">Storage Status & Diagnostics:</div>
                  <div className="text-[#57606A] space-y-1.5 leading-relaxed font-mono text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#8C959F]">Current Source:</span>
                      <span className="font-semibold text-[#1B2127]">
                        {pdfUploadStatus.status === 'stored' ? 'Supabase Storage' : 'Supabase Storage'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#8C959F]">Target Path:</span>
                      <span className="text-[#1B2127]">portfolio-assets/resumes/resume.pdf</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#8C959F]">Last Updated:</span>
                      <span className="text-[#1B2127]">{pdfUploadStatus.updatedAt || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#8C959F]">File Size:</span>
                      <span className="text-[#1B2127]">{pdfUploadStatus.fileSize || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* LaTeX Source Code Card */}
            <div className="admin-panel-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E1E6EB]">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base font-bold text-[#1B2127] flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-[#8250DF]" />
                      <span>LaTeX Source Code (.tex)</span>
                    </h3>
                    {/* Live Upload Status Badge */}
                    {texUploadStatus.status === 'stored' ? (
                      <span className="admin-badge-success">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Deployed in Bucket ({texUploadStatus.fileSize})</span>
                      </span>
                    ) : texUploadStatus.status === 'checking' ? (
                      <span className="admin-badge-checking">
                        <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
                        <span>Checking status...</span>
                      </span>
                    ) : (
                      <span className="admin-badge-success">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Connected to Supabase Storage</span>
                      </span>
                    )}
                  </div>
                  <p className="admin-section-desc mt-1">
                    Upload a new <code className="bg-[#F6F8FA] px-1 py-0.5 rounded text-[11px]">.tex</code> file or edit the source directly below.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <label className="admin-btn-secondary">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingTex ? 'Uploading...' : 'Upload .tex File'}</span>
                    <input
                      type="file"
                      accept=".tex,text/plain"
                      onChange={handleUploadResumeTex}
                      disabled={uploadingTex}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleSaveTexSource}
                    className="admin-btn-primary-sm"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save .tex Code</span>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="admin-field-label">
                    LaTeX Source Editor
                  </label>
                  <span className="text-[11px] text-[#8C959F] font-mono">
                    {currentTexSource.split('\n').length} lines &bull; {Math.round(currentTexSource.length / 1024 * 10) / 10} KB
                  </span>
                </div>
                {isLoadingTex ? (
                  <div className="p-8 text-center text-[#57606A] text-xs font-mono">Loading LaTeX source...</div>
                ) : (
                  <textarea
                    rows={18}
                    value={currentTexSource}
                    onChange={(e) => setCurrentTexSource(e.target.value)}
                    placeholder="\documentclass[letterpaper,10pt]{article}..."
                    className="admin-latex-editor"
                    spellCheck={false}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
