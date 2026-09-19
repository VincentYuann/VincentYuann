import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { sendContactMessage } from '../lib/supabase';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Full-Stack / AI Opportunity');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formName = (formData.get('name') as string) || name;
    const formEmail = (formData.get('email') as string) || email;
    const formTopic = (formData.get('topic') as string) || topic;
    const formMessage = (formData.get('message') as string) || message;

    if (!formName || !formEmail || !formMessage) return;

    setStatus('sending');
    const res = await sendContactMessage({
      name: formName,
      email: formEmail,
      topic: formTopic,
      message: formMessage,
    });

    if (res.success) {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 6000);
    } else {
      setStatus('error');
      setErrorMessage(res.error || 'Failed to submit message.');
    }
  };

  return (
    <section id="contact" className="w-full max-w-7xl mx-auto px-6 py-12 lg:py-16 mb-8">
      <div className="relative bg-light-surface-card dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-8 sm:p-12 overflow-hidden shadow-akari dark:shadow-night-glow">
        {/* Sumi-e Mountain Mask Backdrop */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-3/5 select-none overflow-hidden opacity-15 dark:opacity-10">
          <img
            src="/images/washi-paper-texture.jpg"
            alt="Misty landscape background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Narrative & Direct Links */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <div className="flex items-center gap-2.5">
              <img
                src="/stitch/hanko-stamp.svg"
                alt="Hanko Seal"
                className="h-6 w-6 object-contain"
              />
              <span className="font-serif text-terracotta text-sm">原 //</span>
              <span className="font-sans text-[11px] font-semibold text-light-ink-subtle dark:text-dark-ink-subtle uppercase tracking-widest">
                INITIATE A DIALOGUE
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-light-ink dark:text-dark-ink leading-tight">
              Interested in building something deliberate together?
            </h2>

            <p className="font-sans text-sm sm:text-base text-light-ink-muted dark:text-dark-ink-muted leading-relaxed">
              Currently open to Senior / Lead Full-Stack Engineering, Generative AI Systems design, and high-impact
              advisory ventures. Let us discuss possibilities over a cup of tea or a message.
            </p>

            {/* Direct Contact Links */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="mailto:vincent@yuann.dev"
                className="inline-flex items-center gap-2 px-5 py-3 bg-terracotta hover:bg-terracotta-hover text-white font-sans text-sm font-medium rounded-md shadow-xs transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>vincent@yuann.dev</span>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 bg-light-surface-raised dark:bg-dark-surface-raised border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink font-sans text-xs font-medium rounded-md hover:border-light-border-strong dark:hover:border-dark-border-strong transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 bg-light-surface-raised dark:bg-dark-surface-raised border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink font-sans text-xs font-medium rounded-md hover:border-light-border-strong dark:hover:border-dark-border-strong transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Inquiries Form */}
          <div className="lg:col-span-6 w-full bg-light-surface-raised dark:bg-dark-surface-muted/90 p-6 sm:p-8 rounded-lg border border-light-border/70 dark:border-dark-border/70 shadow-sm">
            <h3 className="font-serif text-lg text-light-ink dark:text-dark-ink mb-1">
              Send a Message
            </h3>
            <p className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted mb-5">
              Messages are routed directly to Vincent's engineering console via Supabase.
            </p>

            {status === 'success' ? (
              <div className="p-5 rounded bg-bamboo/10 border border-bamboo/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-bamboo mx-auto" />
                <h4 className="font-serif text-base text-light-ink dark:text-dark-ink">
                  Thank You for Reaching Out
                </h4>
                <p className="font-sans text-xs text-light-ink-muted dark:text-dark-ink-muted">
                  Your transmission was received with care. Vincent will respond promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block font-sans text-xs font-medium text-light-ink dark:text-dark-ink mb-1">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Kenji Tanaka"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded text-sm bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink focus:outline-none focus:border-terracotta transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block font-sans text-xs font-medium text-light-ink dark:text-dark-ink mb-1">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="e.g. kenji@studio.jp"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded text-sm bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink focus:outline-none focus:border-terracotta transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-topic" className="block font-sans text-xs font-medium text-light-ink dark:text-dark-ink mb-1">
                    Inquiry Focus
                  </label>
                  <select
                    id="contact-topic"
                    name="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3 py-2 rounded text-sm bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink focus:outline-none focus:border-terracotta transition-colors"
                  >
                    <option>Full-Stack / AI Opportunity</option>
                    <option>Advisory / Architectural Consulting</option>
                    <option>Open Source Collaboration</option>
                    <option>General Inquiry / Tea Dialogue</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block font-sans text-xs font-medium text-light-ink dark:text-dark-ink mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Briefly describe what you would like to create or explore together..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded text-sm bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-ink dark:text-dark-ink focus:outline-none focus:border-terracotta transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-xs text-red-500">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-2.5 px-4 rounded font-sans text-sm font-medium bg-light-button-dark dark:bg-dark-button-light text-light-on-dark dark:text-dark-on-light hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{status === 'sending' ? 'Transmitting...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
