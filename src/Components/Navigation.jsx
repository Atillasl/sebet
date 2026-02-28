import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Database, BarChart3 } from 'lucide-react';

const navLinks = [
  { 
    path: '/', 
    label: 'Ana Səhifə', 
    icon: <LayoutDashboard size={16} strokeWidth={3} /> 
  },
  { 
    path: '/projects', 
    label: 'Layihələr', 
    icon: <Briefcase size={16} strokeWidth={3} /> 
  },
  { 
    path: '/warehouses', 
    label: 'Anbar', 
    icon: <Database size={16} strokeWidth={3} /> 
  },
  { 
    path: '/reports', // Geri qaytarılan Hesabatlılıq bölməsi
    label: 'Hesabatlar', 
    icon: <BarChart3 size={16} strokeWidth={3} /> 
  },
];

export const Navigation = () => {
  const { pathname } = useLocation();

  return (
    <nav className="hidden lg:flex items-center gap-2 bg-gray-100/50 dark:bg-gray-800/50 p-1.5 rounded-[2rem] border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
      {navLinks.map((link) => {
        // Aktivlik yoxlaması: Alt səhifələrdə belə (məs: /reports/monthly) menyu aktiv qalsın
        const isActive = 
          pathname === link.path || 
          (link.path === '/projects' && pathname.startsWith('/project/')) ||
          (link.path === '/warehouses' && pathname.startsWith('/warehouse/')) ||
          (link.path === '/reports' && pathname.startsWith('/reports/'));

        return (
          <Link 
            key={link.path} 
            to={link.path} 
            className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.15em] transition-all duration-300 py-2.5 px-6 rounded-2xl
              ${isActive 
                ? 'text-white bg-indigo-600 shadow-lg shadow-indigo-500/30 -translate-y-0.5' 
                : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-gray-900'
              }`}
          >
            {link.icon} {link.label}
          </Link>
        );
      })}
    </nav>
  );
};