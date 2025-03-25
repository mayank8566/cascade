// Galaxy Theme JS for CASCADE Website

document.addEventListener('DOMContentLoaded', function() {
    // Remove star animations to improve performance
    // createStars();
    
    // Check if on login/register/dashboard page
    const currentPath = window.location.pathname;
    
    // Initialize Firebase on auth pages and dashboard
    if (currentPath === '/login' || currentPath === '/register' || currentPath === '/dashboard') {
        // Firebase will be initialized directly in the page templates
    } else {
        // Main website pages - Add join button functionality
        const joinBtn = document.querySelector('.join-btn');
        if (joinBtn) {
            joinBtn.addEventListener('click', function() {
                window.location.href = '/register';
            });
        }
        
        // Add nav link hover effect
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('mouseover', function() {
                link.style.textShadow = '0 0 10px #fff, 0 0 20px #a000ff';
            });
            
            link.addEventListener('mouseout', function() {
                link.style.textShadow = 'none';
            });
        });
    }
    
    // Fade in elements on page load
    const fadeElements = document.querySelectorAll('.hero-content, .feature-card, .about-card, .member-card, .team-section, .join-team');
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Run scroll check once on page load
    checkScroll();
});

// Create dynamic stars in the background - Disabled to improve performance
function createStars() {
    // Function disabled to reduce lag
    return;
    
    // Original function code kept for reference
    /*
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 2;
        
        // Random opacity
        const opacity = Math.random();
        
        // Random animation delay
        const delay = Math.random() * 10;
        
        star.style.cssText = `
            position: absolute;
            top: ${y}%;
            left: ${x}%;
            width: ${size}px;
            height: ${size}px;
            background-color: white;
            border-radius: 50%;
            opacity: ${opacity};
            animation: twinkle 5s infinite alternate;
            animation-delay: ${delay}s;
        `;
        
        starsContainer.appendChild(star);
    }
    */
}

// Add scroll reveal effect for elements
function checkScroll() {
    const elements = document.querySelectorAll('.feature-card, .about-card, .member-card, .timeline-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkScroll); 