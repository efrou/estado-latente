// Header scroll effect
const header = document.querySelector('.main-header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Language switching functionality
let currentLang = 'es';
let translations = window.translations_es; // Start with Spanish translations

// Function to update text content
function updateContent() {
    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = translations;
        for (const k of keys) {
            value = value[k];
        }
        if (value) {
            element.textContent = value;
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const keys = key.split('.');
        let value = translations;
        for (const k of keys) {
            value = value[k];
        }
        if (value) {
            element.placeholder = value;
        }
    });
}

// Function to switch language
function switchLanguage(lang) {
    // Update active state of language buttons
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Set translations based on selected language
    translations = lang === 'en' ? window.translations_en : window.translations_es;
    currentLang = lang;
    document.documentElement.lang = lang;
    updateContent();
}

// Add click event listeners to language buttons
document.querySelectorAll('.language-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        switchLanguage(lang);
    });
});

// Initialize with default language
switchLanguage(currentLang);

// Video Modal functionality
const videoModal = document.getElementById('videoModal');
const watchReelBtn = document.querySelector('.watch-reel-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const modalClose = document.querySelector('.modal-close');
const featuredProjectsSection = document.querySelector('.featured-projects');

// Only set up modal functionality if all required elements exist
if (videoModal && watchReelBtn && modalOverlay && modalClose && featuredProjectsSection) {
    console.log('Modal elements found:', { videoModal, watchReelBtn, modalOverlay, modalClose, featuredProjectsSection });

    function openModal() {
        console.log('Opening modal');
        videoModal.style.display = 'block'; // Force display block
        setTimeout(() => {
            videoModal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        console.log('Closing modal');
        videoModal.classList.remove('active');
        
        // Stop the YouTube video
        const iframe = videoModal.querySelector('iframe');
        if (iframe) {
            const videoSrc = iframe.src;
            iframe.src = videoSrc; // This resets the video by reloading the iframe
        }
        
        setTimeout(() => {
            videoModal.style.display = 'none';
            document.body.style.overflow = '';
            
            // Calculate the scroll position for a subtle downward movement
            const currentScroll = window.scrollY;
            const targetScroll = Math.max(currentScroll + 100, featuredProjectsSection.offsetTop - 50);
            
            // Smooth scroll animation
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });
        }, 300); // Match the transition duration
    }

    // Open modal when clicking the watch reel button
    watchReelBtn.addEventListener('click', (e) => {
        console.log('Watch reel button clicked');
        e.preventDefault();
        openModal();
    });

    // Close modal when clicking the overlay or close button
    modalOverlay.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);

    // Close modal when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });
} else {
    console.log('Missing modal elements:', {
        videoModal: !!videoModal,
        watchReelBtn: !!watchReelBtn,
        modalOverlay: !!modalOverlay,
        modalClose: !!modalClose,
        featuredProjectsSection: !!featuredProjectsSection
    });
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavContainer = document.querySelector('.mobile-nav-container');
    const closeBtn = document.querySelector('.mobile-nav-container .hamburger-menu'); // el botón para cerrar
    const body = document.body;

    hamburgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNavContainer.classList.toggle('active');
        body.style.overflow = mobileNavContainer.classList.contains('active') ? 'hidden' : '';
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            mobileNavContainer.classList.remove('active');
            body.style.overflow = '';
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileNavContainer.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            hamburgerMenu.classList.remove('active');
            mobileNavContainer.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            mobileNavContainer.classList.remove('active');
            body.style.overflow = '';
        });
    });
}); 