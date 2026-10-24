import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, X, Check, Share2 } from 'lucide-react';
import { ARTICLES, Article } from '../data/portfolioData';

export const ArticlesSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);

  return (
    <section id="articles" className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            Engineering Insights
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white dark:text-white light:text-zinc-950">
            Technical Articles & Deep Dives
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Insights on distributed systems, Arabic RAG architecture, and database security models.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES.map((art) => (
            <article
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/15 hover:border-white/35 transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:scale-[1.01]"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{art.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-zinc-200 transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {art.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-semibold text-white group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Article Reader Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedArticle(null)}
            />
            <div className="relative w-full max-w-2xl bg-zinc-950/98 text-white rounded-3xl p-6 sm:p-8 border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-y-auto max-h-[85vh] z-10 animate-in fade-in zoom-in-95 duration-200 liquid-glass-modal">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
                    <span>{selectedArticle.date}</span>
                    <span>•</span>
                    <span>{selectedArticle.readTime}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {selectedArticle.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-5 text-sm sm:text-base leading-relaxed text-zinc-300">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
                  <span className="text-white font-bold block mb-1">Abstract Summary</span>
                  {selectedArticle.summary}
                </div>

                <div className="space-y-4">
                  <p>{selectedArticle.content}</p>
                  <p className="text-zinc-400 text-sm">
                    In enterprise architectures, achieving sub-second query guarantees across distributed volumes requires precise partitioning boundaries, proactive compaction, and decoupled storage-compute topology.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedArticle.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full bg-white/10 text-xs font-mono text-zinc-300"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setCopiedShare(true);
                      setTimeout(() => setCopiedShare(false), 2000);
                    }}
                    className="px-4 py-2 rounded-full bg-white text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-zinc-200 transition-colors"
                  >
                    {copiedShare ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share Article</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
