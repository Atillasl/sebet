import { useNavigate } from 'react-router-dom'; // Naviqasiya üçün əlavə edildi
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate(); // Naviqasiya funksiyasını işə salırıq

  // Kartın üzərinə klikləyəndə işə düşəcək funksiya
  const handleCardClick = () => {
    // Səni layihənin ID-sinə uyğun səhifəyə aparır (məs: /project/123)
    navigate(`/project/${project.id}`);
  };

  return (
    <div 
      onClick={handleCardClick} // Klikləmə bura əlavə olundu
      className="group bg-white dark:bg-gray-900 p-8 rounded-[3.5rem] border-2 border-transparent hover:border-indigo-500 transition-all cursor-pointer shadow-sm hover:shadow-2xl"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
          <Briefcase size={28} />
        </div>
        <div className="text-right">
          <span className="text-[9px] font-black bg-green-50 dark:bg-green-900/20 text-green-600 px-4 py-1.5 rounded-full uppercase tracking-widest border border-green-100 italic">
            {project.status}
          </span>
          <div className="flex items-center gap-1.5 text-gray-400 mt-2 justify-end">
            <Calendar size={12} />
            <span className="text-[9px] font-black uppercase">{project.startDate}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter truncate">
          {project.name}
        </h3>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">
          Müştəri: <span className="text-gray-600 dark:text-gray-300">{project.client}</span>
        </p>
      </div>
      
      <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-800 pt-6">
        <div className="text-green-600 font-black text-xl italic tracking-tighter">{project.prepayment} ₼</div>
        <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
          <ChevronRight size={24} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;