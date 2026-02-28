import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Trash2, Database, ExternalLink, 
  Calendar, DollarSign, Calculator, Briefcase, AlertCircle,
  TrendingUp, ShieldAlert, CheckCircle2
} from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWH, setSelectedWH] = useState('');
  const [whProducts, setWhProducts] = useState([]);
  
  const [showAddMode, setShowAddMode] = useState(null); 
  const [newItem, setNewItem] = useState({
    productId: '', name: '', days: 1, pricePerDay: 0, 
    startDate: '', endDate: '', provider: 'Mənim Anbarım'
  });

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem('my_projects') || '[]');
    const currentProj = projects.find(p => p.id === Number(id));
    if (currentProj) {
      setProject(currentProj);
      if (!currentProj.items) currentProj.items = [];
    }

    const whs = JSON.parse(localStorage.getItem('my_warehouses') || '[]');
    setWarehouses(whs);
  }, [id]);

  useEffect(() => {
    if (selectedWH) {
      const prods = JSON.parse(localStorage.getItem(`products_wh_${selectedWH}`) || '[]');
      setWhProducts(prods);
    }
  }, [selectedWH]);

  const checkConflict = () => {
    if (showAddMode !== 'internal' || !newItem.productId || !newItem.startDate || !newItem.endDate) return null;
    const allProjects = JSON.parse(localStorage.getItem('my_projects') || '[]');
    const newStart = new Date(newItem.startDate);
    const newEnd = new Date(newItem.endDate);
    let conflict = null;

    allProjects.forEach(p => {
      if (p.id === Number(id)) return;
      p.items?.forEach(item => {
        if (item.type === 'internal' && String(item.productId) === String(newItem.productId)) {
          const itemStart = new Date(item.startDate);
          const itemEnd = new Date(item.endDate);
          if (newStart <= itemEnd && newEnd >= itemStart) {
            conflict = { projName: p.name, start: item.startDate, end: item.endDate };
          }
        }
      });
    });
    return conflict;
  };

  const addItem = () => {
    const itemToAdd = {
      ...newItem,
      id: Date.now(),
      total: newItem.days * newItem.pricePerDay,
      type: showAddMode
    };
    const updatedProject = { ...project, items: [...(project.items || []), itemToAdd] };
    saveProject(updatedProject);
    resetForm();
  };

  const removeItem = (itemId) => {
    const updatedItems = project.items.filter(i => i.id !== itemId);
    saveProject({ ...project, items: updatedItems });
  };

  const saveProject = (updated) => {
    const projects = JSON.parse(localStorage.getItem('my_projects') || '[]');
    const index = projects.findIndex(p => p.id === Number(id));
    projects[index] = updated;
    localStorage.setItem('my_projects', JSON.stringify(projects));
    setProject(updated);
  };

  const resetForm = () => {
    setShowAddMode(null);
    setSelectedWH('');
    setNewItem({ productId: '', name: '', days: 1, pricePerDay: 0, startDate: '', endDate: '', provider: 'Mənim Anbarım' });
  };

  if (!project) return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
       <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-black text-gray-400 uppercase tracking-widest text-xs">Yüklenir...</p>
       </div>
    </div>
  );

  const totalCost = project.items?.reduce((acc, curr) => acc + Number(curr.total), 0) || 0;
  const externalCost = project.items?.filter(i => i.type === 'external').reduce((acc, curr) => acc + Number(curr.total), 0) || 0;
  const netProfit = totalCost - externalCost;
  const conflictInfo = checkConflict();

  return (
    <div className="p-4 md:p-12 max-w-[1400px] mx-auto bg-[#F8FAFC] dark:bg-gray-950 min-h-screen pb-32 transition-all">
      
      {/* HEADER: Naviqasiya və Aksiyalar */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 mb-16">
        <div className="space-y-4">
          <button onClick={() => navigate('/projects')} className="group flex items-center text-gray-400 hover:text-indigo-600 font-black text-[10px] tracking-[0.3em] transition-all uppercase">
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Layihələrə Qayıt
          </button>
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-indigo-200 dark:shadow-none">
              <Briefcase size={36} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter italic uppercase leading-tight">
                {project.name}
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-indigo-600 dark:text-indigo-400 font-black text-[11px] uppercase tracking-widest">{project.client}</span>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] uppercase">
                  <Calendar size={12} /> {project.startDate}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <button onClick={() => setShowAddMode('internal')} className="flex-1 md:flex-none bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white px-8 py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:border-indigo-600 transition-all shadow-sm">
            <Database size={18} className="text-indigo-600" /> Anbardan Seç
          </button>
          <button onClick={() => setShowAddMode('external')} className="flex-1 md:flex-none bg-gray-900 dark:bg-indigo-600 text-white px-8 py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black dark:hover:bg-indigo-500 transition-all shadow-xl">
            <ExternalLink size={18} /> Kənardan Gətir
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* SOL TƏRƏF: TEXNİKA SİYAHISI */}
        <div className="xl:col-span-8 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-[3.5rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center">
              <h2 className="font-black uppercase italic text-sm tracking-tighter text-gray-400">Avadanlıq Manifesti</h2>
              <span className="bg-gray-50 dark:bg-gray-800 px-4 py-1 rounded-full text-[9px] font-black uppercase text-gray-500 tracking-widest">
                {project.items?.length || 0} Element
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                    <th className="p-8">Texnika</th>
                    <th className="p-8 text-center">Gün / Qiymət</th>
                    <th className="p-8">Cəmi</th>
                    <th className="p-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  {project.items?.map((item) => (
                    <tr key={item.id} className="group hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-all">
                      <td className="p-8">
                        <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${item.type === 'internal' ? 'bg-blue-500' : 'bg-orange-500'} animate-pulse`} />
                          <div>
                            <div className="font-black text-gray-900 dark:text-gray-100 uppercase text-sm tracking-tight">{item.name}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[9px] font-black text-indigo-500 uppercase italic">{item.provider}</span>
                              <span className="text-[10px] text-gray-300 font-bold tracking-tighter">{item.startDate} — {item.endDate}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-8 text-center">
                         <div className="inline-flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-xl">
                            <span className="font-black text-gray-900 dark:text-white text-xs">{item.days} GÜN</span>
                            <span className="text-gray-300">×</span>
                            <span className="font-black text-indigo-600 text-xs">{item.pricePerDay} ₼</span>
                         </div>
                      </td>
                      <td className="p-8">
                        <div className="font-black text-gray-900 dark:text-white text-lg tracking-tighter italic">{item.total} ₼</div>
                      </td>
                      <td className="p-8 text-right">
                        <button onClick={() => removeItem(item.id)} className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-200 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {(!project.items || project.items.length === 0) && (
              <div className="p-32 text-center">
                <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-200">
                  <AlertCircle size={40} />
                </div>
                <p className="text-gray-300 font-black uppercase text-[10px] tracking-[0.4em]">Siyahı hələ ki, boşdur</p>
              </div>
            )}
          </div>
        </div>

        {/* SAĞ TƏRƏF: MALİYYƏ VƏ STATİSTİKA */}
        <div className="xl:col-span-4 space-y-8">
          
          {/* ÜMUMİ KART */}
          <div className="bg-indigo-600 p-10 rounded-[3.5rem] text-white shadow-2xl shadow-indigo-200 dark:shadow-none relative overflow-hidden group">
            <TrendingUp className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-125 transition-transform duration-1000" size={200} />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
                  <Calculator size={24} />
                </div>
                <CheckCircle2 size={24} className="text-indigo-200" />
              </div>
              <p className="text-indigo-100 text-[10px] font-black uppercase tracking-[0.3em] mb-2 italic">Layihənin Ümumi Dəyəri</p>
              <h3 className="text-5xl font-black italic tracking-tighter mb-10 leading-none">{totalCost} ₼</h3>
              
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
                <div>
                  <p className="text-[9px] font-black text-indigo-200 uppercase tracking-widest mb-1">Ödənilən Beh</p>
                  <p className="font-black text-xl italic">{project.prepayment} ₼</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-indigo-200 uppercase tracking-widest mb-1">Qalan Borc</p>
                  <p className="font-black text-xl italic text-orange-300">{totalCost - project.prepayment} ₼</p>
                </div>
              </div>
            </div>
          </div>

          {/* XALİS QAZANC */}
          <div className="bg-white dark:bg-gray-900 p-10 rounded-[3.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center text-green-500">
                  <DollarSign size={20} />
                </div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest italic leading-tight">Xalis Mənfəət <br /><span className="text-[8px] opacity-60">(Sub-Rent çıxıldı)</span></p>
             </div>
             <h3 className="text-4xl font-black text-green-500 italic tracking-tighter mb-6">{netProfit} ₼</h3>
             <div className="w-full bg-gray-50 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-green-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(34,197,94,0.4)]" 
                  style={{ width: `${totalCost > 0 ? (netProfit / totalCost) * 100 : 0}%` }}
                ></div>
             </div>
          </div>

        </div>
      </div>

      {/* MODAL: ADD ITEM */}
      {showAddMode && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-xl z-50 flex items-center justify-center p-6">
          <div className="bg-white dark:bg-gray-900 w-full max-w-xl rounded-[4rem] p-12 shadow-2xl border border-white/10 animate-in zoom-in duration-300 relative overflow-hidden">
            
            {/* Modal Decorative background */}
            <div className={`absolute top-0 left-0 w-full h-2 ${showAddMode === 'internal' ? 'bg-indigo-600' : 'bg-orange-500'}`} />

            <h2 className="text-3xl font-black italic uppercase mb-10 dark:text-white flex items-center gap-4 tracking-tighter">
              {showAddMode === 'internal' ? <Database className="text-indigo-600" size={32} /> : <ExternalLink className="text-orange-500" size={32} />}
              {showAddMode === 'internal' ? 'Anbar Səviyyəsi' : 'Xarici Sifariş'}
            </h2>

            <div className="space-y-6">
              {showAddMode === 'internal' && (
                <div className="grid gap-4">
                  <select 
                    className="w-full p-6 bg-gray-50 dark:bg-gray-800 rounded-[2rem] border-2 border-transparent focus:border-indigo-500/20 font-bold outline-none dark:text-white appearance-none transition-all"
                    onChange={(e) => setSelectedWH(e.target.value)}
                  >
                    <option value="">Anbar Seçin</option>
                    {warehouses.map(wh => <option key={wh.id} value={wh.id}>{wh.name}</option>)}
                  </select>

                  <select 
                    className="w-full p-6 bg-gray-50 dark:bg-gray-800 rounded-[2rem] border-2 border-transparent focus:border-indigo-500/20 font-bold outline-none dark:text-white appearance-none transition-all"
                    onChange={(e) => {
                      const prod = whProducts.find(p => p.id === Number(e.target.value));
                      if(prod) setNewItem({...newItem, productId: prod.id, name: prod.name, pricePerDay: prod.price || 0});
                    }}
                  >
                    <option value="">Avadanlıq Seçin</option>
                    {whProducts.map(p => <option key={p.id} value={p.id}>{p.name} — {p.price}₼</option>)}
                  </select>
                </div>
              )}

              {showAddMode === 'external' && (
                <div className="grid gap-4">
                  <input placeholder="Tədarükçü (Məs: Rent-A-Lens)" className="w-full p-6 bg-gray-50 dark:bg-gray-800 rounded-[2rem] border-none font-bold outline-none dark:text-white" onChange={e => setNewItem({...newItem, provider: e.target.value})} />
                  <input placeholder="Avadanlıq Adı" className="w-full p-6 bg-gray-50 dark:bg-gray-800 rounded-[2rem] border-none font-bold outline-none dark:text-white" onChange={e => setNewItem({...newItem, name: e.target.value})} />
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 ml-6 uppercase tracking-widest">Başlanğıc</label>
                    <input type="date" className="w-full p-5 bg-gray-50 dark:bg-gray-800 rounded-[1.5rem] border-none font-bold dark:text-white outline-none" onChange={e => setNewItem({...newItem, startDate: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 ml-6 uppercase tracking-widest">Bitiş</label>
                    <input type="date" className="w-full p-5 bg-gray-50 dark:bg-gray-800 rounded-[1.5rem] border-none font-bold dark:text-white outline-none" onChange={e => setNewItem({...newItem, endDate: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 ml-6 uppercase tracking-widest">Gün Sayı</label>
                  <input type="number" className="w-full p-5 bg-gray-50 dark:bg-gray-800 rounded-[1.5rem] border-none font-bold dark:text-white outline-none" value={newItem.days} onChange={e => setNewItem({...newItem, days: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 ml-6 uppercase tracking-widest">Günlük Qiymət (₼)</label>
                  <input type="number" className="w-full p-5 bg-gray-50 dark:bg-gray-800 rounded-[1.5rem] border-none font-bold dark:text-white outline-none" value={newItem.pricePerDay} onChange={e => setNewItem({...newItem, pricePerDay: e.target.value})} />
                </div>
              </div>

              {/* CONFLICT ALERT: Minimalist & Professional */}
              {conflictInfo && (
                <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-[2rem] border border-red-100 dark:border-red-900/30 flex items-start gap-4">
                    <ShieldAlert className="text-red-500 shrink-0" size={24} />
                    <div>
                        <p className="text-[11px] font-black text-red-600 uppercase tracking-widest">Rezervasiya Konflikti!</p>
                        <p className="text-[10px] text-red-500/80 font-bold leading-relaxed mt-1">
                            Bu texnika hazırda <span className="underline italic">"{conflictInfo.projName}"</span> layihəsinə təhkim edilib.
                        </p>
                    </div>
                </div>
              )}

              <div className="flex gap-4 pt-8">
                <button onClick={resetForm} className="flex-1 p-6 font-black text-gray-400 hover:text-gray-900 transition-colors uppercase text-[11px] tracking-widest">Ləğv Et</button>
                <button 
                  onClick={addItem} 
                  disabled={conflictInfo}
                  className={`flex-1 p-6 rounded-[2rem] font-black text-[11px] uppercase tracking-widest shadow-xl transition-all ${conflictInfo ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                >
                  Siyahıya Əlavə Et
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;