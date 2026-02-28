import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Search, Cpu, Activity, Calendar, 
  DollarSign, AlertCircle, Trash2, ExternalLink 
} from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import CreateProjectModal from '../components/CreateProjectModal';

const Projects = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projects, searchTerm, setSearchTerm, addProject, deleteProject } = useProjects();

  // Statistika Hesablamaları
  const activeProjects = projects.filter(p => p.status === 'Aktiv').length;
  const totalBudget = projects.reduce((sum, p) => sum + Number(p.budget || 0), 0);

  return (
    <div className="min-h-screen bg-[#E2E8F0] dark:bg-[#0B0F1A] transition-colors duration-500 relative overflow-hidden font-sans">
      
      {/* BACKGROUND DECOR */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="p-6 md:p-12 max-w-7xl mx-auto relative z-10">
        
        {/* HEADER & STATS SECTION */}
        <header className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-600/20 text-[10px] font-black uppercase tracking-[0.3em]">
              <Activity size={12} className="animate-pulse" /> SİSTEM_AKTİVDİR
            </div>
            <h1 className="text-6xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
              Layihələr<span className="text-blue-600">.</span>
            </h1>
            
            <div className="flex gap-6 pt-4">
              <div className="border-l-2 border-blue-600 pl-4">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Aktiv İşlər</p>
                <p className="text-xl font-black text-slate-800 dark:text-white">{activeProjects}</p>
              </div>
              <div className="border-l-2 border-emerald-500 pl-4">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ümumi Büdcə</p>
                <p className="text-xl font-black text-slate-800 dark:text-white">{totalBudget.toLocaleString()} ₼</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)} 
            className="group bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-2xl shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-3"
          >
            <Plus size={18} strokeWidth={3} /> Yeni Layihə_BAŞLAT
          </button>
        </header>

        {/* SEARCH & FILTER */}
        <div className="relative mb-12 max-w-2xl group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input 
            className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-2 border-slate-200 dark:border-slate-800 p-6 pl-16 rounded-2xl outline-none font-bold text-slate-700 dark:text-white focus:border-blue-500 transition-all shadow-sm placeholder:text-slate-400 uppercase text-xs tracking-widest"
            placeholder="Layihə axtarışı..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* PROJECT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map(proj => (
            <div 
              key={proj.id} 
              // BURAYA DİQQƏT: Kartın istənilən yerinə basanda yönləndirir
              onClick={() => navigate(`/project/${proj.id}`)}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Hover Effect Layer */}
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/[0.02] transition-colors pointer-events-none" />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Cpu size={28} />
                </div>
                <div className="flex gap-2">
                   {/* SİLMƏ DÜYMƏSİ: e.stopPropagation() sayəsində karda keçid etmir */}
                   <button 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      deleteProject(proj.id);
                    }} 
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors relative z-20"
                   >
                      <Trash2 size={18} />
                   </button>
                   <div className="p-2 text-slate-300 group-hover:text-blue-500 transition-colors">
                      <ExternalLink size={18} />
                   </div>
                </div>
              </div>

              <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter mb-4 relative z-10 group-hover:translate-x-1 transition-transform">
                {proj.name}
              </h3>

              {/* DETALLAR */}
              <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Calendar size={12} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Müddət</span>
                  </div>
                  <p className="text-[11px] font-bold dark:text-slate-200 uppercase">
                    {proj.startDate || 'N/A'} — {proj.endDate || 'N/A'}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <DollarSign size={12} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Büdcə</span>
                  </div>
                  <p className="text-[11px] font-bold text-emerald-500 uppercase">
                    {Number(proj.budget).toLocaleString() || 0} ₼
                  </p>
                </div>
              </div>

              {/* Prioritet və Status */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800 relative z-10">
                <div className="flex items-center gap-2">
                  <AlertCircle size={14} className={proj.priority === 'Yüksək' ? 'text-red-500' : 'text-blue-500'} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Prioritet: {proj.priority}</span>
                </div>
                <span className="bg-blue-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-blue-500/20">
                  {proj.status || 'Aktiv'}
                </span>
              </div>
            </div>
          ))}

          {/* EMPTY STATE */}
          {projects.length === 0 && (
            <div className="col-span-full py-32 border-4 border-dashed border-slate-300 dark:border-slate-800 rounded-[3rem] flex flex-col items-center justify-center text-slate-400">
                <p className="font-black uppercase tracking-[0.3em] text-xs">Sistemdə layihə qeydə alınmayıb</p>
            </div>
          )}
        </div>
      </div>

      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={(newProj) => {
          addProject(newProj);
          setIsModalOpen(false);
        }} 
      />
    </div>
  );
};

export default Projects;