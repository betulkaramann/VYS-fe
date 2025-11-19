'use client';

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { COLORS } from '../utils/colors';

type Employee = {
  id: number;
  name: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  hireDate: string;
  status: 'Aktif' | 'Pasif' | 'İzinde';
  salary: number;
};

const mockEmployees: Employee[] = [
  { id: 1, name: 'Betül Karaman', department: 'YAZILIM DAİRE BAŞKANLIĞI', position: 'Mühendis', email: 'betul.karaman@tccb.gov.tr', phone: '0312-525-4119', hireDate: '2015-03-15', status: 'Aktif', salary: 45000 },
  { id: 2, name: 'Ahmet Yılmaz', department: 'İNŞAAT DAİRESİ', position: 'Şef', email: 'ahmet.yilmaz@tccb.gov.tr', phone: '0312-525-4120', hireDate: '2018-06-20', status: 'Aktif', salary: 38000 },
  { id: 3, name: 'Ayşe Demir', department: 'İDARİ HIZMETLER', position: 'Sekreter', email: 'ayse.demir@tccb.gov.tr', phone: '0312-525-4121', hireDate: '2016-01-10', status: 'Aktif', salary: 28000 },
  { id: 4, name: 'Mehmet Çelik', department: 'YAZILIM DAİRE BAŞKANLIĞI', position: 'Yazılım Geliştirici', email: 'mehmet.celik@tccb.gov.tr', phone: '0312-525-4122', hireDate: '2019-09-01', status: 'İzinde', salary: 42000 },
  { id: 5, name: 'Zeynep Öztürk', department: 'İNSAN KAYNAKLARI', position: 'İK Müdürü', email: 'zeynep.ozturk@tccb.gov.tr', phone: '0312-525-4123', hireDate: '2014-02-17', status: 'Aktif', salary: 50000 },
];

export default function HRPage() {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    position: '',
    email: '',
    phone: '',
    hireDate: '',
    status: 'Aktif' as const,
    salary: 0,
  });

  const departments = [...new Set(employees.map(e => e.department))];
  const statuses = ['Aktif', 'Pasif', 'İzinde'];

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDept = !filterDept || emp.department === filterDept;
      const matchStatus = !filterStatus || emp.status === filterStatus;
      return matchSearch && matchDept && matchStatus;
    });
  }, [employees, searchTerm, filterDept, filterStatus]);

  const handleOpenModal = (employee?: Employee) => {
    if (employee) {
      setFormData(employee);
      setEditingId(employee.id);
    } else {
      setFormData({
        name: '',
        department: '',
        position: '',
        email: '',
        phone: '',
        hireDate: '',
        status: 'Aktif',
        salary: 0,
      });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.department || !formData.position) {
      alert('Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    if (editingId) {
      setEmployees(employees.map(e => e.id === editingId ? { ...formData, id: editingId } : e));
    } else {
      setEmployees([...employees, { ...formData, id: Math.max(...employees.map(e => e.id), 0) + 1 }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Silmek istediğinizden emin misiniz?')) {
      setEmployees(employees.filter(e => e.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif':
        return 'bg-green-100 text-green-800';
      case 'Pasif':
        return 'bg-gray-100 text-gray-800';
      case 'İzinde':
        return 'bg-blue-100 text-blue-800';
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
            <h1 className="text-3xl font-bold text-gray-900">{t('hr.human_resources')}</h1>
            <p className="text-gray-600 mt-1">Personel ve Vardiya Planlama</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className={`flex items-center gap-2 ${COLORS.red800} text-white px-4 py-2 rounded-lg hover:${COLORS.red800} transition-colors`}
          >
            <Plus size={20} />
            {t('hr.add_employee')}
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search size={16} className="inline mr-2" />
                Ara
              </label>
              <input
                type="text"
                placeholder="Adı, E-postası..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter size={16} className="inline mr-2" />
                Departman
              </label>
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Tüm Departmanlar</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Tüm Durumlar</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sonuç</label>
              <div className="px-3 py-2 bg-gray-100 rounded-lg font-semibold text-gray-900">
                {filteredEmployees.length} / {employees.length}
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ad</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Departman</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Pozisyon</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">E-Posta</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Telefon</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">İşe Alınma Tarihi</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Durum</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Maaş</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{emp.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{emp.department}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{emp.position}</td>
                      <td className="px-6 py-4 text-sm text-blue-600"><a href={`mailto:${emp.email}`}>{emp.email}</a></td>
                      <td className="px-6 py-4 text-sm text-gray-700"><a href={`tel:${emp.phone}`}>{emp.phone}</a></td>
                      <td className="px-6 py-4 text-sm text-gray-700">{new Date(emp.hireDate).toLocaleDateString('tr-TR')}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(emp.status)}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">₺{emp.salary.toLocaleString('tr-TR')}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenModal(emp)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Düzenle"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(emp.id)}
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
                      Hiçbir çalışan bulunamadı
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
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              {editingId ? 'Çalışan Düzenle' : 'Yeni Çalışan Ekle'}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Adı Soyadı"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="email"
                placeholder="E-Posta"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="tel"
                placeholder="Telefon"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Departman Seçin</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Pozisyon"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="date"
                value={formData.hireDate}
                onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="number"
                placeholder="Maaş"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
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