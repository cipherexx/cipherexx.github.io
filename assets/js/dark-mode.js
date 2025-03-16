document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
});

function initDarkMode() {
    const themeToggle = document.getElementById('checkbox');
    const body = document.body;
    
    // maintaining last state:
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    
    //set current state:
    if (themeToggle) {
        themeToggle.checked = currentTheme === 'dark';
        
        //listen for toggle change
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                smoothTransition('light', 'dark');
            } else {
                smoothTransition('dark', 'light');
            }
        });
    }
}

function smoothTransition(from, to) {
    const body = document.body;
    body.classList.add('theme-transition');
    body.setAttribute('data-theme', to);
    localStorage.setItem('theme', to);
    setTimeout(() => {
        body.classList.remove('theme-transition');
    }, 400);
    updateThemeSpecificElements(to);
}

function updateThemeSpecificElements(theme) {
    //to update elements that need special handling
    //eg change certain images or SVGs based on theme
    
    const logoElement = document.querySelector('.logo-text');
    if (logoElement) {
        if (theme === 'dark') {
            // Example: change logo color in dark mode
            logoElement.style.color = '';
        } else {
            // Reset to default in light mode
            logoElement.style.color = '';
        }
    }
    
    //add other elements later if needed
}

function setTheme(theme) {
    document.body.classList.toggle('dmode', theme === 'dark');
    localStorage.setItem('theme', theme);
  }
  
  function darklightmode() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }
  
  // Apply the saved theme on page load
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  });
  