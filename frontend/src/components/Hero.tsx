import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Profile, SocialLink } from '../types';
import Icon from './Icon';

interface HeroProps {
  profile: Profile;
  socials: SocialLink[];
}

export const Hero: React.FC<HeroProps> = ({ profile, socials }) => {
  // Safe image path hook with error handler
  const [imageError, setImageError] = useState(false);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden font-sans">
      {/* Background Decorative Mesh Shapes inside Hero bounds */}
      <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[40%] w-[350px] h-[350px] bg-rose-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Profile Content Column */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-indigo-300 font-semibold mb-6 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400"></span>
            </span>
            {profile.status}
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6.5xl font-extrabold tracking-tight text-white leading-none animate-fade-in"
          >
            Hola, soy{' '}
            <span className="bg-gradient-to-r from-white via-indigo-200 to-rose-300 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-2xl font-semibold text-slate-350 mt-3.5 tracking-wide"
          >
            {profile.role}
          </motion.h2>

          {/* Intro Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-300 text-sm sm:text-base mt-6 max-w-xl leading-relaxed font-normal"
          >
            {profile.description}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-400 text-xs sm:text-sm mt-3 max-w-xl leading-relaxed"
          >
            {profile.longDescription}
          </motion.p>

          {/* Action Callouts */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto"
          >
            {/* View Interactive CV Button that triggers resumeUrl download */}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-sm transition-all duration-300 backdrop-blur-md shadow-2xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Icon name="Download" className="w-4 h-4 text-indigo-300" />
              Ver Curriculum (Descarga)
            </a>

            {/* Direct Scroll to Experience */}
            <button
              onClick={() => {
                const el = document.getElementById('experiencia');
                if (el) {
                  const offsetTop = el.offsetTop - 80;
                  document.body.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-rose-500 hover:opacity-95 text-white font-bold text-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer shadow-indigo-550/10"
            >
              Consultar Mi Experiencia
              <Icon name="ChevronDown" className="w-4 h-4 animate-bounce" />
            </button>
          </motion.div>

          {/* Social Links Row (Instant fulfill "redes como github linkedin e instagram") */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-3.5 mt-10"
          >
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest mr-2">Conectar:</span>
            {socials.map((social, idx) => {
              if (social.platform === 'email') return null; // Email icon is handled elsewhere
              return (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-indigo-500/5 group"
                  title={social.label}
                >
                  <Icon name={social.platform} className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              );
            })}
          </motion.div>
        </div>

        {/* Floating Creative Portrait Column */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Ambient Neon Backlight Glow */}
            <div className="absolute inset-0.5 rounded-full bg-gradient-to-tr from-indigo-550 to-rose-550 blur-2xl opacity-45 animate-pulse" />

            {/* Circular Frame Container */}
            <div className="relative w-72 h-72 sm:w-85 sm:h-85 rounded-full p-1 bg-gradient-to-tr from-indigo-500 to-rose-500 shadow-2xl overflow-hidden aspect-square">
              {/* Inner bezel */}
              <div className="w-full h-full rounded-full bg-[#0a0f1d] overflow-hidden flex items-center justify-center">
                {!imageError && profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover select-none object-center hover:scale-105 transition-transform duration-500"
                    onError={() => setImageError(true)}
                    referrerPolicy="no-referrer"
                    id="profile-avatar-img"
                  />
                ) : (
                  // Elegant vector fallback silhouette if avatar load fails
                  <div className="w-full h-full bg-[#0d1425] flex flex-col items-center justify-center p-6 text-center">
                    <span className="text-5xl mb-4 text-indigo-400 select-none">💻</span>
                    <span className="text-xl font-bold text-white leading-tight">{profile.name[0]}</span>
                    <span className="text-xs text-slate-400 mt-1">{profile.role}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Location Pill Overlay */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-2 -right-2 bg-white/5 backdrop-blur-md border border-white/10 shadow-xl py-2 px-3.5 rounded-2xl flex items-center gap-2"
            >
              <Icon name="MapPin" className="w-3.5 h-3.5 text-rose-500" />
              <span className="text-xs font-semibold text-slate-250 tracking-wide">{profile.location}</span>
            </motion.div>
          </motion.div>
        </div>

      </div>


    </section>
  );
};
export default Hero;
