import React from 'react';
import { AppProvider } from './context/AppContext';
import { ItemManager } from './components/ItemManager';

function App() {
  return (
    <AppProvider>
      <ItemManager />
    </AppProvider>
  );
}

export default App;
