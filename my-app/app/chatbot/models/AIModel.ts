// Basitleştirilmiş AI Modeli - Sadece 5 çalışan case için

import { DataService } from '../services/DataService';

export interface Intent {
    id: string;
    label: string;
    route: string;
    keywords: string[];
    response: string;
}

export interface Prediction {
    intent: Intent | null;
    score: number;
    data?: any;
}

// Sadece 5 çalışan case
const MODEL_DATA: Intent[] = [
    {
        id: 'ariza',
        label: 'Arıza Talebi',
        route: '/pages/ariza',
        keywords: ['klima bozuldu', 'bilgisayar bozuldu', 'yazıcı bozuldu', 'klima çalışmıyor', 'bilgisayar çalışmıyor', 'arıza', 'bozuk', 'bozuldu', 'çalışmıyor', 'tamir'],
        response: '🔧 Arıza durumunu anladım! Arıza talep formunu açıyorum...'
    },
    {
        id: 'malzeme',
        label: 'Malzeme Talebi',
        route: '/pages/malzeme',
        keywords: ['kalem lazım', 'toner bitti', 'kağıt lazım', 'malzeme', 'kalem', 'toner', 'kağıt', 'kartuş', 'lazım', 'ihtiyaç'],
        response: '📦 Malzeme talebinizi oluşturuyorum. Malzeme talep formunu açıyorum...'
    },
    {
        id: 'talep-sorgula',
        label: 'Talep Sorgulama',
        route: '/requests',
        keywords: ['taleplerimi göster', 'taleplerim', 'talepler', 'kaç talep', 'durum', 'beklemede'],
        response: '📋 Taleplerinizi görüntülüyorum...'
    },
    {
        id: 'envanter-sorgula',
        label: 'Envanter Sorgulama',
        route: '/inventory',
        keywords: ['envanter durumu', 'düşük stok', 'stok durumu', 'envanter', 'stok', 'malzeme var mı'],
        response: '📦 Envanter bilgilerini görüntülüyorum...'
    },
    {
        id: 'istatistik',
        label: 'İstatistik',
        route: '/dashboard',
        keywords: ['istatistik', 'istatistikler', 'dashboard', 'rapor', 'özet', 'kaç tane'],
        response: '📊 İstatistikleri görüntülüyorum...'
    },
    {
        id: 'sehir-ici-arac',
        label: 'Şehir İçi Araç Talebi',
        route: '/pages/arac/sehir-ici-arac',
        keywords: [
            'kızılay\'a araç istiyorum', 'kızılay\'a araç', 'kızılay araç istiyorum', 'kızılay araç',
            'çankaya\'ya araç istiyorum', 'çankaya\'ya araç', 'çankaya araç istiyorum', 'çankaya araç',
            'balgat\'a araç istiyorum', 'balgat\'a araç', 'balgat araç istiyorum', 'balgat araç',
            'sıhhiye\'ye araç istiyorum', 'sıhhiye\'ye araç', 'sıhhiye araç istiyorum', 'sıhhiye araç',
            'şehir içi araç istiyorum', 'şehir içi araç', 'ankara içi araç istiyorum', 'ankara içi araç',
            'ankara\'ya araç istiyorum', 'ankara\'da araç istiyorum', 'ankara araç istiyorum', 'ankara araç',
            'şehir içi', 'ankara içi', 'servis araç', 'servis araç istiyorum',
            'araç istiyorum kızılay', 'araç istiyorum çankaya', 'araç istiyorum balgat'
        ],
        response: '🚙 Şehir içi araç talebinizi oluşturuyorum. Ankara içi ulaşım için şehir içi araç talep formunu açıyorum...\n\n📍 Ankara içi popüler güzergahlar:\n• Kızılay - Bakanlık Binası\n• Çankaya - Genel Müdürlük\n• Balgat - Merkez Ofis\n• Sıhhiye - Hizmet Binası'
    },
    {
        id: 'sehir-disi-arac',
        label: 'Şehir Dışı Araç Talebi',
        route: '/pages/arac/sehir-disi-arac',
        keywords: [
            'istanbul\'a araç istiyorum', 'istanbul\'a araç', 'istanbul araç istiyorum', 'istanbul araç',
            'izmir\'e araç istiyorum', 'izmir\'e araç', 'izmir araç istiyorum', 'izmir araç',
            'antalya\'ya araç istiyorum', 'antalya\'ya araç', 'antalya araç istiyorum', 'antalya araç',
            'bursa\'ya araç istiyorum', 'bursa\'ya araç', 'bursa araç istiyorum', 'bursa araç',
            'konya\'ya araç istiyorum', 'konya\'ya araç', 'konya araç istiyorum', 'konya araç',
            'şehir dışı araç istiyorum', 'şehir dışı araç', 'şehir dışı', 'seyahat araç', 'uzun yol araç',
            'seyahat araç istiyorum', 'uzun yol araç istiyorum'
        ],
        response: '🚗 Şehir dışı araç talebinizi oluşturuyorum. Türkiye illeri arası seyahat için şehir dışı araç talep formunu açıyorum...\n\n🗺️ Popüler şehir dışı rotalar:\n• Ankara - İstanbul (454 km)\n• Ankara - İzmir (583 km)\n• Ankara - Antalya (544 km)\n• Ankara - Bursa (384 km)\n• Ankara - Konya (258 km)'
    },
    {
        id: 'yeni-is',
        label: 'Yeni İş Talebi',
        route: '/pages/is',
        keywords: [
            'yeni iş talebi', 'yeni iş istiyorum', 'yeni iş', 'iş talebi', 'iş istiyorum',
            'proje talebi', 'proje istiyorum', 'yeni proje', 'proje başlat',
            'iş başlat', 'yeni görev', 'görev talebi', 'görev istiyorum',
            'yeni iş oluştur', 'iş oluştur', 'iş aç', 'yeni iş aç'
        ],
        response: '💼 Yeni iş talebinizi oluşturuyorum. Proje veya görev başlatmak için yeni iş talep formunu açıyorum...\n\n📋 Yeni iş talebi için gerekli bilgiler:\n• İş Tipi\n• Talep Başlığı\n• Varlık Kodu\n• Talep Açıklaması'
    },
    {
        id: 'temizlik',
        label: 'Temizlik Talebi',
        route: '/pages/temizlik',
        keywords: [
            'temizlik talebi', 'temizlik istiyorum', 'temizlik lazım', 'temizlik yap',
            'oda kirli', 'oda temizle', 'ofis temizle', 'ofis temizlik',
            'temizlik yapılması lazım', 'temizlik yapılması gerekiyor', 'temizlik yapılması istiyorum',
            'çöp toplama', 'çöp topla', 'hijyen', 'hijyen talebi',
            'kirli', 'pis', 'temizle', 'temizlik personeli'
        ],
        response: '🧹 Temizlik talebinizi oluşturuyorum. Temizlik personelini yönlendirmek için temizlik talep formunu açıyorum...\n\n🧽 Temizlik hizmetleri:\n• Ofis temizliği\n• Oda temizliği\n• Çöp toplama\n• Hijyen hizmetleri'
    }
];

export class ChatModel {
    private threshold = 0.1; // Çok düşük threshold

    predict(userInput: string): Prediction {
        const lowerInput = userInput.toLocaleLowerCase('tr').trim();
        let bestIntent: Intent | null = null;
        let highestScore = 0;
        let queryData: any = null;

        // Her intent için skor hesapla
        for (const intent of MODEL_DATA) {
            let score = 0;
            
            // Keyword eşleşmesi
            for (const keyword of intent.keywords) {
                if (lowerInput.includes(keyword)) {
                    // Uzun keyword'ler daha yüksek skor
                    // Şehir içi araç için özel keyword'ler daha yüksek skor
                    if (intent.id === 'sehir-ici-arac') {
                        // Yer isimleri + araç kombinasyonları çok yüksek skor
                        if (keyword.includes('araç istiyorum') || keyword.includes('\'a araç') || keyword.includes('\'ye araç')) {
                            score += 5.0; // Çok yüksek öncelik
                        } else if (keyword.length > 8) {
                            score += 3.0; // Uzun keyword'ler
                        } else {
                            score += 2.0; // Normal keyword'ler
                        }
                    } else {
                        score += keyword.length > 5 ? 2.0 : 1.0;
                    }
                }
            }

            if (score > highestScore) {
                highestScore = score;
                bestIntent = intent;
            }
        }

        // Eğer intent bulunduysa, query intent'ler için veri çek
        if (bestIntent && ['talep-sorgula', 'envanter-sorgula', 'istatistik'].includes(bestIntent.id)) {
            try {
                if (bestIntent.id === 'talep-sorgula') {
                    const requests = DataService.getRequests({ limit: 5 });
                    const stats = DataService.getRequestStats();
                    queryData = {
                        requests,
                        summary: `${stats.total} toplam talep var. ${stats.pending} beklemede, ${stats.completed} tamamlanmış.`
                    };
                } else if (bestIntent.id === 'envanter-sorgula') {
                    const materials = DataService.getInventory({ lowStockOnly: lowerInput.includes('düşük') });
                    const stats = DataService.getInventoryStats();
                    queryData = {
                        materials,
                        summary: `${stats.totalItems} malzeme var. ${stats.lowStockCount} düşük stokta. Toplam değer: ₺${stats.totalValue.toLocaleString('tr-TR')}`
                    };
                } else if (bestIntent.id === 'istatistik') {
                    const stats = DataService.getDashboardStats();
                    queryData = {
                        summary: `📊 Sistem Özeti:\n• ${stats.requests.total} toplam talep\n• ${stats.requests.pending} beklemede\n• ${stats.inventory.totalItems} malzeme çeşidi\n• ${stats.assets.totalAssets} varlık\n• ${stats.users} kullanıcı`
                    };
                }
            } catch (error) {
                console.error('Data query error:', error);
            }
        }

        // Eğer skor çok düşükse, intent bulunamadı
        if (highestScore < this.threshold) {
            return { intent: null, score: highestScore };
        }

        return {
            intent: bestIntent,
            score: highestScore,
            data: queryData
        };
    }

    getResponse(intent: Intent, data?: any, userInput?: string): string {
        let response = intent.response;
        
        // Şehir içi araç için dinamik response
        if (intent.id === 'sehir-ici-arac' && userInput) {
            const lowerInput = userInput.toLocaleLowerCase('tr');
            const locations: { [key: string]: string } = {
                'kızılay': 'Kızılay - Bakanlık Binası',
                'çankaya': 'Çankaya - Genel Müdürlük',
                'balgat': 'Balgat - Merkez Ofis',
                'sıhhiye': 'Sıhhiye - Hizmet Binası'
            };
            
            // Hangi yer belirtilmiş?
            for (const [key, value] of Object.entries(locations)) {
                if (lowerInput.includes(key)) {
                    response = `🚙 ${value} için şehir içi araç talebinizi oluşturuyorum. Şehir içi araç talep formunu açıyorum...\n\n📍 Güzergah: ${value}`;
                    break;
                }
            }
        }
        
        // Şehir dışı araç için dinamik response
        if (intent.id === 'sehir-disi-arac' && userInput) {
            const lowerInput = userInput.toLocaleLowerCase('tr');
            const cities: { [key: string]: { name: string; distance: string } } = {
                'istanbul': { name: 'İstanbul', distance: '454 km' },
                'izmir': { name: 'İzmir', distance: '583 km' },
                'antalya': { name: 'Antalya', distance: '544 km' },
                'bursa': { name: 'Bursa', distance: '384 km' },
                'konya': { name: 'Konya', distance: '258 km' }
            };
            
            // Hangi şehir belirtilmiş?
            for (const [key, cityInfo] of Object.entries(cities)) {
                if (lowerInput.includes(key)) {
                    response = `🚗 ${cityInfo.name} için şehir dışı araç talebinizi oluşturuyorum. Şehir dışı araç talep formunu açıyorum...\n\n🗺️ Rota: Ankara - ${cityInfo.name} (${cityInfo.distance})`;
                    break;
                }
            }
        }
        
        // Query intent'ler için veri ekle
        if (data && data.summary) {
            response += `\n\n${data.summary}`;
            
            // Detaylı liste ekle
            if (intent.id === 'talep-sorgula' && data.requests && data.requests.length > 0) {
                response += `\n\n📋 Son ${Math.min(3, data.requests.length)} talep:\n`;
                data.requests.slice(0, 3).forEach((req: any, idx: number) => {
                    response += `${idx + 1}. ${req.requestType} - ${req.status}\n`;
                });
            }
            
            if (intent.id === 'envanter-sorgula' && data.materials && data.materials.length > 0) {
                response += `\n\n📦 Düşük stok malzemeler:\n`;
                data.materials.slice(0, 3).forEach((mat: any, idx: number) => {
                    response += `${idx + 1}. ${mat.name} - ${mat.quantity} ${mat.unit}\n`;
                });
            }
        }
        
        return response;
    }
}
