'use client';

import {useState, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Plus, Edit2, Trash2, Search, AlertCircle, Warehouse, BarChart3, Boxes} from 'lucide-react';
import Tabs, {TabItem} from '../components/tabs/Tabs';
import { COLORS } from '../utils/colors';

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
    {
        id: 1,
        name: 'Yapı Demiri ø12',
        warehouse: 'Ana Depo',
        quantity: 450,
        minStock: 200,
        unitPrice: 8.50,
        unit: 'kg',
        category: 'İnşaat Malzemeleri',
        lastUpdated: '2024-10-10'
    },
    {
        id: 2,
        name: 'Çimento 42.5',
        warehouse: 'Ana Depo',
        quantity: 120,
        minStock: 300,
        unitPrice: 45.00,
        unit: 'kg',
        category: 'İnşaat Malzemeleri',
        lastUpdated: '2024-10-15'
    },
    {
        id: 3,
        name: 'Elektrik Kablosu NYY',
        warehouse: 'Depo 2',
        quantity: 850,
        minStock: 200,
        unitPrice: 3.20,
        unit: 'metre',
        category: 'Elektrik',
        lastUpdated: '2024-10-12'
    },
    {
        id: 4,
        name: 'Su Borusu PVC 50mm',
        warehouse: 'Depo 2',
        quantity: 180,
        minStock: 100,
        unitPrice: 12.50,
        unit: 'metre',
        category: 'Sıhhi Tesisat',
        lastUpdated: '2024-10-08'
    },
    {
        id: 5,
        name: 'Boya Beyaz (5L)',
        warehouse: 'Depo 3',
        quantity: 45,
        minStock: 50,
        unitPrice: 125.00,
        unit: 'bidon',
        category: 'Boya ve Cila',
        lastUpdated: '2024-10-14'
    },
    {
        id: 6,
        name: 'Tornavida Seti',
        warehouse: 'Ana Depo',
        quantity: 12,
        minStock: 10,
        unitPrice: 45.00,
        unit: 'adet',
        category: 'Alet',
        lastUpdated: '2024-09-20'
    },
    {
        id: 7,
        name: 'LED Aydınlatma Paneli',
        warehouse: 'Depo 2',
        quantity: 25,
        minStock: 15,
        unitPrice: 285.00,
        unit: 'adet',
        category: 'Elektrik',
        lastUpdated: '2024-10-11'
    },
];

const warehouses = ['Ana Depo', 'Depo 2', 'Depo 3', 'Depo 4'];
const categories = ['İnşaat Malzemeleri', 'Elektrik', 'Sıhhi Tesisat', 'Boya ve Cila', 'Alet', 'Diğer'];

export default function InventoryPage() {
    const {t} = useTranslation();
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
            setMaterials(materials.map(m => m.id === editingId ? {...formData, id: editingId} : m));
        } else {
            setMaterials([...materials, {...formData, id: Math.max(...materials.map(m => m.id), 0) + 1}]);
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

    const OverviewTab = () => (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Toplam Malzeme Sayısı</p>
                            <p className="text-3xl font-bold text-gray-900">{materials.length}</p>
                        </div>
                        <Warehouse size={40} className="text-blue-600 opacity-20"/>
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
                        <AlertCircle size={40} className="text-red-600 opacity-20"/>
                    </div>
                </div>
            </div>

            {/* Main Table with Filters */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Malzeme adı ile ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="">Tüm Kategoriler</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        <select
                            value={filterWarehouse}
                            onChange={(e) => setFilterWarehouse(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="">Tüm Depolar</option>
                            {warehouses.map(wh => <option key={wh} value={wh}>{wh}</option>)}
                        </select>
                        <label
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="checkbox"
                                checked={showLowStockOnly}
                                onChange={(e) => setShowLowStockOnly(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <span className="text-sm font-medium">Sadece Düşük Stok</span>
                        </label>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold text-gray-900">Malzeme Adı</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-900">Kategori</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-900">Depo</th>
                            <th className="px-6 py-3 text-center font-semibold text-gray-900">Miktar</th>
                            <th className="px-6 py-3 text-center font-semibold text-gray-900">Min. Stok</th>
                            <th className="px-6 py-3 text-right font-semibold text-gray-900">Birim Fiyat</th>
                            <th className="px-6 py-3 text-right font-semibold text-gray-900">Toplam Değer</th>
                            <th className="px-6 py-3 text-center font-semibold text-gray-900">İşlem</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredMaterials.map((material) => (
                            <tr key={material.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">{material.name}</td>
                                <td className="px-6 py-4 text-gray-600">{material.category}</td>
                                <td className="px-6 py-4 text-gray-600">{material.warehouse}</td>
                                <td className="px-6 py-4 text-center font-semibold text-gray-900">{material.quantity} {material.unit}</td>
                                <td className="px-6 py-4 text-center">{material.minStock}</td>
                                <td className="px-6 py-4 text-right">₺{material.unitPrice.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right font-semibold text-green-600">₺{(material.quantity * material.unitPrice).toLocaleString('tr-TR')}</td>
                                <td className="px-6 py-4 flex gap-2 justify-center">
                                    <button
                                        onClick={() => handleOpenModal(material)}
                                        className="text-blue-600 hover:text-blue-800 transition"
                                    >
                                        <Edit2 size={18}/>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(material.id)}
                                        className="text-red-600 hover:text-red-800 transition"
                                    >
                                        <Trash2 size={18}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const StockAnalysisTab = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategori Bazlı Stok Analizi</h3>
                <div className="space-y-3">
                    {categories.map((category) => {
                        const categoryMaterials = materials.filter(m => m.category === category);
                        const categoryValue = categoryMaterials.reduce((sum, m) => sum + (m.quantity * m.unitPrice), 0);
                        const categoryPercentage = (categoryValue / totalInventoryValue) * 100;
                        return (
                            <div key={category}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">{category}</span>
                                    <span
                                        className="text-sm font-bold text-gray-900">₺{categoryValue.toLocaleString('tr-TR')} ({categoryPercentage.toFixed(1)}%)</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-red-500 h-2 rounded-full transition-all"
                                        style={{width: `${categoryPercentage}%`}}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Düşük Stok Malzemeleri</h3>
                <div className="space-y-2">
                    {materials.filter(m => m.quantity < m.minStock).map((material) => (
                        <div key={material.id}
                             className="flex items-center justify-between p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                            <div>
                                <p className="font-medium text-gray-900">{material.name}</p>
                                <p className="text-sm text-gray-600">{material.quantity} / {material.minStock} ({material.warehouse})</p>
                            </div>
                            <button
                                className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm font-medium">
                                Sipariş Ver
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const WarehousesTab = () => (
        <div className="space-y-6">
            {warehouses.map((warehouse) => {
                const warehouseMaterials = materials.filter(m => m.warehouse === warehouse);
                const warehouseValue = warehouseMaterials.reduce((sum, m) => sum + (m.quantity * m.unitPrice), 0);
                const warehouseQuantity = warehouseMaterials.reduce((sum, m) => sum + m.quantity, 0);

                return (
                    <div key={warehouse} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{warehouse}</h3>
                                <p className="text-gray-600 text-sm mt-1">{warehouseMaterials.length} farklı malzeme •
                                    Toplam: {warehouseQuantity} adet</p>
                            </div>
                            <span
                                className="text-2xl font-bold text-green-600">₺{warehouseValue.toLocaleString('tr-TR')}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {warehouseMaterials.map((material) => (
                                <div key={material.id}
                                     className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition">
                                    <p className="font-medium text-gray-900 text-sm">{material.name}</p>
                                    <p className="text-gray-600 text-xs mt-1">{material.category}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <span
                                            className="text-sm font-bold text-blue-600">{material.quantity} {material.unit}</span>
                                        <span
                                            className="text-xs text-gray-600">₺{(material.quantity * material.unitPrice).toLocaleString('tr-TR')}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );

    const tabs: TabItem[] = [
        {
            id: 'overview',
            label: 'Genel Bakış',
            icon: <BarChart3 size={20}/>,
            content: <OverviewTab/>,
        },
        {
            id: 'stock',
            label: 'Stok Analizi',
            icon: <Boxes size={20}/>,
            content: <StockAnalysisTab/>,
        },
        {
            id: 'warehouses',
            label: 'Depolar',
            icon: <Warehouse size={20}/>,
            badge: warehouses.length,
            content: <WarehousesTab/>,
        },
    ];

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
                        className= {`flex items-center gap-2 ${COLORS.red800} text-white px-4 py-2 rounded-lg hover:${COLORS.red800} transition-colors`}>
                        <Plus size={20}/>
                        Malzeme Ekle
                    </button>
                </div>

                {/* Tabs */}
                <Tabs tabs={tabs} variant="underline" size="lg"/>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-8 max-w-md w-full">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                {editingId ? 'Malzeme Düzenle' : 'Yeni Malzeme Ekle'}
                            </h2>

                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                <input
                                    type="text"
                                    placeholder="Malzeme Adı"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />

                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="">Kategori Seç</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>

                                <select
                                    value={formData.warehouse}
                                    onChange={(e) => setFormData({...formData, warehouse: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="">Depo Seç</option>
                                    {warehouses.map(wh => (
                                        <option key={wh} value={wh}>{wh}</option>
                                    ))}
                                </select>

                                <input
                                    type="number"
                                    placeholder="Miktar"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />

                                <input
                                    type="number"
                                    placeholder="Minimum Stok"
                                    value={formData.minStock}
                                    onChange={(e) => setFormData({...formData, minStock: Number(e.target.value)})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />

                                <input
                                    type="number"
                                    placeholder="Birim Fiyat"
                                    value={formData.unitPrice}
                                    onChange={(e) => setFormData({...formData, unitPrice: Number(e.target.value)})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={handleSave}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                                >
                                    Kaydet
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                >
                                    İptal
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}