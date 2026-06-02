import React from 'react';
import { motion } from 'motion/react';
import { Education } from '../types';
import Icon from './Icon';

interface EducationProps {
  educationList: Education[];
}

export const EducationList: React.FC<EducationProps> = ({ educationList }) => {
  // Separate academic curriculum from certifications
  const academics = educationList.filter((item) => item.type === 'education');
  const certifications = educationList.filter((item) => item.type === 'certification');

  return (
    <section id="educacion" className="py-24 bg-transparent relative overflow-hidden font-sans">
      {/* Visual background spot */}
      <div className="absolute top-1/4 right-10 w-[300px] h-[300px] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title Block */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            Formación Continua
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Educación &amp; Certificaciones
          </h2>
          <p className="text-slate-300 text-sm max-w-lg">
            Mi camino de aprendizaje técnico certificado y disciplina académica continua.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column A: Academic Education (Bigger blocks, columns lg:6/12) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3.5 mb-2 pl-2">
              <span className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-indigo-300">
                <Icon name="GraduationCap" className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">Estudios Superiores</h3>
            </div>

            <div className="space-y-6">
              {academics.map((academic, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  key={index}
                  id={`academic-item-${index}`}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 shadow-xl relative overflow-hidden group"
                >
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <h4 className="font-bold text-white text-base sm:text-lg group-hover:text-indigo-300 transition-colors">
                        {academic.degree}
                      </h4>
                      <p className="text-xs text-slate-355 font-semibold mt-1 font-mono">
                        {academic.institution}
                      </p>
                    </div>

                    <span className="px-3 py-1 bg-white/5 text-[10px] font-bold font-mono text-indigo-350 rounded-lg border border-white/10 whitespace-nowrap">
                      {academic.duration}
                    </span>
                  </div>

                  {academic.description && (
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {academic.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column B: Professional Certifications (Smaller grids, columns lg:6/12) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3.5 mb-2 pl-2">
              <span className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-rose-450">
                <Icon name="Award" className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">Certificados &amp; Logros</h3>
            </div>

            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  key={index}
                  id={`cert-item-${index}`}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 shadow-xl relative overflow-hidden group"
                >
                  {/* Subtle dynamic particle glow overlay */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-500/5 to-transparent rounded-bl-3xl pointer-events-none group-hover:from-rose-400/10 transition-all duration-300" />

                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base group-hover:text-rose-450 transition-colors">
                        {cert.degree}
                      </h4>
                      <p className="text-xs text-slate-355 font-semibold mt-1 font-mono">
                        {cert.institution}
                      </p>
                    </div>

                    <span className="px-3 py-1 bg-white/5 text-[10px] font-bold font-mono text-rose-450 rounded-lg border border-white/10 whitespace-nowrap">
                      {cert.duration}
                    </span>
                  </div>

                  {cert.description && (
                    <p className="text-xs text-slate-300 leading-relaxed font-normal mb-4">
                      {cert.description}
                    </p>
                  )}

                  {/* Outbound interactive credential check */}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-rose-450 hover:text-rose-350 hover:underline transition-colors mt-2"
                    >
                      <span>Validar Credencial</span>
                      <Icon name="ExternalLink" className="w-3 h-3" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
export default EducationList;
