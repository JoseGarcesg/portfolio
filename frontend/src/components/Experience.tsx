import React from 'react';
import { motion } from 'motion/react';
import { Experience } from '../types';
import Icon from './Icon';

interface ExperienceProps {
  experience: Experience[];
}

export const ExperienceList: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <section id="experiencia" className="py-24 bg-transparent relative overflow-hidden font-sans">
      {/* Decorative gradient overlay inside bounds */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-rose-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-3 mb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            Trayectoria Profesional
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experiencia Laboral
          </h2>
          <p className="text-slate-300 text-sm max-w-lg">
            Aportando soluciones digitales para startups y estudios creativos corporativos.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-white/10 px-2 sm:px-8 space-y-12 ml-4">
          {experience.map((exp, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              key={idx}
              id={`experience-timeline-item-${idx}`}
              className="relative pl-6 sm:pl-10 group"
            >
              {/* Timeline Bullet Node with dynamic glow */}
              <span className="absolute left-0 -translate-x-[25px] top-1.5 w-[14px] h-[14px] bg-[#0f172a] rounded-full border border-indigo-500 group-hover:bg-rose-500 group-hover:border-rose-550 group-hover:scale-125 transition-all duration-300 z-10" />

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/20 shadow-xl transition-all duration-300 relative overflow-hidden">
                
                {/* Visual Glass Shimmer back-glow on card */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-rose-500/0 to-transparent group-hover:from-indigo-500/2 group-hover:via-rose-500/1 to-transparent transition-all duration-500 pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-5">
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-200 font-medium pb-1">
                      <span className="text-indigo-400 font-bold">@</span>
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  {/* Date Pill badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold font-mono text-slate-350 h-fit w-fit">
                    <Icon name="calendar" className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                {/* Achievements block */}
                <ul className="space-y-3.5 mb-6 text-slate-300 text-xs sm:text-sm font-normal">
                  {exp.description.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex gap-2.5 items-start">
                      <span className="text-indigo-400 mt-1 flex-shrink-0 font-bold">›</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills/Tools list row */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mr-2 self-center">APLICADO:</span>
                  {exp.skills.map((skillItem, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 text-[11px] font-semibold font-mono rounded-lg bg-white/5 text-slate-300 border border-white/10 group-hover:border-white/20 group-hover:text-white transition-all"
                    >
                      {skillItem}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default ExperienceList;
