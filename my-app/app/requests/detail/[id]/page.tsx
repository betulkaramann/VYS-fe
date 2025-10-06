"use client";

import { useParams } from 'next/navigation';
import { STATUS_STYLES } from '../../../lib/statusStyles';

const fakeRequests = [
  {
    id: 1,
    title: "Arıza Talebi",
    date: "2025-07-01",
    status: "Onaylandı",
    assetCode: "3262",
    assetLabel: "GI-Z09",
    sectionCode: "BST.GNY.ZK",
    sectionLabel: "BEŞTEPE GÜNEY İDARİ BİNA ZEMİN",
    priority: "N-NORMAL",
    jobOrderType: "YİS",
    jobOrderTypeLabel: "YENİ İŞ İSTEĞİ",
    jobType: "KRM.HZT",
    jobTypeLabel: "KURUMSAL HİZMETLER",
    requestTitle: "KAPI İSİMLİĞİ TALEBİ",
    requester: "Betül Karaman",
    phoneNumber: "",
    description: `Merhaba,\n\nKapı isimliğine Betül Karaman isminin eklenmesi hususunda yardımlarınızı beklemekteyim.\n\nİyi çalışmalar.`,
    team: "",
    responsible: "",
    approvalNote: "",
    sendToSupervisor: "",
    statusCode: "10",
    statusLabel: "YENİ TALEP",
    estimatedEndDate: "3.07.2025 09:12",
    estimatedDuration: "",
    requestNumber: "8002556",
    requestYear: "2025",
    notificationDate: "3.07.2025 09:12"
  },
  {
    id: 2,
    title: "Malzeme Talebi",
    date: "2025-06-28",
    status: "Beklemede",
    description: "Gerekli malzemeler için oluşturulan talep."
  },
  {
    id: 3,
    title: "Temizlik Talebi",
    date: "2025-06-20",
    status: "Reddedildi",
    description: "Temizlik hizmetleri için oluşturulan talep."
  },
];

export default function RequestDetailPage() {
  const params = useParams();
  const id = Number(params?.id);
  const request = fakeRequests.find((r) => r.id === id);

  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow text-center text-red-700 font-semibold">
          Talep bulunamadı.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-lg border px-12 py-10 max-w-4xl w-full flex flex-col gap-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl font-bold text-red-800">{request.title}</span>
          {(() => {
            const status = STATUS_STYLES[request.status] || { bg: 'bg-gray-200', text: 'text-gray-700', label: request.status };
            return (
              <span className={`text-xs rounded px-2 py-0.5 ml-2 ${status.bg} ${status.text}`}>{status.label}</span>
            );
          })()}
        </div>
        <div className="text-gray-600 text-sm mb-2">Tarih: {request.date}</div>
        {request.id ? (
          <div className="flex flex-col gap-8">
            <div className="border rounded-lg p-5 bg-gray-50">
              <div className="font-semibold text-gray-700 mb-3">Talep Bilgileri</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-base">
                <div><span className="font-semibold">Varlık Kodu:</span> {request.assetCode || '-'} <span className="text-xs text-gray-500 ml-2">{request.assetLabel || ''}</span></div>
                <div><span className="font-semibold">Kısım Kodu:</span> {request.sectionCode || '-'} <span className="text-xs text-gray-500 ml-2">{request.sectionLabel || ''}</span></div>
                <div><span className="font-semibold">Öncelik:</span> {request.priority || '-'}</div>
                <div><span className="font-semibold">İş Emri Türü:</span> {request.jobOrderType || '-'} <span className="text-xs text-gray-500 ml-2">{request.jobOrderTypeLabel || ''}</span></div>
                <div><span className="font-semibold">İş Tipi:</span> {request.jobType || '-'} <span className="text-xs text-gray-500 ml-2">{request.jobTypeLabel || ''}</span></div>
                <div><span className="font-semibold">Talep Tanımı:</span> {request.requestTitle || '-'}</div>
              </div>
            </div>
            <div className="border rounded-lg p-5 bg-gray-50">
              <div className="font-semibold text-gray-700 mb-3">Talep Eden & Açıklama</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-base">
                <div><span className="font-semibold">Talep Eden:</span> {request.requester || '-'}</div>
                <div><span className="font-semibold">Telefon Numarası:</span> {request.phoneNumber || '-'}</div>
                <div className="md:col-span-2"><span className="font-semibold">Talep Açıklaması:</span><br /><pre className="bg-white rounded p-2 mt-1 text-gray-700 whitespace-pre-wrap">{request.description || '-'}</pre></div>
              </div>
            </div>
            <div className="border rounded-lg p-5 bg-gray-50">
              <div className="font-semibold text-gray-700 mb-3">Süreç & Onay Bilgileri</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-base">
                <div><span className="font-semibold">Ekip:</span> {request.team || '-'}</div>
                <div><span className="font-semibold">İşin Sorumlusu:</span> {request.responsible || '-'}</div>
                <div><span className="font-semibold">Onaylayan Açıklaması:</span> {request.approvalNote || '-'}</div>
                <div><span className="font-semibold">Üst Amire Gönder:</span> {request.sendToSupervisor || '-'}</div>
              </div>
            </div>
            <div className="border rounded-lg p-5 bg-gray-50">
              <div className="font-semibold text-gray-700 mb-3">Statü & Tarih Bilgileri</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-base">
                <div><span className="font-semibold">Statü Kodu:</span> {request.statusCode || '-'} <span className="text-xs text-gray-500 ml-2">{request.statusLabel || ''}</span></div>
                <div><span className="font-semibold">Öngörülen Bitiş Tarihi:</span> {request.estimatedEndDate || '-'}</div>
                <div><span className="font-semibold">Öngörülen Bakım Süresi:</span> {request.estimatedDuration || '-'}</div>
                <div><span className="font-semibold">Talep Numarası/Yıl:</span> {request.requestNumber ? `${request.requestNumber}/${request.requestYear}` : '-'}</div>
                <div><span className="font-semibold">Bildiriliş Tarihi:</span> {request.notificationDate || '-'}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-800 text-base mt-2">{request.description}</div>
        )}
      </div>
    </div>
  );
}
