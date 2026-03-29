# NFC Kartvizit & Kişisel Bio Sitesi

GitHub üzerinde çalışabilecek, modern ve responsive bir NFC kartvizit ve kişisel bio sitesi.

## Özellikler

- 📱 **NFC Desteği**: NFC özellikli cihazlarla kartvizit paylaşımı
- 🎨 **Modern Tasarım**: Gradient arka plan ve kart tasarımı
- 📱 **Responsive**: Mobil ve masaüstü cihazlarda mükemmel görünüm
- 📇 **vCard Desteği**: Kişi bilgilerini vCard formatında indirme
- 📊 **QR Kod**: NFC olmayan cihazlar için QR kod alternatifi
- 🔗 **Sosyal Medya Entegrasyonu**: LinkedIn, Twitter, GitHub, Instagram
- ⚡ **Hızlı Yükleme**: Optimize edilmiş ve hızlı yüklenen yapı
- 🌐 **PWA Desteği**: Progressive Web App özellikleri

## Dosya Yapısı

```
ilk/
├── index.html          # Ana sayfa
├── style.css           # Stil dosyası
├── script.js           # JavaScript fonksiyonları
├── README.md           # Bu dosya
└── sw.js              # Service Worker (PWA için)
```

## Kurulum ve Kullanım

### 1. GitHub'a Yükleme

1. Bu projeyi bilgisayarınıza klonlayın veya indirin
2. GitHub'da yeni bir repository oluşturun
3. Dosyaları repository'ye yükleyin
4. GitHub Pages ayarlarından siteyi yayınlayın

### 2. Kişisel Bilgileri Düzenleme

`script.js` dosyasındaki `personalInfo` nesnesini kendi bilgilerinizle güncelleyin:

```javascript
const personalInfo = {
    fullName: "Adınız Soyadınız",
    title: "Unvanınız",
    company: "Şirket Adı",
    phone: "+90 555 123 4567",
    email: "email@example.com",
    website: "www.websiteniz.com",
    location: "İstanbul, Türkiye",
    bio: "Kendinizi tanıtan kısa bir açıklama...",
    linkedin: "https://linkedin.com/in/profiliniz",
    twitter: "https://twitter.com/kullaniciadiniz",
    github: "https://github.com/kullaniciadiniz",
    instagram: "https://instagram.com/kullaniciadiniz",
    profileImage: "profil-fotografiniz.jpg"
};
```

### 3. Yetenekleri Özelleştirme

`skills` dizisini kendi yeteneklerinize göre düzenleyin:

```javascript
const skills = [
    { icon: "fas fa-code", name: "Web Geliştirme" },
    { icon: "fas fa-mobile-alt", name: "Mobil Uygulama" },
    // Kendi yeteneklerinizi ekleyin
];
```

### 4. Deneyimleri Güncelleme

`experiences` dizisini kendi kariyer geçmişinize göre düzenleyin:

```javascript
const experiences = [
    {
        date: "2020 - Günümüz",
        position: "Mevcut Pozisyon",
        company: "Şirket Adı",
        description: "Açıklama ve sorumluluklarınız"
    },
    // Kendi deneyimlerinizi ekleyin
];
```

## GitHub Pages ile Yayınlama

1. Repository'nize gidin
2. **Settings** sekmesine tıklayın
3. **Pages** bölümüne gidin
4. **Source** olarak **Deploy from a branch** seçin
5. **Branch** olarak **main** (veya master) seçin
6. **/(root)** klasörünü seçin
7. **Save** butonuna tıklayın

Site birkaç dakika içinde `https://kullaniciadiniz.github.io/repository-adiniz` adresinde yayınlanacaktır.

## NFC Kullanımı

### NFC Destekli Cihazlar

- Chrome 89+ ve Android cihazlarda NFC desteği mevcuttur
- Kullanıcı telefonunuzu NFC kartvizite yaklaştırdığında bilgiler otomatik olarak yüklenir

### Alternatif Yöntemler

NFC desteklemeyen cihazlar için:
- **QR Kod**: Otomatik olarak生成 edilen QR kodu taratın
- **vCard**: Kişi bilgilerini .vcf formatında indirin
- **Web Paylaşımı**: Web Share API ile paylaşın

## Özelleştirme

### Renk Teması

`style.css` dosyasındaki gradient renklerini değiştirebilirsiniz:

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Font Değişikliği

Fontları değiştirmek için `index.html` dosyasındaki font link'ini ve `style.css` dosyasındaki font-family'i güncelleyin.

### İkon Ekleme

Font Awesome ikonlarını kullanarak yeni sosyal medya linkleri veya yetenekler ekleyebilirsiniz.

## Tarayıcı Desteği

- ✅ Chrome 89+
- ✅ Firefox (NFC hariç)
- ✅ Safari (NFC hariç)
- ✅ Edge
- ⚠️ NFC sadece Chrome Android'de desteklenir

## PWA Özellikleri

Site Progressive Web App olarak çalışabilir:
- Ana ekrana eklenebilir
- Çevrimdışı çalışma desteği
- Push bildirimleri (isteğe bağlı)

## Katkıda Bulunma

1. Projeyi fork'layın
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
- Değişiklikleri commit'leyin (`git commit -am 'Yeni özellik eklendi'`)
- Branch'i push'layın (`git push origin feature/yeni-ozellik`)
- Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında dağıtılmaktadır.

## Destek

Sorularınız veya önerileriniz için:
- GitHub Issues kullanın
- E-posta: email@example.com

---

**Not**: Bu proje tamamen client-side çalışır ve herhangi bir sunucu gerektirmez. Tüm işlevsellik tarayıcı üzerinde çalışır.
