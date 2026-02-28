import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Video, Sparkles, 
  ArrowRight 
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto bg-[#F8FAFC] dark:bg-gray-950 min-h-screen pb-32 transition-all">
      
      {/* HEADER: Xoş gəldiniz */}
      <header className="mb-16">
        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 mb-4">
          <Sparkles size={20} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em]">System Control Unit</span>
        </div>
        <h1 className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter italic uppercase leading-none">
          Nəzarət <br /> Mərkəzi
        </h1>
      </header>

      {/* İKİ BÖYÜK QAPI (MAIN CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* ANBAR PANELI */}
        <button 
          onClick={() => navigate('/warehouses')}
          className="group relative bg-white dark:bg-gray-900 p-12 rounded-[3.5rem] border-2 border-transparent hover:border-indigo-500 shadow-xl transition-all text-left overflow-hidden h-[400px] flex flex-col justify-end"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
            <Box size={240} />
          </div>
          <div className="bg-indigo-600 text-white w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-200 dark:shadow-none">
            <Box size={40} />
          </div>
          <div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase italic mb-2 tracking-tighter">Anbar</h2>
            <p className="text-gray-400 font-bold text-sm uppercase tracking-widest mb-8 max-w-[250px]">Bütün texnika və sektorları idarə et</p>
            <div className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-[0.2em]">
              Daxil ol <ArrowRight size={18} />
            </div>
          </div>
        </button>

        {/* LAYİHƏ PANELI */}
        <button 
          onClick={() => navigate('/projects')}
          className="group relative bg-gray-900 dark:bg-indigo-900/20 p-12 rounded-[3.5rem] border-2 border-transparent hover:border-white shadow-xl transition-all text-left overflow-hidden h-[400px] flex flex-col justify-end"
        >
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
            <Video size={240} className="text-white" />
          </div>
          <div className="bg-white text-gray-900 w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-white/10">
            <Video size={40} />
          </div>
          <div>
            <h2 className="text-4xl font-black text-white uppercase italic mb-2 tracking-tighter">Produksiya Paneli</h2>
            <p className="text-gray-300/60 font-bold text-sm uppercase tracking-widest mb-8 max-w-[250px]">Çəkiliş layihələrini və arendaları izlə</p>
            <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-[0.2em]">
              Daxil ol <ArrowRight size={18} />
            </div>
          </div>
        </button>

      </div>

    </div>
  );
};

export default Dashboard;