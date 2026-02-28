import { X, Calendar, DollarSign, User, FileText, Zap } from 'lucide-react';
import { useState } from 'react';

const CreateProjectModal = ({ isOpen, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    client: '', 
    startDate: '', 
    endDate: '', 
    prepayment: '', 
    notes: '',
    budget: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ 
      ...formData, 
      id: Date.now(), 
      status: 'Aktiv', 
      items: [],
      progress: 0 
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#0B0F1A] w-full max-w-2xl rounded-[4rem] p-10 md:p-14 shadow-[0_0_50px_rgba(37,99,235,0.2)] border border-slate-200 dark:border-blue-900/30 relative overflow-hidden">
        
        {/* Dekorativ Mavi Parıltı */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />

        <button 
          onClick={onClose} 
          className="absolute right-10 top-10 text-slate-400 hover:text-blue-500 hover:rotate-90 transition-all duration-300"
        >
          <X size={28} />
        </button>

        <header className="mb-10">
          <h2 className="text-5xl font-black italic uppercase tracking-tighter dark:text-white">
            Yeni Layihə<span className="text-blue-600">_</span>
          </h2>
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mt-2">Sistem Girişi: Mühəndislik Portfeli</p>
        </header>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Layihə Adı və Müştəri */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
               <Zap className="absolute left-5 top-5 text-blue-500" size={18} />
               <input 
                className="w-full p-5 pl-14 bg-slate-50 dark:bg-slate-800/50 dark:text-white border-2 border-transparent focus:border-blue-500 rounded-3xl font-bold outline-none transition-all placeholder:text-slate-400" 
                placeholder="LAYİHƏ ADI" 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                required
              />
            </div>
            <div className="relative">
               <User className="absolute left-5 top-5 text-slate-400" size={18} />
               <input 
                className="w-full p-5 pl-14 bg-slate-50 dark:bg-slate-800/50 dark:text-white border-2 border-transparent focus:border-blue-500 rounded-3xl font-bold outline-none transition-all" 
                placeholder="MÜŞTƏRİ / ŞİRKƏT" 
                onChange={e => setFormData({...formData, client: e.target.value})} 
                required
              />
            </div>
          </div>

          {/* Tarix Aralığı */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 uppercase">
              <label className="text-[9px] font-black text-slate-400 ml-5 tracking-widest flex items-center gap-2">
                <Calendar size={12}/> Başlama Tarixi
              </label>
              <input 
                type="date"
                className="w-full p-5 bg-slate-50 dark:bg-slate-800/50 dark:text-white rounded-3xl font-bold outline-none focus:ring-2 ring-blue-500/20 transition-all uppercase text-xs" 
                onChange={e => setFormData({...formData, startDate: e.target.value})} 
                required
              />
            </div>
            <div className="space-y-2 uppercase">
              <label className="text-[9px] font-black text-slate-400 ml-5 tracking-widest flex items-center gap-2">
                <Calendar size={12}/> Bitmə Tarixi
              </label>
              <input 
                type="date"
                className="w-full p-5 bg-slate-50 dark:bg-slate-800/50 dark:text-white rounded-3xl font-bold outline-none focus:ring-2 ring-blue-500/20 transition-all uppercase text-xs" 
                onChange={e => setFormData({...formData, endDate: e.target.value})} 
                required
              />
            </div>
          </div>

          {/* Maliyyə: Büdcə və Beh */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
               <DollarSign className="absolute left-5 top-5 text-emerald-500" size={18} />
               <input 
                type="number"
                className="w-full p-5 pl-14 bg-slate-50 dark:bg-slate-800/50 dark:text-white rounded-3xl font-bold outline-none border-2 border-transparent focus:border-emerald-500 transition-all" 
                placeholder="ÜMUMİ BÜDCƏ (₼)" 
                onChange={e => setFormData({...formData, budget: e.target.value})} 
                required
              />
            </div>
            <div className="relative">
               <DollarSign className="absolute left-5 top-5 text-blue-500" size={18} />
               <input 
                type="number"
                className="w-full p-5 pl-14 bg-slate-50 dark:bg-slate-800/50 dark:text-white rounded-3xl font-bold outline-none border-2 border-transparent focus:border-blue-500 transition-all shadow-inner" 
                placeholder="BEH / ÖNCƏDƏN ÖDƏNİŞ" 
                onChange={e => setFormData({...formData, prepayment: e.target.value})} 
              />
            </div>
          </div>

          {/* Qeydlər */}
          <div className="relative">
            <FileText className="absolute left-5 top-5 text-slate-400" size={18} />
            <textarea 
              className="w-full p-5 pl-14 bg-slate-50 dark:bg-slate-800/50 dark:text-white rounded-[2rem] font-bold outline-none min-h-[100px] border-2 border-transparent focus:border-blue-500 transition-all resize-none" 
              placeholder="LAYİHƏ HAQQINDA QEYDLƏR..." 
              onChange={e => setFormData({...formData, notes: e.target.value})}
            />
          </div>

          {/* Təsdiq Düyməsi */}
          <button 
            type="submit" 
            className="w-full p-7 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] shadow-xl shadow-blue-600/30 transition-all active:scale-95 flex items-center justify-center gap-3 mt-4"
          >
            Sistemi Başlat <Zap size={20} fill="currentColor" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;