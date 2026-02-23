import { useState, useEffect } from 'react';

export const useWarehouses = () => {
  const [warehouses, setWarehouses] = useState(() => {
    try {
      const saved = localStorage.getItem('my_warehouses');
      return saved ? JSON.parse(saved) : [{ id: 1, name: "Mərkəzi Stratosfer Anbarı", location: "Bakı, Nərimanov", itemCount: 0 }];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('my_warehouses', JSON.stringify(warehouses));
  }, [warehouses]);

  const addWarehouse = (name, location) => {
    const newWh = { id: Date.now(), name, location, itemCount: 0 };
    setWarehouses(prev => [...prev, newWh]);
  };

  const deleteWarehouse = (id) => {
    if (window.confirm("Bu sektoru silmək istəyirsən?")) {
      setWarehouses(prev => prev.filter(w => w.id !== id));
      localStorage.removeItem(`products_wh_${id}`);
    }
  };

  return { warehouses, addWarehouse, deleteWarehouse };
};