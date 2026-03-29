// Kişisel Bilgiler
const personalInfo = {
    fullName: "Adınız Soyadınız",
    title: "Unvanınız",
    company: "Şirket Adı",
    phone: "+90 555 123 4567",
    email: "email@example.com",
    website: "www.websiteniz.com",
    location: "İstanbul, Türkiye",
    bio: "Kendinizi tanıtan kısa bir açıklama buraya gelecek. Profesyonel geçmişiniz, uzmanlık alanlarınız ve ilgi alanlarınız hakkında bilgi verebilirsiniz.",
    linkedin: "https://linkedin.com/in/profiliniz",
    twitter: "https://twitter.com/kullaniciadiniz",
    github: "https://github.com/kullaniciadiniz",
    instagram: "https://instagram.com/kullaniciadiniz",
    profileImage: "https://via.placeholder.com/150"
};

// Yetenekler
const skills = [
    { icon: "fas fa-code", name: "Web Geliştirme" },
    { icon: "fas fa-mobile-alt", name: "Mobil Uygulama" },
    { icon: "fas fa-database", name: "Veritabanı" },
    { icon: "fas fa-cloud", name: "Bulut Teknolojileri" },
    { icon: "fas fa-shield-alt", name: "Cyber Güvenlik" },
    { icon: "fas fa-chart-line", name: "Veri Analizi" }
];

// Deneyimler
const experiences = [
    {
        date: "2020 - Günümüz",
        position: "Mevcut Pozisyon",
        company: "Şirket Adı",
        description: "Açıklama ve sorumluluklarınız"
    },
    {
        date: "2018 - 2020",
        position: "Önceki Pozisyon",
        company: "Önceki Şirket",
        description: "Önceki işinizin açıklaması"
    },
    {
        date: "2016 - 2018",
        position: "İlk Pozisyon",
        company: "İlk Şirket",
        description: "Kariyer başlangıcınız"
    }
];

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    loadPersonalInfo();
    loadSkills();
    loadExperiences();
    setupEventListeners();
    checkNFCSupport();
});

// Kişisel bilgileri yükle
function loadPersonalInfo() {
    document.getElementById('fullName').textContent = personalInfo.fullName;
    document.getElementById('title').textContent = personalInfo.title;
    document.getElementById('company').textContent = personalInfo.company;
    document.getElementById('phone').textContent = personalInfo.phone;
    document.getElementById('email').textContent = personalInfo.email;
    document.getElementById('website').textContent = personalInfo.website;
    document.getElementById('location').textContent = personalInfo.location;
    document.getElementById('bioText').textContent = personalInfo.bio;
    document.getElementById('profileImage').src = personalInfo.profileImage;
    
    // Sosyal medya linkleri
    document.getElementById('linkedin').href = personalInfo.linkedin;
    document.getElementById('twitter').href = personalInfo.twitter;
    document.getElementById('github').href = personalInfo.github;
    document.getElementById('instagram').href = personalInfo.instagram;
}

// Yetenekleri yükle
function loadSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    skillsGrid.innerHTML = '';
    
    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <i class="${skill.icon}"></i>
            <span>${skill.name}</span>
        `;
        skillsGrid.appendChild(skillItem);
    });
}

// Deneyimleri yükle
function loadExperiences() {
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';
    
    experiences.forEach(exp => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-date">${exp.date}</div>
            <div class="timeline-content">
                <h4>${exp.position}</h4>
                <p>${exp.company} - ${exp.description}</p>
            </div>
        `;
        timeline.appendChild(timelineItem);
    });
}

// Event listener'ları kur
function setupEventListeners() {
    // Kişiyi kaydet butonu
    document.getElementById('saveContact').addEventListener('click', saveContact);
    
    // Sosyal medya linkleri
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Linkin yeni sekmede açılması için
            if (this.href !== '#') {
                e.preventDefault();
                window.open(this.href, '_blank');
            }
        });
    });
    
    // İletişim bilgilerine tıklandığında kopyalama
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            copyToClipboard(text);
            showNotification('Kopyalandı: ' + text);
        });
    });
}

// NFC desteğini kontrol et
function checkNFCSupport() {
    if ('NDEFReader' in window) {
        console.log('NFC desteği mevcut');
        setupNFC();
    } else {
        console.log('NFC desteği mevcut değil');
        // NFC olmayan cihazlar için alternatif yöntemler
        setupAlternativeMethods();
    }
}

// NFC kurulumu
async function setupNFC() {
    try {
        const ndef = new NDEFReader();
        await ndef.scan();
        
        ndef.addEventListener("reading", ({ message, serialNumber }) => {
            console.log("NFC kart okundu:", serialNumber);
            showNotification("NFC kart başarıyla okundu!");
        });
        
        ndef.addEventListener("error", () => {
            console.error("NFC okuma hatası");
            showNotification("NFC okuma hatası oluştu", "error");
        });
        
    } catch (error) {
        console.error("NFC başlatılamadı:", error);
        showNotification("NFC başlatılamadı", "error");
    }
}

// Alternatif yöntemler (QR kod, vCard vb.)
function setupAlternativeMethods() {
    // QR kod göster
    showQRCode();
    
    // vCard indirme butonu ekle
    addVCardButton();
}

// QR kod göster
function showQRCode() {
    const qrContainer = document.createElement('div');
    qrContainer.className = 'qr-container';
    qrContainer.innerHTML = `
        <div class="qr-modal">
            <div class="qr-content">
                <h3>QR Kod ile Tarayın</h3>
                <div class="qr-code">
                    <!-- QR kod buraya gelecek -->
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}" alt="QR Kod">
                </div>
                <button class="close-qr">Kapat</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(qrContainer);
    
    // QR kod modalını kapat
    qrContainer.querySelector('.close-qr').addEventListener('click', function() {
        qrContainer.remove();
    });
}

// vCard butonu ekle
function addVCardButton() {
    const vCardButton = document.createElement('button');
    vCardButton.className = 'vcard-btn';
    vCardButton.innerHTML = '<i class="fas fa-download"></i> vCard İndir';
    vCardButton.addEventListener('click', downloadVCard);
    
    document.querySelector('.card-footer').appendChild(vCardButton);
}

// Kişiyi kaydet (vCard oluştur)
function saveContact() {
    if (navigator.share) {
        // Web Share API kullan
        const contactData = {
            title: `${personalInfo.fullName} - Kartvizit`,
            text: `${personalInfo.title} - ${personalInfo.company}`,
            url: window.location.href
        };
        
        navigator.share(contactData)
            .then(() => showNotification('Kartvizit paylaşıldı'))
            .catch(() => downloadVCard());
    } else {
        // vCard indir
        downloadVCard();
    }
}

// vCard indir
function downloadVCard() {
    const vCardData = createVCard();
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${personalInfo.fullName.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('vCard indirildi');
}

// vCard verisi oluştur
function createVCard() {
    return `BEGIN:VCARD
VERSION:3.0
FN:${personalInfo.fullName}
ORG:${personalInfo.company}
TITLE:${personalInfo.title}
TEL:${personalInfo.phone}
EMAIL:${personalInfo.email}
URL:${personalInfo.website}
ADR:;;${personalInfo.location};;;;
END:VCARD`;
}

// Panoya kopyala
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Kopyalama hatası:', err);
        });
    } else {
        // Fallback yöntem
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// Bildirim göster
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Animasyonlar için CSS ekle
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .qr-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    
    .qr-modal {
        background: white;
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        max-width: 300px;
    }
    
    .qr-modal h3 {
        margin-bottom: 20px;
        color: #333;
    }
    
    .qr-code img {
        max-width: 100%;
        height: auto;
    }
    
    .close-qr {
        margin-top: 20px;
        background: #667eea;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
    }
    
    .vcard-btn {
        background: #28a745;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 14px;
        cursor: pointer;
        margin-left: 10px;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        transition: all 0.3s ease;
    }
    
    .vcard-btn:hover {
        background: #218838;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

// PWA (Progressive Web App) desteği için
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker kaydedildi:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker kaydedilemedi:', error);
            });
    });
}
