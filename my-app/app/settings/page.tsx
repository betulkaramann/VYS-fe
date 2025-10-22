
"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, Bell, Lock, Palette, Eye, Volume2, Mail, Smartphone } from 'lucide-react';
import Tabs, { TabItem } from '../components/tabs/Tabs';

export default function SettingsPage() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    compactView: false,
    twoFactor: false,
    publicProfile: true,
    soundEnabled: true,
    theme: 'red',
  });

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const SettingToggle = ({ label, description, checked, onChange }: any) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-200 last:border-0">
      <div className="flex-1">
        <p className="font-medium text-gray-900">{label}</p>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-red-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const GeneralTab = () => (
    <div className="max-w-2xl space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Görünüm Ayarları</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Tema Rengi</label>
            <div className="flex gap-3">
              {[
                { name: 'red', color: 'bg-red-500' },
                { name: 'blue', color: 'bg-blue-500' },
                { name: 'green', color: 'bg-green-500' },
                { name: 'purple', color: 'bg-purple-500' },
              ].map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => handleChange('theme', theme.name)}
                  className={`w-12 h-12 ${theme.color} rounded-lg transition-all ${
                    settings.theme === theme.name ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <SettingToggle
            label="Koyu Mod"
            description="Gözlerinizi korumak için koyu temayı etkinleştirin"
            checked={settings.darkMode}
            onChange={() => handleToggle('darkMode')}
          />

          <SettingToggle
            label="Kompakt Görünüm"
            description="Daha sıkı bilgilendirmeleri görüntüle"
            checked={settings.compactView}
            onChange={() => handleToggle('compactView')}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ses Ayarları</h3>
        <SettingToggle
          label="Ses Bildirimleri"
          description="Önemli etkinlikler için ses çıkart"
          checked={settings.soundEnabled}
          onChange={() => handleToggle('soundEnabled')}
        />
      </div>
    </div>
  );

  const NotificationsTab = () => (
    <div className="max-w-2xl space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bildirim Türleri</h3>
        
        <div className="space-y-4">
          <SettingToggle
            label="E-Posta Bildirimleri"
            description="Talepler, yorumlar ve güncellemeler hakkında e-posta alın"
            checked={settings.emailNotifications}
            onChange={() => handleToggle('emailNotifications')}
          />

          <SettingToggle
            label="Anlık Bildirimler"
            description="Tarayıcı push bildirimlerini etkinleştir"
            checked={settings.pushNotifications}
            onChange={() => handleToggle('pushNotifications')}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bildirim Tercihlerine Göre</h3>
        
        <div className="space-y-3">
          {[
            { label: 'Yeni Talepler', icon: <Mail size={18} /> },
            { label: 'Talep Güncellemeleri', icon: <Bell size={18} /> },
            { label: 'Sistem Mesajları', icon: <Smartphone size={18} /> },
            { label: 'Haftalık Özet', icon: <Volume2 size={18} /> },
          ].map((notif, idx) => (
            <div key={idx} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <span className="text-gray-600">{notif.icon}</span>
                <span className="text-gray-900 font-medium">{notif.label}</span>
              </div>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                Özelleştir
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SecurityTab = () => (
    <div className="max-w-2xl space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Güvenlik</h3>
        
        <div className="space-y-4">
          <SettingToggle
            label="İki Faktörlü Kimlik Doğrulama"
            description="Hesabınızı ek bir güvenlik katmanıyla koruyun"
            checked={settings.twoFactor}
            onChange={() => handleToggle('twoFactor')}
          />

          <div className="pt-4 border-t border-gray-200">
            <p className="font-medium text-gray-900 mb-3">Son Giriş Aktivitesi</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📱 Chrome - Bilgisayar - 16 Ekim 2024 14:32</p>
              <p>📱 Safari - iPhone - 15 Ekim 2024 09:15</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Gizlilik</h3>
        
        <div className="space-y-4">
          <SettingToggle
            label="Açık Profil"
            description="Diğer kullanıcılar profilinizi görebilir"
            checked={settings.publicProfile}
            onChange={() => handleToggle('publicProfile')}
          />

          <div className="pt-4 border-t border-gray-200">
            <button className="text-red-600 hover:text-red-700 font-medium text-sm">
              Şifreyi Değiştir
            </button>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-2">Tehlikeli İşlem</h3>
        <p className="text-red-700 text-sm mb-4">Bu eylemler geri alınamaz. Lütfen dikkatli olun.</p>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium">
          Tüm Verileri Sil
        </button>
      </div>
    </div>
  );

  const AccountTab = () => (
    <div className="max-w-2xl space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hesap Bilgileri</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Ad Soyadı</label>
            <input
              type="text"
              defaultValue="Ahmet Yılmaz"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">E-Posta</label>
            <input
              type="email"
              defaultValue="ahmet.yilmaz@company.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Telefon Numarası</label>
            <input
              type="tel"
              defaultValue="+90 555 123 4567"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium">
            Kaydet
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hesap Durumu</h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <p>✅ Hesap Aktif</p>
          <p>✅ E-Posta Doğrulandı</p>
          <p>❌ İki Faktörlü Doğrulama Kapalı</p>
          <p>📅 Üyelik Tarihi: 15 Şubat 2023</p>
        </div>
      </div>
    </div>
  );

  const tabs: TabItem[] = [
    {
      id: 'general',
      label: 'Genel',
      icon: <Palette size={20} />,
      content: <GeneralTab />,
    },
    {
      id: 'notifications',
      label: 'Bildirimler',
      icon: <Bell size={20} />,
      badge: '2 yeni',
      content: <NotificationsTab />,
    },
    {
      id: 'security',
      label: 'Güvenlik',
      icon: <Lock size={20} />,
      content: <SecurityTab />,
    },
    {
      id: 'account',
      label: 'Hesap',
      icon: <Eye size={20} />,
      content: <AccountTab />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings size={32} className="text-red-600" />
            <h1 className="text-4xl font-bold text-gray-900">Ayarlar</h1>
          </div>
          <p className="text-gray-600">Hesabınızı ve uygulama tercihlerini yönetin</p>
        </div>

        <Tabs tabs={tabs} variant="underline" size="lg" />
      </div>
    </div>
  );
}
