// Kişisel Bilgiler
const personalInfo = {
    fullName: "Can Demir ERDOĞAN",
    title: "Öğrenci",
    phone: "+90 541 818 2334",
    email: "candemirerdogan0077@gmail.com",
    website: "https://github.com/sheep-ghub",
    location: "Antalya, Türkiye",
    GunsLol: "https://guns.lol/_sheep_",
    github: "https://github.com/sheep-ghub",
    instagram: "https://instagram.com/cde:.07",
    profileImage: "profileimage/ben.jpg"
};

// Yetenekler
const skills = [
    { icon: "fas fa-code", name: "Web Developing" },
    { icon: "fas fa-mobile-alt", name: "physical NFC" },
    { icon: "fas fa-database", name: "CNC Developing" },
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
    // Saati güncelle
    updateClock();
    setInterval(updateClock, 1000);
});

// Kişisel bilgileri yükle
function loadPersonalInfo() {
    document.getElementById('fullName').textContent = personalInfo.fullName;
    document.getElementById('title').textContent = personalInfo.title;
    document.getElementById('phone').textContent = personalInfo.phone;
    document.getElementById('email').textContent = personalInfo.email;
    document.getElementById('gunsLol').href = personalInfo.GunsLol;
    document.getElementById('location').textContent = personalInfo.location;
    document.getElementById('profileImage').src = personalInfo.profileImage;
    
    // Sosyal medya linkleri
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

// Saati güncelle
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    document.getElementById('currentTime').textContent = timeString;
}





// Kişiyi kaydet (vCard oluştur)
function saveContact() {
    if (navigator.share) {
        // Web Share API kullan
        const contactData = {
            title: `${personalInfo.fullName} - Kartvizit`,
            text: `${personalInfo.title}`,
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
TITLE:${personalInfo.title}
TEL:${personalInfo.phone}
EMAIL:${personalInfo.email}
URL:${personalInfo.GunsLol}
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
