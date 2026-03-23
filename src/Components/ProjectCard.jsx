import { useNavigate } from 'react-router-dom';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white dark:bg-[#0D1117] p-8 rounded-[3.5rem] border-2 border-transparent hover:border-yellow-500 transition-all cursor-pointer shadow-sm hover:shadow-2xl relative overflow-hidden"
    >
      {/* Industrial Background Element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-[50px] pointer-events-none" />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300 shadow-inner">
          <Briefcase size={28} />
        </div>
        <div className="text-right">
          <span className="text-[9px] font-black bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 px-4 py-1.5 rounded-full uppercase tracking-widest border border-yellow-500/20 italic shadow-sm">
            {project.status}
          </span>
          <div className="flex items-center gap-1.5 text-slate-400 mt-3 justify-end group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
            <Calendar size={12} className="text-yellow-500" />
            <span className="text-[9px] font-black uppercase tracking-tighter">{project.startDate}</span>
          </div>
        </div>
      </div>

      <div className="mb-6 relative z-10">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter truncate group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
          {project.name}
        </h3>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">
          Müştəri: <span className="text-slate-900 dark:text-slate-200">{project.client}</span>
        </p>
      </div>
      
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-6 relative z-10">
        <div className="flex flex-col">
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Beh / Prepayment</span>
          <div className="text-yellow-600 dark:text-yellow-500 font-black text-2xl italic tracking-tighter">
            {project.prepayment} ₼
          </div>
        </div>
        
        <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-yellow-500 group-hover:text-black group-hover:rotate-90 transition-all duration-500 shadow-sm border border-transparent group-hover:border-yellow-600">
          <ChevronRight size={24} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;