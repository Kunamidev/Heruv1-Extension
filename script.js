document.addEventListener('DOMContentLoaded', () => {
  Swal.fire({
    title: 'Privacy Notice',
    text: 'This extension may collect certain data for functionality and improvement. By using this extension, you agree to our Privacy Policy.',
    icon: 'info',
    imageUrl: 'https://l.top4top.io/p_3250c5d2w0.jpg',
    imageWidth: 100,
    imageHeight: 100,
    imageAlt: 'Privacy Icon',
    confirmButtonText: 'I Understand',
    footer: '<a href="https://privacy-and-policy-sage.vercel.app" target="_blank">Read our Privacy Policy</a>',
    customClass: {
      popup: 'custom-swal-popup',
      title: 'custom-swal-title',
      content: 'custom-swal-content',
      footer: 'custom-swal-footer',
      confirmButton: 'custom-swal-confirm-button',
    },
    allowOutsideClick: false,
  });
});

const toggleThemeBtn = document.getElementById('toggle-theme');
const body = document.body;

toggleThemeBtn.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  const icon = toggleThemeBtn.querySelector('i');
  if (body.classList.contains('dark-theme')) {
    icon.classList.replace('fa-moon', 'fa-sun');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
  }
});

const authorsToggle = document.getElementById('authors-toggle');
const authorsList = document.getElementById('authors');

authorsToggle.addEventListener('click', () => {
  authorsList.classList.toggle('active');
  if (authorsToggle.textContent.includes('⟩')) {
    authorsToggle.textContent = '↓ Kaguya Team';
  } else {
    authorsToggle.textContent = '⟩ Kaguya Team';
  }
});