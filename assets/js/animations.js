
document.addEventListener('DOMContentLoaded', function() {
    initScrollReveal();
    initTypingEffect();
    initCodeAnimation();
    initScrollIndicator();
});


// Reveal elements on scroll

function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal-on-scroll'); //add this to things to be 'revealed'
    
    // observer config
    const config = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Add staggered effect for children
                const staggerItems = entry.target.querySelectorAll('.stagger-item');
                if (staggerItems.length) {
                    staggerItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('stagger-in');
                        }, 100 * index);
                    });
                }
                
                // unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, config);
    

    elements.forEach(element => {
        observer.observe(element);
    });
    
    const heroElements = document.querySelectorAll('.hero-section .reveal-text, .hero-section .reveal-text-delay');
    
    heroElements.forEach(element => {
        element.classList.add('revealed');
    });
}


function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    if (!typingElements.length) return;
    
    typingElements.forEach(element => {
        const text = element.getAttribute('data-text');
        const originalText = element.textContent;
        
        if (!text) return;
        
        //clear text:
        element.textContent = '';
        
        //split text into arrays of strings for long texts
        const textArray = text.split('|');
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = textArray[textIndex];
            
            if (isDeleting) {
                //deleting text
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                
                //to next text
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % textArray.length;
                    setTimeout(type, 500); // Pause before typing next
                    return;
                }
            } else {
                //typing text
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                
                //start deleting / move to next text
                if (charIndex === currentText.length) {
                    // If only one phrase or last phrase and not set to loop
                    if (textArray.length === 1 || (textIndex === textArray.length - 1 && element.getAttribute('data-loop') !== 'true')) {
                        return;
                    }
                    
                    isDeleting = true;
                    setTimeout(type, 1000); //pause before deleting
                    return;
                }
            }
            
            const typingSpeed = isDeleting ? 30 : 70; // faster speed when deleting than writing
            setTimeout(type, typingSpeed);
        }
        
        //start typing
        setTimeout(type, 500);
    });
}

//Animated code highlighting

function initCodeAnimation() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    if (window.Prism) {
        Prism.highlightAll();
    }
    
    //line-by-line animation
    codeBlocks.forEach(block => {
        const code = block.innerHTML;
        const lines = code.split('\n');
        let animatedCode = '';
        
        lines.forEach((line, index) => {
            if (line.trim() !== '') {
                animatedCode += `<div class="code-line" style="animation-delay: ${index * 100}ms">${line}</div>`;
            } else {
                animatedCode += `<div class="code-line">${line}</div>`;
            }
        });
        
        block.innerHTML = animatedCode;
    });
}

// Animated scroll indicator
// not present in current version - clashing with terminal 

function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (!scrollIndicator) return;
    
    // fade out scroll indicator when user scrolls down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}
