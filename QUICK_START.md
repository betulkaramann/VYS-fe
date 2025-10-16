# 🚀 VYS Project - Quick Start Guide

## ⚡ Hızlı Başlangıç / Quick Start

### 1️⃣ Projeyi İndir / Clone Project
```bash
cd C:\Users\mutlu\Desktop\VYS_myk\VYS\my-app
```

### 2️⃣ Bağımlılıkları Yükle / Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3️⃣ Geliştirme Sunucusunu Başlat / Start Dev Server
```bash
npm run dev
```

### 4️⃣ Tarayıcıda Aç / Open in Browser
```
http://localhost:3000
```

---

## 📖 Ana Sayfalar / Main Pages

| Sayfa | URL | Açıklama |
|-------|-----|---------|
| 🏠 Ana Sayfa | `http://localhost:3000/` | Talepler kartları |
| 📊 Dashboard | `http://localhost:3000/dashboard` | İstatistikler ve özet |
| 📋 Talepler | `http://localhost:3000/requests` | Tüm talepler listesi |
| 📦 Envanter | `http://localhost:3000/inventory` | Malzeme yönetimi |
| 👥 HR | `http://localhost:3000/hr` | Çalışan yönetimi |
| 🏢 Varlıklar | `http://localhost:3000/pages/assets` | Sabit varlıklar |

---

## 🌐 Dil Değiştir / Change Language

Navbar'ın sağında bulunan dil seçicisine tıkla / Click the language selector in the navbar:
- 🇹🇷 **Türkçe** (Turkish)
- 🇬🇧 **English** (English)

---

## ✨ Kullanılabilir Özellikler / Available Features

### ✅ Kurumsal Yönetim / Enterprise Management
- Talepler ve talep yönetimi
- Envanter ve stok takibi
- İnsan kaynakları yönetimi
- Varlık ve ekipman yönetimi

### ✅ Gelişmiş Filtreleme / Advanced Filtering
- Metin araması
- Kategori bazlı filtre
- Durum bazlı filtre
- Konum bazlı filtre

### ✅ CRUD İşlemleri / CRUD Operations
- ➕ Yeni kayıt ekle (Add)
- 📝 Kaydı düzenle (Edit)
- 🗑️ Kaydı sil (Delete)
- 📖 Kayıt detaylarını görüntüle (Read)

### ✅ Çok Dilli Destek / Multilingual Support
- Türkçe tam destek
- İngilizce tam destek
- localStorage'da otomatik kaydetme

---

## 📊 Örnek Veriler / Sample Data

### Talepler / Requests
- **Toplam:** 10 talep
- **Durum:** Onay Bekliyor, Onaylandı, Reddedilmiş, Tamamlandı

### Çalışanlar / Employees
- **Toplam:** 5 çalışan
- **Durum:** Aktif, Pasif, İzinde
- **Maaş:** ₺28,000 - ₺50,000

### Malzemeler / Materials
- **Toplam:** 7 malzeme
- **Depolar:** 4 depo
- **Kategoriler:** 6 kategori

### Varlıklar / Assets
- **Toplam:** 5 varlık
- **Amortisman:** %20 - %60

---

## 🎨 UI İpuçları / UI Tips

### Renk Kodlaması / Color Coding
- 🔴 **Kırmızı** → Acil, Ana renk
- 🟢 **Yeşil** → Başarılı, Tamamlandı
- 🟡 **Sarı** → Uyarı, Dikkat
- 🔵 **Mavi** → Bilgi, Malzeme
- ⚫ **Siyah** → Pasif

### Modal Formlar / Modal Forms
- Açmak için "Ekle" veya Düzenle butonuna tıkla
- Kapatmak için X butonuna tıkla veya "İptal" butonuna tıkla

### Tablolarda Filtreleme / Table Filtering
1. Arama kutusuna metin yaz
2. Filtreleme seçeneklerini seç
3. Sonuçlar otomatik güncellenir

---

## 🔧 Geliştirme / Development

### Dosya Yapısı / File Structure
```
my-app/
├── app/
│   ├── dashboard/          # Yönetim paneli
│   ├── hr/                 # İnsan kaynakları
│   ├── inventory/          # Envanter
│   ├── pages/              # Talep formları
│   ├── requests/           # Talepler listesi
│   ├── profile/            # Profil
│   ├── lib/                # Yardımcı dosyalar (i18n, router)
│   ├── components/         # React bileşenleri
│   └── layout.tsx          # Ana layout
├── public/                 # Statik dosyalar
├── package.json            # Bağımlılıklar
└── README.md               # Dokümantasyon
```

### Önemli Dosyalar / Important Files
- `app/lib/i18n.ts` - Dil çevirileri (600+)
- `app/lib/router.tsx` - Rota tanımları
- `app/layout.tsx` - Genel layout yapısı

---

## 🐛 Sorun Giderme / Troubleshooting

### Problem: Sayfa açılmıyor / Page won't open
**Çözüm:** Node.js'i yeniden başlat
```bash
npm run dev
```

### Problem: Dil değişmiyor / Language won't change
**Çözüm:** Browser cache'i temizle veya localStorage'ı sıfırla
```javascript
localStorage.clear()
```

### Problem: Stil yüklenmemiş / Styles not loading
**Çözüm:** Tailwind CSS yeniden derle
```bash
npm install
```

---

## 📚 Kaynaklar / Resources

### Dokümantasyon / Documentation
- 📖 [Next.js Docs](https://nextjs.org)
- 🎨 [Tailwind CSS](https://tailwindcss.com)
- 🌍 [i18next](https://www.i18next.com)
- 💻 [React Docs](https://react.dev)

### Proje Dosyaları / Project Files
- 📄 `README.md` - Detaylı dokümantasyon
- 📋 `IMPLEMENTATION_SUMMARY.md` - Yapılan işler

---

## ✅ Kontrol Listesi / Checklist

Projeyi test etmek için:
- [ ] Ana sayfayı aç
- [ ] Dashboard'a git
- [ ] Dil değiştir (TR → EN)
- [ ] HR'da çalışan ekle/sil
- [ ] Envanterde filtreleme yap
- [ ] Talepler tablosunu filtrele
- [ ] Varlıklar sayfasına git
- [ ] Malzeme talep formu doldur

---

## 🎓 Sonraki Adımlar / Next Steps

1. **Backend Bağlantısı** - REST API entegrasyonu
2. **Veritabanı** - MongoDB veya PostgreSQL
3. **Kimlik Doğrulama** - JWT auth sistemi
4. **Raporlama** - PDF export ve analitics
5. **Notifikasyonlar** - Email ve bildirim sistemi

---

## 📞 Destek / Support

Sorularınız için:
- README.md dosyasını oku
- IMPLEMENTATION_SUMMARY.md'yi kontrol et
- Kod açıklamalarını incele

---

**Proje Sahibi:** VYS Team  
**Son Güncelleme:** 16 Ekim 2024  
**Durum:** ✅ Hazır / Ready to Use
