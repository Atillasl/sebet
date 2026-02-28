import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, DollarSign, Calendar, Briefcase, 
  TrendingUp, Download, User, MapPin, Clock, X ,Star
} from 'lucide-react';

const Reports = () => {
  const [stats, setStats] = useState({ totalRevenue: 0, monthlyBreakdown: [], projectGains: [] });
  const [selectedProject, setSelectedProject] = useState(null); // Detallar üçün

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem('my_projects') || '[]');
    const warehouses = JSON.parse(localStorage.getItem('my_warehouses') || '[]');
    
    let revenue = 0;
    let months = {};

    projects.forEach(proj => {
      const budget = Number(proj.budget || 0);
      revenue += budget;

      // Aylıq hesabat üçün (Tarixdən ayı çıxarırıq)
      const date = new Date(proj.startDate || Date.now());
      const monthYear = date.toLocaleString('az-AZ', { month: 'long', year: 'numeric' });
      months[monthYear] = (months[monthYear] || 0) + budget;
    });

    const monthlyData = Object.entries(months).map(([name, value]) => ({ name, value }));

    setStats({
      totalRevenue: revenue,
      monthlyBreakdown: monthlyData,
      projectGains: projects
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAF5] p-6 md:p-12 transition-colors font-sans text-[#1A2F1A]">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
        <div>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter">
            Maliyyə Çıxarışı<span className="text-[#D4AF37]">_</span>
          </h1>
          <p className="text-[10px] font-black text-[#849271] uppercase tracking-[0.5em] mt-2 italic">Aylıq Gəlir və Layihə Analizi</p>
        </div>
        <button className="bg-[#2D5A27] text-white px-10 py-5 rounded-3xl font-black uppercase text-[11px] tracking-widest shadow-xl hover:bg-[#1A2F1A] transition-all flex items-center gap-3">
          <Download size={18} /> Hesabatı Eksport Et
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* SOL TƏRƏF: Aylıq Gəlir Çıxarışı */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-[#E8EEDF] shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-[#F0F4E8] rounded-2xl text-[#2D5A27]"><TrendingUp size={24}/></div>
              <h3 className="font-black uppercase tracking-widest text-sm text-[#849271]">Aylıq Gəlir</h3>
            </div>
            
            <div className="space-y-6">
              {stats.monthlyBreakdown.map((m, i) => (
                <div key={i} className="flex justify-between items-center group cursor-default">
                  <span className="text-xs font-bold uppercase text-[#849271] group-hover:text-[#2D5A27] transition-colors">{m.name}</span>
                  <div className="flex-1 border-b-2 border-dotted border-[#E8EEDF] mx-4 mb-1"></div>
                  <span className="font-black text-[#2D5A27]">{m.value.toLocaleString()} ₼</span>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-[#F0F4E8]">
              <p className="text-[10px] font-black text-[#849271] uppercase mb-1">Ümumi Balans</p>
              <h2 className="text-4xl font-black text-[#2D5A27]">{stats.totalRevenue.toLocaleString()} ₼</h2>
            </div>
          </div>
        </div>

        {/* SAĞ TƏRƏF: Layihələr Siyahısı */}
        <div className="lg:col-span-2 bg-white rounded-[3.5rem] p-10 border border-[#E8EEDF] shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest mb-10 flex items-center gap-2">
            <Briefcase size={20} className="text-[#D4AF37]" /> Layihələr (Detallar üçün klikləyin)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.projectGains.map((proj, i) => (
              <button 
                key={i}
                onClick={() => setSelectedProject(proj)}
                className="flex flex-col p-6 rounded-[2.5rem] border-2 border-[#F0F4E8] hover:border-[#D4AF37] hover:bg-[#FDFBF0] transition-all text-left group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="p-3 bg-[#F8FAF5] rounded-2xl group-hover:bg-white transition-colors text-[#2D5A27]"><Star size={18} /></span>
                  <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">Detallar</span>
                </div>
                <h4 className="font-black uppercase italic text-[#1A2F1A] mb-1">{proj.name}</h4>
                <p className="text-[10px] text-[#849271] font-bold uppercase">{proj.client}</p>
                <div className="mt-4 pt-4 border-t border-[#F0F4E8] w-full flex justify-between items-center">
                   <span className="text-sm font-black text-[#2D5A27]">{Number(proj.budget).toLocaleString()} ₼</span>
                   <span className="text-[9px] font-bold text-[#849271]">{proj.startDate}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DETALLAR MODALI (Overlay) */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-[#1A2F1A]/20">
          <div className="bg-white w-full max-w-2xl rounded-[4rem] p-12 shadow-2xl relative border border-[#E8EEDF] animate-in fade-in zoom-in duration-300">
            <button onClick={() => setSelectedProject(null)} className="absolute right-10 top-10 text-[#849271] hover:text-red-500 transition-colors"><X size={32}/></button>
            
            <header className="mb-10">
              <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.4em]">Layihə Analizi</span>
              <h2 className="text-4xl font-black italic uppercase text-[#1A2F1A] mt-2">{selectedProject.name}</h2>
            </header>

            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#F0F4E8] rounded-xl text-[#2D5A27]"><User size={20}/></div>
                  <div>
                    <p className="text-[9px] font-black text-[#849271] uppercase">Müştəri</p>
                    <p className="font-bold text-sm uppercase">{selectedProject.client}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#FDFBF0] rounded-xl text-[#D4AF37]"><MapPin size={20}/></div>
                  <div>
                    <p className="text-[9px] font-black text-[#849271] uppercase">Məkan / Ünvan</p>
                    <p className="font-bold text-sm uppercase">{selectedProject.location || 'Qeyd olunmayıb'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#F0F4E8] rounded-xl text-[#2D5A27]"><Clock size={20}/></div>
                  <div>
                    <p className="text-[9px] font-black text-[#849271] uppercase">İcarə Müddəti</p>
                    <p className="font-bold text-[11px] uppercase">{selectedProject.startDate} — {selectedProject.endDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#FDFBF0] rounded-xl text-[#D4AF37]"><DollarSign size={20}/></div>
                  <div>
                    <p className="text-[9px] font-black text-[#849271] uppercase">Ümumi Büdcə / Beh</p>
                    <p className="font-bold text-sm uppercase">{selectedProject.budget} ₼ / {selectedProject.prepayment} ₼</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAF5] p-8 rounded-[2.5rem] border border-[#F0F4E8]">
              <h5 className="text-[10px] font-black text-[#2D5A27] uppercase tracking-widest mb-4 flex items-center gap-2">
                <Calendar size={14} /> İcarəyə Verilən Texnikalar
              </h5>
              <div className="space-y-3">
                 {/* Burada layihəyə aid item-ları map edə bilərsən */}
                 <p className="text-xs text-[#849271] italic font-medium">Bu layihə çərçivəsində texniki avadanlıqların siyahısı yüklənir...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;