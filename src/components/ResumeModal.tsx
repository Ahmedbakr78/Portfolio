import React from 'react';
import { X, Printer, Download, MapPin, Mail, Linkedin, Github, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, CERTIFICATIONS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* High-Contrast Backdrop with Blur */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Dialog — Solid 98% Opacity Window */}
      <div className="relative w-full max-w-3xl bg-zinc-950/98 text-white rounded-3xl p-6 sm:p-10 border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-y-auto max-h-[90vh] z-10 animate-in fade-in zoom-in-95 duration-200 liquid-glass-modal">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-white font-bold">
              CURRICULUM VITAE
            </span>
            <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
              Verified Candidate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-full bg-white text-black font-bold text-xs flex items-center gap-1.5 hover:bg-zinc-200 transition-colors shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white"
              aria-label="Close resume"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Body */}
        <div className="mt-8 space-y-8 print:text-black print:bg-white print:p-0">
          {/* Header */}
          <div className="space-y-2 pb-6 border-b border-white/10 print:border-black/20">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white print:text-black">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-base sm:text-lg font-medium text-zinc-300 print:text-zinc-800">
              {PERSONAL_INFO.title} • {PERSONAL_INFO.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-zinc-400 print:text-zinc-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {PERSONAL_INFO.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> {PERSONAL_INFO.email}
              </span>
              <span>•</span>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="underline">
                LinkedIn Profile
              </a>
              <span>•</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="underline">
                GitHub: Ahmedbakr78
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold print:text-zinc-700">
              Professional Summary
            </h2>
            <p className="text-sm text-zinc-300 print:text-zinc-800 leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-5">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold print:text-zinc-700">
              Professional Experience
            </h2>

            {EXPERIENCES.map((exp) => (
              <div key={exp.role} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                  <span className="font-bold text-white print:text-black">
                    {exp.role} — <span className="font-semibold text-zinc-300 print:text-zinc-700">{exp.company}</span>
                  </span>
                  <span className="text-xs font-mono text-zinc-400 print:text-zinc-600">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 print:text-zinc-700">
                  {exp.description}
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs text-zinc-300 print:text-zinc-800">
                  {exp.achievements.map((ach, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {ach}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold print:text-zinc-700">
              Education
            </h2>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-white print:text-black">
                {PERSONAL_INFO.education.institution} — B.S. in {PERSONAL_INFO.education.degree}
              </span>
              <span className="text-xs font-mono font-bold text-white print:text-black">
                {PERSONAL_INFO.education.gpa}
              </span>
            </div>
            <p className="text-xs text-zinc-400 print:text-zinc-700">
              {PERSONAL_INFO.education.description}
            </p>
          </div>

          {/* Key Verified Certifications */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold print:text-zinc-700">
              Featured Accreditations (Selection of 73 Verified)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {CERTIFICATIONS.filter((c) => c.featured).slice(0, 10).map((c) => (
                <div
                  key={c.id}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 print:border-black/10 print:bg-transparent"
                >
                  <span className="font-bold text-white print:text-black block">{c.title}</span>
                  <span className="text-[11px] font-mono text-zinc-400 print:text-zinc-600">
                    {c.issuer} • ID: {c.credentialId || 'Verified'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Close Button Bottom */}
        <div className="mt-8 pt-6 border-t border-white/10 flex justify-end no-print">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors"
          >
            Close Resume
          </button>
        </div>
      </div>
    </div>
  );
};
