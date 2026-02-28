import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Search, Box, 
  Package, Layout, ListFilter, MoveLeft
} from 'lucide-react';
import { useWarehouse } from '../hooks/useWarehouse';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../components/AddProductModal';

const WarehouseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { warehouse, products, addProduct, deleteProduct, searchTerm, setSearchTerm } = useWarehouse(id);

  return (
    // FON: Bej və Krem tonları (Soft Earth Tones)
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A3F35] transition-colors duration-500">
      
      {/* HEADER: Təmiz və Minimalist */}
      <header className="bg-white/80 backdrop-blur-md border-b border-[#EADDCA] sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 h-24 flex items-center justify-between">
          
          <div className="flex items-center gap-8">
            <button 
              onClick={() => navigate('/warehouses')}
              className="flex items-center gap-2 text-[#8B735B] hover:text-[#5D4037] transition-colors font-bold text-sm"
            >
              <MoveLeft size={20} /> Sektorlar
            </button>
            <div className="h-10 w-[1px] bg-[#EADDCA]" />
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-[#3E2723] uppercase italic">
                {warehouse?.name || "Yüklenir..."}
              </h1>
              <p className="text-[10px] font-bold text-[#A69076] uppercase tracking-[0.2em]">
                Anbar Sistemi • Bölmə {id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69076]" size={18} />
              <input 
                type="text"
                placeholder="İnventarda axtar..."
                className="bg-[#F5F1E9] border-none rounded-2xl py-3.5 pl-12 pr-6 text-sm w-64 focus:ring-2 ring-[#D2B48C]/30 transition-all outline-none placeholder:text-[#A69076]/60"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-[#8B735B] hover:bg-[#5D4037] text-[#FDFBF7] px-8 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#8B735B]/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <Plus size={18} strokeWidth={3} /> Yeni Mal
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto p-8">
        
        {/* ALT BAŞLIQ: Rəf təmizliyi */}
        <div className="mb-10 flex items-center justify-between border-b border-[#EADDCA]/50 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#F5F1E9] rounded-xl text-[#8B735B]">
              <Layout size={20} />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#A69076]">
              Mövcud İnventar ({products.length})
            </span>
          </div>
          
          <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#8B735B] hover:underline">
            <ListFilter size={14} /> Filtrlə
          </button>
        </div>

        {/* İNVENTAR GRID: Taxta/Bej tonlarında kartlar üçün yer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {products.map(product => (
            <div key={product.id} className="hover:scale-[1.02] transition-transform duration-300">
              <ProductCard product={product} onDelete={deleteProduct} />
            </div>
          ))}

          {/* Yeni Boş Slot: Bej Estetikası */}
          <button 
            onClick={() => setShowModal(true)}
            className="group min-h-[320px] border-2 border-dashed border-[#EADDCA] rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:border-[#8B735B] hover:bg-white transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-[#F5F1E9] text-[#A69076] group-hover:bg-[#8B735B] group-hover:text-white transition-all flex items-center justify-center">
              <Plus size={28} strokeWidth={2.5} />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-[#A69076] group-hover:text-[#8B735B] uppercase tracking-widest">
                Boş Rəf
              </p>
              <span className="text-[9px] text-[#A69076]/60 uppercase font-bold tracking-tighter">
                Yeni məhsul yerləşdir
              </span>
            </div>
          </button>
        </div>

      </main>

      <AddProductModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onAdd={addProduct} 
      />
    </div>
  );
};

export default WarehouseDetail;