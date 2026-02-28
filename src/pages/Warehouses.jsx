import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Database, ChevronRight, Package, HardDrive, Trash2 } from 'lucide-react';

const Warehouses = () => {
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newWH, setNewWH] = useState({ name: '', description: '' });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('my_warehouses') || '[]');
    setWarehouses(saved);
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    const warehouseWithId = { ...newWH, id: Date.now() };
    const updated = [...warehouses, warehouseWithId];
    localStorage.setItem('my_warehouses', JSON.stringify(updated));
    setWarehouses(updated);
    setShowModal(false);
    setNewWH({ name: '', description: '' });
  };

  const deleteWarehouse = (e, id) => {
    e.stopPropagation(); // Kartın özünə kliklənməsinin qarşısını alır
    if(window.confirm("Bu sektoru və içindəki bütün malları silmək istəyirsiniz?")) {
        const updated = warehouses.filter(w => w.id !== id);
        setWarehouses(updated);
        localStorage.setItem('my_warehouses', JSON.stringify(updated));
        localStorage.removeItem(`products_wh_${id}`); // Sektor silinəndə malları da silirik
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto bg-[#F8FAFC] dark:bg-gray-950 min-h-screen pb-32">
      
      {/* HEADER */}
      <div className="flex justify-between items-end mb-16">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter leading-none">
            ANBARLAR
          </h1>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] italic">
            Texniki Sektorların İdarəedilməsi
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-[2rem] font-black text-[11px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-indigo-200 dark:shadow-none"
        >
          <Plus size={20} strokeWidth={3} /> YENİ Anbar
        </button>
      </div>

      {/* WAREHOUSE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {warehouses.map(wh => (
          <div 
            key={wh.id} 
            onClick={() => navigate(`/warehouse/${wh.id}`)}
            className="group bg-white dark:bg-gray-900 p-10 rounded-[3.5rem] border-2 border-transparent hover:border-indigo-500 transition-all cursor-pointer shadow-sm relative overflow-hidden"
          >
            {/* Arxa fon dekorasiyası */}
            <Database className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 text-indigo-600" size={150} />

            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-[1.5rem] flex items-center justify-center text-indigo-600">
                <HardDrive size={28} />
              </div>
              <button 
                onClick={(e) => deleteWarehouse(e, wh.id)}
                className="p-2 text-gray-200 hover:text-red-500 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter mb-2 group-hover:translate-x-1 transition-transform">
                {wh.name}
              </h3>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-8">
                {wh.description || 'Təsvir qeyd edilməyib'}
              </p>
              
              <div className="flex items-center justify-between border-t dark:border-gray-800 pt-6">
                <span className="text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                  İnventara Bax <ChevronRight size={14} />
                </span>
                <Package size={18} className="text-gray-200" />
              </div>
            </div>
          </div>
        ))}

        {/* EMPTY STATE */}
        {warehouses.length === 0 && (
          <div className="col-span-full py-32 text-center rounded-[4rem] border-4 border-dashed border-gray-100 dark:border-gray-900 flex flex-col items-center">
            <Database size={60} className="text-gray-100 dark:text-gray-800 mb-4" />
            <p className="text-gray-300 dark:text-gray-700 font-black uppercase italic tracking-[0.3em]">Hələ Heç bir sektor yaradılmayıb</p>
          </div>
        )}
      </div>

      {/* MODAL: CREATE SECTOR */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[3.5rem] p-12 shadow-2xl border-t-[12px] border-indigo-600 animate-in zoom-in duration-300">
            <h2 className="text-3xl font-black italic uppercase mb-8 dark:text-white tracking-tighter">Yeni Sektor</h2>
            <form onSubmit={handleCreate} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-4">Sektorun Adı</label>
                <input 
                  placeholder="Məs: Kamera və Obyektivlər" 
                  className="w-full p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none font-bold outline-none focus:ring-2 ring-indigo-500/20 dark:text-white"
                  onChange={e => setNewWH({...newWH, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-4">Qısa Təsvir</label>
                <input 
                  placeholder="Məs: Əsas anbarda yerləşən rəflər" 
                  className="w-full p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none font-bold outline-none focus:ring-2 ring-indigo-500/20 dark:text-white"
                  onChange={e => setNewWH({...newWH, description: e.target.value})}
                />
              </div>
              <div className="flex gap-4 pt-6">
                <button type="submit" className="flex-1 p-5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl hover:bg-indigo-700 transition-all">Sektoru Aç</button>
                <button type="button" onClick={() => setShowModal(false)} className="p-5 font-black text-gray-400 uppercase text-[11px] tracking-widest">Ləğv Et</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warehouses;