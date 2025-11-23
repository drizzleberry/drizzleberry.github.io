document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded");  // NEW

  const toggleButton = document.getElementById('theme-toggle');
  console.log("toggleButton:", toggleButton);  // NEW

  const body = document.body;

  if (!toggleButton) {
    console.error("No #theme-toggle found!");
    return;
  }

  const saved = localStorage.getItem('theme');
  console.log("Saved theme:", saved);  // NEW

  if (saved === 'light') {
    body.classList.add('light-mode');
    toggleButton.textContent = "Dark Mode";
  } else {
    toggleButton.textContent = "Light Mode";
  }

  toggleButton.addEventListener('click', () => {
    console.log("Button clicked");  // NEW

    const isLight = body.classList.toggle('light-mode');

    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    console.log("Theme saved:", isLight ? "light" : "dark");  // NEW

    toggleButton.textContent = isLight ? "Dark Mode" : "Light Mode";
  });
});
