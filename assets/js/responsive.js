/**
 * BASSWOODS Responsive Engine: 100% Premium Auto-Optimization
 * This script ensures the fluid REM scaling remains stable across all edge cases.
 */

const BasswoodsResponsive = (() => {
    const init = () => {
        // Handle High-DPI scaling and orientation changes
        window.addEventListener('resize', debouncedUpdate);
        window.addEventListener('orientationchange', debouncedUpdate);
        
        updateRootScale();
        console.log('BASSWOODS Responsive Engine: Active');
    };

    let resizeTimer;
    const debouncedUpdate = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateRootScale, 150);
    };

    const updateRootScale = () => {
        const width = window.innerWidth;
        const root = document.documentElement;

        // Mobile: Use the 12px root defined in premium.css (33% zoom-out)
        if (width < 1024) {
            root.style.fontSize = '12px';
            return;
        }

        // Fluid Scaling Logic for Desktop (Auto-Optimize)
        // Calculated proportionally to 1440px base design at 12px root
        const baseWidth = 1440;
        const targetSize = (width / baseWidth) * 12;
        
        // Clamp between 11px and 14px for premium density
        const clampedSize = Math.min(Math.max(targetSize, 11), 14);
        
        root.style.fontSize = `${clampedSize}px`;
    };

    return { init };
})();

// Initialize on Load
document.addEventListener('DOMContentLoaded', BasswoodsResponsive.init);
