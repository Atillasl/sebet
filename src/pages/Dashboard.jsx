import React, { useState, useMemo } from 'react';
import { Plus, Search, Download, Layers, Package, TrendingUp, Zap, Crown } from 'lucide-react';
import { useWarehouses } from '../hooks/useWarehouses.js';
import { StatCard } from '../components/StatCard';
import WarehouseCard from '../components/WarehouseCard';
import NewWarehouseModal from '../components/NewWarehouseModal';

const Dashboard = () => {
  const { warehouses, addWarehouse, deleteWarehouse } = useWarehouses();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filterləməni optimallaşdırırıq
  const filteredWarehouses = useMemo(() => {
    return warehouses.filter(w => 
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      w.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [warehouses, searchTerm]);

  const stats = [
    { label: "Sektorlar", val: warehouses.length, icon: <Layers />, color: "indigo" },
    { label: "Resurslar", val: warehouses.reduce((a, b) => a + b.itemCount, 0), icon: <Package />, color: "emerald" },
    { label: "Artım", val: "12%", icon: <TrendingUp />, color: "purple" },
    { label: "Limit", val: "∞", icon: <Zap />, color: "orange" }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto bg-[#F8FAFC] dark:bg-gray-950 min-h-screen pb-20 transition-colors duration-500">
      
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 bg-white dark:bg-gray-900 p-8 rounded-[3rem] shadow-sm border-b-8 border-indigo-100 dark:border-indigo-900/50">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3">
            <Crown size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter italic uppercase">Baş Qərargah</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-black rounded-lg uppercase">Sistem Online</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <button onClick={() => setIsModalOpen(true)} className="flex-1 md:flex-none bg-indigo-600 text-white px-8 py-4 rounded-[1.8rem] font-black uppercase text-[11px] tracking-widest shadow-lg border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2">
            <Plus size={20} /> Yeni Sektor Aç
          </button>
        </div>
      </header>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
      </div>

      {/* SEARCH */}
      <div className="relative mb-10 group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-500" size={22} />
        <input 
          type="text" 
          placeholder="Sektorlarda axtarış..." 
          className="w-full bg-white dark:bg-gray-900 p-6 pl-16 rounded-[2.2rem] outline-none shadow-sm focus:ring-4 ring-indigo-50 dark:ring-indigo-900/20 transition-all font-bold"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* WAREHOUSE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWarehouses.map(w => (
          <WarehouseCard key={w.id} warehouse={w} onDelete={deleteWarehouse} />
        ))}
      </div>

      {isModalOpen && (
        <NewWarehouseModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={addWarehouse} 
        />
      )}
    </div>
  );
};

export default Dashboard;