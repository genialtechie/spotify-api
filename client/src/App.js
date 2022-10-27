import React from 'react';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="p-5 flex flex-col lg:flex-row relative">
      <Navbar />
      <div className="w-full lg:w-4/5"></div>
    </div>
  );
}

export default App;
