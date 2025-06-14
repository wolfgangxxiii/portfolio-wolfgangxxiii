// Automatyczne obliczanie wieku
const birthDate = new Date('1999-10-17');
const today = new Date();
let age = today.getFullYear() - birthDate.getFullYear();
const m = today.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  age--;
}
document.getElementById('age').textContent = age;

// DARK MODE + system preference + localStorage
const darkModeBtn = document.getElementById('toggle-darkmode');
const rootBody = document.body;
function setDarkMode(on) {
  if (on) {
    rootBody.classList.add('dark');
    localStorage.setItem('darkmode', 'on');
    darkModeBtn.innerHTML = '<i class="fa fa-sun"></i>';
    darkModeBtn.setAttribute('aria-label','Przełącz na jasny motyw');
  } else {
    rootBody.classList.remove('dark');
    localStorage.setItem('darkmode', 'off');
    darkModeBtn.innerHTML = '<i class="fa fa-moon"></i>';
    darkModeBtn.setAttribute('aria-label','Przełącz na ciemny motyw');
  }
}
darkModeBtn.onclick = () => setDarkMode(!rootBody.classList.contains('dark'));
(function checkUserOrSystemPreference() {
  const userPref = localStorage.getItem('darkmode');
  if (userPref === 'on') {
    setDarkMode(true);
  } else if (userPref === 'off') {
    setDarkMode(false);
  } else {
    // Brak zapisu w localStorage – wykryj motyw systemowy
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(systemDark);
  }
})();
// Aktualizacja na zmianę systemowego motywu (jeśli user nie nadpisał ręcznie)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (localStorage.getItem('darkmode') === null) {
    setDarkMode(e.matches);
  }
});

// FADE-IN ON SCROLL
function fadeInOnScroll() {
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 90) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Hamburger menu logic
const hamburger = document.getElementById('hamburger-menu');
const navList = document.querySelector('.main-nav ul');
hamburger.addEventListener('click', function () {
  navList.classList.toggle('open');
  hamburger.setAttribute(
    'aria-label',
    navList.classList.contains('open') ? 'Ukryj menu' : 'Pokaż menu'
  );
  // Ikona zmiany (hamburger ↔ close)
  hamburger.innerHTML = navList.classList.contains('open')
    ? '<i class="fa fa-times"></i>'
    : '<i class="fa fa-bars"></i>';
});
// Automatycznie zamykaj menu po kliknięciu w link (mobile)
document.querySelectorAll('.main-nav ul li a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 701) {
      navList.classList.remove('open');
      hamburger.innerHTML = '<i class="fa fa-bars"></i>';
      hamburger.setAttribute('aria-label','Pokaż menu');
    }
  });
});
