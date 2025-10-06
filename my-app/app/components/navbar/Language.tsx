"use client";
import React from 'react'
import { useState } from 'react';
const Language = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
<div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 text-white-800 rounded"
      >
        Dil
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
          <button
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={() => console.log('Türkçe clicked')}
          >
            Türkçe 
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={() => console.log('English clicked')}
          >
            English
          </button>
        </div>
      )}
    </div>  )
}

export default Language