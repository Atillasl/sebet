import { Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Logo = () => (
  <Link to="/" className="flex items-center gap-3 group">
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-2xl text-white shadow-lg group-hover:rotate-12 transition-all">
      <Camera size={24} strokeWidth={3} />
    </div>
    <div className="flex flex-col">
      <span className="text-2xl font-black text-gray-900 dark:text-white leading-none tracking-tighter italic">
        RENT<span className="text-indigo-600">FLOW</span>
      </span>
      <span className="text-[8px] font-black text-indigo-400 uppercase tracking-[0.3em]">Empire Edition</span>
    </div>
  </Link>
);