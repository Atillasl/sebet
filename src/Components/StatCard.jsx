export const StatCard = ({ label, val, icon, color }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-[2.5rem] shadow-sm border-2 border-transparent hover:border-indigo-50 dark:hover:border-indigo-900 transition-all group">
    <div className={`bg-${color}-50 dark:bg-${color}-900/20 text-${color}-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <p className="text-gray-400 dark:text-gray-500 text-[9px] font-black uppercase tracking-[0.2em]">{label}</p>
    <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter italic">{val}</h3>
  </div>
);