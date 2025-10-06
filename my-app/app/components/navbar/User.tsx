"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex items-center h-full">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-1.5 bg-white/90 text-red-800 font-semibold rounded-full shadow hover:bg-red-100 transition-colors border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-400"
        style={{ minWidth: 40 }}
      >
        <svg width="22" height="22" fill="currentColor" className="inline-block"><circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="2" fill="#fff" /><text x="11" y="16" textAnchor="middle" fontSize="10" fill="#d32f2f" fontWeight="bold">U</text></svg>
        <span className="hidden md:inline">Betül Karaman</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-xl shadow-lg z-50 animate-fade-in origin-top">
          <button
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-50 hover:text-red-700 rounded-t-xl"
            onClick={() => { setIsOpen(false); router.push('/profile'); }}
          >
            Profilim
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-50 hover:text-red-700 rounded-b-xl"
            onClick={() => console.log('Logout clicked')}
          >
            Çıkış
          </button>
        </div>
      )}
    </div>
  );
};

export default User;