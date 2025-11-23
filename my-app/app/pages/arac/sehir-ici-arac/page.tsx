'use client';

import { useRouter } from 'next/navigation';
import { ROUTES } from '../../../lib/router';
import { useState, Suspense } from 'react';
import { usePageAutoFill } from '../../../chatbot/models/usePageAutoFill';

function SehirIciAracForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        priority: 'NORMAL',
        assetCode: '', // Tercih edilen araç (Opsiyonel)
        requester: 'Betül Karaman',
        phoneNumber: '',
        jobType: '',
        requestTitle: '',
        requestDescription: '',
        // Özel Alanlar
        destination: '',
        taskDate: '',
        passengerCount: ''
    });

    // Otomatik doldurma kancası
    usePageAutoFill(setFormData);

    const [errors, setErrors] = useState<{
        destination?: string;
        taskDate?: string;
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
    };

    const validateForm = () => {
        const newErrors: typeof errors = {};
        if (!formData.destination) newErrors.destination = 'Gidilecek yer zorunludur';
        if (!formData.taskDate) newErrors.taskDate = 'Tarih ve saat zorunludur';
        if (!formData.jobType) newErrors.jobType = 'İş Tipi zorunludur';
        if (!formData.requestTitle) newErrors.requestTitle = 'Talep Başlığı zorunludur';
        if (!formData.requester) newErrors.requester = 'Talep Eden zorunludur';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;
        console.log('Şehir içi araç talebi gönderildi:', formData);
        router.push(ROUTES.HOME);
    };

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-2xl border border-red-100">
            <h1 className="text-2xl font-semibold text-red-700 mb-2 text-center tracking-tight">Şehir İçi Araç Talebi</h1>
            <p className="text-gray-500 text-sm mb-6 text-center">Şehir içi ulaşım ve görevler için araç talep edin.</p>
            <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>

                {/* Üst Bilgiler */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Öncelik <span className="text-red-500">*</span></label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                        >
                            <option value="NORMAL">Normal</option>
                            <option value="HIGH">Yüksek</option>
                            <option value="URGENT">Acil</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Tercih Edilen Araç</label>
                        <input
                            type="text"
                            name="assetCode"
                            value={formData.assetCode}
                            onChange={handleChange}
                            placeholder="Plaka veya Tip"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                        />
                    </div>
                </div>

                {/* Kişi Bilgileri */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Talep Eden <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="requester"
                            value={formData.requester}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white ${errors.requester ? 'border-red-400' : 'border-gray-200'}`}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Telefon</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Telefon"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                        />
                    </div>
                </div>

                {/* Görev Detayları */}
                <div className="grid grid-cols-2 gap-3 bg-red-50/50 p-3 rounded-lg border border-red-100">
                    <div className="col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Gidilecek Yer / Güzergah <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            placeholder="Örn: Kızılay Bakanlık Binası"
                            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white ${errors.destination ? 'border-red-400' : 'border-gray-200'}`}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Tarih ve Saat <span className="text-red-500">*</span></label>
                        <input
                            type="datetime-local"
                            name="taskDate"
                            value={formData.taskDate}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white ${errors.taskDate ? 'border-red-400' : 'border-gray-200'}`}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Yolcu Sayısı</label>
                        <input
                            type="number"
                            name="passengerCount"
                            value={formData.passengerCount}
                            onChange={handleChange}
                            placeholder="Kişi sayısı"
                            min="1"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                        />
                    </div>
                </div>

                {/* İş Tipi */}
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Görev Türü <span className="text-red-500">*</span></label>
                    <select
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white ${errors.jobType ? 'border-red-400' : 'border-gray-200'}`}
                    >
                        <option value="">Seçiniz</option>
                        <option value="ŞEHİR İÇİ GÖREV">ŞEHİR İÇİ GÖREV</option>
                        <option value="ARAÇ BAKIMI">ARAÇ BAKIMI</option>
                        <option value="YÜK TAŞIMA">YÜK TAŞIMA</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Talep Başlığı <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="requestTitle"
                        value={formData.requestTitle}
                        onChange={handleChange}
                        placeholder="Talep Tanımı"
                        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white ${errors.requestTitle ? 'border-red-400' : 'border-gray-200'}`}
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mr-1">Talep Açıklaması</label>
                    <textarea
                        name="requestDescription"
                        value={formData.requestDescription}
                        onChange={handleChange}
                        placeholder="Görev detaylarını girin"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                        rows={4}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-2 bg-red-600 text-white font-medium py-2 rounded-lg shadow hover:bg-red-700 transition-colors text-sm tracking-wide"
                >
                    Talebi Gönder
                </button>
            </form>
        </div>
    );
}

export default function SehirIciAracPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 p-4">
            <Suspense fallback={<div>Yükleniyor...</div>}>
                <SehirIciAracForm />
            </Suspense>
        </div>
    );
}