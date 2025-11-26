'use client';

import { useRouter } from 'next/navigation';
import { ROUTES } from '../../lib/router';
import { useState, Suspense } from 'react';
import { usePageAutoFill } from '../../chatbot/models/usePageAutoFill';
import toast, { Toaster } from 'react-hot-toast';

function TemizlikForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        priority: 'NORMAL',
        assetCode: '',
        requester: 'Betül Karaman',
        phoneNumber: '',
        jobType: '',
        requestTitle: '',
        requestDescription: '',
    });

    usePageAutoFill(setFormData);

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
    };

    const validateForm = () => {
        const newErrors: { assetCode?: string; jobType?: string; requestTitle?: string; requester?: string } = {};
        if (!formData.assetCode) newErrors.assetCode = 'Varlık Kodu zorunludur';
        if (!formData.jobType) newErrors.jobType = 'İş Tipi zorunludur';
        if (!formData.requestTitle) newErrors.requestTitle = 'Talep Başlığı zorunludur';
        if (!formData.requester) newErrors.requester = 'Talep Eden zorunludur';
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            toast.error("Lütfen zorunlu alanları doldurunuz.");
        }
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        const toastId = toast.loading('Kayıt oluşturuluyor...');
        // Tablonun (UserTable) beklediği format:
        // { jobNo, entityCode, requester, requestDetail, createDate, requestType, jobType, workOrderType, worker, status }

        const today = new Date();
        const formattedDate = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;

        const tableCompatibleData = {
            jobNo: Math.floor(1000 + Math.random() * 9000),

            entityCode: parseInt(formData.assetCode) || 0,

            requester: formData.requester, // Talep Eden

            requestDetail: formData.requestDescription || formData.requestTitle,

            createDate: formattedDate, // YYYY/MM/DD formatı

            requestType: formData.requestTitle,

            jobType: formData.jobType,

            // İş Emri Türü (Formda yok, manuel atıyoruz veya türetiyoruz)
            workOrderType: "Genel Hizmet Talebi",

            worker: "Atanmadı",

            status: "Onay Bekliyor"
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tableCompatibleData),
            });


            if (response.ok) {
                toast.success('Kayıt başarıyla eklendi!', { id: toastId });
                await new Promise(resolve => setTimeout(resolve, 1500));
                router.push(ROUTES.HOME);
            } else {
                toast.error("Bir hata oluştu.", { id: toastId });
            }
        } catch (error) {
            console.error(error);
            toast.error("Sunucu hatası.", { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md border border-red-100">
            <h1 className="text-2xl font-semibold text-red-700 mb-2 text-center tracking-tight">Temizlik Talebi</h1>
            <p className="text-gray-500 text-sm mb-6 text-center">Tabloya uygun veri girişi.</p>
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
                        <label className="block text-xs font-medium text-gray-600 mr-1">Varlık Kodu (Sayısal)</label>
                        <span className="text-red-500">*</span>
                    </div>
                    <input
                        type="number" // Tablodaki entityCode number olduğu için type number yaptım
                        name="assetCode"
                        value={formData.assetCode}
                        onChange={handleChange}
                        placeholder="Örn: 3262"
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

                {/* İş Tipi (Tabloda: Job Type) */}
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
                        <option value="Temizlik">Temizlik</option>
                        <option value="Bakım">Bakım</option>
                        <option value="Elektrik">Elektrik</option>
                        <option value="Tesisat">Tesisat</option>
                        <option value="BT Destek">BT Destek</option>
                    </select>
                    {errors.jobType && <p className="text-red-500 text-xs mt-1">{errors.jobType}</p>}
                </div>

                {/* Talep Başlığı (Tabloda: Request Type olarak kullanacağız) */}
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
                        placeholder="Örn: Ofis Temizliği"
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
                        placeholder="Detaylar..."
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-grey-400 bg-white"
                        rows={5}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`mt-2 font-medium py-2 rounded-lg shadow transition-colors text-sm tracking-wide ${
                        isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                >
                    {isSubmitting ? 'Kaydediliyor...' : 'Talebi Oluştur'}
                </button>
            </form>
        </div>
    );
}

export default function TemizlikPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 p-4">

            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                }}
            />

            <Suspense fallback={<div>Yükleniyor...</div>}>
                <TemizlikForm />
            </Suspense>
        </div>
    );
}