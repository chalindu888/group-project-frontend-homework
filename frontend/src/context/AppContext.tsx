import React, { createContext, useContext, useState, useEffect } from 'react';

interface Item {
  id: number;
  name: string;
}

interface AppContextType {
  items: Item[];
  fetchItems: () => void;
  addItem: (name: string) => void;
  updateItem: (id: number, name: string) => void;
  deleteItem: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// මෙතැනට ඔයාගේ Back-end API එකේ URL එක දාන්න (ဥပမာ: http://localhost:8080/api/items)
const API_URL = 'http://localhost:5000/items';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (name: string) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (response.ok) fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateItem = async (id: number, name: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (response.ok) fetchItems();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <AppContext.Provider value={{ items, fetchItems, addItem, updateItem, deleteItem }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};