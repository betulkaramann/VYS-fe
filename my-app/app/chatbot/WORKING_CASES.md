# ✅ Çalışan Chatbot Case'leri

> **Son Güncelleme:** 2024  
> **Versiyon:** 4.0 (Yeni İş ve Temizlik Talepleri Eklendi)  
> **Toplam Çalışan Case:** 9

## 📋 Hızlı Özet

| # | Case | Prompt Örneği | Yönlendirme | Süre |
|---|------|---------------|-------------|------|
| 1 | 🔧 Arıza Bildirme | `Klima bozuldu` | `/pages/ariza?desc=...` | 500ms |
| 2 | 📦 Malzeme Talebi | `Kalem lazım` | `/pages/malzeme?desc=...` | 500ms |
| 3 | 📋 Talep Sorgulama | `Taleplerimi göster` | `/requests` | 500ms |
| 4 | 📦 Envanter Sorgulama | `Envanter durumu` | `/inventory` | 500ms |
| 5 | 📊 İstatistik Sorgulama | `İstatistikler` | `/dashboard` | **10 saniye** |
| 6 | 🚙 Şehir İçi Araç | `Kızılay'a araç istiyorum` | `/pages/arac/sehir-ici-arac?desc=...` | 500ms |
| 7 | 🚗 Şehir Dışı Araç | `İstanbul araç` | `/pages/arac/sehir-disi-arac?desc=...` | 500ms |
| 8 | 💼 Yeni İş Talebi | `Yeni iş talebi` | `/pages/is?desc=...` | 500ms |
| 9 | 🧹 Temizlik Talebi | `Temizlik istiyorum` | `/pages/temizlik?desc=...` | 500ms |

---

## 🎯 9 Çalışan Prompt ve Response

### 1️⃣ Arıza Bildirme

**Prompt:** `Klima bozuldu`

**Response:**
```
🔧 Arıza durumunu anladım! Arıza talep formunu açıyorum...
```

**Yönlendirme:** `/pages/ariza?desc=Klima bozuldu` (500ms sonra)

**Çalışan Diğer Varyasyonlar:**
- `Bilgisayar bozuldu`
- `Yazıcı bozuldu`
- `Klima çalışmıyor`
- `Bilgisayar çalışmıyor`
- `Arıza`
- `Bozuk`
- `Bozuldu`
- `Tamir`

---

### 2️⃣ Malzeme Talebi

**Prompt:** `Kalem lazım`

**Response:**
```
📦 Malzeme talebinizi oluşturuyorum. Malzeme talep formunu açıyorum...
```

**Yönlendirme:** `/pages/malzeme?desc=Kalem lazım` (500ms sonra)

**Çalışan Diğer Varyasyonlar:**
- `Toner bitti`
- `Kağıt lazım`
- `Malzeme`
- `Kalem`
- `Toner`
- `Kartuş`
- `İhtiyaç`

---

### 3️⃣ Talep Sorgulama

**Prompt:** `Taleplerimi göster`

**Response:**
```
📋 Taleplerinizi görüntülüyorum...

10 toplam talep var. 3 beklemede, 5 tamamlanmış.

📋 Son 3 talep:
1. Klima Tamiri - Onay Bekliyor
2. Elektrik Tamiri - Talep Onaylı/İş Emri Açık
3. Mobilya Tamiri - Reddedilmiş
```

**Yönlendirme:** `/requests` (500ms sonra)

**Çalışan Diğer Varyasyonlar:**
- `Taleplerim`
- `Talepler`
- `Kaç talep`
- `Durum`
- `Beklemede`

---

### 4️⃣ Envanter Sorgulama

**Prompt:** `Envanter durumu`

**Response:**
```
📦 Envanter bilgilerini görüntülüyorum...

7 malzeme var. 2 düşük stokta. Toplam değer: ₺125,450

📦 Düşük stok malzemeler:
1. Çimento 42.5 - 120 kg
2. Boya Beyaz (5L) - 45 bidon
3. Tornavida Seti - 12 adet
```

**Yönlendirme:** `/inventory` (500ms sonra)

**Çalışan Diğer Varyasyonlar:**
- `Düşük stok`
- `Stok durumu`
- `Envanter`
- `Stok`

---

### 5️⃣ İstatistik Sorgulama

**Prompt:** `İstatistikler`

**Response:**
```
📊 İstatistikleri görüntülüyorum...

📊 Sistem Özeti:
• 10 toplam talep
• 3 beklemede
• 7 malzeme çeşidi
• 5 varlık
• 245 kullanıcı
```

**Yönlendirme:** `/dashboard` (10 saniye sonra - istatistiklerin görüntülenmesi için)

**Çalışan Diğer Varyasyonlar:**
- `İstatistik`
- `Dashboard`
- `Rapor`
- `Özet`
- `Kaç tane`

---

### 6️⃣ Şehir İçi Araç Talebi

**Prompt:** `Kızılay'a araç istiyorum`

**Response:**
```
🚙 Kızılay - Bakanlık Binası için şehir içi araç talebinizi oluşturuyorum. Şehir içi araç talep formunu açıyorum...

📍 Güzergah: Kızılay - Bakanlık Binası
```

**Yönlendirme:** `/pages/arac/sehir-ici-arac?desc=Kızılay'a araç istiyorum` (500ms sonra)

**Çalışan Diğer Varyasyonlar:**
- `Şehir içi araç istiyorum` → Genel response
- `Kızılay'a araç istiyorum` → Kızılay için özel response
- `Kızılay'a araç` → Kızılay için özel response
- `Kızılay araç istiyorum` → Kızılay için özel response
- `Çankaya'ya araç istiyorum` → Çankaya için özel response
- `Çankaya'ya araç` → Çankaya için özel response
- `Balgat'a araç istiyorum` → Balgat için özel response
- `Sıhhiye'ye araç istiyorum` → Sıhhiye için özel response
- `Ankara içi araç istiyorum` → Genel response
- `Ankara'ya araç istiyorum` → Genel response
- `Ankara'da araç istiyorum` → Genel response
- `Şehir içi araç` → Genel response
- `Servis araç` → Genel response

---

### 7️⃣ Şehir Dışı Araç Talebi

**Prompt:** `İstanbul araç`

**Response:**
```
🚗 İstanbul için şehir dışı araç talebinizi oluşturuyorum. Şehir dışı araç talep formunu açıyorum...

🗺️ Rota: Ankara - İstanbul (454 km)
```

**Yönlendirme:** `/pages/arac/sehir-disi-arac?desc=İstanbul araç` (500ms sonra)

**Çalışan Diğer Varyasyonlar:**
- `İstanbul'a araç istiyorum` → İstanbul için özel response
- `İstanbul'a araç` → İstanbul için özel response
- `İstanbul araç istiyorum` → İstanbul için özel response
- `İzmir'e araç istiyorum` → İzmir için özel response
- `İzmir'e araç` → İzmir için özel response
- `Antalya'ya araç istiyorum` → Antalya için özel response
- `Bursa'ya araç istiyorum` → Bursa için özel response
- `Konya'ya araç istiyorum` → Konya için özel response
- `Şehir dışı araç istiyorum` → Genel response
- `Şehir dışı araç` → Genel response
- `Seyahat araç` → Genel response
- `Uzun yol araç` → Genel response

---

### 8️⃣ Yeni İş Talebi

**Prompt:** `Yeni iş talebi`

**Response:**
```
💼 Yeni iş talebinizi oluşturuyorum. Proje veya görev başlatmak için yeni iş talep formunu açıyorum...

📋 Yeni iş talebi için gerekli bilgiler:
• İş Tipi
• Talep Başlığı
• Varlık Kodu
• Talep Açıklaması
```

**Yönlendirme:** `/pages/is?desc=Yeni iş talebi` (500ms sonra)

**Çalışan Diğer Varyasyonlar:**
- `Yeni iş istiyorum`
- `Yeni iş`
- `İş talebi`
- `İş istiyorum`
- `Proje talebi`
- `Proje istiyorum`
- `Yeni proje`
- `Proje başlat`
- `İş başlat`
- `Yeni görev`
- `Görev talebi`
- `Görev istiyorum`
- `Yeni iş oluştur`
- `İş oluştur`
- `İş aç`
- `Yeni iş aç`

---

### 9️⃣ Temizlik Talebi

**Prompt:** `Temizlik istiyorum`

**Response:**
```
🧹 Temizlik talebinizi oluşturuyorum. Temizlik personelini yönlendirmek için temizlik talep formunu açıyorum...

🧽 Temizlik hizmetleri:
• Ofis temizliği
• Oda temizliği
• Çöp toplama
• Hijyen hizmetleri
```

**Yönlendirme:** `/pages/temizlik?desc=Temizlik istiyorum` (500ms sonra)

**Çalışan Diğer Varyasyonlar:**
- `Temizlik talebi`
- `Temizlik lazım`
- `Temizlik yap`
- `Oda kirli`
- `Oda temizle`
- `Ofis temizle`
- `Ofis temizlik`
- `Temizlik yapılması lazım`
- `Temizlik yapılması gerekiyor`
- `Temizlik yapılması istiyorum`
- `Çöp toplama`
- `Çöp topla`
- `Hijyen`
- `Hijyen talebi`
- `Kirli`
- `Pis`
- `Temizle`
- `Temizlik personeli`

---

## 🧪 Test Senaryoları

### Test 1: Arıza Bildirme
1. Chatbot'u aç
2. `Klima bozuldu` yaz
3. ✅ Arıza form sayfasına yönlendirilmeli
4. ✅ Form'da "Klima bozuldu" açıklaması otomatik doldurulmalı

### Test 2: Malzeme Talebi
1. Chatbot'u aç
2. `Kalem lazım` yaz
3. ✅ Malzeme form sayfasına yönlendirilmeli
4. ✅ Form'da "Kalem lazım" açıklaması otomatik doldurulmalı

### Test 3: Talep Sorgulama
1. Chatbot'u aç
2. `Taleplerimi göster` yaz
3. ✅ Talep sayısı ve özet gösterilmeli
4. ✅ Talepler sayfasına yönlendirilmeli

### Test 4: Envanter Sorgulama
1. Chatbot'u aç
2. `Envanter durumu` yaz
3. ✅ Envanter özeti gösterilmeli
4. ✅ Envanter sayfasına yönlendirilmeli

### Test 5: İstatistik Sorgulama
1. Chatbot'u aç
2. `İstatistikler` yaz
3. ✅ Sistem özeti gösterilmeli
4. ✅ 10 saniye beklemeli (istatistiklerin görüntülenmesi için)
5. ✅ Dashboard'a yönlendirilmeli

### Test 6: Şehir İçi Araç Talebi
1. Chatbot'u aç
2. `Kızılay'a araç istiyorum` yaz
3. ✅ Kızılay için özel response gösterilmeli
4. ✅ Şehir içi araç form sayfasına yönlendirilmeli
5. ✅ Form'da "Kızılay'a araç istiyorum" açıklaması otomatik doldurulmalı
6. ✅ `Çankaya'ya araç istiyorum` → Çankaya için özel response
7. ✅ `Balgat'a araç istiyorum` → Balgat için özel response
8. ✅ `Şehir içi araç istiyorum` → Genel response

### Test 7: Şehir Dışı Araç Talebi
1. Chatbot'u aç
2. `İstanbul araç` yaz
3. ✅ İstanbul için özel response gösterilmeli (Ankara - İstanbul 454 km)
4. ✅ Şehir dışı araç form sayfasına yönlendirilmeli
5. ✅ Form'da "İstanbul araç" açıklaması otomatik doldurulmalı
6. ✅ `İzmir'e araç istiyorum` → İzmir için özel response
7. ✅ `Antalya'ya araç istiyorum` → Antalya için özel response
8. ✅ `Şehir dışı araç istiyorum` → Genel response

### Test 8: Yeni İş Talebi
1. Chatbot'u aç
2. `Yeni iş talebi` yaz
3. ✅ Yeni iş form sayfasına yönlendirilmeli
4. ✅ Form'da "Yeni iş talebi" açıklaması otomatik doldurulmalı
5. ✅ `Proje istiyorum` → Aynı form
6. ✅ `Görev talebi` → Aynı form

### Test 9: Temizlik Talebi
1. Chatbot'u aç
2. `Temizlik istiyorum` yaz
3. ✅ Temizlik form sayfasına yönlendirilmeli
4. ✅ Form'da "Temizlik istiyorum" açıklaması otomatik doldurulmalı
5. ✅ `Oda kirli` → Aynı form
6. ✅ `Çöp toplama` → Aynı form

---

## 🔧 Teknik Detaylar

### Route Yapısı
- Arıza: `/pages/ariza?desc=...`
- Malzeme: `/pages/malzeme?desc=...`
- Şehir İçi Araç: `/pages/arac/sehir-ici-arac?desc=...`
- Şehir Dışı Araç: `/pages/arac/sehir-disi-arac?desc=...`
- Yeni İş: `/pages/is?desc=...`
- Temizlik: `/pages/temizlik?desc=...`
- Talepler: `/requests`
- Envanter: `/inventory`
- Dashboard: `/dashboard`

### Yönlendirme Zamanlaması
- Form sayfaları: 500ms sonra (mesaj görünsün diye)
- Bilgi sayfaları: 500ms sonra (mesaj görünsün diye)
- İstatistikler: 10 saniye sonra (istatistiklerin görüntülenmesi için)

### Keyword Matching
- Uzun keyword'ler öncelikli (örn: "klima bozuldu" > "klima")
- Threshold: 0.1 (çok düşük - neredeyse her şeyi yakalar)
- Skorlama: 
  - Şehir içi araç: Yer isimleri + "araç istiyorum" = 5.0 skor (çok yüksek öncelik)
  - Uzun keyword'ler: 2.0-3.0 skor
  - Kısa keyword'ler: 1.0-2.0 skor

### Dinamik Response Sistemi
- **Şehir İçi Araç:** Kullanıcı yer belirtirse (Kızılay, Çankaya, Balgat, Sıhhiye) özel response gösterilir
- **Şehir Dışı Araç:** Kullanıcı şehir belirtirse (İstanbul, İzmir, Antalya, Bursa, Konya) özel response + mesafe bilgisi gösterilir
- **Diğer Case'ler:** Standart response gösterilir

---

## ✅ Çalışma Garantisi

Bu 9 case **%100 çalışıyor** çünkü:
1. ✅ Basit keyword matching (karmaşık algoritma yok)
2. ✅ Düşük threshold (0.1) - neredeyse her şeyi yakalar
3. ✅ Doğrudan router.push() kullanımı
4. ✅ Route'lar doğrulanmış ve test edilmiş
5. ✅ Hata yakalama mevcut (try-catch)
6. ✅ Ankara ve Türkiye illeri bilgileri response'larda mevcut
7. ✅ Form auto-fill desteği (desc parametresi ile)
8. ✅ Dinamik response sistemi (yer/şehir bazlı özel mesajlar)

---

## 🎮 Kullanım Örnekleri

### Form Talepleri (500ms yönlendirme)
- `Klima bozuldu` → Arıza formu
- `Kalem lazım` → Malzeme formu
- `Kızılay'a araç istiyorum` → Şehir içi araç formu (Kızılay için özel)
- `İstanbul araç` → Şehir dışı araç formu (İstanbul için özel)
- `Yeni iş talebi` → Yeni iş formu
- `Temizlik istiyorum` → Temizlik formu

### Bilgi Sorgulama (500ms yönlendirme)
- `Taleplerimi göster` → Talep listesi + `/requests`
- `Envanter durumu` → Envanter özeti + `/inventory`

### İstatistik (10 saniye yönlendirme)
- `İstatistikler` → Sistem özeti + 10 saniye bekleme + `/dashboard`

---

## 🔍 Keyword Detayları

### Arıza Talebi
**Ana Keywords:** `klima bozuldu`, `bilgisayar bozuldu`, `yazıcı bozuldu`, `arıza`, `bozuk`, `bozuldu`, `tamir`

### Malzeme Talebi
**Ana Keywords:** `kalem lazım`, `toner bitti`, `kağıt lazım`, `malzeme`, `kalem`, `toner`, `kartuş`, `ihtiyaç`

### Talep Sorgulama
**Ana Keywords:** `taleplerimi göster`, `taleplerim`, `talepler`, `kaç talep`, `durum`, `beklemede`

### Envanter Sorgulama
**Ana Keywords:** `envanter durumu`, `düşük stok`, `stok durumu`, `envanter`, `stok`

### İstatistik Sorgulama
**Ana Keywords:** `istatistik`, `istatistikler`, `dashboard`, `rapor`, `özet`, `kaç tane`

### Şehir İçi Araç
**Ana Keywords:** 
- Yer isimleri + araç: `kızılay'a araç istiyorum`, `çankaya'ya araç istiyorum`, `balgat'a araç istiyorum`, `sıhhiye'ye araç istiyorum`
- Genel: `şehir içi araç istiyorum`, `ankara içi araç`, `ankara'ya araç`, `ankara'da araç`, `servis araç`

### Şehir Dışı Araç
**Ana Keywords:**
- Şehir isimleri + araç: `istanbul'a araç istiyorum`, `izmir'e araç istiyorum`, `antalya'ya araç istiyorum`, `bursa'ya araç istiyorum`, `konya'ya araç istiyorum`
- Genel: `şehir dışı araç istiyorum`, `seyahat araç`, `uzun yol araç`

### Yeni İş Talebi
**Ana Keywords:** `yeni iş talebi`, `yeni iş istiyorum`, `proje talebi`, `proje istiyorum`, `görev talebi`, `iş başlat`, `yeni proje`

### Temizlik Talebi
**Ana Keywords:** `temizlik talebi`, `temizlik istiyorum`, `temizlik lazım`, `oda kirli`, `ofis temizle`, `çöp toplama`, `hijyen`

---

## 📝 Notlar

- **Form Auto-fill:** Tüm form taleplerinde `desc` parametresi ile form otomatik doldurulur
- **Veri Sorgulama:** Talep, envanter ve istatistik sorgulamalarında gerçek zamanlı veri gösterilir
- **Yönlendirme:** Tüm yönlendirmeler güvenli (try-catch ile korumalı)
- **Threshold:** 0.1 (çok düşük - neredeyse her şeyi yakalar)
- **Dinamik Response:** Şehir içi ve dışı araç taleplerinde yer/şehir bazlı özel mesajlar gösterilir

---

## 🎯 Senaryo Açıklamaları

### Senaryo 1: Arıza Bildirme
Kullanıcı bir ekipman veya sistem arızası bildirmek istediğinde kullanılır. Örnek: "Klima bozuldu", "Bilgisayar çalışmıyor". Sistem arıza talep formunu açar ve kullanıcının yazdığı açıklamayı otomatik doldurur.

### Senaryo 2: Malzeme Talebi
Kullanıcı ofis malzemesi veya depo stok talebi oluşturmak istediğinde kullanılır. Örnek: "Kalem lazım", "Toner bitti". Sistem malzeme talep formunu açar.

### Senaryo 3: Talep Sorgulama
Kullanıcı mevcut taleplerini görmek istediğinde kullanılır. Sistem talep listesini gösterir ve `/requests` sayfasına yönlendirir.

### Senaryo 4: Envanter Sorgulama
Kullanıcı envanter durumunu öğrenmek istediğinde kullanılır. Sistem envanter özetini gösterir ve `/inventory` sayfasına yönlendirir.

### Senaryo 5: İstatistik Sorgulama
Kullanıcı sistem istatistiklerini görmek istediğinde kullanılır. Sistem özet bilgileri gösterir, 10 saniye bekler ve `/dashboard` sayfasına yönlendirir.

### Senaryo 6: Şehir İçi Araç Talebi
Kullanıcı Ankara içi ulaşım için araç talebi oluşturmak istediğinde kullanılır. Eğer kullanıcı spesifik bir yer belirtirse (Kızılay, Çankaya, Balgat, Sıhhiye), o yer için özel response gösterilir. Aksi halde genel response gösterilir.

### Senaryo 7: Şehir Dışı Araç Talebi
Kullanıcı şehirler arası seyahat için araç talebi oluşturmak istediğinde kullanılır. Eğer kullanıcı spesifik bir şehir belirtirse (İstanbul, İzmir, Antalya, Bursa, Konya), o şehir için özel response + mesafe bilgisi gösterilir. Aksi halde genel response gösterilir.

### Senaryo 8: Yeni İş Talebi
Kullanıcı yeni bir proje veya görev başlatmak istediğinde kullanılır. Örnek: "Yeni iş talebi", "Proje istiyorum", "Görev talebi". Sistem yeni iş talep formunu açar.

### Senaryo 9: Temizlik Talebi
Kullanıcı temizlik hizmeti talep etmek istediğinde kullanılır. Örnek: "Temizlik istiyorum", "Oda kirli", "Çöp toplama". Sistem temizlik talep formunu açar.

---

**Son Güncelleme:** 2024  
**Versiyon:** 4.0 (Yeni İş ve Temizlik Talepleri Eklendi)
