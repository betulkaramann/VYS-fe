'use client';

import React, { useState } from "react";
import Image from "next/image";
import { Edit, Mail, Phone, MapPin, Briefcase, Save, X, User } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import Breadcrumb from '../components/common/Breadcrumb';

export default function ProfilePage() {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "BETÜL KARAMAN",
    title: "Mühendis",
    department: "YAZILIM DAİRE BAŞKANLIĞI",
    email: "betul.karaman@TCCB.GOV.TR",
    location: "Güney Bina I Blok Z Kat 09",
    internal: "4119",
    external: "03125254119",
    mobile: "05383086361",
    mobile2: "",
    fax: "",
  });

  const [editForm, setEditForm] = useState(profile);

  const handleEdit = () => {
    setEditForm(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
    showToast('Profil başarıyla güncellendi!', 'success');
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Breadcrumb items={[{ label: 'Profil' }]} />
        
        <div className="bg-white rounded-xl shadow-lg border p-8">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profil Bilgileri</h1>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Edit size={18} />
                Düzenle
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save size={18} />
                  Kaydet
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  <X size={18} />
                  İptal
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-red-100 bg-gradient-to-br from-red-100 to-red-200 mb-4 flex items-center justify-center">
                <User size={80} className="text-red-600" />
              </div>
              <span className="text-sm text-gray-500">Profil Fotoğrafı</span>
            </div>

            {/* Profile Information */}
            <div className="flex-1 space-y-6">
              {!isEditing ? (
                <>
                  {/* View Mode */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Ad Soyad</label>
                        <div className="mt-1 text-lg font-semibold text-gray-900">{profile.name}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Ünvan</label>
                        <div className="mt-1 flex items-center gap-2 text-gray-700">
                          <Briefcase size={16} className="text-red-600" />
                          {profile.title}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Departman</label>
                        <div className="mt-1 text-gray-700">{profile.department}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">E-posta</label>
                        <div className="mt-1 flex items-center gap-2 text-gray-700">
                          <Mail size={16} className="text-red-600" />
                          <a href={`mailto:${profile.email}`} className="text-blue-600 hover:underline">
                            {profile.email}
                          </a>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Konum</label>
                        <div className="mt-1 flex items-center gap-2 text-gray-700">
                          <MapPin size={16} className="text-red-600" />
                          {profile.location}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 md:border-l md:pl-8">
                      <h3 className="font-semibold text-gray-900 mb-4">İletişim Bilgileri</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-red-600" />
                          <div>
                            <span className="text-sm text-gray-500">Dahili:</span>
                            <span className="ml-2 text-gray-700">{profile.internal}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-red-600" />
                          <div>
                            <span className="text-sm text-gray-500">Harici:</span>
                            <a href={`tel:${profile.external}`} className="ml-2 text-blue-600 hover:underline">
                              {profile.external}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-red-600" />
                          <div>
                            <span className="text-sm text-gray-500">Cep:</span>
                            <a href={`tel:${profile.mobile}`} className="ml-2 text-blue-600 hover:underline">
                              {profile.mobile}
                            </a>
                          </div>
                        </div>
                        {profile.mobile2 && (
                          <div className="flex items-center gap-2">
                            <Phone size={16} className="text-red-600" />
                            <div>
                              <span className="text-sm text-gray-500">Cep 2:</span>
                              <span className="ml-2 text-gray-700">{profile.mobile2}</span>
                            </div>
                          </div>
                        )}
                        {profile.fax && (
                          <div className="flex items-center gap-2">
                            <Phone size={16} className="text-red-600" />
                            <div>
                              <span className="text-sm text-gray-500">Fax:</span>
                              <span className="ml-2 text-gray-700">{profile.fax}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Edit Mode */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ünvan</label>
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Departman</label>
                        <input
                          type="text"
                          value={editForm.department}
                          onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Konum</label>
                        <input
                          type="text"
                          value={editForm.location}
                          onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 mb-4">İletişim Bilgileri</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dahili</label>
                        <input
                          type="text"
                          value={editForm.internal}
                          onChange={(e) => setEditForm({ ...editForm, internal: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Harici</label>
                        <input
                          type="text"
                          value={editForm.external}
                          onChange={(e) => setEditForm({ ...editForm, external: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cep Telefonu</label>
                        <input
                          type="text"
                          value={editForm.mobile}
                          onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cep Telefonu 2 (Opsiyonel)</label>
                        <input
                          type="text"
                          value={editForm.mobile2}
                          onChange={(e) => setEditForm({ ...editForm, mobile2: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Opsiyonel"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fax (Opsiyonel)</label>
                        <input
                          type="text"
                          value={editForm.fax}
                          onChange={(e) => setEditForm({ ...editForm, fax: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Opsiyonel"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Additional Information Card */}
          <div className="mt-8 pt-8 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Üyelik Tarihi</div>
                <div className="text-lg font-semibold text-gray-900">15 Ocak 2022</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Hesap Durumu</div>
                <div className="text-lg font-semibold text-green-600">Aktif</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Son Giriş</div>
                <div className="text-lg font-semibold text-gray-900">Bugün, 09:45</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
