// JavaScript untuk efek scroll header
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// JavaScript untuk menu toggle pada perangkat mobile
document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('navLinks').classList.toggle('active');
});

// JavaScript untuk pencarian sederhana
document.querySelector('.search-box button').addEventListener('click', function() {
    const searchTerm = document.querySelector('.search-box input').value.toLowerCase();
    if (searchTerm.trim() !== '') {
        alert('Mencari: ' + searchTerm);
        // Di sini Anda bisa menambahkan logika pencarian yang lebih kompleks
    }
});

// JavaScript untuk smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Tutup menu mobile jika terbuka
            document.getElementById('navLinks').classList.remove('active');
        }
    });
});

// JavaScript untuk accordion
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        const accordion = this.parentElement;
        accordion.classList.toggle('active');
    });
});