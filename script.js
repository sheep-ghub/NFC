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
    steam: "https://steamcommunity.com/id/ArcBurst/",
    spotify: "https://open.spotify.com/user/31akqle3ptbnlhfqkhz4dtwc65fi?si=2881847f61454bf9",
    bio: "Antalya OSB Bölgesinde 9. Sınıf Makine Bölümü Meslek Öğrencisiyim. Aynı Zamanda RC Hobilerine, Yazılıma Ve Makinelere İlgim Var. Kendimi Geliştirmek İçin Çeşitli Projeler Yapıyorum.",
    profileImage: "profileimage/ben.jpg"
};

// Yetenekler
const skills = [
    { icon: "fas fa-code", name: "Web Developing" },
    { icon: "fas fa-mobile-alt", name: "physical NFC" },
    { icon: "fas fa-database", name: "CNC Developing" },
];


// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    loadPersonalInfo();
    loadSkills();
    setupEventListeners();
    // Saati güncelle
    updateClock();
    setInterval(updateClock, 1000);
    // Yağmur animasyonunu başlat
    createRain();
    // 3D mouse efekti
    setup3DEffect();
    // Mouse trail efekti (sadece desktop)
    if (!window.DeviceOrientationEvent) {
        setupMouseTrail();
    }
    // Mobile gyroscope efekti
    setupGyroscopeEffect();
});

// Kişisel bilgileri yükle
function loadPersonalInfo() {
    document.getElementById('fullName').textContent = personalInfo.fullName;
    document.getElementById('title').textContent = personalInfo.title;
    document.getElementById('phone').innerHTML = `<a href="tel:${personalInfo.phone}">${personalInfo.phone}</a>`;
    document.getElementById('email').innerHTML = `<a href="mailto:${personalInfo.email}">${personalInfo.email}</a>`;
    document.getElementById('gunsLol').href = personalInfo.GunsLol;
    document.getElementById('location').textContent = personalInfo.location;
    document.getElementById('bioText').textContent = personalInfo.bio;
    document.getElementById('profileImage').src = personalInfo.profileImage;
    
    // Sosyal medya linkleri
    document.getElementById('github').href = personalInfo.github;
    document.getElementById('instagram').href = personalInfo.instagram;
    document.getElementById('steam').href = personalInfo.steam;
    document.getElementById('spotify').href = personalInfo.spotify;
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
    const clockElement = document.getElementById('currentTime');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

// Yağmur animasyonu oluştur
function createRain() {
    const rainContainer = document.getElementById('rainContainer');
    if (!rainContainer) return;
    
    const dropCount = 100;
    
    for (let i = 0; i < dropCount; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = Math.random() * 2 + 3 + 's';
        drop.style.animationDelay = Math.random() * 2 + 's';
        drop.style.opacity = Math.random() * 0.3 + 0.1;
        rainContainer.appendChild(drop);
    }
}

// 3D mouse efekti - optimize edilmiş
function setup3DEffect() {
    const elements = document.querySelectorAll('.profile-img, .clock-indicator, .card-body h1, .card-body p, .contact-item, .social-link, .save-contact-btn, .bio-container h2, .bio-text p, .skills-section h3, .skill-item');
    
    let ticking = false;
    
    function update3DEffect(e) {
        if (!ticking) {
            requestAnimationFrame(() => {
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                
                const rotateX = (mouseY - centerY) / centerY * 8;
                const rotateY = (centerX - mouseX) / centerX * 8;
                
                elements.forEach((element, index) => {
                    // Daha az delay ve daha akıcı
                    const delay = index * 0.01;
                    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    element.style.transition = `transform 0.1s ease-out ${delay}s`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    document.addEventListener('mousemove', update3DEffect, { passive: true });
    
    // Mouse sayfadan ayrıldığında sıfırla
    document.addEventListener('mouseleave', () => {
        elements.forEach(element => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// Mouse trail efekti - optimize edilmiş
function setupMouseTrail() {
    let lastTrailTime = 0;
    const trailInterval = 50; // 50ms'de bir trail oluştur
    
    document.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();
        
        if (currentTime - lastTrailTime > trailInterval) {
            createMouseTrail(e.clientX, e.clientY);
            lastTrailTime = currentTime;
        }
    }, { passive: true });
}

// Mouse trail oluştur
function createMouseTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    document.body.appendChild(trail);
    
    // 0.8 saniye sonra kaldır
    setTimeout(() => {
        trail.remove();
    }, 800);
}

// Mobile gyroscope efekti - optimize edilmiş
function setupGyroscopeEffect() {
    if (!window.DeviceOrientationEvent) {
        return;
    }
    
    // iOS için izin iste
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(response => {
                if (response === 'granted') {
                    startGyroscope();
                }
            })
            .catch(console.error);
    } else {
        // Android ve diğerleri
        startGyroscope();
    }
    
    function startGyroscope() {
        const elements = document.querySelectorAll('.profile-img, .clock-indicator, .card-body h1, .card-body p, .contact-item, .social-link, .save-contact-btn, .bio-container h2, .bio-text p, .skills-section h3, .skill-item');
        
        let ticking = false;
        
        function handleOrientation(e) {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const { beta, gamma } = e;
                    
                    // Değerleri sınırla (maksimum 8 derece)
                    const rotateX = Math.max(-8, Math.min(8, beta / 12));
                    const rotateY = Math.max(-8, Math.min(8, gamma / 12));
                    
                    elements.forEach((element, index) => {
                        const delay = index * 0.01;
                        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                        element.style.transition = `transform 0.1s ease-out ${delay}s`;
                    });
                    
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }
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
