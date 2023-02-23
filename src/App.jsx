import { useState } from 'react';
import { Routes, Route } from 'react-router';
import Orders from './components/pages/Orders';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Orders />} />
        <Route path="/" />
      </Routes>
    </div>
  );
}

export default App;
