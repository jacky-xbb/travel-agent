import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-teal-700 p-4">
        <nav className="container mx-auto">
          <h1 className="text-white">Travel Agent</h1>
        </nav>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>

      <footer className="bg-teal-700 p-4">
        <div className="container mx-auto">
          <p className="text-white text-center">&copy; 2023 Travel Agent</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
