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

// ANIMOWANE WCZYTYWANIE I REVEAL PODCZAS PRZEWIJANIA
// Po ręcznym odświeżeniu strona startuje od góry, aby animacje uruchomiły się od początku.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const navigationEntry = performance.getEntriesByType('navigation')[0];
if (navigationEntry?.type === 'reload') {
  window.scrollTo(0, 0);
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobileAnimationMode = window.matchMedia('(max-width: 700px), (pointer: coarse)').matches;

// Nie animujemy jednocześnie całej sekcji i jej dzieci. Dzięki temu elementy nie znikają
// podwójnie i nie powstaje efekt szarpania podczas przewijania.
const revealGroups = [
  {
    selector: '.hero-photo-wrap, .hero-copy > h1, .hero-copy > .hero-desc, .premium-tags, .hero-meta-grid, .hero-actions',
    variant: 'reveal-up'
  },
  {
    selector: 'section > h2, .section-heading, .contact-panel-copy',
    variant: 'reveal-up'
  },
  {
    selector: '.project-card, .skill-compact-card, .cert-item, .soft-compact-card, .contact-compact-card',
    variant: 'reveal-card'
  },
  {
    selector: '.education-timeline-item',
    variant: 'reveal-left'
  },
  {
    selector: '.language-pill, .skill-mini-list > span, .education-tags > span, .soft-chip, .hero-tags > span',
    variant: 'reveal-scale'
  },
  {
    selector: '.contact-action, .contact-icons, .hero-actions .button, .btn-primary, .btn-github',
    variant: 'reveal-scale'
  }
];

const revealElements = [];
const seen = new Set();

revealGroups.forEach(group => {
  document.querySelectorAll(group.selector).forEach((element, index) => {
    if (seen.has(element)) return;
    seen.add(element);
    element.classList.add('scroll-reveal', group.variant);
    element.style.setProperty('--reveal-delay', `${Math.min((index % 6) * 75, 375)}ms`);
    revealElements.push(element);
  });
});

// Sekcje bez szczegółowych kart otrzymują delikatną animację własnej zawartości.
document.querySelectorAll('main > section').forEach(section => {
  const hasAnimatedChild = section.querySelector('.scroll-reveal');
  if (!hasAnimatedChild) {
    [...section.children].forEach((element, index) => {
      if (seen.has(element)) return;
      seen.add(element);
      element.classList.add('scroll-reveal', 'reveal-up');
      element.style.setProperty('--reveal-delay', `${Math.min(index * 85, 340)}ms`);
      revealElements.push(element);
    });
  }
});

if (reducedMotion) {
  revealElements.forEach(element => element.classList.add('is-visible'));
} else if (mobileAnimationMode) {
  // Na smartfonach używamy IntersectionObserver i animujemy każdy element tylko raz.
  // Eliminuje to kosztowne getBoundingClientRect() wykonywane podczas każdego scrolla.
  const mobileRevealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      element.classList.add('is-visible');
      mobileRevealObserver.unobserve(element);

      const finishAnimation = () => {
        element.classList.add('animation-complete');
        element.style.removeProperty('will-change');
      };

      element.addEventListener('transitionend', finishAnimation, { once: true });
      window.setTimeout(finishAnimation, 850);
    });
  }, {
    root: null,
    rootMargin: '0px 0px 110px 0px',
    threshold: 0.025
  });

  revealElements.forEach(element => mobileRevealObserver.observe(element));

  // Przy końcu strony pokaż wszystkie ostatnie elementy bez potrzeby drugiego gestu.
  const revealPageEnd = () => {
    const docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    if (window.scrollY + window.innerHeight < docHeight - 180) return;

    revealElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight + 140 && rect.bottom > -60) {
        element.classList.add('is-visible', 'animation-complete');
        mobileRevealObserver.unobserve(element);
      }
    });
  };

  window.addEventListener('scroll', revealPageEnd, { passive: true });
  window.addEventListener('resize', revealPageEnd, { passive: true });
  window.visualViewport?.addEventListener('resize', revealPageEnd, { passive: true });
} else {
  // Desktop: animacja działa przy przewijaniu w obie strony, ale reset następuje
  // dopiero po pełnym opuszczeniu ekranu, więc elementy w polu widzenia nie skaczą.
  let ticking = false;
  const exitBuffer = 80;

  function updateRevealState() {
    const viewportHeight = window.innerHeight;
    const enterTop = viewportHeight * 0.90;
    const enterBottom = viewportHeight * 0.10;

    revealElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const currentlyVisible = element.classList.contains('is-visible');
      const fullyAbove = rect.bottom < -exitBuffer;
      const fullyBelow = rect.top > viewportHeight + exitBuffer;

      if (fullyAbove || fullyBelow) {
        if (currentlyVisible) element.classList.remove('is-visible');
        return;
      }

      if (rect.top < enterTop && rect.bottom > enterBottom && !currentlyVisible) {
        element.classList.add('is-visible');
      }
    });

    ticking = false;
  }

  function requestRevealUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateRevealState);
  }

  window.addEventListener('scroll', requestRevealUpdate, { passive: true });
  window.addEventListener('resize', requestRevealUpdate, { passive: true });
  requestAnimationFrame(() => requestAnimationFrame(updateRevealState));
}

// Po powrocie do strony z pamięci przeglądarki odtwarzamy prawidłowy stan widoczności.
window.addEventListener('pageshow', event => {
  if (!event.persisted || reducedMotion) return;
  requestAnimationFrame(() => {
    revealElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const visible = rect.bottom > -80 && rect.top < window.innerHeight + 80;
      if (visible) {
        element.classList.add('is-visible');
      }
    });
  });
});

// Hamburger menu logic — panel nad treścią, bez przesuwania dokumentu
const hamburger = document.getElementById('hamburger-menu');
const navList = document.querySelector('.main-nav ul');
const menuOverlay = document.getElementById('menu-overlay');

function setMobileMenu(open) {
  if (!hamburger || !navList) return;

  hamburger.classList.toggle('is-open', open);
  navList.classList.toggle('open', open);
  menuOverlay?.classList.toggle('open', open);
  rootBody.classList.toggle('menu-open', open);

  hamburger.setAttribute('aria-expanded', String(open));
  hamburger.setAttribute('aria-label', open ? 'Ukryj menu' : 'Pokaż menu');
  menuOverlay?.setAttribute('aria-hidden', String(!open));
}

hamburger?.addEventListener('click', () => {
  setMobileMenu(!navList?.classList.contains('open'));
});

menuOverlay?.addEventListener('click', () => setMobileMenu(false));

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => setMobileMenu(false));
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMobileMenu(false);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 860) setMobileMenu(false);
}, { passive: true });

// LANGUAGE TOGGLE PL / EN
const langBtn = document.getElementById('language-toggle');
const translations = {
  'Portfolio': 'Portfolio',
  'Start': 'Start',
  'Profil': 'Profile',
  'Umiejętności': 'Skills',
  'Rozwój praktyczny': 'Practical growth',
  'Projekty': 'Projects',
  'Kontakt': 'Contact',
  'Zdjęcie profilowe Szymona Piotra Bławata': 'Profile photo of Szymon Piotr Bławat',
  'Zaplecze programistyczne i systemowe oraz aktualna specjalizacja w bezpieczeństwie systemów informacyjno-komunikacyjnych.': 'Software and systems background with a current specialization in information and communication systems security.',
  'Cyberbezpieczeństwo': 'Cybersecurity',
  'Linux & serwery': 'Linux & servers',
  'Sieci komputerowe': 'Computer networks',
  'Full Stack': 'Full Stack',
  'Śliwice / Gdańsk / zdalnie': 'Śliwice / Gdańsk / remote',
  'Lokalizacja': 'Location',
  'Wiek': 'Age',
  'Wiek:': 'Age:',
  'lat': 'years old',
  'Napisz do mnie': 'Contact me',
  'Profil zawodowy': 'Professional profile',
  'Jestem studentem studiów magisterskich na kierunku Informatyka ze specjalizacją bezpieczeństwo systemów informacyjno-komunikacyjnych. Poszukuję praktyk studenckich w obszarze cyberbezpieczeństwa, szczególnie w kierunku SOC, pentestingu lub administracji bezpieczeństwem IT.': 'I am a master’s student in Computer Science, specializing in information and communication systems security. I am looking for a student internship in cybersecurity, especially in SOC, penetration testing or IT security administration.',
  'Rozwijam kompetencje w administracji systemami Linux, bezpieczeństwie sieci, testach podatności aplikacji webowych, informatyce śledczej oraz automatyzacji zadań administracyjnych przy użyciu Bash i Python.': 'I develop skills in Linux administration, network security, web application vulnerability testing, digital forensics and automation of administrative tasks with Bash and Python.',
  'Rozwój w kierunku cyberbezpieczeństwa': 'Cybersecurity development',
  'Bezpieczeństwo systemów i sieci': 'Systems and network security',
  'Praktyczna administracja systemami Linux, konfiguracja bezpiecznych środowisk testowych, podstawy bezpieczeństwa sieci oraz wiedza potwierdzona certyfikatem CCNAv7.': 'Practical Linux administration, secure test environments, network security fundamentals and knowledge confirmed by the CCNAv7 certificate.',
  'Podstawy pentestów': 'Penetration testing basics',
  'Przygotowanie z metodyki OSSTMM, podstawowe badania penetracyjne oraz znajomość zagrożeń aplikacji webowych: SQL Injection, XSS i CSRF.': 'OSSTMM methodology, basic penetration testing and knowledge of web application threats: SQL Injection, XSS and CSRF.',
  'Informatyka śledcza': 'Digital forensics',
  'Podstawy zabezpieczania materiału cyfrowego, analiza incydentów oraz rozwijanie praktycznego podejścia do dokumentowania ustaleń technicznych.': 'Basics of securing digital evidence, incident analysis and a practical approach to documenting technical findings.',
  'Umiejętności techniczne': 'Technical skills',
  'Najważniejsze kompetencje podzielone według obszarów: bezpieczeństwo, systemy, programowanie, web oraz narzędzia pracy.': 'Key competencies grouped by security, systems, programming, web and work tools.',
  'Bezpieczeństwo & systemy': 'Security & systems',
  'Linux, sieci, serwery i podstawy testów bezpieczeństwa.': 'Linux, networks, servers and security testing fundamentals.',
  'Linux: Ubuntu / Debian': 'Linux: Ubuntu / Debian',
  'Bezpieczeństwo sieci': 'Network security',
  'Administracja serwerami': 'Server administration',
  'CCNAv7 – podstawy sieci': 'CCNAv7 – networking basics',
  'Programowanie & bazy danych': 'Programming & databases',
  'Backend, skrypty, API, aplikacje webowe i projekty narzędziowe pod Windows.': 'Backend, scripts, APIs, web applications and Windows utility projects.',
  'Skrypty .bat / .reg': '.bat / .reg scripts',
  'W praktyce wykorzystane m.in. w projektach Windhawk, narzędziach dla Windows oraz aplikacjach React/Electron.': 'Used in practice in Windhawk projects, Windows utilities and React/Electron applications.',
  'Frontend & narzędzia': 'Frontend & tools',
  'Tworzenie stron, praca z repozytoriami i narzędziami projektowymi.': 'Website development, repository workflow and project tools.',
  'Responsive Design': 'Responsive Design',
  'Figma – podstawy': 'Figma – basics',
  'Języki': 'Languages',
  'Komunikacja w pracy technicznej i dokumentacji.': 'Communication in technical work and documentation.',
  'Polski': 'Polish',
  'ojczysty': 'native',
  'Angielski': 'English',
  'angielski: SPJ 1111': 'English: SPJ 1111',
  'Wykształcenie': 'Education',
  '10.2025 – obecnie: Informatyka – studia magisterskie': '10.2025 – present: Computer Science – master’s degree',
  'Uniwersytet WSB Merito Warszawa': 'WSB Merito University Warsaw',
  'Specjalizacja: Bezpieczeństwo systemów informacyjno-komunikacyjnych. Program obejmuje m.in. cyberbezpieczeństwo, kryptografię, bezpieczeństwo sieci, ochronę danych, audyt bezpieczeństwa i zarządzanie incydentami.': 'Specialization: Information and communication systems security. The program includes cybersecurity, cryptography, network security, data protection, security audit and incident management.',
  '10.2022 – 06.2025: Informatyka – studia licencjackie': '10.2022 – 06.2025: Computer Science – bachelor’s degree',
  'Uniwersytet WSB Merito Gdańsk': 'WSB Merito University Gdańsk',
  'Specjalizacja: Aplikacje mobilne i bazy danych. Ocena końcowa: 4.5. Zakres: programowanie aplikacji, projektowanie baz danych, inżynieria oprogramowania i podstawy bezpieczeństwa systemów informatycznych.': 'Specialization: Mobile applications and databases. Final grade: 4.5. Scope: application programming, database design, software engineering and fundamentals of information systems security.',
  '09.2015 – 04.2019: Technik informatyk': '09.2015 – 04.2019: IT technician',
  'Zespół Szkół Licealnych i Technicznych im. Ziemi Tucholskiej w Tucholi': 'Upper Secondary and Technical School Complex in Tuchola',
  'Kwalifikacje: E.12, E.13, E.14. Specjalizacja: sieci komputerowe, administracja systemów i obsługa sprzętu IT.': 'Qualifications: E.12, E.13, E.14. Specialization: computer networks, system administration and IT hardware support.',
  'Certyfikaty i kwalifikacje': 'Certificates and qualifications',
  'Ekspert Bezpieczeństwa OSSTMM': 'OSSTMM Security Expert',
  'ECSC | 2026 – metodyka testów bezpieczeństwa, analiza ryzyka i weryfikacja zabezpieczeń.': 'ECSC | 2026 – security testing methodology, risk analysis and security verification.',
  'Podstawowe badanie penetracyjne': 'Basic penetration testing',
  'ECSC | 2026 – podstawy pentestów, identyfikacja podatności i raportowanie wyników audytu.': 'ECSC | 2026 – penetration testing basics, vulnerability identification and audit reporting.',
  'STANAG 6001 (SPJ 1111)': 'STANAG 6001 (SPJ 1111)',
  'Egzamin językowy | 2026 – język angielski.': 'Language exam | 2026 – English.',
  'CEFR C1 in the EnglishScore Core Skills': 'CEFR C1 in the EnglishScore Core Skills',
  'British Council EnglishScore | 2025, kod weryfikacyjny: 7f2f26649a1b.': 'British Council EnglishScore | 2025, verification code: 7f2f26649a1b.',
  'ECSC | 2024 – zabezpieczanie materiału cyfrowego i analiza incydentów.': 'ECSC | 2024 – securing digital evidence and incident analysis.',
  'Kwalifikacje E.13 i E.14': 'E.13 and E.14 qualifications',
  'Sieci komputerowe, administracja oraz tworzenie aplikacji internetowych i baz danych.': 'Computer networks, administration, web application and database development.',
  'Rozwój praktyczny': 'Practical growth',
  'Administracja systemów Linux': 'Linux system administration',
  'Ubuntu / Debian, Bash, firewall, uprawnienia': 'Ubuntu / Debian, Bash, firewall, permissions',
  'Konfiguracja i zabezpieczanie serwerów, zarządzanie użytkownikami, uprawnieniami, usługami oraz podstawową ochroną systemu.': 'Server configuration and hardening, user, permission and service management, and basic system protection.',
  'Laboratoria bezpieczeństwa': 'Security labs',
  'Linux, sieci, środowiska testowe': 'Linux, networks, test environments',
  'Tworzenie środowisk testowych do nauki zabezpieczania systemów, analizy zagrożeń i praktycznego sprawdzania konfiguracji.': 'Creating test environments for learning system hardening, threat analysis and practical configuration checks.',
  'Skrypty automatyzujące': 'Automation scripts',
  'Narzędzia do monitorowania systemów, logowania zdarzeń i automatyzacji zadań administracyjnych.': 'Tools for system monitoring, event logging and automation of administrative tasks.',
  'Analiza bezpieczeństwa aplikacji webowych': 'Web application security analysis',
  'Praktyczne poznawanie podatności aplikacji webowych oraz sposobów ich ograniczania i dokumentowania.': 'Practical learning of web application vulnerabilities and ways to reduce and document them.',
  'Mod do Windhawk, który blokuje generowanie miniatur podglądu dla folderów w Eksploratorze Windows, a jednocześnie zostawia miniatury zwykłych plików. Projekt poprawia spójność wyglądu przy niestandardowych motywach ikon.': 'A Windhawk mod that blocks preview thumbnails for folders in Windows Explorer while keeping normal file thumbnails. The project improves visual consistency with custom icon themes.',
  'Kod': 'Code',
  'Zestaw skryptów ograniczających wyskakujące okna Microsoft Game Bar / Gaming Overlay, protokół ms-gamebar oraz ustawienia GameDVR. Przydatne szczególnie przy grach, emulatorach, trybie fullscreen i kontrolerach.': 'A set of scripts that limit Microsoft Game Bar / Gaming Overlay popups, the ms-gamebar protocol and GameDVR settings. Useful for games, emulators, fullscreen mode and controllers.',
  'Kółko i Krzyżyk': 'Tic-Tac-Toe',
  'Prosta aplikacja desktopowa dla dwóch osób, z intuicyjnym interfejsem i obsługą wyniku gry.': 'A simple desktop application for two players with an intuitive interface and game result handling.',
  'Demo': 'Demo',
  'Quiz do Egzaminu': 'Exam Quiz',
  'Aplikacja webowa wspierająca naukę do egzaminu dyplomowego z informatyki, z oceną odpowiedzi i podsumowaniem wyniku.': 'A web application supporting preparation for a computer science diploma exam, with answer checking and score summary.',
  'Planer i kalendarz zadań dla małych firm i zespołów, rozwijany z naciskiem na przejrzystość i prostą obsługę.': 'A task planner and calendar for small companies and teams, developed with a focus on clarity and ease of use.',
  'Więcej projektów': 'More projects',
  'Repozytoria i kolejne projekty rozwojowe publikuję na GitHubie.': 'I publish repositories and further development projects on GitHub.',
  'Kompetencje miękkie i zainteresowania': 'Soft skills and interests',
  'Kompetencje miękkie': 'Soft skills',
  'Samodyscyplina': 'Self-discipline',
  'Praca zespołowa': 'Teamwork',
  'Rozwiązywanie problemów': 'Problem solving',
  'Skrupulatność': 'Accuracy',
  'Komunikatywność': 'Communication',
  'Odpowiedzialność': 'Responsibility',
  'Adaptacyjność': 'Adaptability',
  'Nauka ciągła': 'Continuous learning',
  'Zainteresowania': 'Interests',
  'Linux & Open Source': 'Linux & Open Source',
  'Elektronika i hardware': 'Electronics and hardware',
  'Sport i aktywność fizyczna': 'Sports and physical activity',
  'Gry strategiczne': 'Strategy games',
  'Literatura techniczna': 'Technical literature',
  'Dostępność': 'Availability',
  'Linux, sieci, serwery, podstawy testów bezpieczeństwa.': 'Linux, networks, servers and security testing basics.',
  'Backend, API, skrypty, aplikacje webowe i narzędzia Windows.': 'Backend, APIs, scripts, web applications and Windows tools.',
  'Strony, repozytoria i narzędzia pracy projektowej.': 'Websites, repositories and project workflow tools.',
  'Komunikacja techniczna i dokumentacja.': 'Technical communication and documentation.',
  'Wykorzystane w projektach Windhawk, narzędziach dla Windows oraz aplikacjach React/Electron.': 'Used in Windhawk projects, Windows tools and React/Electron applications.',
  '.bat / .reg': '.bat / .reg',
  'trzymiesięczny okres wypowiedzenia': 'three-month notice period',
  'Informatyka – studia magisterskie': 'Computer Science – master’s degree',
  'Informatyka – studia licencjackie': 'Computer Science – bachelor’s degree',
  'Technik informatyk': 'IT technician',
  '10.2025 – obecnie': '10.2025 – present',
  'Cyberbezpieczeństwo': 'Cybersecurity',
  'Kryptografia': 'Cryptography',
  'Audyt bezpieczeństwa': 'Security audit',
  'Zakres studiów': 'Study scope',
  'Zakres kształcenia': 'Education scope',
  'Specjalizacja: Bezpieczeństwo systemów informacyjno-komunikacyjnych. Program obejmuje bezpieczeństwo sieci, ochronę danych, audyt bezpieczeństwa i zarządzanie incydentami.': 'Specialization: Information and communication systems security. The program covers network security, data protection, security audit and incident management.',
  'Aplikacje mobilne': 'Mobile applications',
  'Bazy danych': 'Databases',
  'Ocena 4.5': 'Grade 4.5',
  'Specjalizacja: Aplikacje mobilne i bazy danych. Zakres: programowanie aplikacji, projektowanie baz danych, inżynieria oprogramowania i podstawy bezpieczeństwa systemów informatycznych.': 'Specialization: Mobile applications and databases. Scope: application programming, database design, software engineering and fundamentals of information systems security.',
  'ZSLiT im. Ziemi Tucholskiej w Tucholi': 'Technical School Complex in Tuchola',
  'Specjalizacja: sieci komputerowe, administracja systemów, obsługa sprzętu IT oraz tworzenie aplikacji internetowych i baz danych.': 'Specialization: computer networks, system administration, IT hardware support, web application and database development.',
  'Napisz do mnie': 'Contact me',
  'Najwygodniejszy kontakt to wiadomość e-mail. Odpowiem w sprawie praktyk, projektów lub współpracy IT.': 'The most convenient contact method is email. I can respond about internships, projects or IT cooperation.',
};
const reverseTranslations = Object.fromEntries(Object.entries(translations).map(([pl, en]) => [en, pl]));
function translateTextNodes(root, targetLang) {
  const from = targetLang === 'en' ? translations : reverseTranslations;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const trimmed = node.nodeValue.trim();
      if (!trimmed || !from[trimmed]) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (parent && ['SCRIPT', 'STYLE'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    const original = node.nodeValue;
    const trimmed = original.trim();
    const before = original.match(/^\s*/)[0];
    const after = original.match(/\s*$/)[0];
    node.nodeValue = before + from[trimmed] + after;
  });
}
function setLanguage(lang) {
  translateTextNodes(document.body, lang);
  document.documentElement.lang = lang === 'en' ? 'en' : 'pl';
  localStorage.setItem('portfolioLang', lang);
  if (langBtn) {
    langBtn.querySelector('span').textContent = lang === 'en' ? 'PL' : 'EN';
    langBtn.setAttribute('aria-label', lang === 'en' ? 'Przełącz na polski' : 'Switch to English');
  }
  document.body.classList.add('lang-transition');
  window.setTimeout(() => document.body.classList.remove('lang-transition'), 360);
}
if (langBtn) {
  const savedLang = localStorage.getItem('portfolioLang') || 'pl';
  if (savedLang === 'en') setLanguage('en');
  langBtn.addEventListener('click', () => {
    const current = document.documentElement.lang === 'en' ? 'en' : 'pl';
    setLanguage(current === 'en' ? 'pl' : 'en');
  });
}

// Delikatny efekt światła pod kursorem na kartach
const glowCards = document.querySelectorAll('.project-card, .skill-panel, .skill-compact-card, .language-pill, .cert-item, .soft-compact-card, .contact-compact-card, .contact-action, .timeline-card, .hero-meta-card');
glowCards.forEach(card => {
  card.addEventListener('pointermove', event => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

// v31: utrzymanie poprawnego stanu mobilnego menu po zmianie orientacji/rozmiaru.
window.addEventListener('orientationchange', () => {
  window.setTimeout(() => {
    if (window.innerWidth > 860) setMobileMenu(false);
  }, 120);
}, { passive: true });
