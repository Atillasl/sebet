import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Plus, X, Camera, History, Trash2, 
  Search, Star, Clock, DollarSign, Package
} from 'lucide-react';

// --- KÖMƏKÇİ FUNKSİYA (İcarə hesablama) ---
const calculateTotal = (start, end, dailyPrice) => {
  if (!start || !end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = endDate - startDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
  return diffDays > 0 ? diffDays * dailyPrice : 0;
};

const WarehouseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- STATELƏR ---
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem(`products_wh_${id}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', type: 'Rent', price: '', image: '' });
  const [rentalData, setRentalData] = useState({ client: '', startDate: '', endDate: '' });

  // --- YADDAŞLA SİNXRONİZASİYA ---
  useEffect(() => {
    localStorage.setItem(`products_wh_${id}`, JSON.stringify(products));
    
    const savedWarehouses = localStorage.getItem('my_warehouses');
    if (savedWarehouses) {
      const warehouses = JSON.parse(savedWarehouses);
      const updatedWarehouses = warehouses.map(wh => 
        wh.id === Number(id) ? { ...wh, itemCount: products.length } : wh
      );
      localStorage.setItem('my_warehouses', JSON.stringify(updatedWarehouses));
    }
  }, [products, id]);

  // --- FUNKSİYALAR ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewProduct({ ...newProduct, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const addProduct = (e) => {
    e.preventDefault();
    const item = { 
      id: Date.now(), 
      ...newProduct, 
      price: Number(newProduct.price),
      status: "Available",
      earned: 0,
      history: [] 
    };
    setProducts([...products, item]);
    setIsProductModalOpen(false);
    setNewProduct({ name: '', type: 'Rent', price: '', image: '' });
  };

  const confirmRental = () => {
    const rentalGain = calculateTotal(rentalData.startDate, rentalData.endDate, selectedProduct.price);
    const historyEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      type: 'İcarə',
      client: rentalData.client,
      period: `${rentalData.startDate} / ${rentalData.endDate}`,
      amount: rentalGain
    };

    setProducts(products.map(p => 
      p.id === selectedProduct.id ? { 
        ...p, status: 'Rented', earned: (p.earned || 0) + rentalGain, history: [historyEntry, ...(p.history || [])] 
      } : p
    ));
    setIsRentalModalOpen(false);
    setRentalData({ client: '', startDate: '', endDate: '' });
  };

  const returnProduct = (pId) => {
    setProducts(products.map(p => p.id === pId ? { ...p, status: 'Available' } : p));
  };

  const deleteProduct = (pId) => {
    if(window.confirm("Bu əşyanı silmək istəyirsən?")) {
      setProducts(products.filter(p => p.id !== pId));
    }
  };

  const totalEarned = products.reduce((a, b) => a + (b.earned || 0), 0);
  const level = Math.floor(totalEarned / 500) + 1;

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto bg-[#F8FAFC] dark:bg-gray-950 min-h-screen pb-32 transition-colors duration-500">
      
      {/* OYUNÇU PROFİLİ */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-6 mb-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] dark:shadow-none border-b-8 border-indigo-100 dark:border-indigo-900/50 flex flex-wrap items-center justify-between gap-6 transition-colors">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-3xl rotate-3 shadow-xl flex items-center justify-center text-4xl border-4 border-white dark:border-gray-800">👑</div>
            <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full border-2 border-white dark:border-gray-800 uppercase shadow-lg">LVL {level}</div>
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic transition-colors">Sektor Paneli</h1>
            <span className="flex items-center text-[10px] font-black text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-lg uppercase mt-1">
               <Star size={12} className="mr-1 fill-indigo-500 dark:fill-indigo-400" /> Professional Maqnat
            </span>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="text-center">
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Qızıl Balans</p>
            <p className="text-3xl font-black text-green-600 dark:text-green-500 tracking-tighter transition-colors">{totalEarned} ₼</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Aktiv İş</p>
            <p className="text-3xl font-black text-orange-500 dark:text-orange-400 tracking-tighter transition-colors">{products.filter(p=>p.status==='Rented').length}</p>
          </div>
        </div>
      </div>

      {/* SEARCH & ADD */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600 group-focus-within:text-indigo-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="İnventarda axtar..." 
            className="w-full bg-white dark:bg-gray-900 border-2 border-gray-50 dark:border-gray-800 p-5 pl-14 rounded-[2rem] outline-none focus:border-indigo-400 dark:focus:border-indigo-600 shadow-sm dark:shadow-none font-bold text-gray-700 dark:text-gray-200 transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setIsProductModalOpen(true)}
          className="bg-indigo-600 dark:bg-indigo-500 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-lg shadow-indigo-200 dark:shadow-none hover:scale-105 active:scale-95 transition-all"
        >
          + Yeni Əşya
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-5 shadow-xl shadow-gray-200/50 dark:shadow-none border-2 border-transparent hover:border-indigo-100 dark:hover:border-indigo-900 transition-all relative group overflow-hidden">
            <div className="aspect-square bg-gray-50 dark:bg-gray-800 rounded-[2rem] mb-4 overflow-hidden relative border border-gray-100 dark:border-gray-700">
              {item.image ? (
                <img src={item.image} className="w-full h-full object-cover" alt="" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-200 dark:text-gray-700"><Camera size={40} /></div>
              )}
              <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[8px] font-black uppercase ${item.status === 'Available' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white shadow-lg'}`}>
                {item.status === 'Available' ? 'HAZIR' : 'İCARƏDƏ'}
              </div>
            </div>

            <h3 className="font-black text-gray-800 dark:text-gray-200 text-center uppercase text-[10px] mb-3 truncate px-2 transition-colors">{item.name}</h3>
            
            <div className="bg-indigo-50/50 dark:bg-indigo-900/20 rounded-2xl p-2 mb-4 text-center">
               <p className="text-[14px] font-black text-indigo-700 dark:text-indigo-400 transition-colors">{item.earned || 0} ₼</p>
            </div>

            <div className="space-y-2">
              {item.status === 'Available' ? (
                <button 
                  onClick={() => { setSelectedProduct(item); setIsRentalModalOpen(true); }}
                  className="w-full py-4 bg-gray-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors"
                >
                  Ver 🚀
                </button>
              ) : (
                <button 
                  onClick={() => returnProduct(item.id)}
                  className="w-full py-4 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 border-orange-200 dark:border-orange-800 hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
                >
                  Geri Al 📦
                </button>
              )}
              <div className="flex gap-2">
                <button onClick={() => { setSelectedProduct(item); setIsHistoryModalOpen(true); }} className="flex-1 py-3 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><History size={16} className="mx-auto" /></button>
                <button onClick={() => deleteProduct(item.id)} className="flex-1 py-3 bg-red-50 dark:bg-red-900/20 text-red-200 dark:text-red-600 rounded-xl hover:text-red-500 transition-colors"><Trash2 size={16} className="mx-auto" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: ADD PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 w-full max-w-md shadow-2xl border-t-[10px] border-indigo-600 animate-in zoom-in duration-300">
            <h2 className="text-xl font-black text-center mb-6 uppercase dark:text-white">Yeni İnventar</h2>
            <form onSubmit={addProduct} className="space-y-4">
              <div className="relative border-4 border-dashed border-gray-100 dark:border-gray-800 rounded-[2rem] h-40 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 overflow-hidden">
                {newProduct.image ? <img src={newProduct.image} className="absolute inset-0 w-full h-full object-cover" alt="" /> : <Camera className="text-gray-300 dark:text-gray-600" size={32} />}
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
              </div>
              <input required placeholder="Əşyanın Adı" className="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-xl font-bold outline-none border-2 border-transparent focus:border-indigo-100 dark:focus:border-indigo-900 dark:text-white transition-all" onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <select className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl font-bold outline-none dark:text-white border-2 border-transparent focus:border-indigo-900" onChange={e => setNewProduct({...newProduct, type: e.target.value})}>
                  <option value="Rent">İcarə</option>
                  <option value="Sale">Satış</option>
                </select>
                <input required type="number" placeholder="Günlük ₼" className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl font-bold outline-none dark:text-white border-2 border-transparent focus:border-indigo-900" onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
              </div>
              <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black shadow-lg uppercase text-[11px] tracking-widest mt-4 hover:bg-indigo-500 transition-all">Anbara Yerləşdir</button>
              <button type="button" onClick={() => setIsProductModalOpen(false)} className="w-full text-gray-400 dark:text-gray-500 font-black text-[10px] uppercase py-2">Ləğv Et</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RENTAL */}
      {isRentalModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 w-full max-w-md shadow-2xl border-t-[10px] border-blue-600 animate-in zoom-in">
            <h2 className="text-xl font-black mb-6 uppercase text-center dark:text-white">İcarə Müqaviləsi</h2>
            <div className="space-y-4">
              <input placeholder="Müştəri adı" className="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-xl font-bold outline-none dark:text-white border-2 border-transparent focus:border-blue-900" onChange={e => setRentalData({...rentalData, client: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase ml-2">Başlanğıc</label>
                  <input type="date" className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl font-bold text-xs outline-none dark:text-white border-2 border-transparent" onChange={e => setRentalData({...rentalData, startDate: e.target.value})} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase ml-2">Bitiş</label>
                  <input type="date" className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl font-bold text-xs outline-none dark:text-white border-2 border-transparent" onChange={e => setRentalData({...rentalData, endDate: e.target.value})} />
                </div>
              </div>
              <button onClick={confirmRental} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black shadow-lg uppercase text-[11px] mt-4 hover:bg-blue-500">İşi Təsdiqlə 🚀</button>
              <button onClick={() => setIsRentalModalOpen(false)} className="w-full text-gray-400 dark:text-gray-500 font-black text-[10px] uppercase py-2">Geri</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: HISTORY */}
      {isHistoryModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 w-full max-w-lg shadow-2xl max-h-[80vh] flex flex-col border-t-[10px] border-purple-600">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black uppercase tracking-tighter italic text-indigo-600 dark:text-indigo-400 transition-colors">Qazanc Tarixi</h2>
              <button onClick={() => setIsHistoryModalOpen(false)} className="p-2 bg-gray-50 dark:bg-gray-800 dark:text-white rounded-full"><X size={20}/></button>
            </div>
            <div className="overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {selectedProduct.history?.map((h) => (
                <div key={h.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-[1.5rem] border border-gray-100 dark:border-gray-700 flex justify-between items-center transition-colors">
                  <div>
                    <p className="font-black text-gray-800 dark:text-gray-200 text-xs uppercase">{h.client}</p>
                    <p className="text-[9px] font-bold text-gray-400 dark:text-gray-500">{h.period || h.date}</p>
                  </div>
                  <div className="text-green-600 dark:text-green-500 font-black">+{h.amount} ₼</div>
                </div>
              ))}
              {(!selectedProduct.history || selectedProduct.history.length === 0) && <p className="text-center py-10 text-gray-300 dark:text-gray-700 font-black uppercase text-[10px]">Məlumat yoxdur</p>}
            </div>
          </div>
        </div>
      )}

      {/* BACK BUTTON */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <button 
          onClick={() => navigate('/')}
          className="bg-gray-900 dark:bg-indigo-600 text-white px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-widest shadow-2xl flex items-center gap-3 border-4 border-white dark:border-gray-800 active:scale-90 hover:bg-black dark:hover:bg-indigo-500 transition-all"
        >
          <ArrowLeft size={18} /> Baş Ofis
        </button>
      </div>
    </div>
  );
};

export default WarehouseDetail;