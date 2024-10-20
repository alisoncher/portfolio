console.log('IT’S ALIVE!');

function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
  }

const navLinks = $$("nav a");

let currentLink = navLinks.find(
    (a) => a.host === location.host && a.pathname === location.pathname,
  );

  if (currentLink) {
    // or if (currentLink !== undefined)
    currentLink?.classList.add('current');
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