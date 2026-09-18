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
  Plus,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Database,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { GithubIcon } from '../components/Icons';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/useAuth';
import { POPULAR_STACKS, getDeviconSlug, normalizeTechName } from '../lib/techIcons';
import { DEFAULT_CURATED_PROJECTS } from '../data/projects';
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
  const [isStackModalOpen, setIsStackModalOpen] = useState(false);

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
  const [stoneAccent, setStoneAccent] = useState('#B5482E');
  const [isFlagship, setIsFlagship] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [extraSections, setExtraSections] = useState<{ headline: string; body: string }[]>([]);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

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
      setStoneAccent('#B5482E');
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
      setStoneAccent(proj.stoneAccent || '#B5482E');
      setExtraSections([]);
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

  const handleAddTags = (customString?: string) => {
    const input = (customString || tagInput).trim();
    if (!input) return;
    const newTags = input
      .split(',')
      .map((t) => normalizeTechName(t.trim()))
      .filter(Boolean)
      .map((t) => ({ name: t, icon: getDeviconSlug(t) }));
    setTagsList((prev) => [
      ...prev,
      ...newTags.filter((nt) => !prev.some((pt) => normalizeTechName(pt.name).toLowerCase() === nt.name.toLowerCase())),
    ]);
    setTagInput('');
    toast.success(`Added ${newTags.length} tech stack item(s)`);
  };

  const toggleStack = (name: string, icon?: string) => {
    const cleanName = normalizeTechName(name);
    const existingIndex = tagsList.findIndex(
      (t) => normalizeTechName(t.name).toLowerCase() === cleanName.toLowerCase()
    );
    if (existingIndex >= 0) {
      setTagsList((prev) => prev.filter((_, i) => i !== existingIndex));
    } else {
      setTagsList((prev) => [...prev, { name: cleanName, icon: icon || getDeviconSlug(cleanName) }]);
    }
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

  const handleSeedCuratedProjects = async () => {
    try {
      setIsSeeding(true);
      toast.info('Seeding curated flagship systems to Supabase...');
      const rows = DEFAULT_CURATED_PROJECTS.map((p, idx) => ({
        id: p.id,
        title: p.title,
        subtitle: p.subtitle,
        category: p.category,
        description: p.description,
        highlights: p.highlights || [],
        stats: p.stats || [],
        tags: p.tags || [],
        stone_accent: p.stoneAccent || '#B5482E',
        github_url: p.githubUrl || null,
        live_url: p.liveUrl || null,
        image_url: p.imageUrl || null,
        details_markdown: p.detailsMarkdown || null,
        is_flagship: p.isFlagship ?? true,
        is_published: true,
        order_index: idx + 1,
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase.from('projects').upsert(rows, { onConflict: 'id' });
      if (error) throw error;

      toast.success('Curated flagships seeded successfully to Supabase!');
      onRefreshProjects();
    } catch (err: any) {
      console.error('Error seeding projects:', err);
      toast.error(err?.message || 'Failed to seed projects to Supabase');
    } finally {
      setIsSeeding(false);
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
            <Lock className="w-5 h-5 text-primary-foreground" />
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

          <div className="pt-4 border-t border-border">
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
              Signed in as <strong className="font-mono text-foreground">{user.email}</strong>. This identity is not authorized to edit database records.
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

        {activeTab === 'projects' && (
          <div className="admin-panel-card">
            {projects.length === 0 && (
              <div className="mb-6 p-4.5 bg-muted/40 border border-dashed border-border rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-serif font-medium text-foreground">
                    <Database className="w-4 h-4 text-accent" />
                    <span>Supabase Project Archive is Empty</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Populate your live database with Vincent's curated technical flagships (Modular RAG AI, FoodFinder, AnimY, Portfolio Engine) in one click.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSeedCuratedProjects}
                  disabled={isSeeding}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium rounded-sm transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap shrink-0"
                >
                  {isSeeding ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  <span>Seed Curated Flagships</span>
                </button>
              </div>
            )}

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
                  <optgroup label="Sandboxes & Labs">
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
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-foreground bg-card hover:bg-muted border border-border rounded-sm transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-primary" />
                    <span>View Live Page</span>
                  </Link>
                  <button
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={isDeleting}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-destructive bg-destructive/10 hover:bg-destructive/20 border border-destructive/30 rounded-sm transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
                  className="w-4 h-4 rounded-sm text-accent border-border focus:ring-accent accent-accent"
                />
                <div>
                  <span className="text-xs font-bold text-foreground block">
                    Mark as Flagship Architecture System
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    When checked, appears as a prominent featured project in the main architecture showcase.
                  </span>
                </div>
              </label>

              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-sm bg-muted border border-border text-foreground">
                {isFlagship ? 'Status: Flagship' : 'Status: Archive'}
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

            {/* Technology Stack Tags — Dedicated Selector Modal & Chips */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="admin-field-label mb-0">
                  Technology Stack ({tagsList.length})
                </label>
                <button
                  type="button"
                  onClick={() => setIsStackModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-border bg-card hover:bg-muted text-foreground text-[11px] font-sans font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-2xs"
                >
                  <Plus className="size-3.5 text-accent" />
                  <span>Manage Tech Stacks</span>
                </button>
              </div>

              {/* Existing Tags as Chips */}
              {tagsList.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 p-2 rounded-sm border border-border/80 bg-muted/20">
                  {tagsList.map((tag, idx) => {
                    const clean = normalizeTechName(tag.name);
                    const icon = tag.icon || getDeviconSlug(clean);
                    return (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-sm bg-card border border-border text-xs font-medium text-foreground shadow-2xs"
                      >
                        {icon ? (
                          <img
                            src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-original.svg`}
                            alt={clean}
                            className="w-3.5 h-3.5 object-contain shrink-0"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : null}
                        <span>{clean}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(idx)}
                          className="p-0.5 rounded hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer text-muted-foreground"
                          title={`Remove ${clean}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              ) : (
                <div 
                  onClick={() => setIsStackModalOpen(true)}
                  className="p-4 rounded-sm border border-dashed border-border text-center text-xs text-muted-foreground cursor-pointer hover:border-accent/50 hover:bg-card/40 transition-colors"
                >
                  No technology stacks added yet. Click &ldquo;Manage Tech Stacks&rdquo; to add presets or enter commands.
                </div>
              )}

              {/* Tech Stack Selector Dialog */}
              {isStackModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                  <div 
                    className="relative w-full max-w-lg bg-card text-card-foreground border border-border rounded-md shadow-2xl p-6 space-y-5 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <div>
                        <h3 className="text-base font-serif font-normal text-foreground">
                          Manage Tech Stacks & Architecture
                        </h3>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          1-click presets or enter comma-separated command string
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsStackModalOpen(false)}
                        className="p-1 text-muted-foreground hover:text-foreground rounded-sm cursor-pointer"
                      >
                        <X className="size-4" />
                      </button>
                    </div>

                    {/* Batch Command Input */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-sans font-semibold uppercase tracking-wider text-muted-foreground block">
                        Batch Command Input
                      </label>
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
                          placeholder="e.g. React, Socket.IO, PostgreSQL, Prisma, Docker"
                          className="admin-input flex-1 font-mono text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddTags()}
                          className="px-3.5 py-2 rounded-sm bg-primary text-primary-foreground text-xs font-sans font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors cursor-pointer shrink-0"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* 1-Click Popular Presets */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-sans font-semibold uppercase tracking-wider text-muted-foreground block">
                        1-Click Popular Technology Presets
                      </label>
                      <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto p-1.5 border border-border/60 rounded-sm bg-muted/20">
                        {POPULAR_STACKS.map((stack) => {
                          const isSelected = tagsList.some(
                            (t) => normalizeTechName(t.name).toLowerCase() === stack.name.toLowerCase()
                          );
                          return (
                            <button
                              key={stack.name}
                              type="button"
                              onClick={() => toggleStack(stack.name, stack.icon)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-sans transition-all cursor-pointer border ${
                                isSelected
                                  ? 'bg-accent text-white border-accent shadow-2xs font-semibold'
                                  : 'bg-card text-foreground border-border hover:border-accent/40'
                              }`}
                            >
                              <img
                                src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${stack.icon}/${stack.icon}-original.svg`}
                                alt=""
                                className="size-3.5 shrink-0"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                                }}
                              />
                              <span>{stack.name}</span>
                              {isSelected && <span className="text-[10px] ml-0.5">✓</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Currently Selected Stacks */}
                    <div className="space-y-1.5 pt-3 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-muted-foreground">
                          Selected Stacks ({tagsList.length})
                        </span>
                        {tagsList.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setTagsList([])}
                            className="text-[10px] text-destructive hover:underline cursor-pointer"
                          >
                            Clear all
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5 min-h-[32px] max-h-24 overflow-y-auto">
                        {tagsList.map((tag, idx) => {
                          const clean = normalizeTechName(tag.name);
                          return (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 pl-2 pr-1 py-0.5 rounded-sm bg-muted border border-border text-xs text-foreground"
                            >
                              <span>{clean}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveTag(idx)}
                                className="p-0.5 text-muted-foreground hover:text-destructive cursor-pointer"
                              >
                                <X className="size-3" />
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer Done Button */}
                    <div className="pt-3 flex justify-end border-t border-border">
                      <button
                        type="button"
                        onClick={() => setIsStackModalOpen(false)}
                        className="px-4 py-2 rounded-sm bg-primary text-primary-foreground text-xs font-sans font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors cursor-pointer"
                      >
                        Done & Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 border border-primary/30 rounded-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Section</span>
                </button>
              </div>

              {extraSections.map((section, idx) => (
                <div key={idx} className="p-3 rounded-sm border border-border bg-muted/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Section {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setExtraSections((prev) => prev.filter((_, i) => i !== idx))}
                      className="p-1 rounded-sm hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
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
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-card hover:bg-muted border border-border rounded-sm text-xs font-semibold text-foreground cursor-pointer shadow-xs transition-all">
                  <Upload className="w-3.5 h-3.5 text-primary" />
                  <span>Upload Screenshot</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                {uploading && <span className="text-xs text-muted-foreground animate-pulse">Uploading...</span>}
                {imageUrl && <span className="text-xs text-green-700 font-semibold">✓ Image Linked</span>}
              </div>

              {imageUrl && (
                <div className="p-3 bg-card border border-border rounded-sm flex items-center gap-4">
                  <img src={imageUrl} alt="Uploaded preview" className="w-20 h-14 object-cover rounded-sm border border-border" />
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
                <div className="bg-card border border-border rounded-md shadow-2xl p-6 max-w-sm w-full space-y-4" onClick={(e) => e.stopPropagation()}>
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-foreground font-serif">Delete Project</h3>
                    <p className="text-xs text-muted-foreground">
                      Are you sure you want to permanently delete <strong>"{title}"</strong>? This action cannot be undone.
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowDeleteDialog(false)}
                      className="px-4 py-2 rounded-sm text-xs font-semibold text-foreground bg-muted hover:bg-muted/80 border border-border transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteProject}
                      disabled={isDeleting}
                      className="px-4 py-2 rounded-sm text-xs font-semibold text-destructive-foreground bg-destructive hover:bg-destructive/90 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-border pt-4 text-xs font-mono">
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

            <div className="pt-4 border-t border-border flex justify-end">
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                      <FileText className="w-5 h-5 text-accent" />
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
                        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" />
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
                    Upload your compiled PDF to Supabase Storage (<code className="bg-muted px-1 py-0.5 rounded-sm text-[11px] font-mono">portfolio-assets/resumes/resume.pdf</code>).
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
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs font-semibold text-foreground">Upload New Resume PDF</p>
                  <p className="text-[11px] text-muted-foreground mt-1 mb-4">Accepts valid compiled .pdf files (Max 15MB)</p>
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
                  <div className="font-bold text-foreground">Storage Status & Diagnostics:</div>
                  <div className="text-muted-foreground space-y-1.5 leading-relaxed font-mono text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Current Source:</span>
                      <span className="font-semibold text-foreground">
                        {pdfUploadStatus.status === 'stored' ? 'Supabase Storage' : 'Supabase Storage'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Target Path:</span>
                      <span className="text-foreground">portfolio-assets/resumes/resume.pdf</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span className="text-foreground">{pdfUploadStatus.updatedAt || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">File Size:</span>
                      <span className="text-foreground">{pdfUploadStatus.fileSize || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* LaTeX Source Code Card */}
            <div className="admin-panel-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-accent" />
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
                        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" />
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
                    Upload a new <code className="bg-muted px-1 py-0.5 rounded-sm text-[11px] font-mono">.tex</code> file or edit the source directly below.
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
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {currentTexSource.split('\n').length} lines &bull; {Math.round(currentTexSource.length / 1024 * 10) / 10} KB
                  </span>
                </div>
                {isLoadingTex ? (
                  <div className="p-8 text-center text-muted-foreground text-xs font-mono">Loading LaTeX source...</div>
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
