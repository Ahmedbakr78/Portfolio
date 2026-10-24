import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Linkedin,
  Github,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Download
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    inquiryType: 'Big Data & Cloud Architecture',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({
        name: '',
        email: '',
        inquiryType: 'Big Data & Cloud Architecture',
        message: '',
      });
    }, 4000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Ahmed Abo Bakr
TITLE:Big Data Engineer & AI Architect
EMAIL:${PERSONAL_INFO.email}
ADR:;;Cairo;;;Egypt
URL:${PERSONAL_INFO.linkedin}
NOTE:Specialist in Apache Spark, Airflow, Kafka, Cloud Architecture & MLOps
END:VCARD`;
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Ahmed_Abo_Bakr.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Zara Fashion / Apple Glass Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            Get in Touch
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-zara">
            Let's Architect Together
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Open for big data consulting, production machine learning pipelines, international leadership, and full-time senior roles.
          </p>
        </div>

        {/* Liquid Glass Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info & VCard Card */}
          <div className="md:col-span-5 p-6 sm:p-8 rounded-3xl liquid-glass space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2 font-zara">
                Direct Channels
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Connect directly or download my verified digital business card for your address book.
              </p>
            </div>

            <div className="space-y-4 text-xs font-mono">
              {/* Email item */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5 truncate">
                  <Mail className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  <div className="truncate">
                    <span className="text-[10px] text-zinc-500 block">PRIMARY EMAIL</span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-white hover:underline truncate"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-300 transition-colors"
                  title="Copy email address"
                  aria-label="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Location */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-zinc-500 block">LOCATION</span>
                  <span className="text-white">{PERSONAL_INFO.location}</span>
                </div>
              </div>

              {/* Social links */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center gap-2 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-zinc-300" />
                  <span className="text-xs font-sans font-medium">LinkedIn</span>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4 text-zinc-300" />
                  <span className="text-xs font-sans font-medium">GitHub</span>
                </a>
              </div>
            </div>

            {/* vCard Button */}
            <div className="pt-2">
              <button
                onClick={handleDownloadVCard}
                className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Save Contact vCard (.vcf)</span>
              </button>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="md:col-span-7 p-6 sm:p-8 rounded-3xl liquid-glass">
            <h3 className="text-xl font-bold text-white mb-2 font-zara">
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              Inquire about big data pipelines, machine learning consulting, or general collaborations.
            </p>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-white/10 border border-white/25 text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-white mx-auto" />
                <h4 className="text-lg font-bold text-white font-zara">Message Dispatched</h4>
                <p className="text-xs sm:text-sm text-zinc-300">
                  Thank you! Your note has been simulated and forwarded. Ahmed Abo Bakr will reply promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-zinc-400 block">
                      YOUR FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-black/50 border border-white/15 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-zinc-400 block">
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-black/50 border border-white/15 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-400 block">
                    PROJECT FOCUS / DOMAIN
                  </label>
                  <select
                    value={formState.inquiryType}
                    onChange={(e) => setFormState({ ...formState, inquiryType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-white/50"
                  >
                    <option value="Big Data & Cloud Architecture">Big Data & Cloud Architecture</option>
                    <option value="Real-time Streaming & Kafka">Real-time Streaming & Kafka</option>
                    <option value="AI & MLOps Engineering">AI & MLOps Engineering</option>
                    <option value="Database Security & RBAC">Database Security & RBAC</option>
                    <option value="Full-Time Senior Opportunity">Full-Time Senior Opportunity</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-zinc-400 block">
                    MESSAGE CONTENT
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your architecture requirements, timeline, or position details..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full p-4 rounded-2xl bg-black/50 border border-white/15 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-white text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
