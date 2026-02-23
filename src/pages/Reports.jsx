import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, TrendingUp, DollarSign, Package, 
  PieChart, Download, Target, Award, ArrowUpRight 
} from 'lucide-react';

const Reports = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEarned: 0,
    totalProducts: 0,
    rentedCount: 0,
    bestSeller: { name: "Yoxdur", gain: 0 },
    warehousePerformance: []
  });

  useEffect(() => {
    const warehouses = JSON.parse(localStorage.getItem('my_warehouses') || '[]');
    let earned = 0;
    let productsCount = 0;
    let rented = 0;
    let topProduct = { name: 'Yoxdur', gain: 0 };
    let performance = [];

    warehouses.forEach(wh => {
      const products = JSON.parse(localStorage.getItem(`products_wh_${wh.id}`) || '[]');
      let whEarned = 0;
      productsCount += products.length;
      
      products.forEach(p => {
        const pEarned = Number(p.earned || 0);
        earned += pEarned;
        whEarned += pEarned;
        
        if (p.status === 'Rented') rented++;
        if (pEarned > topProduct.gain) {
          topProduct = { name: p.name, gain: pEarned };
        }
      });

      performance.push({
        name: wh.name,
        earned: whEarned,
        count: products.length
      });
    });

    setStats({
      totalEarned: earned,
      totalProducts: productsCount,
      rentedCount: rented,
      bestSeller: topProduct,
      warehousePerformance: performance.sort((a, b) => b.earned - a.earned)
    });
  }, []);

  const exportFullReport = () => {
    const headers = "Anbar Adi,Mehsul Sayi,Toplam Gelir\n";
    const data = stats.warehousePerformance.map(w => `${w.name},${w.count},${w.earned}`).join("\n");
    const blob = new Blob([headers + data], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "umumi_maliyye_hesabati.csv";
    link.click();
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-500">
      
      {/* ÜST HİSSƏ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-2 transition font-black text-xs tracking-widest"
          >
            <ArrowLeft size={16} className="mr-1" /> DASHBOARD-A QAYIT
          </button>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Maliyyə Analitikası</h1>
        </div>
        <button 
          onClick={exportFullReport}
          className="flex items-center justify-center gap-2 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 p-4 rounded-2xl font-black text-sm text-gray-700 dark:text-gray-300 hover:border-indigo-600 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm dark:shadow-none"
        >
          <Download size={20} /> EKSPORT (.CSV)
        </button>
      </div>

      {/* ƏSAS GÖSTƏRİCİLƏR */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-indigo-600 dark:bg-indigo-700 p-6 rounded-[2rem] text-white shadow-xl shadow-indigo-100 dark:shadow-none relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 bg-white/10 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <DollarSign className="mb-4 opacity-50" size={32} />
          <p className="text-indigo-100 text-[10px] font-black uppercase tracking-widest">Ümumi Dövriyyə</p>
          <h3 className="text-3xl font-black">{stats.totalEarned} ₼</h3>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
          <Package className="text-orange-500 mb-4" size={32} />
          <p className="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-widest">Aktiv Portfel</p>
          <h3 className="text-3xl font-black text-gray-800 dark:text-gray-100">{stats.totalProducts} <span className="text-sm text-gray-300 dark:text-gray-600">ədəd</span></h3>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
          <Award className="text-yellow-500 mb-4" size={32} />
          <p className="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-widest">Top Məhsul</p>
          <h3 className="text-xl font-black text-gray-800 dark:text-gray-100 truncate">{stats.bestSeller.name}</h3>
          <p className="text-xs font-bold text-green-500 dark:text-green-400">+{stats.bestSeller.gain} ₼ qazanc</p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
          <PieChart className="text-purple-500 mb-4" size={32} />
          <p className="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-widest">Arenda Yükü</p>
          <h3 className="text-3xl font-black text-gray-800 dark:text-gray-100">{stats.rentedCount} <span className="text-sm text-gray-300 dark:text-gray-600">aktiv</span></h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ANBAR PERFORMANSI */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
          <h2 className="text-xl font-black text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
            <Target className="text-indigo-600 dark:text-indigo-400" /> Anbarların Gəlir Bölgüsü
          </h2>
          <div className="space-y-6">
            {stats.warehousePerformance.map((wh, index) => (
              <div key={index}>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <span className="text-sm font-black text-gray-800 dark:text-gray-200 uppercase tracking-tight">{wh.name}</span>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold">{wh.count} Məhsul</p>
                  </div>
                  <span className="font-black text-indigo-600 dark:text-indigo-400">{wh.earned} ₼</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-1000" 
                    style={{ width: `${(wh.earned / (stats.totalEarned || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
            {stats.warehousePerformance.length === 0 && (
              <p className="text-center py-10 text-gray-400 dark:text-gray-600 font-bold uppercase text-xs">Məlumat tapılmadı</p>
            )}
          </div>
        </div>

        {/* TƏKLİF VƏ ANALİZ */}
        <div className="bg-gradient-to-b from-gray-900 to-indigo-950 dark:from-indigo-950 dark:to-black p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden transition-all border border-transparent dark:border-indigo-900/30">
          <div className="relative z-10">
            <h2 className="text-xl font-black mb-4">Ağıllı Analiz</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-green-500/20 transition-colors"><ArrowUpRight className="text-green-400" /></div>
                <p className="text-sm text-gray-300 dark:text-gray-400 font-medium leading-relaxed">
                  Ən yüksək gəlir <b className="text-white">{stats.bestSeller.name}</b> məhsulundan gəlir. Bu kateqoriyaya investisiya etmək gəliri <span className="text-green-400">15%</span> artıra bilər.
                </p>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-blue-500/20 transition-colors"><TrendingUp className="text-blue-400" /></div>
                <p className="text-sm text-gray-300 dark:text-gray-400 font-medium leading-relaxed">
                  Ümumi portfelin <b className="text-white">{((stats.rentedCount / (stats.totalProducts || 1)) * 100).toFixed(1)}%</b> hissəsi hazırda dövriyyədədir. 
                </p>
              </div>
            </div>
            
            <div className="mt-12 p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
              <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-2">Sistem Mesajı</p>
              <p className="text-xs text-gray-400 leading-relaxed italic">
                "Maliyyə hesabatları bütün sektorlardakı hərəkətlərə əsasən real vaxtda sinxronlaşdırılır."
              </p>
            </div>
          </div>
          {/* Dekorativ dairə effekti */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Reports;