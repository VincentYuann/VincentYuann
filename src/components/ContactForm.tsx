import React, { useState, useRef } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, Paperclip, X, FileText, ShieldCheck } from 'lucide-react';

interface ContactFormProps {
  className?: string;
  defaultSubject?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  className = '',
  defaultSubject = 'Job / Contract Opportunity',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [attachment, setAttachment] = useState<{ filename: string; content: string; size: number } | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size exceeds the 5MB limit. Please attach a smaller file.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Content = (reader.result as string).split(',')[1];
      setAttachment({
        filename: file.name,
        content: base64Content,
        size: file.size,
      });
    };
    reader.onerror = () => {
      setFileError('Could not process this file. Please try another format.');
    };
    reader.readAsDataURL(file);
  };

  const removeAttachment = () => {
    setAttachment(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic client validation
    if (!name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setErrorMessage('Please write a message with at least 10 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const edgeFunctionUrl = 'https://pqowefuwzxcrfzmnubvo.supabase.co/functions/v1/send-contact-email';

      const res = await fetch(edgeFunctionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: defaultSubject.trim(),
          message: message.trim(),
          attachment: attachment ? { filename: attachment.filename, content: attachment.content } : undefined,
          honeypot: honeypot || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to deliver message.');
      }

      setIsSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      removeAttachment();
    } catch (err: any) {
      console.error('Error submitting contact message:', err);
      setErrorMessage(
        err.message || 'An unexpected error occurred. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`p-8 sm:p-10 bg-white border border-[#D0D7DE] rounded-2xl text-center space-y-5 shadow-xs ${className}`}>
        <div className="w-14 h-14 rounded-2xl bg-green-50 border border-green-200 text-green-700 flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div className="space-y-1.5">
          <h4 className="text-lg font-serif font-bold text-[#1B2127]">Inquiry Dispatched Successfully!</h4>
          <p className="text-xs text-[#57606A] max-w-md mx-auto leading-relaxed">
            Thank you for reaching out. Your message and details have been delivered directly to Vincent's email via Resend. You will receive a response promptly.
          </p>
        </div>
        <div className="pt-2">
          <button
            onClick={() => setIsSubmitted(false)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#1B2127] hover:bg-[#2C343E] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white border border-[#D0D7DE] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5 text-left ${className}`}
    >
      {/* Honeypot Spam Trap (Hidden) */}
      <input
        type="text"
        name="_hp"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="space-y-1 pb-2 border-b border-[#E1E6EB]">
        <h3 className="text-base font-bold text-[#1B2127] flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#3894B3]" />
          <span>Send a Direct Message / Hire Inquiry</span>
        </h3>
        <p className="text-xs text-[#57606A]">
          Have an open role, an architectural challenge, or a contract in mind? Deliver a direct message with optional specs or documents attached.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name Input */}
        <div>
          <label className="block text-xs font-semibold text-[#57606A] mb-1.5">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ada Lovelace"
            className="w-full px-3.5 py-2.5 text-xs bg-[#F6F8FA] border border-[#D0D7DE] rounded-xl focus:bg-white focus:outline-none focus:border-[#3894B3] transition-colors"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-xs font-semibold text-[#57606A] mb-1.5">
            Your Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ada@company.com"
            className="w-full px-3.5 py-2.5 text-xs bg-[#F6F8FA] border border-[#D0D7DE] rounded-xl focus:bg-white focus:outline-none focus:border-[#3894B3] transition-colors"
          />
        </div>
      </div>

      {/* Message Textarea */}
      <div>
        <label className="block text-xs font-semibold text-[#57606A] mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hi Vincent, we came across your work and are looking for someone to help build..."
          className="w-full px-3.5 py-2.5 text-xs bg-[#F6F8FA] border border-[#D0D7DE] rounded-xl focus:bg-white focus:outline-none focus:border-[#3894B3] transition-colors resize-y leading-relaxed font-sans"
        />
      </div>

      {/* Optional File Attachment */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#57606A]">
          File Attachment <span className="text-[#8C959F] font-normal">(Optional — Job Spec, Resume, Architecture Diagram up to 5MB)</span>
        </label>

        {attachment ? (
          <div className="flex items-center justify-between p-3 bg-[#F0F7FA] border border-[#A0D8E9] rounded-xl text-xs text-[#2B6D83]">
            <div className="flex items-center gap-2 truncate">
              <FileText className="w-4 h-4 shrink-0 text-[#3894B3]" />
              <span className="font-semibold truncate">{attachment.filename}</span>
              <span className="text-[#57606A] font-mono text-[11px]">({formatFileSize(attachment.size)})</span>
            </div>
            <button
              type="button"
              onClick={removeAttachment}
              className="p-1 hover:bg-white rounded-lg text-[#57606A] hover:text-red-600 transition-colors cursor-pointer"
              title="Remove attachment"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt"
              className="hidden"
              id="file-upload-input"
            />
            <label
              htmlFor="file-upload-input"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#F6F8FA] hover:bg-[#E1E6EB] border border-[#D0D7DE] rounded-xl text-xs font-semibold text-[#1B2127] cursor-pointer shadow-xs transition-colors"
            >
              <Paperclip className="w-3.5 h-3.5 text-[#57606A]" />
              <span>Attach a Document / PDF</span>
            </label>
            <span className="text-[11px] text-[#8C959F]">PDF, DOCX, PNG, JPG under 5MB</span>
          </div>
        )}

        {fileError && (
          <p className="text-[11px] text-red-600 font-medium">{fileError}</p>
        )}
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-3.5 bg-red-50 text-red-900 border border-red-200 rounded-xl text-xs flex items-center gap-2.5 animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Submit Button & Security Assurance */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#E1E6EB]">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1B2127] hover:bg-[#2C343E] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Delivering to Inbox...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Deliver Message to Vincent</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1.5 text-[11px] text-[#6E7E8E]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#3894B3]" />
          <span>Server-side rate limited & spam protected</span>
        </div>
      </div>
    </form>
  );
};
