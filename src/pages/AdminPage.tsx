import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Lock,
  ArrowLeft,
  Trash2,
  LogOut,
  User,
  FolderKanban,
  Upload,
  ExternalLink,
  Save,
  FileText,
  Code2,
  Settings,
  Palette,
  ShieldCheck,
  Plus,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';
import { GithubIcon } from '../components/Icons';
import { ThemeToggle } from '../components/ThemeToggle';
import { ThemeSelector } from '../components/ThemeSelector';
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

  const [activeTab, setActiveTab] = useState<'projects' | 'profile' | 'resume' | 'settings'>('projects');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('new');

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
  const [category, setCategory] = useState('Full-Stack Web App');
  const [subtitle, setSubtitle] = useState('');
  const [highlightsText, setHighlightsText] = useState('');
  const [tagsList, setTagsList] = useState<{ name: string; icon: string }[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [stoneAccent, setStoneAccent] = useState('#3894B3');
  const [isFlagship, setIsFlagship] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [extraSections, setExtraSections] = useState<{ headline: string; body: string }[]>([]);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

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

  const getDeviconSlug = (name: string): string => {
    const raw = name.toLowerCase().trim();
    const map: Record<string, string> = {
      'c++': 'cplusplus',
      'cpp': 'cplusplus',
      'c#': 'csharp',
      'cs': 'csharp',
      '.net': 'dot-net',
      'node': 'nodejs',
      'node.js': 'nodejs',
      'nodejs': 'nodejs',
      'vue': 'vuejs',
      'vue.js': 'vuejs',
      'vuejs': 'vuejs',
      'next': 'nextjs',
      'next.js': 'nextjs',
      'nextjs': 'nextjs',
      'tailwind': 'tailwindcss',
      'tailwindcss': 'tailwindcss',
      'postgres': 'postgresql',
      'postgresql': 'postgresql',
      'socket.io': 'socketio',
      'socketio': 'socketio',
      'express': 'express',
      'express.js': 'express',
      'react': 'react',
      'react.js': 'react',
      'react native': 'react',
      'python': 'python',
      'docker': 'docker',
      'typescript': 'typescript',
      'ts': 'typescript',
      'javascript': 'javascript',
      'js': 'javascript',
      'golang': 'go',
      'go': 'go',
      'git': 'git',
      'github': 'github',
      'fastapi': 'fastapi',
      'prisma': 'prisma',
      'supabase': 'supabase',
      'redis': 'redis',
      'mongodb': 'mongodb',
      'graphql': 'graphql',
      'aws': 'amazonwebservices',
      'gcp': 'googlecloud',
      'kubernetes': 'kubernetes',
      'k8s': 'kubernetes',
      'linux': 'linux',
      'html': 'html5',
      'css': 'css3',
      'sass': 'sass',
      'scss': 'sass',
      'vite': 'vitejs',
      'vite.js': 'vitejs',
      'vitejs': 'vitejs',
      'webpack': 'webpack',
      'firebase': 'firebase',
      'flutter': 'flutter',
      'rust': 'rust',
      'java': 'java',
      'kotlin': 'kotlin',
      'swift': 'swift',
    };
    if (map[raw]) return map[raw];
    return raw.replace(/[^a-z0-9]/g, '');
  };

  const handleSelectProject = (projId: string) => {
    setSelectedProjectId(projId);

    if (projId === 'new') {
      setTitle('');
      setCategory('Full-Stack Web App');
      setSubtitle('');
      setHighlightsText('');
      setTagsList([]);
      setTagInput('');
      setGithubUrl('');
      setLiveUrl('');
      setImageUrl('');
      setIsFlagship(true);
      setStoneAccent('#3894B3');
      setExtraSections([]);
    } else {
      const proj = projects.find((p) => p.id === projId);
      if (!proj) return;
      setTitle(proj.title);
      setCategory(proj.category);
      setSubtitle(proj.subtitle || proj.description || '');
      setHighlightsText(proj.highlights?.join('\n') || '');
      setTagsList(proj.tags?.map((t) => ({ name: t.name, icon: t.icon || getDeviconSlug(t.name) })) || []);
      setTagInput('');
      setGithubUrl(proj.githubUrl || '');
      setLiveUrl(proj.liveUrl || '');
      setImageUrl(proj.imageUrl || '');
      setIsFlagship(proj.isFlagship ?? true);
      setStoneAccent(proj.stoneAccent || '#3894B3');
      setExtraSections([]);
    }
  };

  // Sync tab & edit parameters with URL query string
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'profile' || tabParam === 'resume' || tabParam === 'projects' || tabParam === 'settings') {
      setActiveTab(tabParam);
    }
    const editParam = searchParams.get('edit');
    if (editParam) {
      handleSelectProject(editParam);
    }
  }, [searchParams, projects]);

  const handleTabChange = (tab: 'projects' | 'profile' | 'resume' | 'settings') => {
    setActiveTab(tab);
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
      toast.info('Uploading image to Supabase Storage...');
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `project-covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
      setImageUrl(data.publicUrl);
      toast.success('Image uploaded successfully!');
    } catch (err: any) {
      toast.error(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleAddTags = () => {
    if (!tagInput.trim()) return;
    const newTags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => ({ name: t, icon: getDeviconSlug(t) }));
    setTagsList((prev) => [
      ...prev,
      ...newTags.filter((nt) => !prev.some((pt) => pt.name.toLowerCase() === nt.name.toLowerCase())),
    ]);
    setTagInput('');
  };

  const handleRemoveTag = (index: number) => {
    setTagsList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveProject = async () => {
    if (!title.trim()) {
      toast.error('Title is required.');
      return;
    }

    // Enforce unique title
    const duplicate = projects.find(
      (p) =>
        (selectedProjectId === 'new' ? true : p.id !== selectedProjectId) &&
        p.title.toLowerCase().trim() === title.toLowerCase().trim()
    );
    if (duplicate) {
      toast.error(`A project with the title "${duplicate.title}" already exists. Titles must be unique.`);
      return;
    }

    const projectId = selectedProjectId !== 'new'
      ? selectedProjectId
      : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    if (!projectId) {
      toast.error('Could not generate a valid project ID from the title.');
      return;
    }

    setIsSaving(true);
    try {
      const sectionHighlights = extraSections
        .filter((s) => s.headline.trim() || s.body.trim())
        .map((s) => (s.headline.trim() && s.body.trim() ? `${s.headline.trim()}: ${s.body.trim()}` : s.headline.trim() || s.body.trim()));

      const highlights = [
        ...highlightsText.split('\n').map((s) => s.trim()).filter(Boolean),
        ...sectionHighlights,
      ];

      const record = {
        id: projectId,
        title,
        subtitle,
        category,
        description: subtitle, // Subtitle doubles as description for backward compat
        highlights,
        tags: tagsList,
        stats: [],
        stone_accent: stoneAccent,
        github_url: githubUrl || null,
        live_url: liveUrl || null,
        image_url: imageUrl || null,
        is_flagship: isFlagship,
        details_markdown: null,
        is_published: true,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('projects').upsert(record);
      if (error) {
        toast.error(`Save failed: ${error.message}`);
      } else {
        toast.success(`Project "${title}" saved successfully!`);
        onRefreshProjects();
        setSelectedProjectId(record.id);
      }
    } catch (err: any) {
      toast.error(`Save failed: ${err.message || 'Unexpected error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async () => {
    if (selectedProjectId === 'new') return;
    setShowDeleteDialog(false);
    setIsDeleting(true);

    try {
      const { error } = await supabase.from('projects').delete().eq('id', selectedProjectId);
      if (error) {
        toast.error(`Delete failed: ${error.message}`);
      } else {
        toast.success(`Project "${title}" deleted successfully.`);
        onRefreshProjects();
        handleSelectProject('new');
      }
    } catch (err: any) {
      toast.error(`Delete failed: ${err.message || 'Unexpected error'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    toast.info('Saving profile details...');
    try {
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
        toast.error(`Profile save failed: ${error.message}`);
      } else {
        toast.success('Profile information updated successfully!');
        if (onRefreshProfile) onRefreshProfile();
      }
    } catch (err: any) {
      toast.error(`Profile save failed: ${err.message || 'Unexpected error'}`);
    } finally {
      setIsSavingProfile(false);
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
      toast.error('Please select a valid PDF file (.pdf).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      toast.error('PDF file exceeds 15MB limit.');
      return;
    }

    try {
      setUploadingPdf(true);
      toast.info('Uploading resume PDF...');
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

      toast.success(`"${file.name}" (${sizeStr}) uploaded successfully!`);
    } catch (err: any) {
      toast.error(`PDF upload failed: ${err.message}`);
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleUploadResumeTex = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.tex') && !file.name.toLowerCase().endsWith('.txt')) {
      toast.error('Please select a valid LaTeX file (.tex or .txt).');
      return;
    }

    try {
      setUploadingTex(true);
      toast.info('Reading and validating LaTeX file...');
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

      toast.info('Uploading LaTeX file...');
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

      toast.success(`"${file.name}" (${sizeStr}) uploaded successfully!`);
    } catch (err: any) {
      toast.error(`LaTeX upload failed: ${err.message}`);
    } finally {
      setUploadingTex(false);
    }
  };

  const handleSaveTexSource = async () => {
    if (!currentTexSource.trim()) {
      toast.error('Cannot save empty LaTeX source code.');
      return;
    }

    try {
      toast.info('Saving LaTeX source...');
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

      toast.success(`LaTeX source (${sizeStr}) saved successfully!`);
    } catch (err: any) {
      toast.error(`Failed to save LaTeX: ${err.message}`);
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

            <button
              type="button"
              onClick={() => handleTabChange('settings')}
              className={`admin-tab-btn ${
                activeTab === 'settings'
                  ? 'admin-tab-btn-active'
                  : 'admin-tab-btn-inactive'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings & Theme</span>
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
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-foreground bg-card hover:bg-muted border border-border rounded-xl transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-primary" />
                    <span>View Live Page</span>
                  </Link>
                  <button
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={isDeleting}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                    <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
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

            {/* Core Identity Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="admin-field-label">
                  Display Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. FoodFinder"
                  className="admin-input font-serif font-bold text-sm"
                />
                {selectedProjectId === 'new' && title.trim() && (
                  <span className="text-[10px] font-mono text-muted-foreground mt-1 block">
                    Slug: {title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}
                  </span>
                )}
              </div>

              <div>
                <label className="admin-field-label">
                  Category Tag <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Real-Time Distributed System"
                  className="admin-input"
                />
              </div>
            </div>

            {/* Subtitle / Summary */}
            <div>
              <label className="admin-field-label">
                Subtitle / Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={2}
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="A brief summary of the project — this appears as the preview tagline on cards"
                className="admin-textarea"
              />
            </div>

            {/* Key Architecture Patterns & Highlights */}
            <div>
              <label className="admin-field-label">
                Key Architecture Patterns & Highlights (one per line)
              </label>
              <textarea
                rows={3}
                value={highlightsText}
                onChange={(e) => setHighlightsText(e.target.value)}
                placeholder={"Sub-30ms WebSocket synchronization...\nPrisma 7 relational schema migrations...\nMulti-stage Docker CI/CD..."}
                className="admin-textarea font-mono"
              />
            </div>

            {/* Technology Stack Tags — Chip UI with Devicon Previews */}
            <div className="space-y-3">
              <label className="admin-field-label">
                Technology Stack Tags
              </label>

              {/* Existing Tags as Chips */}
              {tagsList.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tagsList.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 pl-2 pr-1 py-1 rounded-lg bg-muted border border-border text-xs font-medium text-foreground"
                    >
                      <img
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tag.icon}/${tag.icon}-original.svg`}
                        alt={tag.name}
                        className="w-4 h-4"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <span>{tag.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(idx)}
                        className="p-0.5 rounded hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
                        title={`Remove ${tag.name}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Add Tags Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTags();
                    }
                  }}
                  placeholder="Type tag names (comma-separated), press Enter or click +"
                  className="admin-input font-mono flex-1"
                />
                <button
                  type="button"
                  onClick={handleAddTags}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer shrink-0"
                  title="Add tags"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Optional Extra Sections */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="admin-field-label mb-0">
                  Additional Sections (optional)
                </label>
                <button
                  type="button"
                  onClick={() => setExtraSections((prev) => [...prev, { headline: '', body: '' }])}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 border border-primary/30 rounded-xl transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Section</span>
                </button>
              </div>

              {extraSections.map((section, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-border bg-muted/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Section {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setExtraSections((prev) => prev.filter((_, i) => i !== idx))}
                      className="p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                      title="Remove section"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={section.headline}
                    onChange={(e) => {
                      const updated = [...extraSections];
                      updated[idx] = { ...updated[idx], headline: e.target.value };
                      setExtraSections(updated);
                    }}
                    placeholder="Section headline"
                    className="admin-input text-xs font-bold"
                  />
                  <textarea
                    rows={2}
                    value={section.body}
                    onChange={(e) => {
                      const updated = [...extraSections];
                      updated[idx] = { ...updated[idx], body: e.target.value };
                      setExtraSections(updated);
                    }}
                    placeholder="Section description"
                    className="admin-textarea text-xs"
                  />
                </div>
              ))}
            </div>

            {/* External Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="admin-field-label">
                  GitHub Repository URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/VincentYuann/..."
                  className="admin-input font-mono"
                />
              </div>
              <div>
                <label className="admin-field-label">
                  Live Demo URL <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://... (leave blank if not deployed)"
                  className="admin-input font-mono"
                />
              </div>
            </div>

            {/* Screenshot / Architecture Diagram Upload */}
            <div className="admin-image-upload-box">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Screenshot / Architecture Diagram
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-card hover:bg-muted border border-border rounded-xl text-xs font-semibold text-foreground cursor-pointer shadow-xs transition-all">
                  <Upload className="w-3.5 h-3.5 text-primary" />
                  <span>Upload Screenshot</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                {uploading && <span className="text-xs text-muted-foreground animate-pulse">Uploading...</span>}
                {imageUrl && <span className="text-xs text-green-700 font-semibold">✓ Image Linked</span>}
              </div>

              {imageUrl && (
                <div className="p-3 bg-card border border-border rounded-xl flex items-center gap-4">
                  <img src={imageUrl} alt="Uploaded preview" className="w-20 h-14 object-cover rounded-lg border border-border" />
                  <div className="flex-1 truncate">
                    <span className="text-xs font-mono text-muted-foreground truncate block">{imageUrl}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="text-xs text-destructive font-semibold hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Save Button with Protective Loading State */}
            <div className="pt-4 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={handleSaveProject}
                disabled={isSaving}
                className="admin-save-btn disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{isSaving ? 'Saving...' : 'Save Project'}</span>
              </button>
            </div>

            {/* Delete Confirmation Dialog */}
            {showDeleteDialog && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs" onClick={() => setShowDeleteDialog(false)}>
                <div className="bg-card border border-border rounded-2xl shadow-2xl p-6 max-w-sm w-full space-y-4" onClick={(e) => e.stopPropagation()}>
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-foreground">Delete Project</h3>
                    <p className="text-xs text-muted-foreground">
                      Are you sure you want to permanently delete <strong>"{title}"</strong>? This action cannot be undone.
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowDeleteDialog(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-foreground bg-muted hover:bg-muted/80 border border-border transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteProject}
                      disabled={isDeleting}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isDeleting ? (
                        <span className="flex items-center gap-1.5">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Deleting...
                        </span>
                      ) : (
                        'Delete Permanently'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
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
                disabled={isSavingProfile}
                className="admin-save-btn disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSavingProfile ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{isSavingProfile ? 'Saving...' : 'Save Profile Info'}</span>
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

        {/* TAB 4: SETTINGS & THEME APPEARANCE */}
        {activeTab === 'settings' && (
          <div className="admin-panel-card animate-fadeIn space-y-6">
            <div className="admin-section-header">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3894B3]">
                  System Preferences
                </span>
                <h2 className="admin-section-title">Settings & Theme Appearance</h2>
              </div>
              <p className="admin-section-desc">
                Configure color themes and visual preferences across Vincent&apos;s portfolio. Changes persist instantly across all devices.
              </p>
            </div>

            {/* Appearance Card */}
            <div className="p-5 sm:p-6 bg-[#FAFBFD] dark:bg-[#161B22] border border-[#E1E6EB] dark:border-[#30363D] rounded-2xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-[#3894B3]" />
                    <h3 className="text-sm font-bold text-[#1B2127] dark:text-[#F0F6FC]">
                      Curated Theme Presets
                    </h3>
                  </div>
                  <p className="text-xs text-[#57606A] dark:text-[#8B949E]">
                    Managed with <code className="font-mono text-[11px] px-1 py-0.5 rounded bg-white dark:bg-[#21262D] border border-[#D0D7DE] dark:border-[#30363D]">next-themes</code>, cached in <code className="font-mono text-[11px] px-1 py-0.5 rounded bg-white dark:bg-[#21262D] border border-[#D0D7DE] dark:border-[#30363D]">localStorage</code>, and initialized via inline head script for 0ms flash.
                  </p>
                </div>

                <ThemeToggle showLabels={true} />
              </div>

              {/* Interactive Theme Grid */}
              <ThemeSelector layout="grid" />
            </div>

            {/* Project Edit & Links Quick Policy */}
            <div className="p-5 sm:p-6 bg-[#FAFBFD] dark:bg-[#161B22] border border-[#E1E6EB] dark:border-[#30363D] rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#588A75]" />
                <h3 className="text-sm font-bold text-[#1B2127] dark:text-[#F0F6FC]">
                  Project Code & Live Demo URL Policies
                </h3>
              </div>
              <p className="text-xs text-[#57606A] dark:text-[#8B949E] leading-relaxed">
                When adding or editing flagship systems:
              </p>
              <ul className="text-xs text-[#57606A] dark:text-[#8B949E] space-y-1.5 list-disc list-inside">
                <li>
                  <strong className="text-[#1B2127] dark:text-[#F0F6FC]">GitHub Repository (Code)</strong>: Recommended for engineering proof. If provided, the card renders a &ldquo;Code&rdquo; button.
                </li>
                <li>
                  <strong className="text-[#1B2127] dark:text-[#F0F6FC]">Live Demo URL</strong>: Completely optional. If left blank, the card cleanly omits the &ldquo;Live Demo&rdquo; button until you deploy.
                </li>
                <li>
                  <strong className="text-[#1B2127] dark:text-[#F0F6FC]">Card Streamlining</strong>: Homepage cards prioritize a brief description, image, and full tech stacks, with the &ldquo;Edit ✎&rdquo; action securely consolidated inside this Admin CMS.
                </li>
              </ul>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleTabChange('projects')}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1B2127] dark:bg-[#3894B3] hover:bg-[#3894B3] dark:hover:bg-[#2B6D83] text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs"
                >
                  <FolderKanban className="w-3.5 h-3.5" />
                  <span>Go to Project Editor →</span>
                </button>
              </div>
            </div>

            {/* Session Security & Diagnostics */}
            <div className="p-5 sm:p-6 bg-[#FAFBFD] dark:bg-[#161B22] border border-[#E1E6EB] dark:border-[#30363D] rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-sm font-bold text-[#1B2127] dark:text-[#F0F6FC]">
                    Admin Session Status
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Authorized
                </span>
              </div>
              <p className="text-xs text-[#57606A] dark:text-[#8B949E]">
                Signed in as <strong className="font-mono text-[#1B2127] dark:text-white">{user.email}</strong> via GitHub OAuth. Row-Level Security write policies are active.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
