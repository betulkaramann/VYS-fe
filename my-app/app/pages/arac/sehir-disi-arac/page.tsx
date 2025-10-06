'use client';
import { useRouter } from 'next/navigation';
import { ROUTES } from '../../../lib/router';
import { useState } from 'react';

export default function ArizaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    priority: 'NORMAL',
    assetCode: '',
    requester: 'Betül Karaman',
    phoneNumber: '',
    jobType: '',
    requestTitle: '',
    requestDescription: '',
  });
  const [errors, setErrors] = useState<{
    assetCode?: string;
    jobType?: string;
    requestTitle?: string;
    requester?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    console.log(formData);
  };

  const validateForm = () => {
    const newErrors: { assetCode?: string; jobType?: string; requestTitle?: string; requester?: string } = {};
    if (formData.assetCode!) newErrors.assetCode = 'Varlık Kodu zorunludur';
    if (!formData.jobType) newErrors.jobType = 'İş Tipi zorunludur';
    if (!formData.requestTitle) newErrors.requestTitle = 'Talep Başlığı zorunludur';
    if (!formData.requester) newErrors.requester = 'Talep Eden zorunludur';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Form gönderim mantığı burada (örneğin, API çağrısı)
    console.log('Araç Talebi talebi gönderildi:', formData);
    // Form gönderildikten sonra anasayfaya yönlendir
    router.push(ROUTES.HOME);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 p-4">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md border border-red-100">
        <h1 className="text-2xl font-semibold text-red-700 mb-2 text-center tracking-tight">Araç Talebi</h1>
        <p className="text-gray-500 text-sm mb-6 text-center"> Araç Talebi için talep oluşturun.</p>
        <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>

          <div>
          
             <div className="flex items-center">
              <label className="block text-xs font-medium text-gray-600 mr-1">Öncelik</label>
              <span className="text-red-500">*</span>
            </div>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-grey-400 bg-white text-gray-700 text-sm"
            >
              <option value="NORMAL">Normal</option>
              <option value="HIGH">Yüksek</option>
              <option value="URGENT">Acil</option>
            </select>
          </div>


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
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-grey-400 bg-white ${errors.assetCode ? 'border-grey-400' : 'border-gray-200'}`}
            />
            {errors.assetCode && <p className="text-red-500 text-xs mt-1">{errors.assetCode}</p>}
          </div>


          <div className="grid grid-cols-2 gap-2">
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
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-grey-400 bg-white ${errors.requester ? 'border-grey-400' : 'border-gray-200'}`}
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
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-grey-400 bg-white"
              />
            </div>
          </div>


          <div>
             <div className="flex items-center">
              <label className="block text-xs font-medium text-gray-600 mr-1">İş Tipi</label>
              <span className="text-red-500">*</span>
            </div>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-grey-400 bg-white ${errors.jobType ? 'border-grey-400' : 'border-gray-200'}`}
            >
              <option value="">Seçiniz</option>
              <optgroup label="Teknik İşler">
                <option value="ARAÇ BAKIMI">ARAÇ BAKIMI</option>
                <option value="ELEKTRİK">ELEKTRİK</option>
                <option value="MEKANİK">MEKANİK</option>
                <option value="İNŞAAT">İNŞAAT</option>
                <option value="BEYAZ EŞYA">BEYAZ EŞYA</option>
                <option value="MOBİLYA TALEBİ">MOBİLYA TALEBİ</option>
              </optgroup>
              <optgroup label="Bilişim">
                <option value="BİLGİSAYAR VE YAZICI">BİLGİSAYAR VE YAZICI</option>
                <option value="SİSTEM">SİSTEM</option>
                <option value="AĞ YÖNETİMİ VE BİLGİ GÜVENLİĞİ">AĞ YÖNETİMİ VE BİLGİ GÜVENLİĞİ</option>
                <option value="YAZILIM">YAZILIM</option>
              </optgroup>
              <optgroup label="Diğer">
                <option value="PARK VE BAHÇE">PARK VE BAHÇE</option>
                <option value="SES VE GÖRÜNTÜ">SES VE GÖRÜNTÜ</option>
                <option value="TELEFON İŞLERİ">TELEFON İŞLERİ</option>
                <option value="TÖREN HAZIRLAMA">TÖREN HAZIRLAMA</option>
                <option value="YÜK TAŞIMA">YÜK TAŞIMA</option>
              </optgroup>
            </select>
            {errors.jobType && <p className="text-red-500 text-xs mt-1">{errors.jobType}</p>}
          </div>


          <div>
             <div className="flex items-center">
              <label className="block text-xs font-medium text-gray-600 mr-1">Talep Başlığı</label>
              <span className="text-red-500">*</span>
            </div>
            <input
              type="text"
              name="requestTitle"
              value={formData.requestTitle}
              onChange={handleChange}
              placeholder="Talep Tanımı"
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-grey-400 bg-white ${errors.requestTitle ? 'border-grey-400' : 'border-gray-200'}`}
            />
            {errors.requestTitle && (
              <p className="text-red-500 text-xs mt-1">{errors.requestTitle}</p>
            )}
          </div>


          <div>
              <label className="block text-xs font-medium text-gray-600 mr-1">Talep Açıklaması</label>
            <textarea
              name="requestDescription"
              value={formData.requestDescription}
              onChange={handleChange}
              placeholder="Araç Talebi detaylarını girin"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-grey-400 bg-white"
              rows={3}
            />
          </div>


          <button
            type="submit"
            className="mt-2 bg-green-600 text-white font-medium py-2 rounded-lg shadow hover:bg-green-700 transition-colors text-sm tracking-wide"
          >
            Talebi Gönder
          </button>
        </form>
      </div>
    </div>
  );
}