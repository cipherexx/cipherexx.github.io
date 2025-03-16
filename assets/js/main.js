document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initCursor();
    initScrollAnimations();
    initProjectFilters();
    initContactForm();
    
    // Load projects dynamically
    loadProjects();
});



// Mobile Navigation

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    //toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    //close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    //scroll header effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    //smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    

    // on click of scroll indicator: currently not in use
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const headerOffset = 80;
                const elementPosition = aboutSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// cool hovering cursor:

function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        //delayed follower for smooth effect
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    //cursor hovers !!! :)
    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-item, .nav-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-grow');
            cursorFollower.classList.add('cursor-follower-grow');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-grow');
            cursorFollower.classList.remove('cursor-follower-grow');
        });
    });
}


function initScrollAnimations() {
    //reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); 
    
    //parallax effect
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const speed = element.getAttribute('data-speed') || 0.5;
            
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
}

// project filters, TODO: rewrite these after finishing projects and models pages
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

//mostly deprecated, delete after confirming
// function initContactForm() {
//     const contactForm = document.getElementById('contactForm');
    
//     if (contactForm) {
//         contactForm.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             // Get form data
//             const formData = new FormData(contactForm);
//             const formDataObj = {};
//             formData.forEach((value, key) => {
//                 formDataObj[key] = value;
//             });
            
//             const submitBtn = contactForm.querySelector('.submit-btn');
//             const btnText = submitBtn.querySelector('.btn-text');
//             const btnIcon = submitBtn.querySelector('.btn-icon');
            
//             const originalText = btnText.textContent;
//             btnText.textContent = 'Sending...';
//             btnIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
//             submitBtn.disabled = true;
            
//             // Send form data (using a placeholder function - replace with actual API call)
//             sendContactForm(formDataObj)
//                 .then(response => {
//                     // Success - show success message
//                     contactForm.reset();
//                     btnText.textContent = 'Message Sent!';
//                     btnIcon.innerHTML = '<i class="fas fa-check"></i>';
                    
//                     // Reset after 3 seconds
//                     setTimeout(() => {
//                         btnText.textContent = originalText;
//                         btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
//                         submitBtn.disabled = false;
//                     }, 3000);
//                 })
//                 .catch(error => {
//                     // Error - show error message
//                     console.error('Error submitting form:', error);
//                     btnText.textContent = 'Error - Try Again';
//                     btnIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
                    
//                     // Reset after 3 seconds
//                     setTimeout(() => {
//                         btnText.textContent = originalText;
//                         btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
//                         submitBtn.disabled = false;
//                     }, 3000);
//                 });
//         });
//     }
// }

// deprecated terminal implementation:
// const terminalOutput = document.getElementById('terminal-output');
// const userInput = document.getElementById('user-input');
// const asciiArt = `
//  _   _      _ _         _   _               
// | | | | ___| | | ___   | | | |___  ___ _ __ 
// | |_| |/ _ \\ | |/ _ \\  | | | / __|/ _ \\ '__|
// |  _  |  __/ | | (_) | | |_| \\__ \\  __/ |   
// |_| |_|\\___|_|_|\\___/   \\___/|___/\\___|_|   
// `;
// const welcomeMessage = "Welcome to Mihir's Personal Website.";
// const prompt = "user@remote:~$ ";

// function typeText(text, element, speed = 50) {
//     return new Promise(resolve => {
//         let i = 0;
//         function type() {
//             if (i < text.length) {
//                 element.innerHTML += text.charAt(i);
//                 i++;
//                 setTimeout(type, speed);
//             } else {
//                 resolve();
//             }
//         }
//         type();
//     });
// }

// async function animateTerminal() {
//     await typeText(asciiArt, terminalOutput, 10);
//     terminalOutput.innerHTML += '\n';
//     await typeText(welcomeMessage, terminalOutput);
//     terminalOutput.innerHTML += '\n\n';
//     await typeText(prompt, terminalOutput);
//     document.querySelector('.terminal-input').style.display = 'flex';
//     userInput.focus();
// }

// userInput.addEventListener('keydown', function(event) {
//     if (event.key === 'Enter') {
//         const command = userInput.value;
//         terminalOutput.innerHTML += command + '\n';
//         terminalOutput.innerHTML += "The system is still being built. You're early!\n\n";
//         terminalOutput.innerHTML += prompt;
//         userInput.value = '';
//         terminalOutput.scrollTop = terminalOutput.scrollHeight;
//         userInput.focus();
//     }
// });


// document.addEventListener('DOMContentLoaded', animateTerminal);

// deprecated terminal implementation:
// import { loadGeminiAPI, queryGemini } from './gemini-api.js';
// import { searchKnowledgeBase } from './rag-index.js';

// document.addEventListener('DOMContentLoaded', async function() {
//   // Your existing code for setting up the terminal
//   const terminalOutput = document.getElementById('terminal-output');
//   const userInput = document.getElementById('user-input');
//   const asciiArt = `
//  _   _      _ _         _   _               
// | | | | ___| | | ___   | | | |___  ___ _ __ 
// | |_| |/ _ \\ | |/ _ \\  | | | / __|/ _ \\ '__|
// |  _  |  __/ | | (_) | | |_| \\__ \\  __/ |   
// |_| |_|\\___|_|_|\\___/   \\___/|___/\\___|_|   
//   `;
//   const asciiArtMobile = `
// Hello User
// `;
//   const welcomeMessage = "Welcome to Mihir's Personal Website.";
//   const prompt = "user@remote:~$ ";

//   // Load the Gemini API
//   let apiReady = false;
//   try {
//     await loadGeminiAPI();
//     apiReady = true;
//     console.log('Gemini API loaded successfully');
//   } catch (error) {
//     console.error('Failed to load Gemini API:', error);
//   }

// function typeText(text, element, speed = 50) {
//     return new Promise(resolve => {
//         let i = 0;
//         function type() {
//             if (i < text.length) {
//                 element.innerHTML += text.charAt(i);
//                 i++;
//                 setTimeout(type, speed);
//             } else {
//                 resolve();
//             }
//         }
//         type();
//     });
// }

// function getAsciiArt() {
//     return window.innerWidth < 850 ? asciiArtMobile : asciiArt;
//   }

// async function animateTerminal() {
//     // Check if already initialized
//     if (terminalInitialized) return;
//     terminalInitialized = true;
    
//     await typeText(getAsciiArt(), terminalOutput, 10);
//     terminalOutput.innerHTML += '\n';
//     await typeText(welcomeMessage, terminalOutput);
//     terminalOutput.innerHTML += '\n\n';
//     await typeText("AI assistant could not be loaded. Basic terminal mode active.\n\n", terminalOutput);
//     await typeText(prompt, terminalOutput);
//     document.querySelector('.terminal-input').style.display = 'flex';
//     userInput.focus();
//   }



//   userInput.addEventListener('keydown', async function(event) {
//     if (event.key === 'Enter') {
//       const command = userInput.value;
//       // Display the user's command:
//       terminalOutput.innerHTML += command + '\n';
//       userInput.value = '';
      
//       if (command.toLowerCase() === 'clear' || command.toLowerCase() === 'cls') {
//         terminalOutput.innerHTML = '';
//       } else {
//         // Instead of calling queryGemini directly, call your Python backend API:
//         terminalOutput.innerHTML += "Thinking...\n";
//         try {
//           const context = searchKnowledgeBase(command); // if using RAG context from your knowledge base
//           const response = await fetch('http://127.0.0.1:5000/api/gemini', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ query: command, context: context })
//           });
//           const data = await response.json();
//           terminalOutput.innerHTML = terminalOutput.innerHTML.replace("Thinking...\n", "");
//           if (data.response) {
//             terminalOutput.innerHTML += data.response + '\n\n';
//           } else {
//             terminalOutput.innerHTML += "No response from AI\n\n";
//           }
//         } catch (error) {
//           terminalOutput.innerHTML = terminalOutput.innerHTML.replace("Thinking...\n", "");
//           terminalOutput.innerHTML += `Error: ${error.message}\n\n`;
//         }
//       }
      
//       terminalOutput.innerHTML += prompt;
//       terminalOutput.scrollTop = terminalOutput.scrollHeight;
//     }
//   });

//   // Initialize terminal, etc...
//   animateTerminal();
// });



document.addEventListener('DOMContentLoaded', async function() {
    // Terminal-related constants and variables
    const terminalOutput = document.getElementById('terminal-output');
    const userInput = document.getElementById('user-input');
    const asciiArt = `
   _   _      _ _         _   _               
  | | | | ___| | | ___   | | | |___  ___ _ __ 
  | |_| |/ _ \\ | |/ _ \\  | | | / __|/ _ \\ '__|
  |  _  |  __/ | | (_) | | |_| \\__ \\  __/ |   
  |_| |_|\\___|_|_|\\___/   \\___/|___/\\___|_|   
    `;
    const asciiArtMobile = `Hey There, User`;
    const welcomeMessage = "Welcome to my webpage. Talk to my friend Grace, she's AI!";
    const prompt = "user@remote:~$ ";
  
    // Function to choose ASCII art based on window width
    function getAsciiArt() {
        return window.innerWidth < 850 ? asciiArtMobile : asciiArt;
    }
  
    // Typing text function
    function typeText(text, element, speed = 50) {
      return new Promise(resolve => {
        let i = 0;
        function type() {
          if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
          } else {
            resolve();
          }
        }
        type();
      });
    }
  
    //terminal animation initialization
    let terminalInitialized = false;
    async function animateTerminal() {
      if (terminalInitialized) return;
      terminalInitialized = true;
    
      await typeText(getAsciiArt(), terminalOutput, 10);
      terminalOutput.innerHTML += '\n';
      await typeText(welcomeMessage, terminalOutput);
      terminalOutput.innerHTML += '\n\n';
      await typeText(prompt, terminalOutput);
      document.querySelector('.terminal-input').style.display = 'flex';
      userInput.focus();
    }
  
    userInput.addEventListener('keydown', async function(event) {
      if (event.key === 'Enter') {
        const command = userInput.value;
        terminalOutput.innerHTML += command + '\n';
        userInput.value = '';
        
        if (command.toLowerCase() === 'clear' || command.toLowerCase() === 'cls') {
          terminalOutput.innerHTML = '';
        } else {
          terminalOutput.innerHTML += "Thinking...\n";
          try {
            const context = typeof searchKnowledgeBase === 'function' ? searchKnowledgeBase(command) : '';
            const response = await fetch('https://flask-bridge-for-gemini.onrender.com/api/gemini', {  // Change this URL to your deployed backend in production.
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ query: command, context: context })
            });
            const data = await response.json();
            //replace "Thinking..." with generated response
            terminalOutput.innerHTML = terminalOutput.innerHTML.replace("Thinking...\n", "");
            if (data.response) {
              terminalOutput.innerHTML += data.response + '\n\n';
            } else {
              terminalOutput.innerHTML += "No response from AI\n\n";
            }
          } catch (error) {
            terminalOutput.innerHTML = terminalOutput.innerHTML.replace("Thinking...\n", "");
            terminalOutput.innerHTML += `Error: ${error.message}\n\n`;
          }
        }
        
        terminalOutput.innerHTML += prompt;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }
    });
    animateTerminal();
  });
  


/**
 * Come back after doing projects and models pages
 */
function loadProjects() {
    // This is a placeholder. In a real implementation, you would fetch this data from an API
    // For the demo, we'll use the static HTML in the page
    
    // Example of how to load projects dynamically:
    /*
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (projectsGrid) {
        // Clear existing projects
        projectsGrid.innerHTML = '';
        
        // Fetch projects from API or use static data
        const projects = [
            {
                id: 1,
                title: 'Advanced Image Classification',
                description: 'A deep learning model for classifying medical images with 98% accuracy.',
                image: 'assets/img/project1.jpg',
                technologies: ['PyTorch', 'ResNet50', 'Computer Vision'],
                category: 'ml',
                githubUrl: '#',
                demoUrl: '#'
            },
            // More projects...
        ];
        
        // Create and append project cards
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-category', project.category);
            
            projectCard.innerHTML = `
                <div class="project-img">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.githubUrl}" class="project-link"><i class="fab fa-github"></i> View Code</a>
                        <a href="${project.demoUrl}" class="project-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
    }
    */
}
