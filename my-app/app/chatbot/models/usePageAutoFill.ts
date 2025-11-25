import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// Genişletilmiş İş Tipi Eşleştirmeleri
const JOB_TYPE_MAPPINGS: Record<string, string[]> = {
    'ARAÇ BAKIMI': ['araç', 'araba', 'lastik', 'motor', 'fren', 'bakım', 'sefer', 'araç bakımı', 'araba bakımı', 'araç tamiri'],
    'ELEKTRİK': ['elektrik', 'lamba', 'priz', 'sigorta', 'ışık', 'karanlık', 'voltaj', 'şalter', 'elektrik arızası', 'elektrik tamiri', 'ampul', 'led'],
    'MEKANİK': ['mekanik', 'klima', 'ısıtma', 'soğutma', 'kalorifer', 'musluk', 'su', 'boru', 'tesisat', 'asansör', 'klima bozuldu', 'klima tamiri', 'su kaçağı', 'kalorifer çalışmıyor'],
    'İNŞAAT': ['duvar', 'boya', 'kapı', 'pencere', 'tavan', 'zemin', 'parke', 'kırık', 'dökük', 'boyama', 'tamir', 'onarım'],
    'BEYAZ EŞYA': ['buzdolabı', 'bulaşık', 'kahve', 'çay', 'makine', 'fırın', 'bulaşık makinesi', 'kahve makinesi', 'çay makinesi'],
    'MOBİLYA TALEBİ': ['masa', 'sandalye', 'dolap', 'koltuk', 'perde', 'raf', 'mobilya', 'sandalye kırık', 'masa bozuk'],
    'BİLGİSAYAR VE YAZICI': ['bilgisayar', 'pc', 'laptop', 'yazıcı', 'toner', 'ekran', 'monitör', 'klavye', 'mouse', 'bilgisayar bozuldu', 'yazıcı çalışmıyor', 'yazıcı arızası'],
    'SİSTEM': ['sunucu', 'server', 'domain', 'hosting', 'sunucu arızası'],
    'AĞ YÖNETİMİ VE BİLGİ GÜVENLİĞİ': ['internet', 'wifi', 'bağlantı', 'network', 'ağ', 'yavaş', 'kopuyor', 'internet kesik', 'wifi çalışmıyor', 'ağ sorunu'],
    'YAZILIM': ['yazılım', 'program', 'uygulama', 'hata', 'açılmıyor', 'lisans', 'yazılım hatası'],
    'PARK VE BAHÇE': ['bahçe', 'çim', 'ağaç', 'sulama', 'çiçek', 'peyzaj', 'bahçe bakımı'],
    'SES VE GÖRÜNTÜ': ['projeksiyon', 'mikrofon', 'hoparlör', 'ses', 'kamera', 'projeksiyon çalışmıyor'],
    'TELEFON İŞLERİ': ['telefon', 'dahili', 'hat', 'ahize', 'telefon arızası'],
    'YÜK TAŞIMA': ['nakliye', 'taşıma', 'yük', 'koltuk taşıma'],
    'TEMİZLİK': ['temizlik', 'kirli', 'pis', 'çöp', 'leke', 'süpür', 'hijyen', 'toz', 'temizle', 'oda kirli', 'temizlik lazım'],
};

// Kurumsal Giriş Cümleleri (Random seçilecek)
const FORMAL_INTRODUCTIONS = [
    "Sayın İlgili,\n\n",
    "Merhabalar,\n\nKonu hakkında destek talep etmekteyim.",
    "İlgili Birimin Dikkatine,\n\nTalebimin işleme alınmasını talep etmekteyim."
];

// Kurumsal Kapanış Cümleleri (Random seçilecek)
const FORMAL_CLOSINGS = [
    "Konuyla ilgili yardımlarınızı bekler, iyi çalışmalar dilerim.",
    "Desteğiniz için teşekkürler.\nİyi çalışmalar."
];

// Başlıkları düzeltmek için yardımcı fonksiyon (İlk harfleri büyütür)
const toTitleCase = (str: string) => {
    return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
};

// Lokasyon çıkarımı
const extractLocation = (text: string): string => {
    const lowerText = text.toLocaleLowerCase('tr');
    const locations = [
        'ankara', 'istanbul', 'izmir', 'antalya', 'bursa',
        'kızılay', 'çankaya', 'balgat', 'ulus', 'batıkent',
        'yazılım dairesi', 'idari hizmetler', 'garaj', 'genel ofis',
        'toplantı odası', 'mutfak', 'sunucu odası'
    ];
    
    for (const loc of locations) {
        if (lowerText.includes(loc)) {
            return loc;
        }
    }
    return '';
};

// Öncelik tespiti
const detectPriority = (text: string): string => {
    const lowerText = text.toLocaleLowerCase('tr');
    if (lowerText.includes('acil') || lowerText.includes('hemen') || lowerText.includes('çok önemli')) {
        return 'YÜKSEK';
    }
    if (lowerText.includes('önemli') || lowerText.includes('hızlı')) {
        return 'ORTA';
    }
    return 'NORMAL';
};

export const usePageAutoFill = (
    setFormData: React.Dispatch<React.SetStateAction<any>>
) => {
    const searchParams = useSearchParams();

    useEffect(() => {
        const incomingDesc = searchParams.get('desc');

        if (incomingDesc) {
            let detectedJobType = '';
            const lowerDesc = incomingDesc.toLocaleLowerCase('tr');

            // 1. İş Tipi Tahmini (En yüksek skorlu eşleşme)
            let bestMatch = { type: '', score: 0 };
            for (const [jobType, keywords] of Object.entries(JOB_TYPE_MAPPINGS)) {
                const matchCount = keywords.filter(keyword => lowerDesc.includes(keyword)).length;
                if (matchCount > bestMatch.score) {
                    bestMatch = { type: jobType, score: matchCount };
                }
            }
            detectedJobType = bestMatch.type;

            // 2. Lokasyon çıkarımı
            const detectedLocation = extractLocation(incomingDesc);

            // 3. Öncelik tespiti
            const detectedPriority = detectPriority(incomingDesc);

            // 4. Rastgele Kurumsal Şablon Seçimi
            const randomIntro = FORMAL_INTRODUCTIONS[Math.floor(Math.random() * FORMAL_INTRODUCTIONS.length)];
            const randomClosing = FORMAL_CLOSINGS[Math.floor(Math.random() * FORMAL_CLOSINGS.length)];

            // Açıklamayı resmi formata dönüştür
            const formattedDescription = `${randomIntro}\n\nTalep Detayı: "${incomingDesc}"\n\n${randomClosing}`;

            // 5. Akıllı Başlık Oluşturma
            let smartTitle = '';
            if (detectedJobType) {
                smartTitle = `${toTitleCase(detectedJobType)} Hizmet Talebi`;
            } else {
                smartTitle = "Genel Destek Talebi";
            }

            // 6. State Güncelleme
            setFormData((prev: any) => {
                // Eğer açıklama zaten formatlanmışsa tekrar ekleme yapma (sonsuz döngü koruması)
                if (prev.requestDescription && (
                    prev.requestDescription.includes("Sayın İlgili") || 
                    prev.requestDescription.includes("Merhabalar,") ||
                    prev.requestDescription.includes("Talep Detayı:")
                )) {
                    return prev;
                }

                return {
                    ...prev,
                    requestDescription: formattedDescription,
                    requestTitle: prev.requestTitle || smartTitle,
                    jobType: detectedJobType || prev.jobType,
                    location: detectedLocation || prev.location,
                    priority: detectedPriority || prev.priority || 'NORMAL',
                    // Ekstra alanlar varsa doldur
                    ...(detectedLocation && { location: detectedLocation }),
                };
            });
        }
    }, [searchParams, setFormData]);
};