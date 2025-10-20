
"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, MessageCircle, AlertCircle, CheckCircle2, Trash2, Archive, Eye } from 'lucide-react';
import Tabs, { TabItem } from '../components/tabs/Tabs';

export default function NotificationsPage() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'request',
      title: 'Yeni Talep Oluşturuldu',
      message: 'Arıza talebi #3285 oluşturuldu - Klima tamiri gerekiyor',
      timestamp: '5 dakika önce',
      read: false,
      icon: <AlertCircle size={20} />,
      color: 'bg-red-100 text-red-600',
    },
    {
      id: 2,
      type: 'approved',
      title: 'Talep Onaylandı',
      message: 'Malzeme talebi #3280 onaylandı',
      timestamp: '2 saat önce',
      read: false,
      icon: <CheckCircle2 size={20} />,
      color: 'bg-green-100 text-green-600',
    },
    {
      id: 3,
      type: 'system',
      title: 'Sistem Bakımı Başlayacak',
      message: 'Sistem bakımı 16 Ekim 22:00-23:00 arasında yapılacaktır',
      timestamp: '1 gün önce',
      read: true,
      icon: <Bell size={20} />,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 4,
      type: 'message',
      title: 'Yeni İleti Aldınız',
      message: 'Ahmet Yılmaz: Talebin durumu hakkında bilgi verir misin?',
      timestamp: '3 gün önce',
      read: true,
      icon: <MessageCircle size={20} />,
      color: 'bg-purple-100 text-purple-600',
    },
  ]);

  const handleMarkRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleArchive = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, archived: true } : n))
    );
  };

  const NotificationItem = ({ notification, onMarkRead, onDelete, onArchive }: any) => (
    <div
      className={`flex gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition ${
        !notification.read ? 'bg-red-50' : ''
      }`}
    >
      <div className={`flex-shrink-0 w-12 h-12 ${notification.color} rounded-full flex items-center justify-center`}>
        {notification.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{notification.title}</h3>
            <p className="text-gray-600 text-sm mt-1 truncate">{notification.message}</p>
            <p className="text-gray-500 text-xs mt-2">{notification.timestamp}</p>
          </div>
          {!notification.read && (
            <div className="flex-shrink-0 w-3 h-3 bg-red-500 rounded-full mt-1" />
          )}
        </div>
      </div>
      <div className="flex-shrink-0 flex gap-2">
        {!notification.read && (
          <button
            onClick={() => onMarkRead(notification.id)}
            className="p-2 hover:bg-gray-200 rounded-lg transition"
            title="İşaretle"
          >
            <Eye size={16} className="text-gray-600" />
          </button>
        )}
        <button
          onClick={() => onArchive(notification.id)}
          className="p-2 hover:bg-gray-200 rounded-lg transition"
          title="Arşivle"
        >
          <Archive size={16} className="text-gray-600" />
        </button>
        <button
          onClick={() => onDelete(notification.id)}
          className="p-2 hover:bg-red-100 rounded-lg transition"
          title="Sil"
        >
          <Trash2 size={16} className="text-red-600" />
        </button>
      </div>
    </div>
  );

  const AllNotificationsTab = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {notifications.length > 0 ? (
        <div>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkRead={handleMarkRead}
              onDelete={handleDelete}
              onArchive={handleArchive}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Bell size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Bildirim yok</p>
        </div>
      )}
    </div>
  );

  const UnreadTab = () => {
    const unreadNotifications = notifications.filter((n) => !n.read);
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {unreadNotifications.length > 0 ? (
          <div>
            {unreadNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkRead={handleMarkRead}
                onDelete={handleDelete}
                onArchive={handleArchive}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <CheckCircle2 size={48} className="mx-auto text-green-400 mb-4" />
            <p className="text-gray-600">Tüm bildirimler okundu</p>
          </div>
        )}
      </div>
    );
  };

  const MessagesTab = () => (
    <div className="space-y-4">
      {[
        { from: 'Betül Karaman', message: 'Talep #3285 hakkında bilgi verir misin?', time: '1 saat önce', avatar: '👩' },
        { from: 'Mehmet Çelik', message: 'Teşekkürler, çok yardımcı oldu', time: '3 saat önce', avatar: '👨' },
        { from: 'Ayşe Demir', message: 'Yarın toplantı yapabilir miyiz?', time: '1 gün önce', avatar: '👩' },
      ].map((msg, idx) => (
        <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition">
          <div className="flex items-start gap-4">
            <div className="text-3xl flex-shrink-0">{msg.avatar}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{msg.from}</h4>
              <p className="text-gray-600 mt-1">{msg.message}</p>
              <p className="text-gray-500 text-sm mt-2">{msg.time}</p>
            </div>
            <button className="text-red-600 hover:text-red-700 font-medium text-sm">
              Yanıtla
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const AlertsTab = () => (
    <div className="space-y-4">
      {[
        { title: 'Düşük Stok Uyarısı', message: 'A4 Kağıt stoku 100 altında', severity: 'warning', icon: '⚠️' },
        { title: 'Talep Süresi Uzadı', message: 'Talep #3275 SLA süresini aştı', severity: 'critical', icon: '🔴' },
        { title: 'Sistem Bildirimi', message: 'Yedekleme başarıyla tamamlandı', severity: 'info', icon: 'ℹ️' },
      ].map((alert, idx) => (
        <div
          key={idx}
          className={`rounded-lg border p-4 ${
            alert.severity === 'critical'
              ? 'bg-red-50 border-red-200'
              : alert.severity === 'warning'
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-blue-50 border-blue-200'
          }`}
        >
          <div className="flex gap-3">
            <span className="text-2xl">{alert.icon}</span>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{alert.title}</h4>
              <p className="text-gray-600 text-sm mt-1">{alert.message}</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
        </div>
      ))}
    </div>
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const tabs: TabItem[] = [
    {
      id: 'all',
      label: 'Tüm Bildirimler',
      icon: <Bell size={20} />,
      badge: notifications.length,
      content: <AllNotificationsTab />,
    },
    {
      id: 'unread',
      label: 'Okunmayan',
      icon: <AlertCircle size={20} />,
      badge: unreadCount,
      content: <UnreadTab />,
    },
    {
      id: 'messages',
      label: 'İletiler',
      icon: <MessageCircle size={20} />,
      content: <MessagesTab />,
    },
    {
      id: 'alerts',
      label: 'Uyarılar',
      icon: <AlertCircle size={20} />,
      content: <AlertsTab />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Bildirimler & İletiler</h1>
            <p className="text-gray-600 mt-2">Tüm bildirim ve mesajlarınız merkezi</p>
          </div>
          {unreadCount > 0 && (
            <div className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium">
              {unreadCount} Okunmayan
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
            Tümünü Okundu İşaretle
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
            Tümünü Sil
          </button>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} variant="underline" size="lg" showBadges={true} />
      </div>
    </div>
  );
}
