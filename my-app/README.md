# VYS - Kurumsal Varlık Yönetim Sistemi (Corporate Asset Management System)

Kurumsal Varlık Yönetim Sistemi (VYS), kurumların talepler, envanter, insan kaynakları ve varlıklar gibi önemli kaynakları verimli bir şekilde yönetmek için tasarlanmış modern bir Next.js uygulamasıdır.

**VYS - Corporate Asset Management System** is a modern Next.js application designed to help organizations efficiently manage important resources such as requests, inventory, human resources, and assets.

## 🚀 Özellikler / Features

### Temel Modüller / Core Modules:

1. **Yönetim Paneli (Dashboard)** 📊
   - Gerçek zamanlı istatistikler ve özet bilgiler
   - Son talepler ve hızlı erişim linkler
   - Sistem durumu ve destek bilgileri
   - Real-time statistics and summary information
   - Recent requests and quick access links
   - System status and support information

2. **Talep Yönetimi (Request Management)** 📋
   - Arıza taleplerini oluştur ve takip et
   - Malzeme talepleri
   - Araç taleplerini (şehir içi/dışı) yönet
   - Temizlik ve yeni iş taleplerini işle
   - İleri filtreleme ve sıralama
   - Create and track failure requests
   - Material requests
   - Manage vehicle requests (in-city/out-of-city)
   - Process cleaning and new work requests
   - Advanced filtering and sorting

3. **Envanter Yönetimi (Inventory Management)** 📦
   - Malzeme stok yönetimi
   - Depo yönetimi
   - Düşük stok uyarıları
   - Malzeme kategorize etme
   - Birim fiyat ve toplam değer hesaplaması
   - Material stock management
   - Warehouse management
   - Low stock alerts
   - Material categorization
   - Unit price and total value calculations

4. **İnsan Kaynakları (Human Resources)** 👥
   - Çalışan yönetimi
   - Departman ve pozisyon tarafından filtreleme
   - Maaş yönetimi
   - İstihdamçalıştırmız tarihi takibi
   - Çalışan durumu (Aktif/Pasif/İzinde)
   - Employee management
   - Filter by department and position
   - Salary management
   - Employment date tracking
   - Employee status (Active/Inactive/On Leave)

5. **Varlık Yönetimi (Assets Management)** 🏢
   - Sabit varlıklar yönetimi
   - Araç takibi
   - Ekipman envanteri
   - Amortisman hesaplaması
   - Bakım durumu izleme
   - Konum bazlı varlık takibi
   - Fixed assets management
   - Vehicle tracking
   - Equipment inventory
   - Depreciation calculation
   - Maintenance status monitoring
   - Location-based asset tracking

6. **Çok Dilli Destek (Multilingual Support)** 🌍
   - Türkçe (Turkish)
   - İngilizce (English)
   - Dil değişimi localStorage'da kaydediliyor
   - Turkish language support
   - English language support
   - Language preference saved in localStorage

## 📋 Teknik Gereksinimler / Technical Requirements

### Gerekli Paketler / Required Packages:
```json
{
  "next": "^15.4.1",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "typescript": "^5",
  "tailwindcss": "^4",
  "lucide-react": "^0.544.0",
  "react-i18next": "^14.0.0",
  "i18next": "^23.7.6",
  "next-i18next": "^15.2.0",
  "axios": "^1.10.0",
  "@coreui/icons-react": "^2.3.0"
}
```

## 🛠️ Kurulum / Installation

### Adım 1: Bağımlılıkları Yükle / Install Dependencies
```bash
cd my-app
npm install
```

### Adım 2: Geliştirme Sunucusunu Çalıştır / Start Development Server
```bash
npm run dev
```

Uygulama şu adresle açılacak / Application will open at:
```
http://localhost:3000
```

## 📁 Proje Yapısı / Project Structure

```
my-app/
├── app/
│   ├── components/          # React bileşenleri / React components
│   │   ├── navbar/         # Navigasyon çubuğu / Navigation components
│   │   ├── footer/         # Alt bilgi / Footer
│   │   └── providers/      # i18n sağlayıcı / i18n provider
│   ├── pages/              # Sayfa rotaları / Page routes
│   │   ├── ariza/          # Arıza Talebi / Failure Request
│   │   ├── malzeme/        # Malzeme Talebi / Material Request
│   │   ├── is/             # Yeni İş Talebi / New Work Request
│   │   ├── arac/           # Araç Taleplerini / Vehicle Requests
│   │   ├── temizlik/       # Temizlik Talebi / Cleaning Request
│   │   └── assets/         # Varlık Yönetimi / Assets Management
│   ├── dashboard/          # Yönetim Paneli / Dashboard
│   ├── requests/           # Tüm Talepler / All Requests
│   ├── inventory/          # Envanter Yönetimi / Inventory
│   ├── hr/                 # İnsan Kaynakları / HR
│   ├── profile/            # Profil / Profile
│   ├── lib/                # Yardımcı dosyalar / Utilities
│   │   ├── i18n.ts        # i18n Konfigürasyonu / i18n Config
│   │   └── router.tsx     # Yol Tanımları / Route Definitions
│   ├── layout.tsx          # Ana Layout / Root Layout
│   ├── page.tsx            # Ana Sayfa / Home Page
│   └── globals.css         # Global Stiller / Global Styles
├── public/                 # Statik dosyalar / Static files
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Stil ve Tasarım / Styling & Design

Proje **Tailwind CSS 4** kullanarak modern ve duyarlı bir tasarıma sahiptir.

The project uses **Tailwind CSS 4** for a modern and responsive design.

### Renk Şeması / Color Scheme:
- **Kırmızı (Red)**: Birincil renk / Primary color - `bg-red-600`, `text-red-700`
- **Mavi (Blue)**: İkincil renkler / Secondary - `bg-blue-100`, `text-blue-600`
- **Yeşil (Green)**: Başarı / Success - `bg-green-100`, `text-green-800`
- **Sarı (Yellow)**: Uyarı / Warning - `bg-yellow-100`, `text-yellow-800`
- **Gri (Gray)**: Nötr / Neutral - `bg-gray-50`, `text-gray-900`

## 🌐 Çok Dilli Sistem / Multilingual System

Uygulama **react-i18next** kullanarak Türkçe ve İngilizce dillerini desteklemektedir.

The application supports Turkish and English using **react-i18next**.

### Dil Değiştirme / Change Language:
Navbar'daki dil seçicisine tıklayın / Click the language selector in the navbar.

```typescript
// Mevcut çeviriler lokasyonu / Translation location:
app/lib/i18n.ts
```

## 🔒 Veriler ve Yönetim / Data & Management

### Mevcut Veriler / Current Data:
- Talepler 10 örnek talep içeriyor
- Çalışanlar 5 örnek çalışan içeriyor
- Malzemeler 7 örnek malzeme içeriyor
- Varlıklar 5 örnek varlık içeriyor

Tüm veriler şu anda client-side state'de saklanmaktadır. Üretim için bir backend API entegrasyonu gereklidir.

All data is currently stored in client-side state. For production, a backend API integration is required.

## 📱 Duyarlılık / Responsiveness

Uygulama tamamen duyarlı olup tüm cihazlarda çalışır:
- 📱 Mobil cihazlar (320px+)
- 📱 Tabletler (768px+)
- 💻 Masaüstü bilgisayarlar (1024px+)
- 🖥️ Büyük ekranlar (1280px+)

## 🚀 Dağıtım / Deployment

### Vercel'e Dağıtım / Deploy to Vercel:
```bash
npm install -g vercel
vercel
```

### Docker ile Dağıtım / Deploy with Docker:
```bash
docker build -t vys-app .
docker run -p 3000:3000 vys-app
```

## 📝 Notlar ve İyileştirmeler / Notes & Improvements

### Gelecek Özellikleri / Future Features:
- [ ] Backend API entegrasyonu
- [ ] Veritabanı bağlantısı
- [ ] Kimlik doğrulama ve yetkilendirme
- [ ] Raporlama sistemi
- [ ] PDF export özellikleri
- [ ] E-posta bildirimleri
- [ ] Dosya yükleme özelliği
- [ ] İleri analytics ve grafikler

### Backend API Integration
### Database connection
### Authentication and authorization
### Reporting system
### PDF export features
### Email notifications
### File upload functionality
### Advanced analytics and charts

## 📄 Lisans / License

Bu proje açık kaynak projesidir ve MIT lisansı altında sunulmaktadır.

This project is an open-source project and is provided under the MIT license.

## 👥 Katkıda Bulunma / Contributing

Katkılar hoş geldiniz! Lütfen bir pull request oluşturun veya issues açın.

Contributions are welcome! Please create a pull request or open an issue.

## 📞 İletişim / Contact

Sorularınız için lütfen iletişime geçin / For questions, please contact us.

---

**Sürüm / Version:** 1.0.0  
**Son Güncelleme / Last Updated:** 2024-10-16  
**Geliştirici / Developer:** VYS Team
