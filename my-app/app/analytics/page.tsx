
"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart3, LineChart, PieChart, TrendingUp, Download, Filter, Calendar } from 'lucide-react';
import Tabs, { TabItem } from '../components/tabs/Tabs';
import { COLORS } from '../utils/colors';

export default function AnalyticsPage() {
  const { t } = useTranslation();
  const [dateRange, setDateRange] = useState('month');

  // Sample data for analytics
  const monthlyData = [
    { month: 'Oca', requests: 45, completed: 38, pending: 7 },
    { month: 'Şub', requests: 52, completed: 45, pending: 7 },
    { month: 'Mar', requests: 48, completed: 42, pending: 6 },
    { month: 'Nis', requests: 61, completed: 53, pending: 8 },
    { month: 'May', requests: 55, completed: 48, pending: 7 },
    { month: 'Haz', requests: 67, completed: 59, pending: 8 },
  ];

  const requestTypeData = [
  { name: 'Arıza Talebi', value: 35, color: COLORS.red500 },
  { name: 'Malzeme Talebi', value: 28, color: COLORS.blue500 },
  { name: 'Araç Talebi', value: 22, color: COLORS.green500 },
  { name: 'Temizlik Talebi', value: 15, color: COLORS.yellow500 },
  ];

  const departmentStats = [
    { name: 'İT', requests: 34, avgTime: '1.2 gün', satisfaction: 92 },
    { name: 'İnsan Kaynakları', requests: 28, avgTime: '2.1 gün', satisfaction: 88 },
    { name: 'Operasyon', requests: 45, avgTime: '1.5 gün', satisfaction: 95 },
    { name: 'Mali İşler', requests: 18, avgTime: '2.5 gün', satisfaction: 85 },
    { name: 'Pazarlama', requests: 22, avgTime: '1.8 gün', satisfaction: 90 },
  ];

  const StatCard = ({ title, value, subtitle, icon, color }: any) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
          {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color} opacity-10`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Toplam Talepler"
          value="328"
          subtitle="+12% bu ay"
          icon={<BarChart3 size={24} />}
          color={COLORS.textBlue600}
        />
        <StatCard
          title="Tamamlanan"
          value="298"
          subtitle="+8% bu ay"
          icon={<TrendingUp size={24} />}
          color={COLORS.textGreen600}
        />
        <StatCard
          title="Beklemede"
          value="24"
          subtitle="-3% son haftada"
          icon={<Calendar size={24} />}
          color={COLORS.textYellow600}
        />
        <StatCard
          title="Ort. Tamamlama"
          value="1.8 gün"
          subtitle="↓ 15% iyileşme"
          icon={<LineChart size={24} />}
          color={COLORS.textPurple600}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Aylık Trend</h3>
          <div className="h-64 flex items-end gap-2">
            {monthlyData.map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex gap-1">
                  <div
                    className={`${COLORS.blue500} flex-1 rounded-t hover:opacity-80 transition`}
                    style={{ height: `${(data.requests / 70) * 200}px` }}
                    title={`${data.month}: ${data.requests}`}
                  />
                    <div
                      className={`${COLORS.green500} flex-1 rounded-t hover:opacity-80 transition`}
                    style={{ height: `${(data.completed / 70) * 200}px` }}
                    title={`Tamamlanan: ${data.completed}`}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 ${COLORS.blue500} rounded`} />
              <span>Toplam</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 ${COLORS.green500} rounded`} />
              <span>Tamamlanan</span>
            </div>
          </div>
        </div>

        {/* Request Types Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Talep Türü Dağılımı</h3>
          <div className="space-y-4">
            {requestTypeData.map((type, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{type.name}</span>
                  <span className="text-sm font-bold text-gray-900">{type.value}%</span>
                </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${type.color} h-2 rounded-full transition-all`}
                    style={{ width: `${type.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const DepartmentTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Departman</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Talepler</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ort. Zaman</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Memnuniyet</th>
            </tr>
          </thead>
          <tbody>
            {departmentStats.map((dept, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{dept.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{dept.requests}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{dept.avgTime}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${dept.satisfaction}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{dept.satisfaction}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ReportsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Aylık İstatistikler', format: 'PDF', size: '2.4 MB' },
          { title: 'Departman Performansı', format: 'Excel', size: '1.2 MB' },
          { title: 'Talep Analizi', format: 'PDF', size: '3.1 MB' },
          { title: 'Operasyonel Özet', format: 'Excel', size: '0.8 MB' },
        ].map((report, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">{report.title}</h4>
                <p className="text-sm text-gray-600 mt-2">{report.format} • {report.size}</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Download size={20} className={COLORS.textBlue600} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs: TabItem[] = [
    {
      id: 'overview',
      label: 'Genel Bakış',
      icon: <BarChart3 size={20} />,
      content: <OverviewTab />,
    },
    {
      id: 'departments',
      label: 'Departmanlar',
      icon: <LineChart size={20} />,
      content: <DepartmentTab />,
    },
    {
      id: 'reports',
      label: 'Raporlar',
      icon: <PieChart size={20} />,
      badge: '3 yeni',
      content: <ReportsTab />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Analitik & Raporlar</h1>
          <p className="text-gray-600 mt-2">İş verilerini analiz edin ve performans raporlarını görüntüleyin</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="week">Bu Hafta</option>
              <option value="month">Bu Ay</option>
              <option value="quarter">Bu Çeyrek</option>
              <option value="year">Bu Yıl</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
            <Download size={16} />
            İndir
          </button>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} variant="underline" size="lg" />
      </div>
    </div>
  );
}
