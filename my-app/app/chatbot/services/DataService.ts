// Veri Sorgulama Servisi - Chatbot için

// Mock data - gerçek uygulamada API'den gelecek
const mockRequests = [
    { jobNo: 1, entityCode: 3262, requester: "Cem Yılmaz", requestDetail: "Klima tamiri gerekiyor.", createDate: "2023/10/25", requestType: "Klima Tamiri", jobType: "Bakım", workOrderType: "Bakım Onarım Talebi", worker: "Ayşe Demir", status: "Onay Bekliyor" },
    { jobNo: 2, entityCode: 3263, requester: "Şebnem Ferah", requestDetail: "Tavan lambası arızalı.", createDate: "2023/10/26", requestType: "Elektrik Tamiri", jobType: "Elektrik", workOrderType: "Elektrik İş Emri", worker: "Ahmet Kaya", status: "Talep Onaylı/İş Emri Açık" },
    { jobNo: 3, entityCode: 3264, requester: "Haluk Levent", requestDetail: "Toplantı odasındaki sandalyenin ayağı kırık.", createDate: "2023/10/26", requestType: "Mobilya Tamiri", jobType: "Marangozluk", workOrderType: "Mobilya Tamir Talebi", worker: "Mehmet Çelik", status: "Reddedilmiş" },
    { jobNo: 4, entityCode: 3265, requester: "Tarkan Tevetoğlu", requestDetail: "Sunucu odasının duvarları boyanacak.", createDate: "2023/10/27", requestType: "Boya İşleri", jobType: "Genel Bakım", workOrderType: "Genel Bakım Talebi", worker: "Hakan Altun", status: "Talep Onaylı/İş Emri Açık" },
    { jobNo: 5, entityCode: 3266, requester: "Sertab Erener", requestDetail: "Mutfakta su kaçağı var.", createDate: "2023/10/28", requestType: "Sıhhi Tesisat", jobType: "Tesisat", workOrderType: "Tesisat İş Emri", worker: "Zeynep Öztürk", status: "Talep Onaylı/İş Emri Kapatılmış" },
    { jobNo: 6, entityCode: 3267, requester: "Sezen Aksu", requestDetail: "Yeni bir masa talebi.", createDate: "2023/10/28", requestType: "Yeni Donanım", jobType: "Satın Alma", workOrderType: "Tedarik Talebi", worker: "Ali Yılmaz", status: "Onay Bekliyor" },
    { jobNo: 7, entityCode: 3268, requester: "Barış Manço", requestDetail: "Pencere camı değişimi.", createDate: "2023/10/29", requestType: "Pencere Tamiri", jobType: "Cam İşleri", workOrderType: "Bakım Onarım Talebi", worker: "Canan Ersoy", status: "Talep Onaylı/İş Emri Açık" },
    { jobNo: 8, entityCode: 3269, requester: "Ajda Pekkan", requestDetail: "İnternet bağlantısı kesik.", createDate: "2023/10/29", requestType: "Ağ Sorunu", jobType: "BT Destek", workOrderType: "BT Destek Talebi", worker: "Emre Akın", status: "Onay Bekliyor" },
    { jobNo: 9, entityCode: 3270, requester: "Feridun Düzağaç", requestDetail: "Yazıcı çalışmıyor.", createDate: "2023/10/30", requestType: "Yazıcı Tamiri", jobType: "BT Destek", workOrderType: "BT Destek Talebi", worker: "Fatma Güneş", status: "Talep Onaylı/İş Emri Kapatılmış" },
    { jobNo: 10, entityCode: 3271, requester: "Nilüfer", requestDetail: "Kahve makinesi bozuk.", createDate: "2023/10/30", requestType: "Cihaz Tamiri", jobType: "Bakım", workOrderType: "Genel Bakım Talebi", worker: "Gökhan Saygı", status: "Onay Bekliyor" },
];

const mockMaterials = [
    { id: 1, name: 'Yapı Demiri ø12', warehouse: 'Ana Depo', quantity: 450, minStock: 200, unitPrice: 8.50, unit: 'kg', category: 'İnşaat Malzemeleri', lastUpdated: '2024-10-10' },
    { id: 2, name: 'Çimento 42.5', warehouse: 'Ana Depo', quantity: 120, minStock: 300, unitPrice: 45.00, unit: 'kg', category: 'İnşaat Malzemeleri', lastUpdated: '2024-10-15' },
    { id: 3, name: 'Elektrik Kablosu NYY', warehouse: 'Depo 2', quantity: 850, minStock: 200, unitPrice: 3.20, unit: 'metre', category: 'Elektrik', lastUpdated: '2024-10-12' },
    { id: 4, name: 'Su Borusu PVC 50mm', warehouse: 'Depo 2', quantity: 180, minStock: 100, unitPrice: 12.50, unit: 'metre', category: 'Sıhhi Tesisat', lastUpdated: '2024-10-08' },
    { id: 5, name: 'Boya Beyaz (5L)', warehouse: 'Depo 3', quantity: 45, minStock: 50, unitPrice: 125.00, unit: 'bidon', category: 'Boya ve Cila', lastUpdated: '2024-10-14' },
    { id: 6, name: 'Tornavida Seti', warehouse: 'Ana Depo', quantity: 12, minStock: 10, unitPrice: 45.00, unit: 'adet', category: 'Alet', lastUpdated: '2024-09-20' },
    { id: 7, name: 'LED Aydınlatma Paneli', warehouse: 'Depo 2', quantity: 25, minStock: 15, unitPrice: 285.00, unit: 'adet', category: 'Elektrik', lastUpdated: '2024-10-11' },
];

const mockAssets = [
    { id: 1, code: 'VAR-001', name: 'Dell OptiPlex 7090', category: 'Bilgisayar', location: 'Yazılım Dairesi', acquisitionDate: '2020-03-15', acquisitionPrice: 15000, currentValue: 8500, depreciation: 43, responsible: 'Betül Karaman', maintenanceStatus: 'İyi' },
    { id: 2, code: 'VAR-002', name: 'HP LaserJet Pro M404n', category: 'Yazıcı', location: 'İdari Hizmetler', acquisitionDate: '2019-06-20', acquisitionPrice: 8000, currentValue: 3200, depreciation: 60, responsible: 'Ayşe Demir', maintenanceStatus: 'İyi' },
    { id: 3, code: 'VAR-003', name: 'Hyundai i20 Yakit', category: 'Araç', location: 'Garaj', acquisitionDate: '2018-01-10', acquisitionPrice: 450000, currentValue: 250000, depreciation: 44, responsible: 'Ahmet Yılmaz', maintenanceStatus: 'Bakım Lazım' },
    { id: 4, code: 'VAR-004', name: 'Office Desk Seti (5 Adet)', category: 'Mobilya', location: 'Genel Ofis', acquisitionDate: '2021-05-01', acquisitionPrice: 12000, currentValue: 9600, depreciation: 20, responsible: 'Zeynep Öztürk', maintenanceStatus: 'Mükemmel' },
    { id: 5, code: 'VAR-005', name: 'Projector EPSON EB-2250U', category: 'Görüntüleme', location: 'Toplantı Odası 1', acquisitionDate: '2022-02-14', acquisitionPrice: 25000, currentValue: 18500, depreciation: 26, responsible: 'Mehmet Çelik', maintenanceStatus: 'İyi' },
];

export class DataService {
    // Talep sorgulama
    static getRequests(filters?: {
        status?: string;
        requester?: string;
        requestType?: string;
        limit?: number;
    }) {
        let results = [...mockRequests];

        if (filters) {
            if (filters.status) {
                results = results.filter(r => r.status.toLowerCase().includes(filters.status!.toLowerCase()));
            }
            if (filters.requester) {
                results = results.filter(r => r.requester.toLowerCase().includes(filters.requester!.toLowerCase()));
            }
            if (filters.requestType) {
                results = results.filter(r => r.requestType.toLowerCase().includes(filters.requestType!.toLowerCase()));
            }
        }

        if (filters?.limit) {
            results = results.slice(0, filters.limit);
        }

        return results;
    }

    // Talep istatistikleri
    static getRequestStats() {
        const total = mockRequests.length;
        const byStatus = mockRequests.reduce((acc, req) => {
            acc[req.status] = (acc[req.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return {
            total,
            byStatus,
            pending: byStatus['Onay Bekliyor'] || 0,
            approved: (byStatus['Talep Onaylı/İş Emri Açık'] || 0) + (byStatus['Talep Onaylı/İş Emri Kapatılmış'] || 0),
            completed: byStatus['Talep Onaylı/İş Emri Kapatılmış'] || 0,
            rejected: byStatus['Reddedilmiş'] || 0,
        };
    }

    // Envanter sorgulama
    static getInventory(filters?: {
        name?: string;
        category?: string;
        warehouse?: string;
        lowStockOnly?: boolean;
    }) {
        let results = [...mockMaterials];

        if (filters) {
            if (filters.name) {
                results = results.filter(m => m.name.toLowerCase().includes(filters.name!.toLowerCase()));
            }
            if (filters.category) {
                results = results.filter(m => m.category === filters.category);
            }
            if (filters.warehouse) {
                results = results.filter(m => m.warehouse === filters.warehouse);
            }
            if (filters.lowStockOnly) {
                results = results.filter(m => m.quantity < m.minStock);
            }
        }

        return results;
    }

    // Envanter istatistikleri
    static getInventoryStats() {
        const totalItems = mockMaterials.length;
        const totalValue = mockMaterials.reduce((sum, m) => sum + (m.quantity * m.unitPrice), 0);
        const lowStockCount = mockMaterials.filter(m => m.quantity < m.minStock).length;
        const byCategory = mockMaterials.reduce((acc, m) => {
            acc[m.category] = (acc[m.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return {
            totalItems,
            totalValue,
            lowStockCount,
            byCategory,
        };
    }

    // Varlık sorgulama
    static getAssets(filters?: {
        name?: string;
        category?: string;
        location?: string;
        maintenanceStatus?: string;
    }) {
        let results = [...mockAssets];

        if (filters) {
            if (filters.name) {
                results = results.filter(a => 
                    a.name.toLowerCase().includes(filters.name!.toLowerCase()) ||
                    a.code.toLowerCase().includes(filters.name!.toLowerCase())
                );
            }
            if (filters.category) {
                results = results.filter(a => a.category === filters.category);
            }
            if (filters.location) {
                results = results.filter(a => a.location === filters.location);
            }
            if (filters.maintenanceStatus) {
                results = results.filter(a => a.maintenanceStatus === filters.maintenanceStatus);
            }
        }

        return results;
    }

    // Varlık istatistikleri
    static getAssetStats() {
        const totalAssets = mockAssets.length;
        const totalValue = mockAssets.reduce((sum, a) => sum + a.currentValue, 0);
        const totalDepreciation = mockAssets.reduce((sum, a) => sum + (a.acquisitionPrice - a.currentValue), 0);
        const byCategory = mockAssets.reduce((acc, a) => {
            acc[a.category] = (acc[a.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        const byStatus = mockAssets.reduce((acc, a) => {
            acc[a.maintenanceStatus] = (acc[a.maintenanceStatus] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return {
            totalAssets,
            totalValue,
            totalDepreciation,
            byCategory,
            byStatus,
        };
    }

    // Dashboard istatistikleri
    static getDashboardStats() {
        const requestStats = this.getRequestStats();
        const inventoryStats = this.getInventoryStats();
        const assetStats = this.getAssetStats();

        return {
            requests: {
                total: requestStats.total,
                pending: requestStats.pending,
                completed: requestStats.completed,
            },
            inventory: {
                totalItems: inventoryStats.totalItems,
                lowStockCount: inventoryStats.lowStockCount,
                totalValue: inventoryStats.totalValue,
            },
            assets: {
                totalAssets: assetStats.totalAssets,
                totalValue: assetStats.totalValue,
            },
            users: 245, // Mock
            avgResolutionTime: '2.3 gün', // Mock
        };
    }

    // Malzeme arama (doğal dil)
    static searchMaterial(query: string) {
        const lowerQuery = query.toLowerCase();
        return mockMaterials.filter(m => 
            m.name.toLowerCase().includes(lowerQuery) ||
            m.category.toLowerCase().includes(lowerQuery) ||
            m.warehouse.toLowerCase().includes(lowerQuery)
        );
    }

    // Varlık arama (doğal dil)
    static searchAsset(query: string) {
        const lowerQuery = query.toLowerCase();
        return mockAssets.filter(a => 
            a.name.toLowerCase().includes(lowerQuery) ||
            a.code.toLowerCase().includes(lowerQuery) ||
            a.category.toLowerCase().includes(lowerQuery) ||
            a.location.toLowerCase().includes(lowerQuery)
        );
    }
}

