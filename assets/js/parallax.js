//parallax scrolling effect

document.addEventListener('DOMContentLoaded', function() {
    initParallax();
    initTiltEffect();
});

function initParallax() {
    const parallaxContainers = document.querySelectorAll('.parallax-container');
    
    if (!parallaxContainers.length) return;

    function updateParallax() {
        parallaxContainers.forEach(container => {
            const scrollPosition = window.pageYOffset;
            const containerTop = container.offsetTop;
            const containerHeight = container.offsetHeight;
            const windowHeight = window.innerHeight;
            if (
                scrollPosition + windowHeight > containerTop && 
                scrollPosition < containerTop + containerHeight
            ) {
                const parallaxBg = container.querySelector('.parallax-bg');
                if (parallaxBg) {
                    const speed = parseFloat(parallaxBg.getAttribute('data-speed') || 0.5);
                    const yPos = (scrollPosition - containerTop) * speed;
                    parallaxBg.style.transform = `translateY(${yPos}px)`;
                }
                const parallaxElements = container.querySelectorAll('[data-parallax]');
                parallaxElements.forEach(element => {
                    const elementSpeed = parseFloat(element.getAttribute('data-parallax') || 0.2);
                    const direction = element.getAttribute('data-direction') || 'up';
                    let yPos;
                    
                    if (direction === 'up') {
                        yPos = (scrollPosition - containerTop) * -elementSpeed;
                    } else {
                        yPos = (scrollPosition - containerTop) * elementSpeed;
                    }
                    
                    element.style.transform = `translateY(${yPos}px)`;
                });
            }
        });
    }
    window.addEventListener('scroll', updateParallax);
    updateParallax();
}


// i think this is not in use since hero became terminal
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    if (!tiltElements.length) return;
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
            const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1
            const intensity = element.getAttribute('data-tilt-intensity') || 10;
            element.style.transform = `perspective(1000px) rotateY(${xPercent * intensity}deg) rotateX(${-yPercent * intensity}deg)`;
        });
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        });
    });
}
