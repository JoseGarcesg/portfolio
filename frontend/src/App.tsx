import { usePortfolio } from './hooks/usePortfolio';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { ExperienceList } from './components/Experience';
import { EducationList } from './components/Education';
import { Contact } from './components/Contact';

export default function App() {
  const {
    portfolioData,
    loading,
    fetchError,
    config,
    updateConfig,
    reloadData,
  } = usePortfolio();

  if (loading && !portfolioData) {
    return (
      <div id="loader-screen" className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center font-sans relative overflow-hidden">
        {/* Background Mesh Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-white/5 border-t-indigo-500 animate-spin" />
            <span className="absolute text-[10px] font-mono font-bold tracking-widest text-indigo-400 uppercase select-none animate-pulse">
              Cargando
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-6 font-mono tracking-wide">
            Sincronizando información del portafolio...
          </p>
        </div>
      </div>
    );
  }

  // Fallback state if everything completely crashes (unlikely due to mock fallback)
  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 font-sans p-6">
        <p className="text-rose-400 font-semibold mb-4">No se pudo cargar la información del portafolio.</p>
        <button
          onClick={reloadData}
          className="px-4 py-2 rounded-lg bg-indigo-600 font-medium text-xs hover:bg-indigo-500 transition-colors"
        >
          Reintentar Carga
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col relative selection:bg-indigo-500/20 selection:text-indigo-300">

      {/* Background Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-rose-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Connection Notice banner if failed connection to Strapi */}
      {fetchError && !config.useMock && (
        <div className="sticky top-0 z-50 bg-rose-950/90 backdrop-blur border-b border-rose-900 text-rose-300 px-6 py-2.5 text-center text-[11px] font-medium flex items-center justify-center gap-2">
          <span>⚠️ {fetchError} Cargando datos locales en su lugar.</span>
          <button
            onClick={() => updateConfig({ ...config, useMock: true })}
            className="underline hover:text-white ml-2 font-bold cursor-pointer"
          >
            Habilitar Modo Mock Permanentemente
          </button>
        </div>
      )}

      {/* Sticky Header Section */}
      <Header
        name={portfolioData.profile.name}
        role={portfolioData.profile.role}
      />

      {/* Main Single-View Layout Blocks */}
      <main className="flex-1 w-full flex flex-col relative z-10">
        {/* Dynamic hero */}
        <Hero
          profile={portfolioData.profile}
          socials={portfolioData.socials}
        />

        {/* Modular skills section */}
        <Skills
          skills={portfolioData.skills}
        />

        {/* Vertical timelines for Career profile */}
        <ExperienceList
          experience={portfolioData.experience}
        />

        {/* Education track list */}
        <EducationList
          educationList={portfolioData.education}
        />

        {/* Interactive message center */}
        <Contact
          profile={portfolioData.profile}
          socials={portfolioData.socials}
        />
      </main>

    </div>
  );
}
