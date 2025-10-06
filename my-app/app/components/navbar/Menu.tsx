'use client';
import { VscMenu } from "react-icons/vsc";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        className="p-2 rounded-full hover:bg-red-100 transition-colors focus:outline-none border border-red-200 bg-white/90 text-red-800"
        onClick={() => setOpen(true)}
        aria-label="Menüyü Aç"
      > 
        <VscMenu size={25} />
      </button>
      {open && (
        
        <div className="fixed inset-0 z-50 flex pointer-events-none">
          <div className="ml-auto w-full max-w-xs bg-white h-full border-l flex flex-col animate-slide-in-right pointer-events-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <span className="font-bold text-lg text-red-800">Menü</span>
              <button onClick={() => setOpen(false)} className="text-2xl text-red-800 hover:text-red-600">&times;</button>
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col">
              <button
                className="w-full text-left px-5 py-4 hover:bg-gray-100 transition font-normal text-sm text-black font-sans"
                onClick={() => {
                  setOpen(false);
                  router.push('/requests');
                }}
              >
                Geçmiş Talepler
              </button>
              <button
                className="w-full text-left px-5 py-4 hover:bg-gray-100 transition font-normal text-sm text-black font-sans"
                onClick={() => {
                  setOpen(false);
                  router.push('/profile');
                }}
                
              >
                Profilim
              </button>
            </div>
            <button
              className="w-full flex items-center gap-2 text-left px-5 py-4 text-gray-800 hover:bg-red-50 hover:text-red-700 font-sans border-t border-gray-100 mt-auto"
              onClick={() => { setOpen(false); setShowUserMenu(false); /* logout işlemi */ }}
            >
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
              Çıkış
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;