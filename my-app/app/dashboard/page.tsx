'use client';

import { useTranslation } from 'react-i18next';
import { BarChart3, TrendingUp, Users, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '../lib/router';

interface StatCard {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

export default function DashboardPage() {
  const { t } = useTranslation();

  const stats: StatCard[] = [
    {
      title: 'Toplam Talepler',
      value: 47,
      change: '+12% bu ay',
      icon: <BarChart3 size={28} />,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      title: 'Beklemede',
      value: 8,
      change: '-3% son haftada',
      icon: <Clock size={28} />,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Tamamlanan',
      value: 32,
      change: '+8% bu ay',
      icon: <CheckCircle2 size={28} />,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      title: 'Çalışan Sayısı',
      value: 245,
      change: '+5 yeni işe alım',
      icon: <Users size={28} />,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
    {
      title: 'Düşük Stok Uyarısı',
      value: 4,
      change: '2 malzeme kritik',
      icon: <AlertCircle size={28} />,
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
    },
    {
      title: 'Ortalama Talep Süresi',
      value: '2,3 gün',
      change: '↓ 15% iyileşme',
      icon: <TrendingUp size={28} />,
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-600',
    },
  ];

  const recentRequests = [
    { id: 1, type: 'Arıza Talebi', status: 'Beklemede', requester: 'Betül Karaman', date: '2024-10-16' },
    { id: 2, type: 'Malzeme Talebi', status: 'Onaylandı', requester: 'Ahmet Yılmaz', date: '2024-10-16' },
    { id: 3, type: 'Araç Talebi', status: 'Tamamlandı', requester: 'Ayşe Demir', date: '2024-10-15' },
    { id: 4, type: 'Temizlik Talebi', status: 'Beklemede', requester: 'Mehmet Çelik', date: '2024-10-15' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Beklemede':
        return 'bg-yellow-100 text-yellow-800';
      case 'Onaylandı':
        return 'bg-blue-100 text-blue-800';
      case 'Tamamlandı':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Yönetim Paneli</h1>
          <p className="text-gray-600 mt-2">Sisteme hoş geldiniz. İşte güncel istatistikler ve özet bilgiler.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md p-6 border-t-4 border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  {stat.change && (
                    <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
                  )}
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor} ${stat.textColor}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Requests and Quick Links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Requests */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Son Talepler</h2>
            <div className="space-y-3">
              {recentRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{req.type}</p>
                    <p className="text-sm text-gray-600">{req.requester}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(req.status)}`}>
                      {req.status}
                    </span>
                    <span className="text-sm text-gray-500">{req.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Hızlı Erişim</h2>
            <div className="space-y-2">
              <Link
                href={ROUTES.REQUESTS}
                className="block p-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
              >
                → Tüm Talepler
              </Link>
              <Link
                href={ROUTES.HR}
                className="block p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors font-medium text-sm"
              >
                → İnsan Kaynakları
              </Link>
              <Link
                href={ROUTES.INVENTORY}
                className="block p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
              >
                → Envanter Yönetimi
              </Link>
              <Link
                href={ROUTES.ASSETS}
                className="block p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium text-sm"
              >
                → Varlık Yönetimi
              </Link>
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sistem Bilgisi */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-md p-6 border border-red-200">
            <h3 className="text-lg font-bold text-red-900 mb-3">Sistem Bilgisi</h3>
            <ul className="space-y-2 text-sm text-red-800">
              <li>• <strong>Version:</strong> 1.0.0</li>
              <li>• <strong>Son Güncelleme:</strong> 2024-10-16</li>
              <li>• <strong>Durum:</strong> Normal Çalışıyor ✓</li>
              <li>• <strong>Sistem Saati:</strong> {new Date().toLocaleString('tr-TR')}</li>
            </ul>
          </div>

          {/* Yardım ve Destek */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-blue-900 mb-3">Yardım ve Destek</h3>
            <p className="text-sm text-blue-800 mb-4">
              Herhangi bir sorun yaşıyor musunuz? Teknik desteğimizle iletişime geçin.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
              Destek İsteği Gönder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
