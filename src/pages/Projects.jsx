import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Briefcase, Calendar, ChevronRight, 
  DollarSign, Search, Clock, AlertCircle 
} from 'lucide-react';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    client: '',
    startDate: '',
    endDate: '',
    prepayment: 0
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('my_projects') || '[]');
    setProjects(saved);
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    const projectWithId = { 
      ...newProject, 
      id: Date.now(), 
      status: 'Aktiv',
      items: [], // Texnikalar üçün boş massiv
      outsourceItems: [] // Kənar mallar üçün boş massiv
    };
    const updated = [projectWithId, ...projects];
    localStorage.setItem('my_projects', JSON.stringify(updated));
    setProjects(updated);
    setShowModal(false);
    navigate(`/project/${projectWithId.id}`);
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto bg-[#F8FAFC] dark:bg-gray-950 min-h-screen pb-32 transition-all">
      
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter leading-none">
            Layihələr
          </h1>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] italic">
            Layihə Cədvəli və Maliyyə İdarəetməsi
          </p>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-10 py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-widest flex items-center gap-3 shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={18} strokeWidth={4} /> Yeni Layihə Yarat
        </button>
      </header>

      {/* SEARCH & FILTERS */}
      <div className="relative mb-12 max-w-2xl group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Layihə və ya müştəri axtar..." 
          className="w-full bg-white dark:bg-gray-900 p-6 pl-16 rounded-[2.2rem] border-2 border-transparent focus:border-indigo-500/20 outline-none shadow-sm dark:text-white font-bold transition-all text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map(proj => (
          <div 
            key={proj.id} 
            onClick={() => navigate(`/project/${proj.id}`)}
            className="group relative bg-white dark:bg-gray-900 p-8 rounded-[3rem] border-2 border-transparent hover:border-indigo-500 transition-all cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Briefcase size={28} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-[9px] font-black bg-green-50 dark:bg-green-900/20 text-green-600 px-4 py-1.5 rounded-full uppercase tracking-widest border border-green-100 dark:border-green-900/50">
                  {proj.status}
                </span>
                <div className="flex items-center gap-1.5 text-orange-500">
                  <Clock size={12} />
                  <span className="text-[9px] font-black uppercase tracking-tighter">{proj.startDate || "Tarix yoxdur"}</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter group-hover:translate-x-1 transition-transform truncate">
                {proj.name}
              </h3>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">
                Müştəri: <span className="text-gray-600 dark:text-gray-300">{proj.client || 'Naməlum'}</span>
              </p>
            </div>
            
            <div className="flex items-center justify-between border-t-2 border-gray-50 dark:border-gray-800 pt-6">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Alınan Beh</span>
                <div className="flex items-center gap-1 text-green-600 dark:text-green-500 font-black text-xl italic tracking-tighter">
                  <DollarSign size={18} /> {proj.prepayment || 0} ₼
                </div>
              </div>
              
              <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 transition-all">
                <ChevronRight size={24} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}

        {/* EMPTY STATE */}
        {filteredProjects.length === 0 && (
          <div className="col-span-full py-32 text-center rounded-[4rem] border-4 border-dashed border-gray-100 dark:border-gray-900 flex flex-col items-center">
            <AlertCircle size={48} className="text-gray-200 mb-4" />
            <p className="text-gray-300 dark:text-gray-800 font-black uppercase italic tracking-[0.3em]">Hələ heç bir layihə yaradılmayıb</p>
          </div>
        )}
      </div>

      {/* YARATMA MODAL-I */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[3rem] p-10 shadow-2xl border-t-[10px] border-indigo-600 animate-in zoom-in duration-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black italic uppercase dark:text-white tracking-tighter">Yeni Layihə</h2>
              <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest mt-2">Layihənin İlkin Məlumatları</p>
            </div>
            
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase ml-4">Layihənin Adı</label>
                <input 
                  placeholder="Məs: Coca-Cola Promo" 
                  className="w-full p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none font-bold outline-none focus:ring-2 ring-indigo-500/20 dark:text-white transition-all"
                  onChange={e => setNewProject({...newProject, name: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase ml-4">Müştəri / Agentlik</label>
                <input 
                  placeholder="Məs: Pasha Bank" 
                  className="w-full p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none font-bold outline-none focus:ring-2 ring-indigo-500/20 dark:text-white transition-all"
                  onChange={e => setNewProject({...newProject, client: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase ml-4 text-indigo-500">Çəkiliş Günü</label>
                  <input type="date" className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none font-bold dark:text-white outline-none" onChange={e => setNewProject({...newProject, startDate: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 uppercase ml-4">Beh (₼)</label>
                  <input type="number" placeholder="Məs: 200" className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none font-bold dark:text-white outline-none" onChange={e => setNewProject({...newProject, prepayment: e.target.value})} />
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-6">
                <button type="submit" className="w-full p-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-xl hover:bg-indigo-500 transition-all">
                  Layihəni Başlat 🎬
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="w-full p-3 font-black text-gray-400 text-[10px] uppercase tracking-widest">
                  Ləğv Et
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;