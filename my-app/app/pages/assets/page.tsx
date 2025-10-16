'use client';

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit2, Trash2, Search, TrendingDown, MapPin } from 'lucide-react';

type Asset = {
  id: number;
  code: string;
  name: string;
  category: string;
  location: string;
  acquisitionDate: string;
  acquisitionPrice: number;
  currentValue: number;
  depreciation: number;
  responsible: string;
  maintenanceStatus: string;
};

const mockAssets: Asset[] = [
  { id: 1, code: 'VAR-001', name: 'Dell OptiPlex 7090', category: 'Bilgisayar', location: 'Yazılım Dairesi', acquisitionDate: '2020-03-15', acquisitionPrice: 15000, currentValue: 8500, depreciation: 43, responsible: 'Betül Karaman', maintenanceStatus: 'İyi' },
  { id: 2, code: 'VAR-002', name: 'HP LaserJet Pro M404n', category: 'Yazıcı', location: 'İdari Hizmetler', acquisitionDate: '2019-06-20', acquisitionPrice: 8000, currentValue: 3200, depreciation: 60, responsible: 'Ayşe Demir', maintenanceStatus: 'İyi' },
  { id: 3, code: 'VAR-003', name: 'Hyundai i20 Yakit', category: 'Araç', location: 'Garaj', acquisitionDate: '2018-01-10', acquisitionPrice: 450000, currentValue: 250000, depreciation: 44, responsible: 'Ahmet Yılmaz', maintenanceStatus: 'Bakım Lazım' },
  { id: 4, code: 'VAR-004', name: 'Office Desk Seti (5 Adet)', category: 'Mobilya', location: 'Genel Ofis', acquisitionDate: '2021-05-01', acquisitionPrice: 12000, currentValue: 9600, depreciation: 20, responsible: 'Zeynep Öztürk', maintenanceStatus: 'Mükemmel' },
  { id: 5, code: 'VAR-005', name: 'Projector EPSON EB-2250U', category: 'Görüntüleme', location: 'Toplantı Odası 1', acquisitionDate: '2022-02-14', acquisitionPrice: 25000, currentValue: 18500, depreciation: 26, responsible: 'Mehmet Çelik', maintenanceStatus: 'İyi' },
];

const categories = ['Bilgisayar', 'Yazıcı', 'Araç', 'Mobilya', 'Görüntüleme', 'Diğer'];
const locations = ['Yazılım Dairesi', 'İdari Hizmetler', 'Garaj', 'Genel Ofis', 'Toplantı Odası 1', 'Depo'];
const maintenanceStatuses = ['Mükemmel', 'İyi', 'Bakım Lazım', 'Onarım Bekliyor'];

export default function AssetsPage() {
  const { t } = useTranslation();
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: '',
    location: '',
    acquisitionDate: '',
    acquisitionPrice: 0,
    currentValue: 0,
    depreciation: 0,
    responsible: '',
    maintenanceStatus: 'İyi',
  });

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const matchSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = !filterCategory || asset.category === filterCategory;
      const matchLocation = !filterLocation || asset.location === filterLocation;
      const matchStatus = !filterStatus || asset.maintenanceStatus === filterStatus;
      return matchSearch && matchCategory && matchLocation && matchStatus;
    });
  }, [assets, searchTerm, filterCategory, filterLocation, filterStatus]);

  const totalAssetValue = assets.reduce((sum, a) => sum + a.currentValue, 0);
  const totalDepreciation = assets.reduce((sum, a) => sum + (a.acquisitionPrice - a.currentValue), 0);

  const handleOpenModal = (asset?: Asset) => {
    if (asset) {
      setFormData(asset);
      setEditingId(asset.id);
    } else {
      setFormData({
        code: '',
        name: '',
        category: '',
        location: '',
        acquisitionDate: '',
        acquisitionPrice: 0,
        currentValue: 0,
        depreciation: 0,
        responsible: '',
        maintenanceStatus: 'İyi',
      });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.code || !formData.name || !formData.category) {
      alert('Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    if (editingId) {
      setAssets(assets.map(a => a.id === editingId ? { ...formData, id: editingId } : a));
    } else {
      setAssets([...assets, { ...formData, id: Math.max(...assets.map(a => a.id), 0) + 1 }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Silmek istediğinizden emin misiniz?')) {
      setAssets(assets.filter(a => a.id !== id));
    }
  };

  const getMaintenanceColor = (status: string) => {
    switch (status) {
      case 'Mükemmel':
        return 'bg-green-100 text-green-800';
      case 'İyi':
        return 'bg-blue-100 text-blue-800';
      case 'Bakım Lazım':
        return 'bg-yellow-100 text-yellow-800';
      case 'Onarım Bekliyor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('assets.assets_management')}</h1>
            <p className="text-gray-600 mt-1">Sabit Varlıklar, Araçlar ve Ekipmanlar</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Plus size={20} />
            Varlık Ekle
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <div>
              <p className="text-gray-600 text-sm font-medium">Toplam Varlık Sayısı</p>
              <p className="text-3xl font-bold text-gray-900">{assets.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
            <div>
              <p className="text-gray-600 text-sm font-medium">Toplam Güncel Değer</p>
              <p className="text-3xl font-bold text-gray-900">₺{totalAssetValue.toLocaleString('tr-TR')}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Toplam Amortisman</p>
                <p className="text-3xl font-bold text-gray-900">₺{totalDepreciation.toLocaleString('tr-TR')}</p>
              </div>
              <TrendingDown size={40} className="text-red-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search size={16} className="inline mr-2" />
                Ara
              </label>
              <input
                type="text"
                placeholder="Kod veya ad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Tüm Kategoriler</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-2" />
                Konum
              </label>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Tüm Konumlar</option>
                {locations.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bakım Durumu</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Tüm Durumlar</option>
                {maintenanceStatuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sonuç</label>
              <div className="px-3 py-2 bg-gray-100 rounded-lg font-semibold text-gray-900">
                {filteredAssets.length} / {assets.length}
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Kod</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Adı</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Kategori</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Konum</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Güncel Değer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amortisman %</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sorumlu</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Bakım Durumu</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.length > 0 ? (
                  filteredAssets.map((asset) => (
                    <tr key={asset.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{asset.code}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{asset.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{asset.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{asset.location}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">₺{asset.currentValue.toLocaleString('tr-TR')}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{asset.depreciation}%</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{asset.responsible}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getMaintenanceColor(asset.maintenanceStatus)}`}>
                          {asset.maintenanceStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenModal(asset)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Düzenle"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(asset.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Sil"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                      Hiçbir varlık bulunamadı
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              {editingId ? 'Varlık Düzenle' : 'Yeni Varlık Ekle'}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Varlık Kodu"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                placeholder="Adı"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Kategori Seçin</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Konum Seçin</option>
                {locations.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              <input
                type="date"
                value={formData.acquisitionDate}
                onChange={(e) => setFormData({ ...formData, acquisitionDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Satın Alma Fiyatı"
                  value={formData.acquisitionPrice}
                  onChange={(e) => setFormData({ ...formData, acquisitionPrice: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="number"
                  placeholder="Güncel Değer"
                  value={formData.currentValue}
                  onChange={(e) => setFormData({ ...formData, currentValue: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <input
                type="text"
                placeholder="Sorumlu Kişi"
                value={formData.responsible}
                onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <select
                value={formData.maintenanceStatus}
                onChange={(e) => setFormData({ ...formData, maintenanceStatus: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {maintenanceStatuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Kaydet
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
