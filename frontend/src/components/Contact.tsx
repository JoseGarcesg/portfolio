import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Profile, SocialLink } from '../types';
import Icon from './Icon';

interface ContactProps {
  profile: Profile;
  socials: SocialLink[];
}

export const Contact: React.FC<ContactProps> = ({ profile, socials }) => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim() || !messageInput.trim()) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate sending an email or connecting to a custom backend route/service
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setNameInput('');
      setEmailInput('');
      setMessageInput('');
    }, 1500);
  };

  return (
    <section id="contacto" className="py-24 bg-transparent relative overflow-hidden font-sans">
      {/* Decorative gradient spot inside bounds */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center space-y-3 mb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            Contáctame
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ¿Comenzamos un Proyecto?
          </h2>
          <p className="text-slate-300 text-sm max-w-lg">
            Escríbeme directamente o conéctate a través de mis redes para cotizaciones y colaboraciones.
          </p>
        </div>

        {/* Form and info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-14">
          
          {/* Left Column: Direct info panels */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-2xl font-bold text-white tracking-tight">Canales Directos</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Siempre estoy interesada en escuchar sobre nuevas oportunidades, participar en proyectos de código abierto o simplemente charlar sobre tendencias de Front-End y CMS.
            </p>

            <div className="space-y-4">
              {/* Email Card (Instant link to email) */}
              <div className="p-4.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center gap-4 hover:border-white/20 hover:bg-white/10 transition-all group">
                <span className="p-3 bg-white/5 rounded-xl border border-white/10 text-indigo-300 group-hover:bg-white/15 transition-colors">
                  <Icon name="email" className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Mi Correo Electrónico</h4>
                  <a href={`mailto:${profile.email}`} className="text-sm font-semibold text-white hover:text-indigo-300 transition-colors">
                    {profile.email}
                  </a>
                </div>
              </div>

              {/* Location card */}
              <div className="p-4.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center gap-4">
                <span className="p-3 bg-white/5 rounded-xl border border-white/10 text-rose-500">
                  <Icon name="MapPin" className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Ubicación</h4>
                  <p className="text-sm font-semibold text-white">{profile.location}</p>
                </div>
              </div>
            </div>

            {/* Social Grid section showing Github, Linkedin, Instagram block */}
            <div className="space-y-3.5 pt-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-455">Mis Canales Sociales</h4>
              <div className="flex gap-3">
                {socials.map((soc, index) => {
                  if (soc.platform === 'email') return null;
                  return (
                    <a
                      key={index}
                      href={soc.url}
                      target="_blank"
                      rel="noreferrer"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-xs font-bold text-slate-300 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer backdrop-blur-md"
                    >
                      <Icon name={soc.platform} className="w-4 h-4 text-indigo-300" />
                      <span>{soc.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Interactive Form */}
          <div className="lg:col-span-7 bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl">
            <h3 className="text-xl font-bold text-white tracking-tight mb-6 flex items-center gap-2">
              <Icon name="Sparkles" className="w-5 h-5 text-yellow-400 animate-pulse" />
              Enviar Mensaje Instantáneo
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="form-name" className="text-xs font-semibold text-slate-300 block mb-1.5 pl-0.5">
                  Nombre Completo
                </label>
                <input
                  id="form-name"
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Ej: Alejandro Pérez"
                  className="w-full bg-white/5 border border-white/10 focus:border-indigo-550/50 rounded-xl py-3 px-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-550/30 transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="form-email" className="text-xs font-semibold text-slate-300 block mb-1.5 pl-0.5">
                  Correo de Contacto
                </label>
                <input
                  id="form-email"
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Ej: tu@empresa.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-indigo-550/50 rounded-xl py-3 px-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-550/30 transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="form-message" className="text-xs font-semibold text-slate-300 block mb-1.5 pl-0.5">
                  Breve Descripción del Mensaje/Proyecto
                </label>
                <textarea
                  id="form-message"
                  required
                  rows={4}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Cuéntame de tu idea, plazos de entrega y requerimientos técnicos..."
                  className="w-full bg-white/5 border border-white/10 focus:border-indigo-550/50 rounded-xl py-3 px-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-550/30 transition-all duration-300 resize-none"
                />
              </div>

              {/* Status response pill bar */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                     initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2.5"
                  >
                    <Icon name="CheckCircle2" className="w-4 h-4 flex-shrink-0" />
                    <span>¡Mensaje simulado enviado con éxito! Un consejero te contactaría inmediatamente en una integración real.</span>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2.5"
                  >
                    <Icon name="AlertCircle" className="w-4 h-4 flex-shrink-0" />
                    <span>Por favor completa todos los campos válidamente antes de enviar.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit trigger button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-rose-500 text-xs sm:text-sm font-bold text-white shadow-xl shadow-indigo-500/10 cursor-pointer hover:shadow-indigo-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Enviar Propuesta</span>
                    <Icon name="ExternalLink" className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* Footer copyright label */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/10 mt-24 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-455">
        <p>© 2026 {profile.name} - Portafolio Creativo Profesional. Todos los derechos reservados.</p>
        <p className="font-mono">Maquetado Mobile-First en React 19 &amp; Tailwind v4</p>
      </div>
    </section>
  );
};
