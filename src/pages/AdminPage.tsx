import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  const [activeTab, setActiveTab] = useState<'projects' | 'profile' | 'resume'>('projects');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('new');
  const [previewMarkdown, setPreviewMarkdown] = useState(false);

  // Resume Upload State
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingTex, setUploadingTex] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string>(`${import.meta.env.BASE_URL}resumes/resume.pdf`);
  const [currentTexSource, setCurrentTexSource] = useState<string>('');
  const [isLoadingTex, setIsLoadingTex] = useState<boolean>(true);
  const [pdfUploadStatus, setPdfUploadStatus] = useState<{
    status: 'stored' | 'local_fallback' | 'checking';
    fileName?: string;
    fileSize?: string;
    updatedAt?: string;
  }>({ status: 'checking' });
  const [texUploadStatus, setTexUploadStatus] = useState<{
    status: 'stored' | 'local_fallback' | 'checking';
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
      setStatusMsg({ type: 'success', text: 'Project deleted successfully.' });
      onRefreshProjects();
      handleSelectProject('new');
    }
  };

  const handleSaveProfile = async () => {
    setStatusMsg({ type: 'info', text: 'Updating Profile Info in Supabase...' });
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
      setStatusMsg({ type: 'error', text: `Profile update failed: ${error.message}` });
    } else {
      setStatusMsg({ type: 'success', text: 'Profile updated successfully in Supabase!' });
      onRefreshProfile?.();
    }
  };

  // Load current resume details on mount or tab change
  useEffect(() => {
    // Check if resume.pdf exists in Supabase storage
    const checkStorageResume = async () => {
      try {
        const { data } = supabase.storage.from('portfolio-assets').getPublicUrl('resumes/resume.pdf');
        if (data?.publicUrl) {
          const res = await fetch(data.publicUrl, { method: 'HEAD' });
          if (res.ok) {
            const contentLength = res.headers.get('content-length');
            const sizeStr = contentLength ? `${Math.round(parseInt(contentLength) / 1024)} KB` : 'Active';
            const lastModified = res.headers.get('last-modified')
              ? new Date(res.headers.get('last-modified')!).toLocaleString()
              : 'Uploaded to bucket';
            setCurrentPdfUrl(data.publicUrl);
            setPdfUploadStatus({
              status: 'stored',
              fileName: 'resume.pdf',
              fileSize: sizeStr,
              updatedAt: lastModified,
            });
          } else {
            setPdfUploadStatus({
              status: 'local_fallback',
              fileName: 'resume.pdf',
              fileSize: 'Local fallback',
              updatedAt: 'Using public/resumes/resume.pdf',
            });
          }
        }
      } catch (err) {
        console.warn('Storage resume check:', err);
        setPdfUploadStatus({
          status: 'local_fallback',
          fileName: 'resume.pdf',
          fileSize: 'Local fallback',
          updatedAt: 'Using public/resumes/resume.pdf',
        });
      }
    };

    checkStorageResume();

    // Check if remote resume.tex exists in Supabase Storage, otherwise load local
    const checkStorageTex = async () => {
      try {
        const { data } = supabase.storage.from('portfolio-assets').getPublicUrl('resumes/resume.tex');
        if (data?.publicUrl) {
          const res = await fetch(data.publicUrl);
          if (res.ok) {
            const text = await res.text();
            const lastModified = res.headers.get('last-modified')
              ? new Date(res.headers.get('last-modified')!).toLocaleString()
              : 'Uploaded to bucket';
            setCurrentTexSource(text);
            setIsLoadingTex(false);
            setTexUploadStatus({
              status: 'stored',
              fileName: 'resume.tex',
              fileSize: `${Math.round(text.length / 1024 * 10) / 10} KB`,
              updatedAt: lastModified,
            });
            return;
          }
        }
      } catch (err) {
        console.warn('Storage tex check:', err);
      }

      // Local fallback
      try {
        const localRes = await fetch(`${import.meta.env.BASE_URL}resumes/resume.tex`);
        if (localRes.ok) {
          const text = await localRes.text();
          setCurrentTexSource(text);
          setIsLoadingTex(false);
          setTexUploadStatus({
            status: 'local_fallback',
            fileName: 'resume.tex',
            fileSize: `${Math.round(text.length / 1024 * 10) / 10} KB`,
            updatedAt: 'Using public/resumes/resume.tex',
          });
          return;
        }
      } catch {
        // failed
      }

      setIsLoadingTex(false);
      setTexUploadStatus({
        status: 'local_fallback',
        fileName: 'resume.tex',
        fileSize: '0 KB',
        updatedAt: 'No source loaded',
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
          setStatusMsg(null);
          return;
        }
      }

      setCurrentTexSource(text);

      const filePath = `resumes/resume.tex`;
      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file, { upsert: true, cacheControl: '60', contentType: 'text/plain; charset=utf-8' });

      if (uploadError) throw uploadError;

      const sizeStr = `${Math.round(file.size / 1024 * 10) / 10} KB`;
      const dateStr = new Date().toLocaleString();
      setTexUploadStatus({
        status: 'stored',
        fileName: file.name,
        fileSize: sizeStr,
        updatedAt: dateStr,
      });

      setStatusMsg({
        type: 'success',
        text: `Success: "${file.name}" (${sizeStr}) uploaded and saved to Supabase Storage!`,
      });
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: `LaTeX upload failed: ${err.message}` });
    } finally {
      setUploadingTex(false);
    }
  };

  const handleSaveTexSource = async () => {
    if (!currentTexSource.trim()) {
      setStatusMsg({ type: 'error', text: 'Validation Error: LaTeX source code cannot be empty.' });
      return;
    }

    try {
      setStatusMsg({ type: 'info', text: 'Saving LaTeX source to Supabase Storage...' });
      const blob = new Blob([currentTexSource], { type: 'text/plain; charset=utf-8' });
      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload('resumes/resume.tex', blob, { upsert: true, cacheControl: '60' });

      if (uploadError) throw uploadError;

      const sizeStr = `${Math.round(blob.size / 1024 * 10) / 10} KB`;
      const dateStr = new Date().toLocaleString();
      setTexUploadStatus({
        status: 'stored',
        fileName: 'resume.tex',
        fileSize: sizeStr,
        updatedAt: dateStr,
      });

      setStatusMsg({
        type: 'success',
        text: `Success: LaTeX source code (${sizeStr}) saved successfully to Supabase Storage!`,
      });
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: `Failed to save LaTeX: ${err.message}` });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAFBFD] flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#1B2127] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#57606A] font-mono">Verifying Supabase administrative session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAFBFD] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-[#D0D7DE] rounded-2xl p-8 shadow-sm space-y-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#1B2127] text-white flex items-center justify-center mx-auto">
            <Lock className="w-5 h-5 text-[#A0D8E9]" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-serif font-bold text-[#1B2127]">Admin Access Required</h1>
            <p className="text-xs text-[#57606A]">
              You must sign in with an authorized administrator account to edit portfolio systems and profile information.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => signInWithGitHub()}
              className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-[#1B2127] hover:bg-[#2C343E] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Sign in with GitHub</span>
            </button>
          </div>

          <div className="pt-4 border-t border-[#E1E6EB]">
            <Link to="/" className="text-xs text-[#6E7E8E] hover:text-[#1B2127]">
              ← Return to Portfolio Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#FAFBFD] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-[#D0D7DE] rounded-2xl p-8 shadow-sm space-y-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-serif font-bold text-[#1B2127]">Unauthorized Account</h1>
            <p className="text-xs text-[#57606A]">
              Signed in as <strong className="font-mono text-[#1B2127]">{user.email}</strong>. This identity is not authorized to edit database records.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={signOut}
              className="flex-1 py-2.5 px-4 bg-[#1B2127] text-white rounded-xl text-xs font-semibold hover:bg-[#2C343E] cursor-pointer"
            >
              Sign Out
            </button>
            <Link
              to="/"
              className="flex-1 py-2.5 px-4 bg-white border border-[#D0D7DE] text-[#1B2127] rounded-xl text-xs font-semibold hover:bg-[#F6F8FA]"
            >
              Go to Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-gray-900 flex flex-col">
      <header className="border-b border-[#D0D7DE] bg-white sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1B2127] text-white flex items-center justify-center font-mono text-xs font-bold">
            ADM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#1B2127]">Vincent Yuann Portfolio CMS</span>
              <span className="px-2 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-[10px] font-mono font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Admin Verified
              </span>
            </div>
            <span className="text-[11px] text-[#6E7E8E] font-mono">{user.email}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#F6F8FA] border border-[#D0D7DE] p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => {
                setActiveTab('projects');
                setStatusMsg(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-white text-[#1B2127] font-bold shadow-xs'
                  : 'text-[#57606A] hover:text-[#1B2127]'
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Projects & Systems ({projects.length})</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('profile');
                setStatusMsg(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-white text-[#1B2127] font-bold shadow-xs'
                  : 'text-[#57606A] hover:text-[#1B2127]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile & Bio</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('resume');
                setStatusMsg(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'resume'
                  ? 'bg-white text-[#1B2127] font-bold shadow-xs'
                  : 'text-[#57606A] hover:text-[#1B2127]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume & LaTeX</span>
            </button>
          </div>

          <Link
            to="/"
            className="flex items-center gap-1 text-xs font-semibold text-[#57606A] hover:text-[#1B2127] bg-white border border-[#D0D7DE] px-3 py-1.5 rounded-xl shadow-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live Site</span>
          </Link>

          <button
            onClick={signOut}
            className="p-2 text-[#57606A] hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-8 space-y-6">
        {statusMsg && (
          <div
            className={`p-4 rounded-xl text-xs flex items-center justify-between gap-3 animate-fadeIn ${
              statusMsg.type === 'success'
                ? 'bg-green-50 text-green-900 border border-green-200'
                : statusMsg.type === 'error'
                ? 'bg-red-50 text-red-900 border border-red-200'
                : 'bg-blue-50 text-blue-900 border border-blue-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMsg.type === 'success' && <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />}
              {statusMsg.type === 'error' && <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />}
              <span className="font-medium">{statusMsg.text}</span>
            </div>
            <button
              onClick={() => setStatusMsg(null)}
              className="text-gray-400 hover:text-gray-700 font-bold cursor-pointer"
            >
              ×
            </button>
          </div>
        )}

        {activeTab === 'projects' ? (
          <div className="bg-white border border-[#D0D7DE] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E1E6EB]">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6E7E8E] mb-1">
                  Select Project Milestone to Edit
                </label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => handleSelectProject(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm bg-[#F6F8FA] border border-[#D0D7DE] rounded-xl font-medium focus:bg-white focus:outline-none focus:border-[#3894B3]"
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

            <div className="flex items-center justify-between p-4 rounded-xl bg-[#F6F8FA] border border-[#E1E6EB]">
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
                <label className="block text-xs font-bold text-[#57606A] mb-1">
                  Project ID (slug identifier)
                </label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="e.g. foodfinder"
                  className="w-full px-3 py-2 border border-[#D0D7DE] rounded-xl bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#57606A] mb-1">
                  Display Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. FoodFinder"
                  className="w-full px-3 py-2 border border-[#D0D7DE] rounded-xl bg-white font-serif font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#57606A] mb-1">
                  Category Tag
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Real-Time Distributed System"
                  className="w-full px-3 py-2 border border-[#D0D7DE] rounded-xl bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#57606A] mb-1">
                  Subtitle Tagline
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Short punchy summary"
                  className="w-full px-3 py-2 border border-[#D0D7DE] rounded-xl bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#57606A] mb-1">
                Executive Problem Statement & Summary
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What problem does this system solve? What was the architectural core?"
                className="w-full px-3 py-2 border border-[#D0D7DE] rounded-xl bg-white text-xs leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#57606A] mb-1">
                Key Architecture Patterns & Highlights (one per line)
              </label>
              <textarea
                rows={3}
                value={highlightsText}
                onChange={(e) => setHighlightsText(e.target.value)}
                placeholder="Sub-30ms WebSocket synchronization...&#10;Prisma 7 relational schema migrations...&#10;Multi-stage Docker CI/CD..."
                className="w-full px-3 py-2 border border-[#D0D7DE] rounded-xl bg-white text-xs leading-relaxed font-mono"
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
                <div className="p-4 bg-[#F6F8FA] border border-[#D0D7DE] rounded-xl text-xs sm:text-sm text-[#24292F] whitespace-pre-line leading-relaxed min-h-[160px]">
                  {detailsMarkdown || 'No markdown content entered.'}
                </div>
              ) : (
                <textarea
                  rows={6}
                  value={detailsMarkdown}
                  onChange={(e) => setDetailsMarkdown(e.target.value)}
                  placeholder="## Architecture Overview&#10;&#10;Detailed breakdown of design patterns, benchmarks, and lessons learned..."
                  className="w-full px-3 py-2.5 border border-[#D0D7DE] rounded-xl bg-white text-xs leading-relaxed font-mono"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#57606A] mb-1">
                Technology Stack Tags (comma-separated, auto-maps Devicon logos)
              </label>
              <input
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="React 19, Socket.IO, PostgreSQL, Prisma, Docker, Jenkins, Python"
                className="w-full px-3 py-2 border border-[#D0D7DE] rounded-xl bg-white text-xs font-mono"
              />
            </div>

            <div className="p-4 bg-[#FAFBFC] border border-[#E1E6EB] rounded-xl space-y-3">
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
                  className="w-full px-3 py-2 border border-[#D0D7DE] rounded-xl font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-[#57606A] mb-1">Live Demo URL</label>
                <input
                  type="text"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-[#D0D7DE] rounded-xl font-mono"
                />
              </div>
            </div>

            <div className="p-4 bg-[#FAFBFC] border border-[#E1E6EB] rounded-xl space-y-3">
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B2127] hover:bg-[#2C343E] text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Project to Supabase</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#D0D7DE] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-[#E1E6EB] pb-4">
              <h2 className="text-lg font-bold text-[#1B2127]">Profile & Personal Information</h2>
              <p className="text-xs text-[#57606A]">
                Synchronized live with <code>public.profile_info</code> in Supabase. Changes appear instantly across the Hero header, status pill, and footer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#57606A] mb-1">Full Name</label>
                <input
                  type="text"
                  value={profName}
                  onChange={(e) => setProfName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D0D7DE] rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-[#57606A] mb-1">Primary Role Title</label>
                <input
                  type="text"
                  value={profRole}
                  onChange={(e) => setProfRole(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D0D7DE] rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-[#57606A] mb-1">Status Availability Pill</label>
                <input
                  type="text"
                  value={profStatus}
                  onChange={(e) => setProfStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D0D7DE] rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-[#57606A] mb-1">Location</label>
                <input
                  type="text"
                  value={profLocation}
                  onChange={(e) => setProfLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D0D7DE] rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#57606A] mb-1">Hero Tagline Headline</label>
              <input
                type="text"
                value={profTagline}
                onChange={(e) => setProfTagline(e.target.value)}
                className="w-full px-3 py-2 border border-[#D0D7DE] rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#57606A] mb-1">Bio / About Paragraph</label>
              <textarea
                rows={4}
                value={profAbout}
                onChange={(e) => setProfAbout(e.target.value)}
                className="w-full px-3 py-2 border border-[#D0D7DE] rounded-xl text-xs leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-[#E1E6EB] pt-4 text-xs font-mono">
              <div>
                <label className="block font-sans font-bold text-[#57606A] mb-1">Contact Email</label>
                <input
                  type="email"
                  value={profEmail}
                  onChange={(e) => setProfEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D0D7DE] rounded-xl"
                />
              </div>

              <div>
                <label className="block font-sans font-bold text-[#57606A] mb-1">GitHub Profile</label>
                <input
                  type="text"
                  value={profGithub}
                  onChange={(e) => setProfGithub(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D0D7DE] rounded-xl"
                />
              </div>

              <div>
                <label className="block font-sans font-bold text-[#57606A] mb-1">LinkedIn Profile</label>
                <input
                  type="text"
                  value={profLinkedin}
                  onChange={(e) => setProfLinkedin(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D0D7DE] rounded-xl"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E1E6EB] flex justify-end">
              <button
                type="button"
                onClick={handleSaveProfile}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B2127] hover:bg-[#2C343E] text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
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
            <div className="bg-white border border-[#D0D7DE] rounded-2xl p-4 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E1E6EB]">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base font-bold text-[#1B2127] flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#3894B3]" />
                      <span>Rendered Resume (PDF)</span>
                    </h3>
                    {/* Live Upload Status Badge */}
                    {pdfUploadStatus.status === 'stored' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-medium font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Deployed in Bucket ({pdfUploadStatus.fileSize})</span>
                      </span>
                    ) : pdfUploadStatus.status === 'checking' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gray-50 border border-gray-200 text-gray-500 text-[11px] font-mono">
                        <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
                        <span>Checking status...</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-mono">
                        <span>Using local fallback (public/resumes/resume.pdf)</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#57606A] mt-1">
                    Upload your compiled PDF to Supabase Storage (<code className="bg-[#F6F8FA] px-1 py-0.5 rounded text-[11px]">portfolio-assets/resumes/resume.pdf</code>).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={currentPdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D0D7DE] bg-white hover:bg-[#F6F8FA] text-xs font-medium text-[#57606A] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Preview Live PDF</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="border-2 border-dashed border-[#D0D7DE] rounded-xl p-6 text-center hover:border-[#3894B3] transition-colors bg-[#F6F8FA]/50">
                  <Upload className="w-8 h-8 text-[#8C959F] mx-auto mb-2" />
                  <p className="text-xs font-semibold text-[#1B2127]">Upload New Resume PDF</p>
                  <p className="text-[11px] text-[#57606A] mt-1 mb-4">Accepts valid compiled .pdf files (Max 15MB)</p>
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B2127] hover:bg-[#3894B3] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all">
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

                <div className="bg-[#F6F8FA] border border-[#D0D7DE] rounded-xl p-4 text-xs space-y-2.5">
                  <div className="font-bold text-[#1B2127]">Storage Status & Diagnostics:</div>
                  <div className="text-[#57606A] space-y-1.5 leading-relaxed font-mono text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#8C959F]">Current Source:</span>
                      <span className="font-semibold text-[#1B2127]">
                        {pdfUploadStatus.status === 'stored' ? 'Supabase Storage' : 'Local Fallback'}
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
            <div className="bg-white border border-[#D0D7DE] rounded-2xl p-4 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E1E6EB]">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base font-bold text-[#1B2127] flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-[#8250DF]" />
                      <span>LaTeX Source Code (.tex)</span>
                    </h3>
                    {/* Live Upload Status Badge */}
                    {texUploadStatus.status === 'stored' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-medium font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Deployed in Bucket ({texUploadStatus.fileSize})</span>
                      </span>
                    ) : texUploadStatus.status === 'checking' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gray-50 border border-gray-200 text-gray-500 text-[11px] font-mono">
                        <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
                        <span>Checking status...</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-mono">
                        <span>Using local fallback (public/resumes/resume.tex)</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#57606A] mt-1">
                    Upload a new <code className="bg-[#F6F8FA] px-1 py-0.5 rounded text-[11px]">.tex</code> file or edit the source directly below.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D0D7DE] bg-white hover:bg-[#F6F8FA] text-xs font-medium text-[#57606A] transition-colors cursor-pointer">
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
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#1B2127] hover:bg-[#3894B3] text-white rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save .tex Code</span>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-[#57606A]">
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
                    className="w-full p-4 border border-[#D0D7DE] rounded-xl font-mono text-xs text-[#1B2127] bg-[#FAFBFD] focus:bg-white focus:outline-hidden focus:border-[#3894B3] leading-relaxed resize-y"
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
