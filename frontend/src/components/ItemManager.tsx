import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ItemManager: React.FC = () => {
  const { items, addItem, updateItem, deleteItem } = useApp();
  const [inputName, setInputName] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) return;

    if (editId !== null) {
      updateItem(editId, inputName);
      setEditId(null);
    } else {
      addItem(inputName);
    }
    setInputName('');
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <h2>CRUD Operations - React + Vite + TypeScript</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={inputName} 
          onChange={(e) => setInputName(e.target.value)} 
          placeholder="Enter item name..."
          style={{ padding: '8px', marginRight: '10px', width: '250px' }}
        />
        <button type="submit" style={{ padding: '8px 15px' }}>
          {editId !== null ? 'Update Item' : 'Add Item'}
        </button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ margin: '10px 0' }}>
            <span style={{ marginRight: '15px' }}>{item.name}</span>
            <button onClick={() => { setEditId(item.id); setInputName(item.name); }} style={{ marginRight: '5px' }}>Edit</button>
            <button onClick={() => deleteItem(item.id)} style={{ color: 'red' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};