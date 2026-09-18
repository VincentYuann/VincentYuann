import React, { useState, useRef } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, Paperclip, X, FileText, ShieldCheck } from 'lucide-react';
import '../styles/contact-page.css';

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

    // Honeypot spam check
    if (honeypot) {
      console.warn('Spam submission detected via honeypot.');
      setIsSubmitted(true);
      return;
    }

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
      <div className={`contact-success-card ${className}`}>
        <div className="contact-success-icon-badge">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div className="space-y-1.5">
          <h4 className="contact-success-title">Inquiry Dispatched Successfully!</h4>
          <p className="contact-success-desc">
            Thank you for reaching out. Your message and details have been delivered directly to Vincent's email via Resend. You will receive a response promptly.
          </p>
        </div>
        <div className="pt-2">
          <button
            onClick={() => setIsSubmitted(false)}
            className="contact-success-btn"
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
      className={`contact-form-card ${className}`}
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

      <div className="contact-form-header">
        <h3 className="contact-form-title">
          <Mail className="w-4 h-4 text-accent" />
          <span>Send a Direct Message / Hire Inquiry</span>
        </h3>
        <p className="contact-form-desc">
          Have an open role, an architectural challenge, or a contract in mind? Deliver a direct message with optional specs or documents attached.
        </p>
      </div>

      <div className="contact-form-grid">
        {/* Name Input */}
        <div>
          <label className="contact-form-label">
            Your Name <span className="contact-form-required">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ada Lovelace"
            className="contact-form-input"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="contact-form-label">
            Your Email <span className="contact-form-required">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ada@company.com"
            className="contact-form-input"
          />
        </div>
      </div>

      {/* Message Textarea */}
      <div>
        <label className="contact-form-label">
          Message <span className="contact-form-required">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hi Vincent, we came across your work and are looking for someone to help build..."
          className="contact-form-textarea"
        />
      </div>

      {/* Optional File Attachment */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-foreground">
          File Attachment <span className="text-muted-foreground font-normal">(Optional — Job Spec, Resume, Architecture Diagram up to 5MB)</span>
        </label>

        {attachment ? (
          <div className="contact-attachment-preview">
            <div className="flex items-center gap-2 truncate">
              <FileText className="w-4 h-4 shrink-0 text-accent" />
              <span className="font-semibold truncate">{attachment.filename}</span>
              <span className="text-muted-foreground font-mono text-[11px]">({formatFileSize(attachment.size)})</span>
            </div>
            <button
              type="button"
              onClick={removeAttachment}
              className="p-1 hover:bg-muted rounded-sm text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
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
              className="contact-upload-trigger-btn"
            >
              <Paperclip className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Attach a Document / PDF</span>
            </label>
            <span className="text-[11px] text-muted-foreground">PDF, DOCX, PNG, JPG under 5MB</span>
          </div>
        )}

        {fileError && (
          <p className="text-[11px] text-destructive font-medium">{fileError}</p>
        )}
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="contact-error-banner">
          <AlertCircle className="w-4 h-4 shrink-0 text-destructive" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Submit Button & Security Assurance */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-border">
        <button
          type="submit"
          disabled={isSubmitting}
          className="contact-submit-btn"
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

        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <ShieldCheck className="w-3.5 h-3.5 text-accent" />
          <span>Server-side rate limited & spam protected</span>
        </div>
      </div>
    </form>
  );
};
