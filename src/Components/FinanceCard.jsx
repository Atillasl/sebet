import { TrendingUp } from 'lucide-react';

const FinanceCard = ({ finance }) => (
  <div className="bg-indigo-600 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
    <TrendingUp className="absolute -right-6 -bottom-6 opacity-10" size={200} />
    <div className="relative z-10 space-y-8">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-60">Sifariş Dəyəri</p>
        <h3 className="text-5xl font-black italic tracking-tighter">{finance.totalRevenue} ₼</h3>
      </div>
      <div className="pt-6 border-t border-white/10">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-1 opacity-60">Xalis Mənfəət</p>
        <p className="text-3xl font-black text-green-300 italic">+{finance.netProfit} ₼</p>
      </div>
    </div>
  </div>
);

export default FinanceCard;