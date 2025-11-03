'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Home, Building, ListChecks, Package, Users, Settings, LogOut, Menu as MenuIcon, LayoutDashboard, BarChart3, Bell, Wrench } from 'lucide-react';
import { ROUTES } from '../../lib/router';
import { COLORS } from "@/app/utils/colors";


const menuItems = [
  { name: 'Yönetim Paneli', path: ROUTES.DASHBOARD, icon: LayoutDashboard, description: 'İstatistikler ve Özet' },
  { name: 'Ana Sayfa', path: ROUTES.HOME, icon: Home, description: 'Ana Sayfa' },
  { name: 'Varlıklar', path: ROUTES.ASSETS, icon: Building, description: 'Demirbaş, Lokasyon ve Araçlar' },
  { name: 'Talepler & İş Emirleri', path: ROUTES.REQUESTS, icon: ListChecks, description: 'Yeni İş, Arıza ve Bakım İşlemleri' },
  { name: 'Envanter', path: ROUTES.INVENTORY, icon: Package, description: 'Malzemeler, Stok ve Depolar' },
  { name: 'İnsan Kaynakları', path: ROUTES.HR, icon: Users, description: 'Personel ve Vardiya Planlama' },
  { name: 'Analitik & Raporlar', path: ROUTES.ANALYTICS, icon: BarChart3, description: 'İstatistikler ve Performans Raporları' },
  { name: 'Bildirimler', path: ROUTES.NOTIFICATIONS, icon: Bell, description: 'Tüm Bildirim ve İletiler' },
  { name: 'Bakım & Yedekleme', path: ROUTES.MAINTENANCE, icon: Wrench, description: 'Sistem Bakımı ve Yedekleme' },
  { name: 'Ayarlar', path: ROUTES.SETTINGS, icon: Settings, description: 'Hesap ve Uygulama Ayarları' },
];

//profile ve requests routerları dolu


const Menu = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const navigateAndClose = (path: string) => {
    setOpen(false);
    router.push(`${path}`); 
  };

  return (
    <>
      <button
        className="p-2 rounded-xl hover:bg-red-100 transition-colors focus:outline-none border border-red-200 bg-white/90 text-red-800 shadow-md"
        onClick={() => setOpen(true)}
        aria-label="Menüyü Aç"
      > 
        <MenuIcon size={15} />
      </button>

      {open && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/50 pointer-events-auto transition-opacity duration-300"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          ></div>

          <div className="fixed inset-0 z-50 flex pointer-events-none">
            <div className="ml-auto w-full max-w-xs bg-white h-full border-l flex flex-col pointer-events-auto transform transition-transform duration-300 ease-out translate-x-0" style={{ animation: 'slide-in 0.3s forwards' }}>
              
              <div className ={`flex items-center justify-between px-6 py-4 border-b ${COLORS.red800} text-white`}>
                
                <span className="font-bold tracking-wider">ANA MENÜ</span>
                <button 
                  onClick={() => setOpen(false)} 
                  className="text-3xl text-red-200 hover:text-white transition-colors p-1 leading-none"
                  aria-label="Menüyü Kapat"
                >
                  &times;
                </button>
              </div>

              <div className="flex-1 overflow-y-auto flex flex-col p-2 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    className="w-full flex flex-col items-start px-4 py-3 hover:bg-gray-200 transition-all duration-150 rounded-lg text-left group"
                    onClick={() => navigateAndClose(item.path)}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-red-600 group-hover:text-red-800 transition-colors" />
                      <span className="font-semibold text-gray-800 group-hover:text-red-900 transition-colors">
                        {item.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 pl-8">
                        {item.description}
                    </p>
                  </button>
                ))}
              </div>

              <button
                className={`w-full flex items-center gap-3 text-left px-6 py-4 text-white cursor-pointer
                ${COLORS.red800} font-bold transition-all mt-auto shadow-inner`}
                onClick={() => { setOpen(false);}}
              >
                <LogOut className="w-5 h-5" />
                ÇIKIŞ YAP
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Menu;
