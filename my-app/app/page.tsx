'use client';

import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "./lib/router";
import arac from './assets/home/arac.png';
import ariza from './assets/home/ariza.png';
import is from './assets/home/is.jpg';
import malzeme from './assets/home/malzeme.png';
import temizlik from './assets/home/temizlik.png';
import { ArrowRight, TrendingUp, Users, Clock } from 'lucide-react';
import { FadeIn, SlideInLeft, ScaleIn } from './components/common/PageTransition';
import { useState } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const jobRequests = [
    { title: "Arıza Talebi", icon: ariza, description: "Ekipman veya sistem arızaları için talep oluşturun.", path: ROUTES.ARIZA_TALEBI },
    { title: "Malzeme Talebi", icon: malzeme, description: "Gerekli malzemeler için talepte bulunun.", path: ROUTES.MALZEME_TALEBI },
    { title: "Şehir Dışı Araç Talebi", icon: arac, description: "Şehir dışı araç ihtiyaçlarınızı bildirin.", path: ROUTES.SEHIR_DISI_ARAC_TALEBI },
    { title: "Şehir İçi Araç Talebi", icon: arac, description: "Şehir içi araç taleplerinizi oluşturun.", path: ROUTES.SEHIR_ICI_ARAC_TALEBI },
    { title: "Temizlik Talebi", icon: temizlik, description: "Temizlik hizmetleri için talep gönderin.", path: ROUTES.TEMIZLIK_TALEBI },
    { title: "Yeni İş Talebi", icon: is, description: "Yeni projeler için iş talebi oluşturun.", path: ROUTES.YENI_IS_TALEBI },
  ];

  const stats = [
    { label: 'Aktif Talepler', value: '47', icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Toplam Kullanıcı', value: '245', icon: Users, color: 'text-green-600' },
    { label: 'Ort. Çözüm Süresi', value: '2.3 gün', icon: Clock, color: 'text-purple-600' },
  ];

  const filteredRequests = jobRequests.filter(request =>
    request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <SlideInLeft>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Varlık Yönetim Sistemi'ne Hoş Geldiniz
            </h1>
            <p className="text-lg md:text-xl text-red-100 mb-8 max-w-2xl">
              Kurumsal varlıklarınızı etkin bir şekilde yönetin, taleplerinizi kolayca oluşturun ve takip edin.
            </p>
          </SlideInLeft>
          
          {/* Stats */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4">
                  <stat.icon className="w-10 h-10 text-red-100" />
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-red-100">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Quick Actions Header */}
        <FadeIn delay={0.3}>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Hızlı İşlemler</h2>
            <p className="text-gray-600">İhtiyacınız olan talebi seçin ve hızlıca oluşturun</p>
          </div>
        </FadeIn>

        {/* Search Bar */}
        <FadeIn delay={0.4}>
          <div className="mb-8">
            <input
              type="text"
              placeholder="Talep türü ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm"
            />
          </div>
        </FadeIn>

        {/* Request Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredRequests.map((request, index) => (
            <ScaleIn key={index} delay={0.1 * index}>
              <Link href={request.path}>
                <div
                  className="relative bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer h-full"
                  style={{ minHeight: 320 }}
                >
                  <div className="p-6 flex flex-col items-center text-center h-full">
                    <div className="relative w-20 h-20 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={request.icon}
                        alt={request.title}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                      {request.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      {request.description}
                    </p>
                    <div className="flex items-center text-red-600 font-medium group-hover:gap-2 transition-all">
                      <span>Talep Oluştur</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Link>
            </ScaleIn>
          ))}
        </div>

        {/* No Results */}
        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aradığınız talep türü bulunamadı.</p>
          </div>
        )}

        {/* Quick Links Section */}
        <FadeIn delay={0.5}>
          <div className="bg-white rounded-xl shadow-md p-8 mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Diğer İşlemler</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href={ROUTES.DASHBOARD} className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
                <div className="text-blue-600 font-semibold">→ Yönetim Paneli</div>
              </Link>
              <Link href={ROUTES.REQUESTS} className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
                <div className="text-purple-600 font-semibold">→ Taleplerim</div>
              </Link>
              <Link href={ROUTES.INVENTORY} className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
                <div className="text-green-600 font-semibold">→ Envanter</div>
              </Link>
              <Link href={ROUTES.ANALYTICS} className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group">
                <div className="text-orange-600 font-semibold">→ Raporlar</div>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}