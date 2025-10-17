'use client';

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit2, Trash2, Search, AlertCircle, Warehouse } from 'lucide-react';

type Material = {
  id: number;
  name: string;
  warehouse: string;
  quantity: number;
  minStock: number;
  unitPrice: number;
  unit: string;
  category: string;
  lastUpdated: string;
};

const mockMaterials: Material[] = [
  { id: 1, name: 'Yapı Demiri ø12', warehouse: 'Ana Depo', quantity: 450, minStock: 200, unitPrice: 8.50, unit: 'kg', category: 'İnşaat Malzemeleri', lastUpdated: '2024-10-10' },
  { id: 2, name: 'Çimento 42.5', warehouse: 'Ana Depo', quantity: 120, minStock: 300, unitPrice: 45.00, unit: 'kg', category: 'İnşaat Malzemeleri', lastUpdated: '2024-10-15' },
  { id: 3, name: 'Elektrik Kablosu NYY', warehouse: 'Depo 2', quantity: 850, minStock: 200, unitPrice: 3.20, unit: 'metre', category: 'Elektrik', lastUpdated: '2024-10-12' },
  { id: 4, name: 'Su Borusu PVC 50mm', warehouse: 'Depo 2', quantity: 180, minStock: 100, unitPrice: 12.50, unit: 'metre', category: 'Sıhhi Tesisat', lastUpdated: '2024-10-08' },
  { id: 5, name: 'Boya Beyaz (5L)', warehouse: 'Depo 3', quantity: 45, minStock: 50, unitPrice: 125.00, unit: 'bidon', category: 'Boya ve Cila', lastUpdated: '2024-10-14' },
  { id: 6, name: 'Tornavida Seti', warehouse: 'Ana Depo', quantity: 12, minStock: 10, unitPrice: 45.00, unit: 'adet', category: 'Alet', lastUpdated: '2024-09-20' },
  { id: 7, name: 'LED Aydınlatma Paneli', warehouse: 'Depo 2', quantity: 25, minStock: 15, unitPrice: 285.00, unit: 'adet', category: 'Elektrik', lastUpdated: '2024-10-11' },
];

const warehouses = ['Ana Depo', 'Depo 2', 'Depo 3', 'Depo 4'];
const categories = ['İnşaat Malzemeleri', 'Elektrik', 'Sıhhi Tesisat', 'Boya ve Cila', 'Alet', 'Diğer'];

export default function InventoryPage() {
  const { t } = useTranslation();
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWarehouse, setFilterWarehouse] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    warehouse: '',
    quantity: 0,
    minStock: 0,
    unitPrice: 0,
    unit: 'adet',
    category: '',
    lastUpdated: new Date().toISOString().split('T')[0],
  });

  const filteredMaterials = useMemo(() => {
    let filtered = materials.filter(m => {
      const matchSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchWarehouse = !filterWarehouse || m.warehouse === filterWarehouse;
      const matchCategory = !filterCategory || m.category === filterCategory;
      const matchLowStock = !showLowStockOnly || m.quantity < m.minStock;
      return matchSearch && matchWarehouse && matchCategory && matchLowStock;
    });
    return filtered;
  }, [materials, searchTerm, filterWarehouse, filterCategory, showLowStockOnly]);

  const handleOpenModal = (material?: Material) => {
    if (material) {
      setFormData(material);
      setEditingId(material.id);
    } else {
      setFormData({
        name: '',
        warehouse: '',
        quantity: 0,
        minStock: 0,
        unitPrice: 0,
        unit: 'adet',
        category: '',
        lastUpdated: new Date().toISOString().split('T')[0],
      });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.warehouse || !formData.category) {
      alert('Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    if (editingId) {
      setMaterials(materials.map(m => m.id === editingId ? { ...formData, id: editingId } : m));
    } else {
      setMaterials([...materials, { ...formData, id: Math.max(...materials.map(m => m.id), 0) + 1 }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Silmek istediğinizden emin misiniz?')) {
      setMaterials(materials.filter(m => m.id !== id));
    }
  };

  const totalInventoryValue = materials.reduce((sum, m) => sum + (m.quantity * m.unitPrice), 0);
  const lowStockCount = materials.filter(m => m.quantity < m.minStock).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('inventory.inventory_management')}</h1>
            <p className="text-gray-600 mt-1">Malzemeler, Stok ve Depolar</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Plus size={20} />
            Malzeme Ekle
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Toplam Malzeme Sayısı</p>
                <p className="text-3xl font-bold text-gray-900">{materials.length}</p>
              </div>
              <Warehouse size={40} className="text-blue-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
            <div>
              <p className="text-gray-600 text-sm font-medium">Toplam Envanter Değeri</p>
              <p className="text-3xl font-bold text-gray-900">₺{totalInventoryValue.toLocaleString('tr-TR')}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Düşük Stok Uyarısı</p>
                <p className="text-3xl font-bold text-red-600">{lowStockCount}</p>
              </div>
              <AlertCircle size={40} className="text-red-600 opacity-20" />
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
                placeholder="Malzeme adı..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="text-black block text-sm font-medium text-gray-700 mb-2">Depo</label>
              <select
                value={filterWarehouse}
                onChange={(e) => setFilterWarehouse(e.target.value)}
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option className="text-black" value="">Tüm Depolar</option>
                {warehouses.map(w => (
                  <option className="text-black" key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-black block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option className="text-black" value="">Tüm Kategoriler</option>
                {categories.map(c => (
                  <option className="text-black" key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showLowStockOnly}
                  onChange={(e) => setShowLowStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Düşük Stok Göster</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sonuç</label>
              <div className="px-3 py-2 bg-gray-100 rounded-lg font-semibold text-gray-900">
                {filteredMaterials.length} / {materials.length}
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Malzeme Adı</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Kategori</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Depo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stok Miktarı</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Min. Stok</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Birim Fiyatı</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Toplam Değer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Son Güncelleme</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.length > 0 ? (
                  filteredMaterials.map((mat) => {
                    const isLowStock = mat.quantity < mat.minStock;
                    return (
                      <tr key={mat.id} className={`border-b hover:bg-gray-50 ${isLowStock ? 'bg-red-50' : ''}`}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{mat.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{mat.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{mat.warehouse}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{mat.quantity} {mat.unit}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{mat.minStock} {mat.unit}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">₺{mat.unitPrice.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">₺{(mat.quantity * mat.unitPrice).toLocaleString('tr-TR')}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{new Date(mat.lastUpdated).toLocaleDateString('tr-TR')}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOpenModal(mat)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Düzenle"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(mat.id)}
                              className="text-red-600 hover:text-red-800"
                              title="Sil"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                      Hiçbir malzeme bulunamadı
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
              {editingId ? 'Malzeme Düzenle' : 'Yeni Malzeme Ekle'}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Malzeme Adı"
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
                value={formData.warehouse}
                onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Depo Seçin</option>
                {warehouses.map(w => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Mikt."
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="number"
                  placeholder="Min. Stok"
                  value={formData.minStock}
                  onChange={(e) => setFormData({ ...formData, minStock: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Birim Fiyatı"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData({ ...formData, unitPrice: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="text"
                  placeholder="Birim"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <input
                type="date"
                value={formData.lastUpdated}
                onChange={(e) => setFormData({ ...formData, lastUpdated: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
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