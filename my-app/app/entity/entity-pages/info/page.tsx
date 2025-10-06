'use client';
import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Edit2, Eye, Calendar, Phone, MapPin, Clock, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const RequestManagementSystem = () => {
  const [activeView, setActiveView] = useState('list'); // 'list' or 'detail'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
const [formData, setFormData] = useState({
  entityCode: '',
  teamCode: '',
  priority: '',
  workType: '',
  requestType: '',
  requestTiming: '',
  requesterName: '',
  phoneNumber: '',
  description: '',
  tags: '',
  explanation: '',
  submitTo: '',
  statusCode: '',
  submissionDate: '',
  submissionTime: '',
  reviewDuration: '',
  requestNumber: '',
  completionDate: '',
  completionTime: '',
});

  // Mock data based on the images
  const mockRequests = [
    {
      id: 1,
      code: 'elif.ozturk',
      requester: 'Elif ÖZTÜRK',
      priority: 1,
      level: 4,
      submissionDate: '1.09.2025 14:02:58',
      approvalDate: '1.09.2025 14:14:10',
      status: 'Onaylandı',
      statusType: 'approved'
    },
    {
      id: 2,
      code: 'recai',
      requester: 'Recai ESEN',
      priority: 4,
      level: 2,
      submissionDate: '1.09.2025 14:02:49',
      approvalDate: '',
      status: 'Onaylanıyor',
      statusType: 'pending'
    }
  ];

  const detailFormData = {
    entityCode: '3452',
    teamCode: 'BST.GNY.K1',
    priority: 'N-NORMAL',
    workType: 'ARZ',
    requestType: 'TLFN',
    requestTiming: '2017',
    requesterName: 'Elif Öztürk',
    phoneNumber: '',
    description: `Merhaba,

Ben Yazılım Daire Başkanlığı personeli Elif Öztürk. GM-118 numaralı odada çalışmaktayız. 4347 mevcut numaralı telefonun adıma tahsis edilmesini istiyorum.

İyi çalışmalar.`,
    tags: 'yıldırım',
    explanation: '',
    submitTo: '',
    statusCode: '11',
    submissionDate: '1.09.2025',
    submissionTime: '14:02',
    reviewDuration: '180',
    requestNumber: '70217/02',
    completionDate: '1.09.2025',
    completionTime: '14:02'
  };

  const filteredRequests = useMemo(() => {
    return mockRequests.filter(request =>
      request.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, mockRequests]);

  const getStatusBadge = (statusType, status) => {
    const statusConfig = {
      approved: { icon: CheckCircle, color: 'text-green-700 bg-green-50 border-green-200', iconColor: 'text-green-600' },
      pending: { icon: Clock, color: 'text-yellow-700 bg-yellow-50 border-yellow-200', iconColor: 'text-yellow-600' },
      rejected: { icon: XCircle, color: 'text-red-700 bg-red-50 border-red-200', iconColor: 'text-red-600' }
    };
    
    const config = statusConfig[statusType] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
        <Icon size={14} className={config.iconColor} />
        {status}
      </span>
    );
  };

  const openDetailView = (request) => {
    setSelectedRequest(request);
    setFormData(detailFormData);
    setActiveView('detail');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-1">Talep Detayları</h2>
                  <p className="text-slate-600">Talep bilgilerini görüntüleyin ve düzenleyin</p>
                </div>
                <button 
                  onClick={() => setActiveView('list')}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-white rounded-lg transition-colors border border-slate-200"
                >
                  ← Listeye Dön
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <FileText size={20} className="text-blue-600" />
                      Temel Bilgiler
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Varlık Kodu</label>
                        <input 
                          type="text" 
                          value={formData.entityCode || ''} 
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="3452"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Kurum Kodu</label>
                        <input 
                          type="text" 
                          value={formData.teamCode || ''} 
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="BST.GNY.K1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Öncelik</label>
                        <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option>N-NORMAL</option>
                          <option>H-HIGH</option>
                          <option>L-LOW</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">İş Emri Türü</label>
                        <input 
                          type="text" 
                          value={formData.workType || ''} 
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="ARZ"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">İş Tipi</label>
                        <input 
                          type="text" 
                          value={formData.requestType || ''} 
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="TLFN"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Talep Tarihi</label>
                        <input 
                          type="text" 
                          value={formData.requestTiming || ''} 
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="2017"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Talep Eden / Tel.</label>
                        <input 
                          type="text" 
                          value={formData.requesterName || ''} 
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Elif Öztürk"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Telefon Numarası</label>
                        <input 
                          type="text" 
                          value={formData.phoneNumber || ''} 
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+90 XXX XXX XX XX"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <MapPin size={20} className="text-blue-600" />
                      Talep Açıklaması
                    </h3>
                    <textarea 
                      value={formData.description || ''} 
                      rows={6}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Talep açıklamasını buraya yazın..."
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="bg-emerald-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <Clock size={20} className="text-emerald-600" />
                      Durum Bilgileri
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Etiketler</label>
                        <input 
                          type="text" 
                          value={formData.tags || ''} 
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="yıldırım"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Onaylayann Açıklaması</label>
                        <textarea 
                          value={formData.explanation || ''} 
                          rows={3}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Üst Amire Gönder</label>
                        <input 
                          type="text" 
                          value={formData.submitTo || ''} 
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <Calendar size={20} className="text-amber-600" />
                      Zaman Bilgileri
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Statü Kodu</label>
                        <input 
                          type="text" 
                          value={formData.statusCode || ''} 
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="11"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Önergelen Bitiş Tarihi</label>
                        <input 
                          type="date" 
                          value="2025-09-01"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Önergelen Bakım Süresi</label>
                        <input 
                          type="text" 
                          value={formData.reviewDuration || ''} 
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="180"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Talep Numarası/Yıl</label>
                        <input 
                          type="text" 
                          value={formData.requestNumber || ''} 
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="70217/02"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Bildirim Tarihi</label>
                        <input 
                          type="date" 
                          value="2025-09-01"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Saat</label>
                        <input 
                          type="time" 
                          value="14:02"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-end gap-4">
                  <button className="px-6 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
                    İptal
                  </button>
                  <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors shadow-lg">
                    Kaydet
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg transition-all duration-200 shadow-lg">
                    Onayla
                  </button>
                </div>
              </div>
            </div>
          </div>
  );
};

export default RequestManagementSystem;