// Lenis Smooth Scroll Initialization for BASSWOODS
document.addEventListener('DOMContentLoaded', () => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Get scroll value
    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
        // console.log({ scroll, limit, velocity, direction, progress });
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync Lenis with internal links and scroll-to-top if any
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            lenis.scrollTo(this.getAttribute('href'));
        });
    });
});
