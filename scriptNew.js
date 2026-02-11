// Video Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavContainer = document.querySelector('.mobile-nav-container');
    const closeBtn = document.querySelector('.mobile-nav-container .hamburger-menu');
    const body = document.body;

    if (hamburgerMenu && mobileNavContainer) {
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
    }

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

    // Language Switcher
    const languageButtons = document.querySelectorAll('.language-btn');
    let currentLang = 'es'; // Default language

    // Function to apply translations
    function applyTranslations(lang) {
        // Update text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (window.translations && window.translations[lang] && window.translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = window.translations[lang][key];
                } else {
                    element.textContent = window.translations[lang][key];
                }
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (window.translations && window.translations[lang] && window.translations[lang][key]) {
                element.placeholder = window.translations[lang][key];
            }
        });

        // Update page title
        if (window.translations && window.translations[lang] && window.translations[lang]['page.title']) {
            document.title = window.translations[lang]['page.title'];
        }

        // Handle music reel button visibility
        const musicReelButton = document.querySelector('.music-reel-button');
        if (musicReelButton) {
            musicReelButton.style.display = lang === 'es' ? 'block' : 'none';
        }
    }

    // Apply initial language
    applyTranslations(currentLang);

    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            if (lang === currentLang) return;

            // Update active state
            languageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentLang = lang;

            // Apply translations
            applyTranslations(lang);
        });
    });

    // Get all required elements
    const videoModal = document.getElementById('videoModal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const videoContainer = document.querySelector('.video-container');
    const playButtons = document.querySelectorAll('.play-btn');
    const watchReelBtn = document.querySelector('.watch-reel-btn');
    const musicReelBtn = document.querySelector('.music-reel-button .watch-reel-btn');

    // Check if all required elements exist
    const requiredElements = {
        videoModal,
        modalOverlay,
        modalClose,
        videoContainer
    };

    const missingElements = Object.entries(requiredElements)
        .filter(([_, element]) => !element)
        .map(([name]) => name);

    if (missingElements.length > 0) {
        console.error('Missing modal elements:', missingElements);
        return;
    }

    // Function to open modal with video
    function openVideoModal(videoId) {
        if (!videoId) return;
        
        // Get the current language
        const currentLang = document.querySelector('.language-btn.active').getAttribute('data-lang');
        
        // Map video IDs based on language for reel videos
        const reelVideoIds = {
            'es': 'hmFfWBrEUlo',  // Spanish reel
            'en': 'bJXyoDy4xZo'   // English reel
        };
        
        // Use the appropriate video ID based on language for reel videos
        const finalVideoId = videoId === 'hmFfWBrEUlo' ? reelVideoIds[currentLang] : videoId;
        
        const videoUrl = `https://www.youtube.com/embed/${finalVideoId}?autoplay=1&rel=0`;
        videoContainer.innerHTML = `<iframe 
            src="${videoUrl}" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
            style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;"
        ></iframe>`;
        
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Function to close modal
    function closeModal() {
        videoModal.classList.remove('active');
        videoContainer.innerHTML = '';
        document.body.style.overflow = '';
    }

    // Add click handlers for play buttons
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.getAttribute('data-video-id');
            openVideoModal(videoId);
        });
    });

    // Add click handler for watch reel button
    if (watchReelBtn) {
        watchReelBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.getAttribute('data-video-id');
            openVideoModal(videoId);
        });
    }

    // Add click handler for music reel button
    if (musicReelBtn) {
        musicReelBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.getAttribute('data-video-id');
            openVideoModal(videoId);
        });
    }

    // Add click handlers for closing modal
    modalOverlay.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const projectsGrid = document.querySelector('.projects-grid');
    const musicReelButton = document.querySelector('.music-reel-button');

    // Set initial filter state
    function updateFilter(filter) {
        // Update active state of filter buttons
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
        });

        // Get current language
        const currentLang = document.querySelector('.language-btn.active').getAttribute('data-lang');

        // Show/hide music reel button based on filter AND language
        if (musicReelButton) {
            musicReelButton.style.display = (filter === 'music-videos' && currentLang === 'es') ? 'block' : 'none';
        }

        // Filter projects
        projectItems.forEach(item => {
            const shouldShow = filter === 'all' || item.getAttribute('data-category') === filter;
            item.style.display = shouldShow ? 'block' : 'none';
        });
    }

    // Set initial state
    updateFilter('documentaries');

    // Add click handlers for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            updateFilter(filter);
        });
    });

    // Carousel navigation
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');

    function scrollToNext() {
        const projectItem = projectsGrid.querySelector('.project-item');
        if (!projectItem) return;
        
        const scrollAmount = projectItem.offsetWidth + 16; // 16px for the gap
        const currentScroll = projectsGrid.scrollLeft;
        const maxScroll = projectsGrid.scrollWidth - projectsGrid.clientWidth;
        const targetScroll = Math.min(maxScroll, currentScroll + scrollAmount);
        const isMobile = window.innerWidth <= 768;
        
        projectsGrid.scrollTo({
            left: targetScroll,
            behavior: isMobile ? 'smooth' : 'auto'
        });
    }

    function scrollToPrev() {
        const projectItem = projectsGrid.querySelector('.project-item');
        if (!projectItem) return;
        
        const scrollAmount = projectItem.offsetWidth + 16; // 16px for the gap
        const currentScroll = projectsGrid.scrollLeft;
        const targetScroll = Math.max(0, currentScroll - scrollAmount);
        const isMobile = window.innerWidth <= 768;
        
        projectsGrid.scrollTo({
            left: targetScroll,
            behavior: isMobile ? 'smooth' : 'auto'
        });
    }

    // Add click handlers for navigation arrows
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', scrollToPrev);
        nextButton.addEventListener('click', scrollToNext);
    }

    // Show/hide arrows based on scroll position
    function updateArrowVisibility() {
        if (!prevButton || !nextButton) return;
        
        const currentScroll = projectsGrid.scrollLeft;
        const maxScroll = projectsGrid.scrollWidth - projectsGrid.clientWidth;
        
        prevButton.style.opacity = currentScroll > 0 ? '1' : '0.5';
        nextButton.style.opacity = currentScroll < maxScroll ? '1' : '0.5';
    }

    projectsGrid.addEventListener('scroll', updateArrowVisibility);
    window.addEventListener('resize', updateArrowVisibility);
    
    // Initial arrow state
    updateArrowVisibility();

    // Mobile carousel touch handling
    function initCarousel() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        // Mouse events for dragging
        projectsGrid.addEventListener('mousedown', (e) => {
            isDown = true;
            projectsGrid.style.cursor = 'grabbing';
            startX = e.pageX - projectsGrid.offsetLeft;
            scrollLeft = projectsGrid.scrollLeft;
        });

        projectsGrid.addEventListener('mouseleave', () => {
            isDown = false;
            projectsGrid.style.cursor = 'grab';
        });

        projectsGrid.addEventListener('mouseup', () => {
            isDown = false;
            projectsGrid.style.cursor = 'grab';
        });

        projectsGrid.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - projectsGrid.offsetLeft;
            const walk = (x - startX);
            projectsGrid.scrollLeft = scrollLeft - walk;
        });
    }

    // Initialize carousel for mobile devices
    if (window.innerWidth <= 768) {
        initCarousel();
    }

    // Re-initialize carousel on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth <= 768) {
                initCarousel();
            }
        }, 250);
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');
    
    function smoothScroll(targetPosition, duration = 600) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        // Simple fixed offset for mobile
        const isMobile = window.innerWidth <= 768;
        const headerOffset = isMobile ? 120 : 80;
        const adjustedPosition = targetPosition - headerOffset;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            const easeOutExpo = progress => {
                return progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            };

            const newPosition = startPosition + (adjustedPosition - startPosition) * easeOutExpo(progress);
            window.scrollTo(0, newPosition);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop;
                smoothScroll(targetPosition);
            }
        });
    });
});

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
    
    // Update page title
    document.title = translations['page.title'];
    
    updateContent();
} 