
"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, Database, RotateCcw, Download, Upload, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { TabItem } from '../components/tabs/Tabs';
import {Tabs, Tab, CardBody, Card} from "@nextui-org/react";
import { COLORS } from '../utils/colors';

export default function MaintenancePage() {
  const { t } = useTranslation();
  const [maintenanceStatus, setMaintenanceStatus] = useState({
    lastBackup: '16 Ekim 2024 02:00',
    backupSize: '2.4 GB',
    systemHealth: 98,
    diskUsage: 65,
  });

  const StatusBadge = ({ status, label }: any) => {
    const colorMap = {
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
    };
    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${colorMap[status]}`}>
        {status === 'success' && <CheckCircle2 size={16} />}
        {status === 'error' && <AlertCircle size={16} />}
        {status === 'warning' && <AlertCircle size={16} />}
        {label}
      </span>
    );
  };

  const MaintenanceTab = () => (
    <div className="space-y-6">
      {/* System Health */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sistem Durumu</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Genel Sistem Sağlığı</span>
              <span className="text-sm font-bold text-green-600">{maintenanceStatus.systemHealth}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${maintenanceStatus.systemHealth}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Disk Kullanımı</span>
              <span className="text-sm font-bold text-yellow-600">{maintenanceStatus.diskUsage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: `${maintenanceStatus.diskUsage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Tasks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bakım Görevleri</h3>
        
        <div className="space-y-3">
          {[
            { title: 'Günlük Log Temizliği', status: 'success', last: '2024-10-16 02:00', next: '2024-10-17 02:00' },
            { title: 'Veritabanı Optimizasyonu', status: 'success', last: '2024-10-15 23:00', next: '2024-10-22 23:00' },
            { title: 'Sistem Güncelleme Kontrolü', status: 'warning', last: '2024-10-14', next: '2024-10-21' },
            { title: 'Güvenlik Taraması', status: 'success', last: '2024-10-16 00:00', next: '2024-10-17 00:00' },
          ].map((task, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{task.title}</p>
                <p className="text-sm text-gray-600 mt-1">Son: {task.last} | Sonraki: {task.next}</p>
              </div>
              <StatusBadge status={task.status} label={task.status === 'success' ? '✓' : '!'} />
            </div>
          ))}
        </div>
      </div>

      {/* System Services */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sistem Servisleri</h3>
        
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 font-semibold text-gray-900">Servis</th>
              <th className="text-left py-3 font-semibold text-gray-900">Durum</th>
              <th className="text-left py-3 font-semibold text-gray-900">Uptime</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Web Sunucusu', status: 'active', uptime: '99.9%' },
              { name: 'Veritabanı', status: 'active', uptime: '99.95%' },
              { name: 'API Gateway', status: 'active', uptime: '99.8%' },
              { name: 'Cache Service', status: 'active', uptime: '99.7%' },
            ].map((service, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 text-gray-900">{service.name}</td>
                <td className="py-3">
                  <StatusBadge status="success" label="Çalışıyor" />
                </td>
                <td className="py-3 text-gray-600">{service.uptime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const BackupTab = () => (
    <div className="space-y-6">
      {/* Backup Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-600 text-sm font-medium">Son Yedekleme</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{maintenanceStatus.lastBackup}</p>
          <p className="text-gray-600 text-sm mt-2">Boyut: {maintenanceStatus.backupSize}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-600 text-sm font-medium">Yedekleme Durumu</p>
          <div className="flex items-center gap-2 mt-2">
            <CheckCircle2 size={24} className="text-green-600" />
            <span className="text-lg font-bold text-gray-900">Başarılı</span>
          </div>
          <p className="text-gray-600 text-sm mt-2">Otomatik: Günlük 02:00</p>
        </div>
      </div>

      {/* Backup Operations */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Yedekleme İşlemleri</h3>
        
        <div className="space-y-3">
          <button className={`w-full px-4 py-3 ${COLORS.red800} text-white rounded-lg hover:${COLORS.red800} transition font-medium flex items-center justify-center gap-2`}>
            <Download size={18} />
            Şu Anda Yedekle
          </button>
          <button className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center gap-2">
            <Upload size={18} />
            Yedekten Geri Yükle
          </button>
        </div>
      </div>

      {/* Backup History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Yedekleme Geçmişi</h3>
        
        <div className="space-y-2">
          {[
            { date: '16 Ekim 2024 02:00', size: '2.4 GB', status: 'success' },
            { date: '15 Ekim 2024 02:00', size: '2.35 GB', status: 'success' },
            { date: '14 Ekim 2024 02:00', size: '2.3 GB', status: 'success' },
            { date: '13 Ekim 2024 02:00', size: '2.28 GB', status: 'success' },
            { date: '12 Ekim 2024 02:00', size: '2.25 GB', status: 'success' },
          ].map((backup, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <Database size={20} className="text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{backup.date}</p>
                  <p className="text-sm text-gray-600">{backup.size}</p>
                </div>
              </div>
              <StatusBadge status={backup.status} label="✓ Başarılı" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const RestoreTab = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Geri Yükleme Uyarısı</h3>
        <p className="text-blue-800">Bir yedekten geri yükleme işlemi mevcut verilerin üzerine yazacaktır. Devam etmeden önce iki kez düşünün.</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Yedek Seç</h3>
        
        <div className="space-y-3">
          {[
            { date: '16 Ekim 2024 02:00', size: '2.4 GB' },
            { date: '15 Ekim 2024 02:00', size: '2.35 GB' },
            { date: '14 Ekim 2024 02:00', size: '2.3 GB' },
          ].map((backup, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
              <input type="radio" name="backup" className="w-4 h-4" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{backup.date}</p>
                <p className="text-sm text-gray-600">{backup.size}</p>
              </div>
              <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                İndir
              </button>
            </div>
          ))}
        </div>

        <button className = {`mt-6 w-full px-4 py-3 ${COLORS.red800} text-white rounded-lg hover:${COLORS.red800} transition font-medium`}>
          Geri Yükle
        </button>
      </div>
    </div>
  );

  const tabs: TabItem[] = [
    {
      id: 'maintenance',
      label: 'Bakım',
      icon: <Settings size={20} />,
      content: <MaintenanceTab />,
    },
    {
      id: 'backup',
      label: 'Yedekleme',
      icon: <Download size={20} />,
      badge: 'Hazır',
      content: <BackupTab />,
    },
    {
      id: 'restore',
      label: 'Geri Yükleme',
      icon: <RotateCcw size={20} />,
      content: <RestoreTab />,
    },
  ];


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Bakım & Yedekleme</h1>
          </div>
          <p className="text-gray-600">Sistem bakımı, yedekleme ve geri yükleme işlemlerini yönetin</p>
        </div>

       <div className="p-8 min-h-[400px]">
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Dynamic tabs"
          items={tabs}
          classNames={{
            tabList: "p-1 gap-1 rounded-xl shadow-xl", 
            tab: [
              "h-10 px-4", 
              "rounded-lg",
              "data-[selected=true]:bg-red-800",
              "data-[selected=true]:text-white", 
              "data-[selected=true]:shadow-lg", 
            ],
        
            panel: "mt-4",
          }}
        >
          {(item) => (
            <Tab key={item.id} title={item.label} >
              <Card>
                <CardBody >
                  {item.content}
                </CardBody>
              </Card>
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
      </div>
    </div>
  );
}
