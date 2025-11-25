# 🤖 VYS Chatbot - Gelişmiş AI Asistan

## Özellikler

### 🎯 Temel Özellikler
- **Akıllı Intent Tanıma**: Doğal dil işleme ile kullanıcı niyetini anlama
- **Entity Extraction**: Lokasyon, eşya, durum gibi bilgileri otomatik çıkarma
- **Context Awareness**: Konuşma geçmişini takip ederek daha akıllı yanıtlar
- **Çoklu Konuşma Desteği**: Konuşma geçmişi ile bağlam korunur

### 📊 Veri Sorgulama
- **Talep Sorgulama**: "Taleplerimi göster", "Kaç talep var?" gibi sorgular
- **Envanter Sorgulama**: "Düşük stok var mı?", "Kalem var mı?" gibi sorgular
- **Varlık Sorgulama**: "Bilgisayar nerede?", "Araçların durumu?" gibi sorgular
- **İstatistik Sorgulama**: Dashboard bilgilerini sorgulama

### 🚀 Otomasyonlar
- **Otomatik Form Doldurma**: Chatbot'dan gelen bilgilerle formları otomatik doldurma
- **Akıllı Yönlendirme**: Kullanıcı niyetine göre doğru sayfaya yönlendirme
- **Öncelik Tespiti**: Acil talepleri otomatik tespit etme
- **Lokasyon Çıkarımı**: Metinden lokasyon bilgisini çıkarma

### 💬 Kullanıcı Deneyimi
- **Akıllı Öneriler**: Her mesajdan sonra ilgili öneriler
- **Quick Actions**: Hızlı işlem butonları
- **Rich Messages**: Formatlanmış mesajlar ve emojiler
- **Typing Indicators**: Gerçekçi yazma animasyonları

## Kullanım Örnekleri

### Talep Oluşturma
```
Kullanıcı: "Klima bozuldu"
Bot: "Arıza durumunu anladım. Teknik ekibe iletmek için form sayfasına yönlendiriyorum."
→ Arıza talebi formu açılır ve otomatik doldurulur
```

### Sorgulama
```
Kullanıcı: "Taleplerimi göster"
Bot: "10 toplam talep var. 3 beklemede, 5 tamamlanmış..."
→ Talepler sayfasına yönlendirilir
```

### Envanter Sorgulama
```
Kullanıcı: "Düşük stok var mı?"
Bot: "4 malzeme düşük stokta. Toplam değer: ₺125,000..."
→ Envanter sayfasına yönlendirilir
```

## Teknik Detaylar

### Dosya Yapısı
```
app/chatbot/
├── models/
│   ├── AIModel.ts          # Ana AI modeli
│   └── usePageAutoFill.ts  # Otomatik form doldurma
├── services/
│   └── DataService.ts      # Veri sorgulama servisi
└── utils/
    └── chatHelpers.ts      # Yardımcı fonksiyonlar
```

### Intent'ler
- `greeting` - Selamlaşma
- `ariza` - Arıza talebi
- `temizlik` - Temizlik talebi
- `malzeme` - Malzeme talebi
- `sehir-disi` - Şehir dışı araç
- `sehir-ici` - Şehir içi araç
- `talep-sorgula` - Talep sorgulama
- `envanter-sorgula` - Envanter sorgulama
- `istatistik` - İstatistik sorgulama
- `varlik-sorgula` - Varlık sorgulama
- `yeni-is` - Yeni iş talebi
- `yardim` - Yardım
- `tesekkur` - Teşekkür

### Entity Tipleri
- `request_type` - Talep türü
- `location` - Lokasyon
- `item` - Eşya/Malzeme
- `status` - Durum
- `date` - Tarih
- `number` - Sayı
- `person` - Kişi

## Geliştirme

### Yeni Intent Ekleme
```typescript
{
    id: 'yeni-intent',
    label: 'Yeni Intent',
    route: '/route',
    action: 'navigate',
    keywords: [
        { word: 'anahtar', weight: 1.0 }
    ],
    responses: [
        "Yanıt metni"
    ]
}
```

### Veri Servisi Kullanımı
```typescript
import { DataService } from './services/DataService';

// Talep sorgulama
const requests = DataService.getRequests({ status: 'Onay Bekliyor' });

// Envanter sorgulama
const materials = DataService.getInventory({ lowStockOnly: true });

// İstatistikler
const stats = DataService.getDashboardStats();
```

## Performans

- **Hızlı Yanıt**: Ortalama 800ms yanıt süresi
- **Hafif**: Minimal bundle size
- **Ölçeklenebilir**: Yeni intent'ler kolayca eklenebilir
- **Cache**: Konuşma geçmişi cache'lenir

## Gelecek Geliştirmeler

- [ ] Machine Learning entegrasyonu
- [ ] Çoklu dil desteği (EN/TR)
- [ ] Sesli komut desteği
- [ ] Görsel analiz (fotoğraf yükleme)
- [ ] Backend API entegrasyonu
- [ ] Kullanıcı öğrenme (kişiselleştirme)

