import React from 'react';
import { Briefcase, Calendar, CheckCircle2, Building, ChevronRight, Award } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            Career Milestones
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white dark:text-white light:text-zinc-950">
            Work History & Leadership
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Proven track record founding sovereign decentralized platforms, engineering database security, and deploying automated ML engines.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-6">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={exp.role}
              className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/15 hover:border-white/30 transition-all duration-200 relative overflow-hidden group"
            >
              {/* Highlight ribbon on top position */}
              {index === 0 && (
                <div className="absolute top-0 right-0 px-4 py-1 bg-white text-black font-mono text-[10px] font-bold uppercase tracking-widest rounded-bl-xl">
                  Current Venture
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                      {exp.role}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1 font-medium">
                    <Building className="w-4 h-4 text-zinc-300" />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-zinc-300 self-start sm:self-auto">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="mt-4 text-sm text-zinc-300 leading-relaxed font-normal">
                {exp.description}
              </p>

              {/* Bullet Achievements */}
              <div className="mt-5 space-y-2.5">
                {exp.achievements.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              {/* Tech Tags */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
