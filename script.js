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

// JavaScript untuk pencarian yang lebih kompleks
document.querySelector('.search-box button').addEventListener('click', function() {
    performSearch();
});

// Tambahkan event listener untuk tombol Enter di input pencarian
document.querySelector('.search-box input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Fungsi pencarian utama
function performSearch() {
    const searchTerm = document.querySelector('.search-box input').value.toLowerCase().trim();
    
    if (searchTerm === '') {
        alert('Silakan masukkan kata kunci pencarian');
        return;
    }
    
    // Hapus highlight dari pencarian sebelumnya
    removeHighlights();
    
    // Tutup semua accordion terlebih dahulu
    closeAllAccordions();
    
    // Cari di seluruh konten halaman
    const searchableElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, li, a, .gallery-caption, .video-info, .article-content');
    let foundResults = false;
    let firstResult = null;
    
    searchableElements.forEach(element => {
        const textContent = element.textContent.toLowerCase();
        
        if (textContent.includes(searchTerm)) {
            foundResults = true;
            
            // Highlight teks yang ditemukan
            highlightText(element, searchTerm);
            
            // Temukan accordion parent dan buka
            const accordion = findParentAccordion(element);
            if (accordion) {
                accordion.classList.add('active');
            }
            
            // Simpan hasil pertama untuk scroll otomatis
            if (!firstResult) {
                firstResult = element;
            }
        }
    });
    
    if (foundResults) {
        // Scroll ke hasil pertama
        if (firstResult) {
            setTimeout(() => {
                firstResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        }
        
        // Tampilkan jumlah hasil
        showSearchResults(searchTerm);
    } else {
        alert('Tidak ditemukan hasil untuk: ' + searchTerm);
    }
}

// Fungsi untuk mencari parent accordion dari elemen
function findParentAccordion(element) {
    let parent = element.parentElement;
    
    while (parent) {
        if (parent.classList.contains('accordion')) {
            return parent;
        }
        parent = parent.parentElement;
    }
    
    return null;
}

// Fungsi untuk menutup semua accordion
function closeAllAccordions() {
    document.querySelectorAll('.accordion').forEach(accordion => {
        accordion.classList.remove('active');
    });
}

// Fungsi untuk menyorot teks yang ditemukan
function highlightText(element, searchTerm) {
    const text = element.textContent;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const highlightedText = text.replace(regex, '<mark class="search-highlight">$1</mark>');
    
    element.innerHTML = highlightedText;
}

// Fungsi untuk menghapus semua highlight
function removeHighlights() {
    document.querySelectorAll('.search-highlight').forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
}

// Fungsi untuk menampilkan hasil pencarian
function showSearchResults(searchTerm) {
    // Hitung jumlah hasil
    const resultCount = document.querySelectorAll('.search-highlight').length;
    
    // Buat atau perbarui notifikasi hasil
    let resultsNotification = document.getElementById('search-results-notification');
    
    if (!resultsNotification) {
        resultsNotification = document.createElement('div');
        resultsNotification.id = 'search-results-notification';
        resultsNotification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: #3498db;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 1001;
            font-size: 14px;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(resultsNotification);
    }
    
    resultsNotification.innerHTML = `Ditemukan ${resultCount} hasil untuk: "${searchTerm}"`;
    resultsNotification.style.opacity = '1';
    
    // Hilangkan notifikasi setelah 5 detik
    setTimeout(() => {
        resultsNotification.style.opacity = '0';
        setTimeout(() => {
            if (resultsNotification.parentNode) {
                resultsNotification.parentNode.removeChild(resultsNotification);
            }
        }, 300);
    }, 5000);
}

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