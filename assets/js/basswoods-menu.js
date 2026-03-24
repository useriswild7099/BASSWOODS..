document.addEventListener('DOMContentLoaded', () => {
    const menuToggleBtn = document.querySelector('.site-menu-toggle');
    const menuCloseBtn = document.querySelector('.site-menu-close');
    const siteMenu = document.querySelector('.site-menu');

    if (menuToggleBtn && siteMenu) {
        menuToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            siteMenu.classList.add('is-active');
            document.body.style.overflow = 'hidden'; // stop page scroll
        });
    }

    if (menuCloseBtn && siteMenu) {
        menuCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            siteMenu.classList.remove('is-active');
            document.body.style.overflow = '';
        });
    }

    // Handle Image Hovers
    const navItems = document.querySelectorAll('.site-menu-nav-item');
    const imageItems = document.querySelectorAll('.site-menu-images-item');

    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const targetId = item.getAttribute('data-image');
            if (!targetId) return;

            // Remove active from all
            imageItems.forEach(img => img.classList.remove('active'));
            
            // Add active to target
            const targetImg = document.getElementById(targetId);
            if (targetImg) {
                targetImg.classList.add('active');
            }
        });
    });
    // Scroll Header Behavior
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        });
    }
});
