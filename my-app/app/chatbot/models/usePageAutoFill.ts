import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const JOB_TYPE_MAPPINGS: Record<string, string[]> = {
    'ARAÇ BAKIMI': ['araç', 'araba', 'lastik', 'motor', 'fren', 'bakım', 'sefer'],
    'ELEKTRİK': ['elektrik', 'lamba', 'priz', 'sigorta', 'ışık', 'karanlık', 'voltaj', 'şalter'],
    'MEKANİK': ['mekanik', 'klima', 'ısıtma', 'soğutma', 'kalorifer', 'musluk', 'su', 'boru', 'tesisat', 'asansör'],
    'İNŞAAT': ['duvar', 'boya', 'kapı', 'pencere', 'tavan', 'zemin', 'parke', 'kırık', 'dökük'],
    'BEYAZ EŞYA': ['buzdolabı', 'bulaşık', 'kahve', 'çay', 'makine', 'fırın'],
    'MOBİLYA TALEBİ': ['masa', 'sandalye', 'dolap', 'koltuk', 'perde', 'raf'],
    'BİLGİSAYAR VE YAZICI': ['bilgisayar', 'pc', 'laptop', 'yazıcı', 'toner', 'ekran', 'monitör', 'klavye', 'mouse'],
    'SİSTEM': ['sunucu', 'server', 'domain', 'hosting'],
    'AĞ YÖNETİMİ VE BİLGİ GÜVENLİĞİ': ['internet', 'wifi', 'bağlantı', 'network', 'ağ', 'yavaş', 'kopuyor'],
    'YAZILIM': ['yazılım', 'program', 'uygulama', 'hata', 'açılmıyor', 'lisans'],
    'PARK VE BAHÇE': ['bahçe', 'çim', 'ağaç', 'sulama', 'çiçek', 'peyzaj'],
    'SES VE GÖRÜNTÜ': ['projeksiyon', 'mikrofon', 'hoparlör', 'ses', 'kamera'],
    'TELEFON İŞLERİ': ['telefon', 'dahili', 'hat', 'ahize'],
    'YÜK TAŞIMA': ['nakliye', 'taşıma', 'yük', 'koltuk taşıma'],
    'TEMİZLİK': ['temizlik', 'kirli', 'pis', 'çöp', 'leke', 'süpür', 'hijyen', 'toz', 'temizle'],
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

export const usePageAutoFill = (
    setFormData: React.Dispatch<React.SetStateAction<any>>
) => {
    const searchParams = useSearchParams();

    useEffect(() => {
        const incomingDesc = searchParams.get('desc');

        if (incomingDesc) {
            let detectedJobType = '';
            const lowerDesc = incomingDesc.toLocaleLowerCase('tr');

            // 1. İş Tipi Tahmini
            for (const [jobType, keywords] of Object.entries(JOB_TYPE_MAPPINGS)) {
                if (keywords.some((keyword) => lowerDesc.includes(keyword))) {
                    detectedJobType = jobType;
                    break;
                }
            }

            // 2. Rastgele Kurumsal Şablon Seçimi
            const randomIntro = FORMAL_INTRODUCTIONS[Math.floor(Math.random() * FORMAL_INTRODUCTIONS.length)];
            const randomClosing = FORMAL_CLOSINGS[Math.floor(Math.random() * FORMAL_CLOSINGS.length)];

            // Açıklamayı resmi formata dönüştür
            const formattedDescription = `${randomIntro}\n\nTalep Detayı: "${incomingDesc}"\n\n${randomClosing}`;

            // 3. Akıllı Başlık Oluşturma (SADELEŞTİRİLDİ)
            // Kullanıcının yazdığı "Odam kirli" gibi cümleleri başlığa kopyalamıyoruz.
            // Sadece kategoriyi kullanarak temiz ve resmi bir başlık oluşturuyoruz.
            let smartTitle = '';

            if (detectedJobType) {
                // Örnek Çıktı: "Temizlik Hizmet Talebi" veya "Araç Bakımı Hizmet Talebi"
                smartTitle = `${toTitleCase(detectedJobType)} Hizmet Talebi`;
            } else {
                // Kategori bulunamazsa
                smartTitle = "Genel Destek Talebi";
            }

            // 4. State Güncelleme
            setFormData((prev: any) => {
                // Eğer açıklama zaten formatlanmışsa tekrar ekleme yapma (sonsuz döngü koruması)
                if (prev.requestDescription.includes("Sayın İlgili") || prev.requestDescription.includes("Merhabalar,")) return prev;

                return {
                    ...prev,
                    requestDescription: formattedDescription,
                    requestTitle: prev.requestTitle || smartTitle,
                    jobType: detectedJobType || prev.jobType
                };
            });
        }
    }, [searchParams, setFormData]);
};