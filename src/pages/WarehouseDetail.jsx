import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Trash2, Camera, 
  Search, Package, DollarSign, AlertCircle, Upload, Image as ImageIcon 
} from 'lucide-react';

const WarehouseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [warehouse, setWarehouse] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  
  // Şəkil üçün 'image' sahəsini əlavə etdik
  const [newProduct, setNewProduct] = useState({ 
    name: '', category: '', price: 0, image: null 
  });

  useEffect(() => {
    const whs = JSON.parse(localStorage.getItem('my_warehouses') || '[]');
    const currentWH = whs.find(w => w.id === Number(id));
    setWarehouse(currentWH);

    const savedProducts = JSON.parse(localStorage.getItem(`products_wh_${id}`) || '[]');
    setProducts(savedProducts);
  }, [id]);

  // Şəkli oxuyub Base64-ə çevirən funksiya
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addProduct = (e) => {
    e.preventDefault();
    const product = { ...newProduct, id: Date.now() };
    const updated = [...products, product];
    setProducts(updated);
    localStorage.setItem(`products_wh_${id}`, JSON.stringify(updated));
    setShowModal(false);
    setNewProduct({ name: '', category: '', price: 0, image: null });
  };

  const deleteProduct = (pid) => {
    const updated = products.filter(p => p.id !== pid);
    setProducts(updated);
    localStorage.setItem(`products_wh_${id}`, JSON.stringify(updated));
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto bg-[#F8FAFC] dark:bg-gray-950 min-h-screen pb-32">
      
      {/* HEADER ... (əvvəlki kimi qalsın) */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
        <div className="space-y-4">
          <button onClick={() => navigate('/warehouses')} className="flex items-center text-indigo-500 font-black text-[10px] tracking-[0.3em] uppercase group">
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Geri Qayıt
          </button>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter italic uppercase leading-none">
            {warehouse?.name} <span className="text-indigo-600 block text-lg not-italic mt-2">İnventar</span>
          </h1>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-widest flex items-center gap-3 shadow-2xl hover:bg-gray-900 transition-all">
          <Plus size={20} strokeWidth={3} /> Yeni Texnika
        </button>
      </header>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="group bg-white dark:bg-gray-900 rounded-[3rem] border-2 border-transparent hover:border-indigo-500 transition-all shadow-sm overflow-hidden">
            
            {/* Şəkil Sahəsi */}
            <div className="h-48 bg-gray-100 dark:bg-gray-800 relative overflow-hidden flex items-center justify-center">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              ) : (
                <ImageIcon size={48} className="text-gray-300" />
              )}
              <button 
                onClick={() => deleteProduct(product.id)}
                className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="p-8">
              <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase italic tracking-tighter mb-1 truncate">{product.name}</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">{product.category}</p>
              
              <div className="flex items-center justify-between border-t dark:border-gray-800 pt-4">
                <div className="flex items-center gap-1 text-green-600 font-black text-xl italic tracking-tighter">
                  {product.price} ₼
                </div>
                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">GÜNLÜK</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: ADD PRODUCT WITH IMAGE */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[3.5rem] p-10 shadow-2xl animate-in zoom-in duration-300">
            <h2 className="text-2xl font-black italic uppercase mb-8 dark:text-white tracking-tighter text-center">İnventara Giriş</h2>
            
            <form onSubmit={addProduct} className="space-y-4">
              {/* Şəkil Yükləmə Düyməsi */}
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl p-6 hover:border-indigo-500 transition-colors relative">
                {newProduct.image ? (
                  <img src={newProduct.image} className="h-32 rounded-xl object-contain" alt="preview" />
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto text-gray-300 mb-2" size={32} />
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Şəkil Seç (PC/TEL)</p>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  onChange={handleImageChange}
                />
              </div>

              <input 
                placeholder="Avadanlıq Adı" 
                className="w-full p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none font-bold outline-none dark:text-white"
                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                required
              />
              
              <div className="grid grid-cols-2 gap-4">
                <input 
                  placeholder="Kateqoriya" 
                  className="w-full p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none font-bold outline-none dark:text-white text-xs"
                  onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                />
                <input 
                  type="number" 
                  placeholder="Qiymət (₼)" 
                  className="w-full p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none font-bold outline-none dark:text-white text-xs"
                  onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                  required
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button type="submit" className="flex-1 p-5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl">Əlavə Et</button>
                <button type="button" onClick={() => setShowModal(false)} className="p-5 font-black text-gray-400 uppercase text-[11px] tracking-widest">Ləğv Et</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseDetail;