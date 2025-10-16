'use client';
import { useRouter } from 'next/navigation';
import { ROUTES } from '../../lib/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function MalzemePage() {
  const router = useRouter();
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    priority: 'NORMAL',
    assetCode: '',
    requester: 'Betül Karaman',
    phoneNumber: '',
    department: '',
    materialList: [{ name: '', quantity: '', unit: '' }],
    urgency: '',
    requestDescription: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleMaterialChange = (index: number, field: string, value: string) => {
    const newList = [...formData.materialList];
    newList[index] = { ...newList[index], [field]: value };
    setFormData((prev) => ({ ...prev, materialList: newList }));
  };

  const addMaterial = () => {
    setFormData((prev) => ({
      ...prev,
      materialList: [...prev.materialList, { name: '', quantity: '', unit: '' }],
    }));
  };

  const removeMaterial = (index: number) => {
    if (formData.materialList.length > 1) {
      setFormData((prev) => ({
        ...prev,
        materialList: prev.materialList.filter((_, i) => i !== index),
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.assetCode) newErrors.assetCode = 'Varlık Kodu zorunludur';
    if (!formData.department) newErrors.department = 'Departman zorunludur';
    if (!formData.requester) newErrors.requester = 'Talep Eden zorunludur';
    if (formData.materialList.some(m => !m.name || !m.quantity)) {
      newErrors.materialList = 'Tüm malzemelerin adı ve miktarı gereklidir';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    console.log('Malzeme talebi gönderildi:', formData);
    router.push(ROUTES.HOME);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 p-4">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-2xl border border-blue-100">
        <h1 className="text-2xl font-semibold text-blue-700 mb-2 text-center tracking-tight">Malzeme Talebi</h1>
        <p className="text-gray-500 text-sm mb-6 text-center">Gerekli malzemeler için talepte bulunun.</p>
        
        <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
          
          {/* Priority and Urgency */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center">
                <label className="block text-xs font-medium text-gray-600 mr-1">Öncelik</label>
                <span className="text-red-500">*</span>
              </div>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700 text-sm"
              >
                <option value="NORMAL">Normal</option>
                <option value="HIGH">Yüksek</option>
                <option value="URGENT">Acil</option>
              </select>
            </div>
            <div>
              <div className="flex items-center">
                <label className="block text-xs font-medium text-gray-600 mr-1">Aciliyet</label>
              </div>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700 text-sm"
              >
                <option value="">Seçiniz</option>
                <option value="IMMEDIATE">Hemen</option>
                <option value="WEEK">Bu Hafta</option>
                <option value="MONTH">Bu Ay</option>
              </select>
            </div>
          </div>

          {/* Asset Code and Department */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center">
                <label className="block text-xs font-medium text-gray-600 mr-1">Varlık Kodu</label>
                <span className="text-red-500">*</span>
              </div>
              <input
                type="text"
                name="assetCode"
                value={formData.assetCode}
                onChange={handleChange}
                placeholder="Varlık Kodu girin"
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white ${errors.assetCode ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.assetCode && <p className="text-red-500 text-xs mt-1">{errors.assetCode}</p>}
            </div>
            <div>
              <div className="flex items-center">
                <label className="block text-xs font-medium text-gray-600 mr-1">Departman</label>
                <span className="text-red-500">*</span>
              </div>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Departman adı"
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white ${errors.department ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
            </div>
          </div>

          {/* Requester Info */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center">
                <label className="block text-xs font-medium text-gray-600 mr-1">Talep Eden</label>
                <span className="text-red-500">*</span>
              </div>
              <input
                type="text"
                name="requester"
                value={formData.requester}
                onChange={handleChange}
                placeholder="Adınız"
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white ${errors.requester ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.requester && <p className="text-red-500 text-xs mt-1">{errors.requester}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Telefon</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Telefon"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              />
            </div>
          </div>

          {/* Materials List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-gray-600">
                <span className="text-red-500">*</span> Malzemeleri Girin
              </label>
              <button
                type="button"
                onClick={addMaterial}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 font-medium"
              >
                + Malzeme Ekle
              </button>
            </div>
            {errors.materialList && <p className="text-red-500 text-xs mb-2">{errors.materialList}</p>}
            <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
              {formData.materialList.map((material, idx) => (
                <div key={idx} className="flex gap-2 items-end bg-white p-2 rounded border border-gray-200">
                  <input
                    type="text"
                    placeholder="Malzeme adı"
                    value={material.name}
                    onChange={(e) => handleMaterialChange(idx, 'name', e.target.value)}
                    className="flex-1 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="number"
                    placeholder="Miktar"
                    value={material.quantity}
                    onChange={(e) => handleMaterialChange(idx, 'quantity', e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="text"
                    placeholder="Birim"
                    value={material.unit}
                    onChange={(e) => handleMaterialChange(idx, 'unit', e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {formData.materialList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMaterial(idx)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Request Description */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mr-1">Talep Açıklaması</label>
            <textarea
              name="requestDescription"
              value={formData.requestDescription}
              onChange={handleChange}
              placeholder="İlave bilgiler yazın"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white font-medium py-2 rounded-lg shadow hover:bg-blue-700 transition-colors text-sm tracking-wide"
          >
            Talebi Gönder
          </button>
        </form>
      </div>
    </div>
  );
}