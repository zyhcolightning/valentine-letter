// ===== PHOTO CONFIGURATION =====
// These photos are included and will show for everyone
// Upload your photos to images folder in the same directory
const initialPhotos = [
    {
        id: 1,
        src: 'images/photo1.jpg',
        caption: 'Us. Always.❤️',
        isInitial: true
    },
    {
        id: 2,
        src: 'images/photo2.jpg',
        caption: 'My forever mood. 😘',
        isInitial: true
    },
    {
        id: 3,
        src: 'images/photo3.jpg',
        caption: 'Love in every frame. 😊',
        isInitial: true
    }
    // Add more of YOUR photos here:
    // {
    //     id: 4,
    //     src: 'images/photo4.jpg',
    //     caption: 'Another memory',
    //     isInitial: true
    // },
];
// ===== END OF PHOTO CONFIGURATION =====

let userPhotos = [];
let isPlaying = false;
let bgAudio = null; // <audio> element for user MP3

// ===== PHOTO MANAGEMENT FUNCTIONS =====
function loadUserPhotos() {
    const saved = localStorage.getItem('valentineUserPhotos');
    if (saved) {
        userPhotos = JSON.parse(saved);
    }
}

function saveUserPhotos() {
    localStorage.setItem('valentineUserPhotos', JSON.stringify(userPhotos));
}

function displayAllPhotos() {
    const gallery = document.getElementById('photoGallery');
    gallery.innerHTML = '';
    
    const allPhotos = [...initialPhotos, ...userPhotos];
    
    if (allPhotos.length > 0) {
        allPhotos.forEach(photo => {
            addPhotoToGallery(photo);
        });
    } else {
        gallery.innerHTML = `
            <div class="empty-gallery">
                Click "Add Photos" to upload your favorite memories together ❤️
            </div>
        `;
    }
}

function addPhotoToGallery(photoData) {
    const gallery = document.getElementById('photoGallery');
    
    const photoItem = document.createElement('div');
    photoItem.className = 'photo-item';
    photoItem.setAttribute('data-id', photoData.id);
    
    const caption = photoData.caption || 'Our memory';
    const deleteBtn = photoData.isInitial ? '' : `<button class="delete-btn" onclick="deletePhoto(${photoData.id})">×</button>`;
    
    photoItem.innerHTML = `
        <img src="${photoData.src}" alt="Memory">
        ${deleteBtn}
        <div class="photo-caption">${caption}</div>
    `;
    
    // Click to view in lightbox
    photoItem.querySelector('img').addEventListener('click', function(e) {
        e.stopPropagation();
        openLightbox(photoData.src);
    });
    
    gallery.appendChild(photoItem);
}

function deletePhoto(id) {
    const photoToDelete = userPhotos.find(p => p.id === id);
    
    if (photoToDelete) {
        userPhotos = userPhotos.filter(p => p.id !== id);
        saveUserPhotos();
        
        const photoElement = document.querySelector(`[data-id="${id}"]`);
        if (photoElement) {
            photoElement.style.animation = 'photoFadeIn 0.3s reverse';
            setTimeout(() => {
                displayAllPhotos();
            }, 300);
        }
    }
}

function resetGallery() {
    if (confirm('This will remove all the photos you uploaded. Original photos will remain. Continue?')) {
        localStorage.removeItem('valentineUserPhotos');
        userPhotos = [];
        displayAllPhotos();
    }
}

// ===== LIGHTBOX FUNCTIONS =====
function openLightbox(src) {
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// ===== FLOATING ELEMENTS =====
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 3 + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.2;
    document.getElementById('floatingHearts').appendChild(heart);
}

function createConstellation() {
    const constellation = document.createElement('div');
    constellation.className = 'constellation';
    constellation.style.left = Math.random() * 100 + '%';
    constellation.style.top = Math.random() * 100 + '%';
    constellation.style.animationDelay = Math.random() * 3 + 's';
    document.getElementById('floatingHearts').appendChild(constellation);
}

// ===== BACKGROUND EMOJI (AIRPLANES & RINGS) =====
function createBackgroundEmoji(type) {
    const container = document.getElementById('floatingHearts');
    if (!container) return;

    const el = document.createElement('div');
    el.className = 'bg-emoji ' + (type === 'airplane' ? 'airplane' : 'rings');
    el.textContent = type === 'airplane' ? '✈️' : '💍';

    // random start position (lower half so they drift upward)
    el.style.left = Math.random() * 100 + '%';
    el.style.top = (60 + Math.random() * 35) + '%';

    // random size
    const size = Math.floor(18 + Math.random() * 24);
    el.style.fontSize = size + 'px';

    // random animation delay to stagger motion
    el.style.animationDelay = (Math.random() * 6) + 's';

    container.appendChild(el);

    // remove after a while to avoid DOM buildup
    setTimeout(() => {
        if (el && el.remove) el.remove();
    }, 30000 + Math.random() * 20000);
}

function createBackgroundEmojis() {
    // initial batch (denser)
    for (let i = 0; i < 20; i++) createBackgroundEmoji('airplane');
    for (let i = 0; i < 14; i++) createBackgroundEmoji('rings');

    // ongoing periodic additions (more frequent and sometimes spawn clusters)
    setInterval(() => {
        const na = 1 + Math.floor(Math.random() * 3); // 1-3 airplanes
        for (let i = 0; i < na; i++) createBackgroundEmoji('airplane');

        if (Math.random() < 0.75) {
            const nr = Math.floor(Math.random() * 2); // 0-1 rings
            for (let i = 0; i < nr; i++) createBackgroundEmoji('rings');
        }

        // occasional burst of mixed emoji
        if (Math.random() < 0.18) {
            const burst = 4 + Math.floor(Math.random() * 6);
            for (let i = 0; i < burst; i++) {
                createBackgroundEmoji(Math.random() < 0.6 ? 'airplane' : 'rings');
            }
        }
    }, 1200);
}

// ===== INTERACTIVE EFFECTS =====
function createConfettiBurst() {
    const colors = ['#ff6b6b', '#ff8787', '#ffa5a5', '#e63946', '#ff1744'];
    const shapes = ['❤️', '💕', '🌹', '✨', '⭐'];
    
    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-20px';
        confetti.style.fontSize = (Math.random() * 20 + 10) + 'px';
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animation = `confettiFall ${3 + Math.random() * 2}s ease-out forwards`;
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

function showLove() {
    const button = event.target;
    button.classList.add('surprise');
    
    // Create burst of hearts
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'click-heart';
            heart.textContent = ['❤️', '💕', '💖', '💗', '💓', '✨', '🌹'][Math.floor(Math.random() * 7)];
            heart.style.left = (window.innerWidth / 2) + 'px';
            heart.style.top = (window.innerHeight / 2) + 'px';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            document.getElementById('interactiveHearts').appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 30);
    }

    // Create confetti burst
    createConfettiBurst();

    // Change button text temporarily
            const originalText = button.textContent;
            button.textContent = 'Kisses Sent! 💋';
    button.style.background = 'linear-gradient(135deg, #ff8787, #ffa5a5)';
    
    setTimeout(() => {
        button.classList.remove('surprise');
        button.textContent = originalText;
        button.style.background = 'linear-gradient(135deg, #ff6b6b, #e63946)';
    }, 2000);
}

// Music now uses local <audio id="bgMusic"> element (music.mp3) — procedural generator removed

// ===== PAGE LOAD & INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Load photos
    loadUserPhotos();
    displayAllPhotos();

    // Initialize floating hearts
    for (let i = 0; i < 15; i++) {
        createFloatingHeart();
    }

    // Start background emoji (airplanes & rings)
    createBackgroundEmojis();

    // Create constellation background
    for (let i = 0; i < 50; i++) {
        createConstellation();
    }

    // Cursor glow effect
    const cursorGlow = document.getElementById('cursorGlow');
    document.addEventListener('mousemove', function(e) {
        cursorGlow.style.left = (e.clientX - 15) + 'px';
        cursorGlow.style.top = (e.clientY - 15) + 'px';
    });

    document.addEventListener('mouseleave', function() {
        cursorGlow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', function() {
        cursorGlow.style.opacity = '1';
    });

    // Interactive hearts on click
    document.addEventListener('click', function(e) {
        const heart = document.createElement('div');
        heart.className = 'click-heart';
        heart.textContent = '❤️';
        heart.style.left = e.pageX + 'px';
        heart.style.top = e.pageY + 'px';
        document.getElementById('interactiveHearts').appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.love-button, .upload-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            ripple.style.width = ripple.style.height = '20px';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });

    // Music toggle: play/pause local music.mp3 (user should place music.mp3 in same folder)
    bgAudio = document.getElementById('bgMusic');
    if (bgAudio) {
        // Add basic error handling to inform if file is missing
        bgAudio.addEventListener('error', function() {
            console.warn('Background music failed to load: check valentine/music.mp3');
            if (!document.getElementById('bgMusic').dataset.alerted) {
                alert('Background music not found. Place music.mp3 in the same folder as index.html');
                document.getElementById('bgMusic').dataset.alerted = '1';
            }
        });
        // Ensure a src is present (fallback)
        if (!bgAudio.src || bgAudio.src === window.location.href) {
            bgAudio.src = 'music.mp3';
        }
        // Default volume ~50%
        try { bgAudio.volume = 0.25; } catch (e) { /* ignore */ }
    }

    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            isPlaying = !isPlaying;
            this.classList.toggle('playing');
            console.log('Music toggle clicked, isPlaying=', isPlaying, 'bgAudio.src=', bgAudio && bgAudio.src);
            if (bgAudio) {
                if (isPlaying) {
                    bgAudio.play().catch(err => {
                        console.warn('Play prevented:', err);
                    });
                } else {
                    bgAudio.pause();
                }
            }
        });
    } else {
        console.warn('No #musicToggle element found in DOM.');
    }

    // Parallax effect on envelope
    document.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        document.querySelector('.envelope').style.transform = 
            `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg) translateY(-5px)`;
    });

    // Scroll animation reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'slideInText 0.8s ease-out';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.letter-body p').forEach(p => {
        observer.observe(p);
    });

    // Photo upload handler
    document.getElementById('photoInput').addEventListener('change', function(e) {
        const files = e.target.files;
        
        for (let file of files) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    const photoData = {
                        id: Date.now() + Math.random(),
                        src: event.target.result,
                        caption: file.name,
                        isInitial: false
                    };
                    
                    userPhotos.push(photoData);
                    saveUserPhotos();
                    displayAllPhotos();
                };
                
                reader.readAsDataURL(file);
            }
        }
        
        // Reset input
        e.target.value = '';
    });

    // Lightbox event listeners
    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});
