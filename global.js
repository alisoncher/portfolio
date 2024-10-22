console.log('IT’S ALIVE!');

// function $$(selector, context = document) {
//     return Array.from(context.querySelectorAll(selector));
//   }

// const navLinks = $$("nav a");

// let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname,
//   );

// if (currentLink) {
//     // or if (currentLink !== undefined)
//     currentLink?.classList.add('current');
//   }


let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'contact/', title: 'Contact' },
    { url: 'resume/', title: 'Resume' },
    { url: 'https://github.com/alisoncher', title: 'GitHub', external: true } // External link
];

// Create the nav element
let nav = document.createElement('nav');
document.body.prepend(nav);

// Get the current path
let currentPath = window.location.pathname;

// Loop over the pages array
for (let p of pages) {
    let url = p.url;
    let title = p.title;
    let isExternal = p.external || false; // Check if the page is external

    // Adjust URL based on current location for internal links only
    if (!isExternal && currentPath !== '/' && !url.startsWith('http')) {
        url = '../' + url;
    }

    // Create the anchor tag
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;

    // Add target="_blank" for external links
    if (isExternal) {
        a.target = "_blank";
        a.rel = "noopener noreferrer"; // Security improvement for external links
    }

    // Add the link to the navigation
    nav.append(a);

    // Highlight the current page
    if (!isExternal && a.pathname === window.location.pathname) {
        a.classList.add('current');
    }
}



  // Get the select element and the root element (HTML)
const colorSchemeSelect = document.getElementById('color-scheme-select');
const root = document.documentElement;

// Helper function to set the color scheme
function setColorScheme(scheme) {
    if (scheme === 'auto') {
        root.style.colorScheme = 'light dark'; // Use OS preference
    } else {
        root.style.colorScheme = scheme; // 'light' or 'dark'
    }
}

// Set the initial color scheme to 'auto'
setColorScheme('auto');

// Add an event listener to update the color scheme when the user selects a new option
colorSchemeSelect.addEventListener('change', (event) => {
    setColorScheme(event.target.value);
});

function applyColorScheme(scheme) {
    document.documentElement.style.colorScheme = scheme;
}

// Event listener for dropdown changes
colorSchemeSelect.addEventListener("change", (event) => {
    const selectedScheme = event.target.value;
    localStorage.colorScheme = selectedScheme; // Save to localStorage
    applyColorScheme(selectedScheme); // Apply the selected color scheme
});

// Read and apply the saved color scheme on page load
window.addEventListener("DOMContentLoaded", () => {
    const savedScheme = localStorage.colorScheme || "auto"; // Default to 'auto'
    applyColorScheme(savedScheme); // Apply the saved color scheme
    colorSchemeSelect.value = savedScheme; // Update the dropdown value
});