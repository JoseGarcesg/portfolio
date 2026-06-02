import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Skill } from '../types';
import Icon from './Icon';

interface SkillsProps {
  skills: Skill[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Frontend', 'Backend', 'Design', 'Tools'];

  // Filter skills based on selected category (case-insensitive to handle Strapi data)
  const filteredSkills = selectedCategory === 'Todos'
    ? skills
    : skills.filter(skill => skill.category?.toLowerCase() === selectedCategory.toLowerCase());

  const translateCategory = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'todos': return 'Todos';
      case 'frontend': return 'Frontend';
      case 'backend': return 'Backend (CMS)';
      case 'design': return 'UI/UX Diseño';
      case 'tools': return 'Herramientas';
      default: return cat;
    }
  };

  return (
    <section id="skills" className="py-24 bg-transparent relative font-sans">
      {/* Glow highlight inside bounds */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Title */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            Habilidades
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Especialización Técnica &amp; Creativa
          </h2>
          <p className="text-slate-300 text-sm max-w-lg">
            Combinando el código riguroso con la intuición visual para producir productos sobresalientes.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold tracking-wide rounded-xl border transition-all duration-300 cursor-pointer ${selectedCategory === cat
                  ? 'bg-white border-white/20 text-slate-900 shadow-xl font-bold'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:text-white backdrop-blur-md'
                }`}
            >
              {translateCategory(cat)}
            </button>
          ))}
        </div>

        {/* Dynamic Interactive Grid using Framer Motion Layout animations */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={skill.name}
                id={`skill-card-${idx}`}
                className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 shadow-xl flex flex-col gap-4 group transition-colors duration-300 relative overflow-hidden"
              >
                {/* Background faint gradient shine */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-3xl pointer-events-none group-hover:from-white/10 transition-all duration-300" />

                <div className="flex items-center gap-3.5">
                  {/* Skill icon sphere */}
                  <span className="p-3 rounded-xl bg-white/5 border border-white/10 text-indigo-300 group-hover:text-white group-hover:bg-white/10 transition-all duration-300">
                    <Icon name={skill.icon} className="w-5 h-5" />
                  </span>

                  <div className="flex-1">
                    <h4 className="font-semibold text-white group-hover:text-indigo-300 text-sm sm:text-base leading-tight transition-colors">
                      {skill.name}
                    </h4>
                    <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-medium">
                      {skill.category}
                    </span>
                  </div>

                  {/* Numeric Badge */}
                  <span className="text-xs font-mono font-bold text-slate-350 group-hover:text-white transition-colors">
                    {skill.level}%
                  </span>
                </div>

                {/* Level slider bar container */}
                <div className="space-y-1.5">
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full"
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span>Iniciante</span>
                    <span>Proficiente</span>
                    <span>Sénior</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
export default Skills;
