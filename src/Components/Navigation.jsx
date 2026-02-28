import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BarChart3, PieChart, Briefcase } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Ana Səhifə', icon: <LayoutDashboard size={16} strokeWidth={3} /> },
  { path: '/projects', label: 'Layihələr', icon: <Briefcase size={16} strokeWidth={3} /> }, // YENİ: Bura əlavə olundu
  { path: '/reports', label: 'Hesabatlar', icon: <BarChart3 size={16} strokeWidth={3} /> },
  { path: '/statistics', label: 'Statistika', icon: <PieChart size={16} strokeWidth={3} /> },
];

export const Navigation = () => {
  const { pathname } = useLocation();

  return (
    <nav className="hidden md:flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-2 rounded-[2rem] border-2 border-gray-100 dark:border-gray-700">
      {navLinks.map((link) => (
        <Link 
          key={link.path} 
          to={link.path} 
          className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.1em] transition-all duration-300 py-2 px-5 rounded-2xl
            ${pathname === link.path || (link.path === '/projects' && pathname.startsWith('/project/'))
              ? 'text-white bg-indigo-600 shadow-[0_5px_0_0_#4338ca] -translate-y-1' 
              : 'text-gray-400 dark:text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-gray-800'
            }`}
        >
          {link.icon} {link.label}
        </Link>
      ))}
    </nav>
  );
};