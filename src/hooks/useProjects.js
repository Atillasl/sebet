import { useState, useEffect } from 'react';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Layihələri yükləyirik
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('my_projects') || '[]');
    setProjects(saved);
  }, []);

  // Yardımçı funksiya: Həm state-i, həm localStorage-ı eyni anda yeniləyir
  const saveAndSet = (newList) => {
    setProjects(newList);
    localStorage.setItem('my_projects', JSON.stringify(newList));
  };

  // 2. YENİ LAYİHƏ ƏLAVƏ ETMƏK (Büdcə və Tarix daxil)
  const addProject = (newProj) => {
    const projectWithData = {
      ...newProj,
      id: Date.now(), // Unikal ID
      budget: Number(newProj.budget || 0), // Büdcənin rəqəm olmasını təmin edirik
      createdAt: new Date().toISOString()
    };
    const updated = [projectWithData, ...projects];
    saveAndSet(updated);
  };

  // 3. LAYİHƏNİ REDAKTƏ ETMƏK (BU YENİDİR!)
  // Bu funksiya bütün sahələri (tarix, ad və s.) yeniləməyə imkan verir
  const updateProject = (id, updatedData) => {
    const updated = projects.map(p => 
      p.id === id 
        ? { 
            ...p, 
            ...updatedData, 
            budget: Number(updatedData.budget || p.budget) // Büdcəni yenə rəqəmə çeviririk
          } 
        : p
    );
    saveAndSet(updated);
  };

  // 4. LAYİHƏNİ SİLMƏK
  const deleteProject = (id) => {
    if (window.confirm("Bu layihəni silmək istədiyinizə əminsiniz?")) {
      const updated = projects.filter(p => p.id !== id);
      saveAndSet(updated);
    }
  };

  // 5. FİLTRLƏMƏ
  const filteredProjects = projects.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.client?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return { 
    projects: filteredProjects, 
    allProjects: projects, // Statistikalar üçün lazım ola bilər
    searchTerm, 
    setSearchTerm, 
    addProject, 
    updateProject, // <--- Redaktə üçün mütləq lazımdır
    deleteProject 
  };
};