import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from './Icon';

interface HeaderProps {
  name: string;
  role: string;
}

export const Header: React.FC<HeaderProps> = ({ name, role }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const navLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'educacion', label: 'Formación' },
    { id: 'contacto', label: 'Contacto' },
  ];

  useEffect(() => {
    // When html has overflow:hidden, body is the real scroll container.
    // We must listen on document.body and read document.body.scrollTop.
    const scrollTarget = document.body;

    const handleScroll = () => {
      const scrollTop = scrollTarget.scrollTop;

      setIsScrolled(scrollTop > 20);

      // Active link spy
      const scrollPosition = scrollTop + 200;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
          }
        }
      }
    };

    scrollTarget.addEventListener('scroll', handleScroll);
    return () => scrollTarget.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      // body is the scroll container (html has overflow:hidden)
      document.body.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-40 transition-all duration-300 rounded-2xl ${
        isScrolled
          ? 'bg-white/10 backdrop-blur-md border border-white/15 shadow-2xl py-1'
          : 'bg-white/5 backdrop-blur-sm border border-white/10 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo / Branding */}
        <button
          onClick={() => scrollToSection('inicio')}
          className="flex flex-col items-start focus:outline-none group cursor-pointer"
        >
          <span className="text-xl font-bold bg-gradient-to-r from-white via-indigo-200 to-rose-200 bg-clip-text text-transparent tracking-tight">
            {name}
          </span>
          <span className="text-[10px] text-slate-300 font-mono tracking-widest uppercase mt-0.5 group-hover:text-indigo-400 transition-colors">
            {role}
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                activeSection === link.id
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/20 -z-10 shadow-inner"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {link.label}
            </button>
          ))}
        </nav>

        {/* Dynamic CTA Button */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollToSection('contacto')}
            className="px-5 py-2.5 text-xs font-bold rounded-full bg-white text-slate-900 hover:bg-slate-200 shadow-xl shadow-white/5 cursor-pointer transition-all duration-300 hover:scale-105"
          >
            Contrátame
          </button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white cursor-pointer"
          aria-label="Toggle Menu"
        >
          <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-md border-b border-white/10 overflow-hidden mx-4 rounded-xl mt-2"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${
                    activeSection === link.id
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="h-[1px] bg-white/10 my-2" />
              <button
                onClick={() => scrollToSection('contacto')}
                className="w-full py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-200 text-center text-sm font-bold shadow-lg"
              >
                Hablemos por Correo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Header;
