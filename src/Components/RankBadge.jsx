import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { calculateRank } from '../utils/rankHelper';

export const RankBadge = () => {
  const location = useLocation();
  const [rank, setRank] = useState(calculateRank());

  useEffect(() => {
    setRank(calculateRank());
  }, [location]);

  return (
    <div className="hidden lg:flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-2xl border-2 border-indigo-100 dark:border-indigo-800">
      <div className="text-xl">{rank.icon}</div>
      <div className="flex flex-col">
        <p className="text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Səviyyə</p>
        <p className={`text-[10px] font-black uppercase tracking-tight ${rank.color}`}>{rank.title}</p>
      </div>
    </div>
  );
};