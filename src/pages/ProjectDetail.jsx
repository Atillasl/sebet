import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3, Save, Trash2, FileText, PlusCircle } from 'lucide-react';
import { useProjectActions } from '../hooks/useProjectActions';
import ProjectManifest from '../components/ProjectManifest';
import FinanceCard from '../components/FinanceCard';
import AddItemModal from '../components/AddItemModal';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Custom Hook-dan gələn məlumatlar
  const { 
    project, 
    isEditing, 
    setIsEditing, 
    editData, 
    setEditData, 
    saveProject, 
    calculateDays, 
    finance 
  } = useProjectActions(id);

  // Modalın vəziyyəti (null, 'internal' və ya 'external')
  const [showModal, setShowModal] = useState(null);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-gray-950">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-400">Yüklənir...</p>
        </div>
      </div>
    );
  }

  // Layihəni tam silmək funksiyası
  const handleDeleteProject = () => {
    if (window.confirm("Bu layihəni tamamilə silmək istədiyinizə əminsiniz?")) {
      const projects = JSON.parse(localStorage.getItem('my_projects') || '[]');
      const filtered = projects.filter(p => p.id !== Number(id));
      localStorage.setItem('my_projects', JSON.stringify(filtered));
      navigate('/projects');
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-[1400px] mx-auto min-h-screen pb-32 bg-[#F8FAFC] dark:bg-gray-950 transition-colors duration-300">
      
      {/* HEADER BÖLMƏSİ */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 mb-12">
        <div className="space-y-4">
          <button 
            onClick={() => navigate('/projects')} 
            className="flex items-center text-gray-400 font-black text-[10px] uppercase tracking-widest hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft size={14} className="mr-2" /> Layihələr siyahısına qayıt
          </button>
          
          {isEditing ? (
            <input 
              className="text-4xl font-black bg-white dark:bg-gray-800 border-2 border-indigo-500 p-3 rounded-2xl italic uppercase outline-none shadow-lg shadow-indigo-500/10" 
              value={editData.name} 
              onChange={e => setEditData({...editData, name: e.target.value})} 
            />
          ) : (
            <h1 className="text-5xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter">
              {project.name}
            </h1>
          )}
        </div>

        <div className="flex gap-3">
          {isEditing ? (
            <button 
              onClick={() => { saveProject(editData); setIsEditing(false); }} 
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-green-500/20 transition-all active:scale-95"
            >
              <Save size={16}/> Yadda Saxla
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)} 
              className="bg-white dark:bg-gray-900 border border-indigo-100 dark:border-gray-800 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-indigo-600 flex items-center gap-2 hover:bg-indigo-50 transition-all shadow-sm"
            >
              <Edit3 size={16}/> Layihəni Redaktə et
            </button>
          )}
          <button 
            onClick={handleDeleteProject}
            className="bg-white dark:bg-gray-900 border border-red-100 dark:border-gray-800 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all shadow-sm"
          >
            <Trash2 size={16}/> Sil
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* SOL TƏRƏF: Qeydlər və Cədvəl */}
        <div className="xl:col-span-8 space-y-8">
          
          {/* QEYDLƏR */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-6 text-indigo-500 text-[10px] font-black uppercase tracking-widest"> 
              <FileText size={18}/> Layihə Haqqında Qeydlər 
            </div>
            {isEditing ? (
              <textarea 
                className="w-full p-5 bg-gray-50 dark:bg-gray-800 rounded-3xl min-h-[120px] font-bold outline-none border-2 border-transparent focus:border-indigo-100 transition-all" 
                value={editData.notes} 
                onChange={e => setEditData({...editData, notes: e.target.value})} 
                placeholder="Layihə detallarını buraya yazın..."
              />
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic font-medium leading-relaxed">
                {project.notes || "Heç bir qeyd əlavə edilməyib."}
              </p>
            )}
          </div>

          {/* AVADANLIQ MANİFESTİ (CƏDVƏL) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-4">
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 italic">Avadanlıq Siyahısı</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowModal('internal')}
                  className="bg-indigo-50 text-indigo-600 p-2 px-4 rounded-xl text-[9px] font-black uppercase flex items-center gap-2 hover:bg-indigo-100"
                >
                  <PlusCircle size={12}/> Anbardan
                </button>
                <button 
                  onClick={() => setShowModal('external')}
                  className="bg-orange-50 text-orange-600 p-2 px-4 rounded-xl text-[9px] font-black uppercase flex items-center gap-2 hover:bg-orange-100"
                >
                  <PlusCircle size={12}/> Kənardan
                </button>
              </div>
            </div>
            
            <ProjectManifest 
              items={project.items || []} 
              calculateDays={calculateDays} 
              onUpdate={(newItems) => saveProject({...project, items: newItems})} 
            />
          </div>
        </div>

        {/* SAĞ TƏRƏF: MALİYYƏ PANELİ */}
        <div className="xl:col-span-4">
          <div className="sticky top-12">
            <FinanceCard finance={finance} />
            
            {/* Statik Bilgi Kartı (Opsional) */}
            <div className="mt-8 p-8 bg-gray-100 dark:bg-gray-900 rounded-[2.5rem] border border-dashed border-gray-300 dark:border-gray-800 text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-loose">
                Layihə müddəti: <br/> 
                <span className="text-gray-900 dark:text-white text-sm">
                  {project.startDate} — {project.endDate}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Məhsul əlavə etmə paneli */}
      {showModal && (
        <AddItemModal 
          mode={showModal}
          projectDates={{start: project.startDate, end: project.endDate}}
          calculateDays={calculateDays}
          onClose={() => setShowModal(null)}
          onAdd={(item) => saveProject({...project, items: [...(project.items || []), item]})}
        />
      )}
    </div>
  );
};

export default ProjectDetail;