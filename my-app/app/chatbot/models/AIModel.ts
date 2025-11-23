// Kural Tabanlı (Rule-Based)

export interface Intent {
    id: string;
    label: string;
    route: string | null;
    keywords: {
        word: string;
        weight: number; // 1.0 = Kesin, 0.5 = İpucu
    }[];
    responses: string[];
}

export interface Prediction {
    intent: Intent | null;
    score: number;
    entities: string[];
}

// 2. EĞİTİLMİŞ VERİ SETİ (Genişletilmiş)
const MODEL_DATA: Intent[] = [
    // --- SELAMLAŞMA ---
    {
        id: 'greeting',
        label: 'Selamlaşma',
        route: null,
        keywords: [
            { word: 'merhaba', weight: 1.0 }, { word: 'selam', weight: 1.0 },
            { word: 'günaydın', weight: 0.9 }, { word: 'nasılsın', weight: 0.9 },
            { word: 'naber', weight: 0.8 }, { word: 'kolay gelsin', weight: 0.8 }
        ],
        responses: [
            "Merhaba! Size nasıl yardımcı olabilirim? Bir arıza veya talep bildirebilirsiniz.",
            "Selamlar! Varlık Yönetim Sistemi asistanıyım. Bugün ne işlem yapacağız?"
        ]
    },

    // --- ARIZA TALEBİ ---
    {
        id: 'ariza',
        label: 'Arıza Talebi',
        route: '/pages/ariza', // Router'daki path ile aynı olmalı
        keywords: [
            { word: 'bozuk', weight: 1.0 }, { word: 'arıza', weight: 1.0 },
            { word: 'ariza', weight: 1.0 }, { word: 'çalışmıyor', weight: 1.0 },
            { word: 'tamir', weight: 0.9 }, { word: 'kırık', weight: 0.9 },
            { word: 'kırıldı', weight: 0.9 }, { word: 'hata veriyor', weight: 0.8 },
            { word: 'bozuldu', weight: 1.0 }, { word: 'ses geliyor', weight: 0.6 },
            { word: 'klima', weight: 0.5 }, { word: 'bilgisayar', weight: 0.5 } // Bağlamı güçlendirmek için
        ],
        responses: [
            "Arıza durumunu anladım. Teknik ekibe iletmek için form sayfasına yönlendiriyorum.",
            "Bu arızayı hemen kayda alalım. Sizi ilgili sayfaya alıyorum."
        ]
    },

    {
        id: 'temizlik',
        label: 'Temizlik Talebi',
        route: '/pages/temizlik',
        keywords: [
            { word: 'temizlik', weight: 1.0 }, { word: 'kirli', weight: 1.0 },
            { word: 'pis', weight: 1.0 }, { word: 'temizle', weight: 1.0 },
            { word: 'hijyen', weight: 0.9 }, { word: 'çöp', weight: 0.9 },
            { word: 'leke', weight: 0.8 }, { word: 'toz', weight: 0.7 },
            { word: 'süpür', weight: 0.8 }, { word: 'paspas', weight: 0.8 },
            { word: 'kokuyor', weight: 0.7 }
        ],
        responses: [
            "Temizlik personelini yönlendirmek için talep oluşturuyorum.",
            "Hijyen talebinizi aldım, detayları girmek için temizlik sayfasına gidiyoruz.",
            "Odayı hemen temizletelim. Form sayfasına yönlendiriyorum."
        ]
    },

    // --- MALZEME TALEBİ ---
    {
        id: 'malzeme',
        label: 'Malzeme Talebi',
        route: '/pages/malzeme',
        keywords: [
            { word: 'malzeme', weight: 1.0 }, { word: 'lazım', weight: 0.6 },
            { word: 'ihtiyaç', weight: 0.6 }, { word: 'kalem', weight: 0.9 },
            { word: 'kağıt', weight: 0.9 }, { word: 'toner', weight: 1.0 },
            { word: 'kartuş', weight: 1.0 }, { word: 'stok', weight: 0.7 },
            { word: 'bitti', weight: 0.5 }, { word: 'tükenmez', weight: 0.8 }
        ],
        responses: [
            "Depo stok talebi için yönlendiriyorum.",
            "Eksik malzemeleri tamamlayalım. Talep ekranına alıyorum sizi."
        ]
    },

    // --- ARAÇ TALEPLERİ ---
    {
        id: 'sehir-disi',
        label: 'Şehir Dışı Araç',
        route: '/pages/arac/sehir-disi-arac',
        keywords: [
            { word: 'şehir dışı', weight: 1.1 },
            { word: 'seyahat', weight: 1.0 },
            { word: 'görev', weight: 0.7 },
            { word: 'uzun yol', weight: 1.0 },
            { word: 'istanbul', weight: 0.5 },
            { word: 'izmir', weight: 0.5 },
            { word: 'antalya', weight: 0.5 }
            // Ankara buradan kaldırıldı
        ],
        responses: [
            "Seyahat planlaması için şehir dışı araç talep ekranına yönlendiriyorum.",
            "İyi yolculuklar dilerim şimdiden, araç talebini oluşturalım."
        ]
    },
    {
        id: 'sehir-ici',
        label: 'Şehir İçi Araç',
        route: '/pages/arac/sehir-ici-arac',
        keywords: [
            // Genel Terimler
            { word: 'şehir içi', weight: 1.1 },
            { word: 'servis', weight: 1.0 },
            { word: 'transfer', weight: 0.9 },
            { word: 'bırakır', weight: 0.6 },
            { word: 'yakın', weight: 0.5 },

            // Ankara Merkez ve Semtler (Yüksek Ağırlık)
            { word: 'ankara', weight: 1.0 },
            { word: 'merkez', weight: 0.8 },
            { word: 'kızılay', weight: 1.0 },
            { word: 'çankaya', weight: 1.0 },
            { word: 'balgat', weight: 1.0 },
            { word: 'ulus', weight: 1.0 },
            { word: 'batıkent', weight: 1.0 },
            { word: 'ümitköy', weight: 1.0 },
            { word: 'çayyolu', weight: 1.0 },
            { word: 'keçiören', weight: 1.0 },
            { word: 'yenimahalle', weight: 1.0 },
            { word: 'mamak', weight: 1.0 },
            { word: 'gölbaşı', weight: 1.0 },
            { word: 'etimesgut', weight: 1.0 },
            { word: 'sincan', weight: 1.0 },
            { word: 'pursaklar', weight: 1.0 },
            { word: 'altındağ', weight: 1.0 },
            { word: 'incek', weight: 1.0 }
        ],
        responses: [
            "Şehir içi ulaşım veya Ankara içi transfer için araç ayarlayalım. Yönlendiriyorum...",
            "Lokasyon kaydı için talep oluşturuyorum."
        ]
    }
];

export class ChatModel {
    private threshold: number;

    constructor(threshold = 0.3) {
        this.threshold = threshold;
    }

    predict(userInput: string): Prediction {
        const lowerInput = userInput.toLocaleLowerCase('tr'); // Türkçe karakter desteği
        let bestIntent: Intent | null = null;
        let highestScore = 0;

        for (const intent of MODEL_DATA) {
            let currentScore = 0;

            // Kelime analizi
            for (const kw of intent.keywords) {
                if (lowerInput.includes(kw.word)) {
                    currentScore += kw.weight;
                }
            }

            // Skoru normalize et (Max 1.0 olacak şekilde sınırla)
            // Eğer çok fazla kelime eşleşirse 1'i geçebilir, bunu engelliyoruz.
            currentScore = Math.min(currentScore, 1.0);

            if (currentScore > highestScore) {
                highestScore = currentScore;
                bestIntent = intent;
            }
        }

        if (highestScore < this.threshold) {
            return { intent: null, score: highestScore, entities: [] };
        }

        return {
            intent: bestIntent,
            score: highestScore,
            entities: []
        };
    }

    getRandomResponse(intent: Intent): string {
        const randomIndex = Math.floor(Math.random() * intent.responses.length);
        return intent.responses[randomIndex];
    }
}