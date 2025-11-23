document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById('theme-toggle');
  const body = document.body;

  // Initialize theme from localStorage
  if(localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    toggleButton.textContent = "Dark Mode";
  } else {
    toggleButton.textContent = "Light Mode";
  }

  toggleButton.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    if(body.classList.contains('light-mode')) {
      localStorage.setItem('theme', 'light');
      toggleButton.textContent = "Dark Mode";
    } else {
      localStorage.setItem('theme', 'dark');
      toggleButton.textContent = "Light Mode";
    }
  });
});
