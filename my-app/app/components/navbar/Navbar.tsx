'use client';

import Title from "./Title"
import Language from "./Language"
import Logo from "./Logo"
import Menu from "./Menu"
import { COLORS } from '../../utils/colors';
import { Bell, Search } from 'lucide-react';
import { useAppContext } from '@/app/contexts/AppContext';
import Link from 'next/link';
import { ROUTES } from '@/app/lib/router';
import { useState, useRef } from 'react';
import { useClickOutside } from '@/app/hooks/useClickOutside';

const Navbar = () => {
  const { notificationCount } = useAppContext();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  useClickOutside(searchRef, () => setSearchOpen(false));

  return (
    <div className={`flex items-center justify-between gap-3 md:gap-5 px-3 md:px-6 h-16 text-slate-100 ${COLORS.red800} relative`}>
      <div className="flex items-center gap-2">
        <Logo/>
        <Title/>
      </div>
      
      <div className="flex items-center gap-2 md:gap-3">
        {/* Search Button */}
        <div ref={searchRef} className="relative">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-xl hover:bg-red-700 transition-colors focus:outline-none"
            aria-label="Arama"
          >
            <Search size={18} />
          </button>
          
          {/* Search Dropdown */}
          {searchOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-50">
              <input
                type="text"
                placeholder="Sayfa ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                autoFocus
              />
              <div className="mt-2 text-xs text-gray-500">
                Daha geli?mi? arama i?in ana men?y? kullan?n
              </div>
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <Link href={ROUTES.NOTIFICATIONS}>
          <button
            className="p-2 rounded-xl hover:bg-red-700 transition-colors focus:outline-none relative"
            aria-label="Bildirimler"
          >
            <Bell size={18} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {notificationCount}
              </span>
            )}
          </button>
        </Link>
        
        <Language/>
        <Menu/>
      </div>
    </div>
  )
}

export default Navbar