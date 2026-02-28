import { useState, useEffect } from 'react';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Layihələri yükləyirik
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('my_projects') || '[]');
    setProjects(saved);
  }, []);

  // YENİ LAYİHƏ ƏLAVƏ ETMƏK
  const addProject = (newProj) => {
    const updated = [newProj, ...projects];
    localStorage.setItem('my_projects', JSON.stringify(updated));
    setProjects(updated);
  };

  // LAYİHƏNİ SİLMƏK (Xətanın həlli buradadır)
  const deleteProject = (id) => {
    if (window.confirm("Bu layihəni silmək istədiyinizə əminsiniz?")) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      localStorage.setItem('my_projects', JSON.stringify(updated));
    }
  };

  // FİLTRLƏMƏ (Xəta verməməsi üçün optional chaining ?. əlavə etdik)
  const filteredProjects = projects.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.client?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Bütün funksiyaları və datanı return edirik
  return { 
    projects: filteredProjects, 
    searchTerm, 
    setSearchTerm, 
    addProject, 
    deleteProject // <--- Bunu unutmuşdun, indi əlavə olundu
  };
};