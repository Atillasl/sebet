import React, { useState } from 'react';
import { X, Upload, Package, DollarSign, Tag } from 'lucide-react';

const AddProductModal = ({ isOpen, onClose, onAdd }) => {
  // 1. Hook-lar mütləq ən başda olmalıdır!
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: null
  });

  // 2. Şərt (Conditional return) Hook-lardan SONRA gəlməlidir
  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return alert("Ad və Qiymət mütləqdir!");
    
    onAdd(formData);
    setFormData({ name: '', category: '', price: '', image: null });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-[150] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[3.5rem] p-10 shadow-2xl animate-in zoom-in duration-300 relative">
        
        <button onClick={onClose} className="absolute right-8 top-8 p-2 text-gray-400 hover:text-black dark:hover:text-white">
          <X size={24} />
        </button>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-black italic uppercase dark:text-white tracking-tighter">İnventara Giriş</h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">Yeni Texnika Əlavə Et</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* IMAGE UPLOAD AREA */}
          <div className="relative group">
            <div className={`h-40 w-full border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center overflow-hidden transition-all
              ${formData.image ? 'border-indigo-500' : 'border-gray-100 dark:border-gray-800 hover:border-indigo-300'}`}>
              
              {formData.image ? (
                <div className="relative w-full h-full">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-[10px] font-black uppercase">Şəkli Dəyiş</p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <Upload className="mx-auto text-indigo-500" size={20} />
                  <p className="text-[9px] font-black text-gray-400 uppercase">Texnika Şəkli Yüklə</p>
                </div>
              )}
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
            </div>
          </div>

          <div className="relative">
            <Package className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input 
              type="text"
              placeholder="Avadanlıq Adı"
              className="w-full p-5 pl-14 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none font-bold outline-none dark:text-white text-sm"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
              <input 
                type="text"
                placeholder="Kateqoriya"
                className="w-full p-5 pl-12 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none font-bold outline-none dark:text-white text-xs"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              />
            </div>
            <div className="relative">
              <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-green-500" size={16} />
              <input 
                type="number"
                placeholder="Qiymət"
                className="w-full p-5 pl-12 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none font-bold outline-none dark:text-white text-xs"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full p-6 bg-indigo-600 text-white rounded-3xl font-black uppercase text-[11px] tracking-[0.3em] shadow-xl hover:bg-indigo-700 transition-all">
            Siyahıya Əlavə Et
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;