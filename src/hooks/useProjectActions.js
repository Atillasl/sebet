import { useState, useEffect } from 'react';

export const useProjectActions = (id) => {
  const [project, setProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem('my_projects') || '[]');
    const currentProj = projects.find(p => p.id === Number(id));
    if (currentProj) {
      setProject(currentProj);
      setEditData(currentProj);
    }
  }, [id]);

  const calculateDays = (start, end) => {
    if (!start || !end) return 1;
    const diff = Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 1;
  };

  const saveProject = (updated) => {
    const projects = JSON.parse(localStorage.getItem('my_projects') || '[]');
    const index = projects.findIndex(p => p.id === Number(id));
    projects[index] = updated;
    localStorage.setItem('my_projects', JSON.stringify(projects));
    setProject(updated);
    setEditData(updated);
  };

  const finance = {
    totalRevenue: project?.items?.reduce((acc, curr) => acc + Number(curr.total), 0) || 0,
    totalCost: project?.items?.reduce((acc, curr) => acc + (Number(curr.costTotal) || 0), 0) || 0,
    get netProfit() { return this.totalRevenue - this.totalCost }
  };

  return { project, isEditing, setIsEditing, editData, setEditData, saveProject, calculateDays, finance };
};