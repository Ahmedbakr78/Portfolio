import React, { useState } from 'react';
import {
  Award,
  Search,
  Copy,
  Check,
  ShieldCheck,
  X
} from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { formatCredentialId } from '../utils/portfolioLogic';

export const CertificationsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedIssuer, setSelectedIssuer] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'All',
    'AI & ML',
    'Big Data & Cloud',
    'Data & BI',
    'Software Engineering',
    'Security & Governance',
    'Global & UN'
  ];

  const topIssuers = ['All', 'Google', 'Microsoft', 'Duke University', 'University of Oxford', 'UNICEF', 'United Nations', 'IBM'];

  // Filter certifications
  const filteredCerts = CERTIFICATIONS.filter((cert) => {
    const matchesCategory = selectedCategory === 'All' || cert.category === selectedCategory;
    const matchesIssuer = selectedIssuer === 'All' || cert.issuer.toLowerCase().includes(selectedIssuer.toLowerCase());
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      query === '' ||
      cert.title.toLowerCase().includes(query) ||
      cert.issuer.toLowerCase().includes(query) ||
      (cert.credentialId && cert.credentialId.toLowerCase().includes(query)) ||
      cert.skills.some((s) => s.toLowerCase().includes(query));

    return matchesCategory && matchesIssuer && matchesQuery;
  });

  const handleCopyCredential = (id?: string) => {
    if (!id) return;
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="certifications" className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Verified Qualifications
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            73+ Certifications & Credentials
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Rigorous certifications across artificial intelligence, distributed cloud infrastructure, big data governance, and international institutions.
          </p>
        </div>

        {/* Global Summary Stats — Pure Black & White */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl glass-panel border border-white/15 text-center">
            <span className="block text-2xl font-mono font-bold text-white">73</span>
            <span className="text-xs text-zinc-400 font-medium">Total Accreditations</span>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-white/15 text-center">
            <span className="block text-2xl font-mono font-bold text-white">100%</span>
            <span className="text-xs text-zinc-400 font-medium">Verified Credentials</span>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-white/15 text-center">
            <span className="block text-2xl font-mono font-bold text-white">8+</span>
            <span className="text-xs text-zinc-400 font-medium">Global Disciplines</span>
          </div>
          <div className="p-4 rounded-2xl glass-panel border border-white/15 text-center">
            <span className="block text-2xl font-mono font-bold text-white">Oxford & Google</span>
            <span className="text-xs text-zinc-400 font-medium">Premier Issuers</span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                    selectedCategory === cat
                      ? 'bg-white text-black shadow-sm'
                      : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search credential, ID, skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/50 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Issuer Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono text-zinc-400">
            <span className="text-zinc-500 mr-1 text-[11px]">Issuer:</span>
            {topIssuers.map((issuer) => (
              <button
                key={issuer}
                onClick={() => setSelectedIssuer(issuer)}
                className={`px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap transition-colors ${
                  selectedIssuer === issuer
                    ? 'bg-white/20 text-white font-bold border border-white/30'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {issuer}
              </button>
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="text-xs font-mono text-zinc-400 flex items-center justify-between">
          <span>Found {filteredCerts.length} certifications</span>
          {(selectedCategory !== 'All' || selectedIssuer !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedIssuer('All');
                setSearchQuery('');
              }}
              className="text-white underline hover:text-zinc-300"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCerts.map((cert) => {
            const isCopied = copiedId === cert.credentialId;
            return (
              <div
                key={cert.id}
                className="p-5 rounded-3xl glass-panel border border-white/15 hover:border-white/30 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-zinc-300 border border-white/10">
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {cert.date}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-zinc-200 transition-colors leading-snug">
                    {cert.title}
                  </h3>

                  {/* Skills Tag Pills */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {cert.skills.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-zinc-400"
                      >
                        {s}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-500">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Credential Verification Footer */}
                <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] truncate">
                    <ShieldCheck className="w-3.5 h-3.5 text-white flex-shrink-0" />
                    <span className="truncate" title={cert.credentialId || 'Verified'}>
                      {formatCredentialId(cert.credentialId)}
                    </span>
                  </div>

                  {cert.credentialId && (
                    <button
                      onClick={() => handleCopyCredential(cert.credentialId)}
                      className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1 text-[11px] ${
                        isCopied
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-white/5 hover:bg-white/15 text-zinc-300 border-white/10'
                      }`}
                      title="Copy Credential ID"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span className="text-[10px]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span className="text-[10px] hidden sm:inline">Copy ID</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
