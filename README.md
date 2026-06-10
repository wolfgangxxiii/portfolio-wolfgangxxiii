# Portfolio – Szymon Piotr Bławat

[English version](#english-version)

Nowoczesna, responsywna strona portfolio prezentująca moje kompetencje techniczne, wykształcenie, certyfikaty, projekty oraz rozwój w kierunku cyberbezpieczeństwa.

Portfolio zostało stworzone z wykorzystaniem czystego HTML, CSS i JavaScript. Nie wymaga frameworków, procesu budowania ani backendu. Strona działa na komputerach, tabletach i smartfonach oraz posiada obsługę jasnego i ciemnego motywu.

## 🌐 Demo

**Portfolio online:**
https://wolfgangxxiii.org
https://portfolio-wolfgangxxiii.netlify.app/

## ✨ Najważniejsze funkcje

* responsywny interfejs dopasowany do komputerów i urządzeń mobilnych,
* przełącznik języka polskiego i angielskiego,
* tryb jasny i ciemny,
* automatyczne wykrywanie motywu systemowego,
* zapisywanie wybranego motywu w `localStorage`,
* dynamiczne obliczanie wieku,
* animacje elementów podczas przewijania strony,
* stabilne animacje działające przy przewijaniu w górę i w dół,
* zoptymalizowane animacje mobilne,
* mobilne menu typu hamburger,
* interaktywna oś czasu wykształcenia,
* karty projektów z odnośnikami do kodu i wersji demonstracyjnych,
* podział umiejętności według obszarów technicznych,
* prezentacja certyfikatów, zainteresowań i kompetencji miękkich,
* sekcja kontaktowa z adresem e-mail i profilami społecznościowymi,
* wsparcie ustawienia `prefers-reduced-motion`,
* zabezpieczenie przed poziomym przepełnieniem strony.

## 📄 Sekcje strony

* O mnie
* Profil zawodowy
* Umiejętności techniczne
* Wykształcenie
* Certyfikaty i kwalifikacje
* Rozwój praktyczny
* Projekty
* Kompetencje miękkie i zainteresowania
* Kontakt

## 🧑‍💻 Technologie

* HTML5
* CSS3
* JavaScript ES6+
* Font Awesome 6
* Google Fonts – Inter
* Local Storage API
* Intersection Observer API
* Responsive Web Design

## 📱 Responsywność

Strona została przygotowana z myślą o różnych rozmiarach ekranów.

Interfejs automatycznie dostosowuje:

* układ sekcji,
* menu nawigacyjne,
* karty projektów,
* oś czasu,
* przyciski,
* tagi umiejętności,
* animacje,
* sekcję kontaktową.

Na urządzeniach mobilnych animacje są uproszczone, aby ograniczyć obciążenie przeglądarki i zapewnić płynne przewijanie.

## 🌗 Tryb jasny i ciemny

Portfolio obsługuje:

* ręczne przełączanie motywu,
* automatyczne wykrywanie preferencji systemowych,
* zapisywanie wyboru użytkownika w `localStorage`,
* oddzielne style kart, przycisków, sekcji i ikon dla obu motywów.

## 🌍 Obsługa języków

Strona posiada przełącznik:

* `PL` – język polski,
* `EN` – język angielski.

Zmiana języka odbywa się bez przeładowywania strony. Wybrana wersja językowa może być przechowywana lokalnie w przeglądarce.

## 🎞️ Animacje

Elementy strony pojawiają się podczas przewijania w dół i w górę.

Mechanizm animacji:

* wykrywa wejście elementu w pole widzenia,
* nie resetuje elementów, które nadal są widoczne,
* ponownie uruchamia animację po opuszczeniu i ponownym wejściu elementu,
* wykorzystuje opóźnienia dla kolejnych kart i tagów,
* ogranicza kosztowne efekty na smartfonach,
* respektuje ustawienie systemowe ograniczające animacje.

## 📂 Struktura projektu

```text
portfolio-wolfgangxxiii/
├── index.html
├── style.css
├── script.js
├── README.md
└── img/
    ├── avatar.jpg
    └── favicon.ico
```

## 🚀 Uruchomienie lokalne

1. Sklonuj repozytorium:

```bash
git clone https://github.com/wolfgangxxiii/portfolio-wolfgangxxiii.git
```

2. Przejdź do folderu projektu:

```bash
cd portfolio-wolfgangxxiii
```

3. Otwórz plik `index.html` w przeglądarce.

Projekt nie wymaga instalowania zależności ani uruchamiania serwera.

Możesz również skorzystać z rozszerzenia Live Server w Visual Studio Code.

## ⚙️ Główne pliki

### `index.html`

Zawiera:

* strukturę strony,
* treści portfolio,
* sekcje projektów,
* dane wykształcenia,
* certyfikaty,
* przyciski i odnośniki,
* teksty dla wersji polskiej i angielskiej.

### `style.css`

Odpowiada za:

* układ strony,
* wygląd jasnego i ciemnego motywu,
* responsywność,
* animacje,
* karty,
* oś czasu,
* menu mobilne,
* wygląd kontaktu,
* efekty hover.

### `script.js`

Obsługuje:

* przełączanie motywu,
* zapisywanie ustawień w `localStorage`,
* przełączanie języka,
* dynamiczne obliczanie wieku,
* menu hamburger,
* animacje podczas przewijania,
* optymalizację animacji mobilnych.

## 🧩 Projekty prezentowane w portfolio

Portfolio zawiera między innymi:

* aplikacje React,
* aplikacje Electron,
* narzędzia dla systemu Windows,
* skrypty automatyzujące,
* mody Windhawk,
* projekty związane z bazami danych i aplikacjami webowymi.

Więcej projektów znajduje się na profilu:

https://github.com/wolfgangxxiii

## 🔧 Możliwości dalszego rozwoju

* dodanie formularza kontaktowego,
* wdrożenie automatycznych testów interfejsu,
* dodanie filtrowania projektów według technologii,
* dodanie osobnych podstron projektów,
* wdrożenie Progressive Web App,
* optymalizacja SEO i danych strukturalnych,
* automatyczne pobieranie projektów z GitHub API.

## 📝 Licencja

Projekt jest udostępniany na licencji MIT.

## 👤 Autor

**Szymon Piotr Bławat**

* Portfolio: https://wolfgangxxiii.org
* GitHub: https://github.com/wolfgangxxiii

---

# English version

# Portfolio – Szymon Piotr Bławat

A modern and responsive personal portfolio presenting my technical skills, education, certifications, projects and professional development in cybersecurity.

The portfolio was created using pure HTML, CSS and JavaScript. It does not require a framework, build process or backend. The website works on desktop computers, tablets and smartphones and supports both light and dark themes.

## 🌐 Live website

**Online portfolio:**
https://wolfgangxxiii.org
https://portfolio-wolfgangxxiii.netlify.app/

## ✨ Main features

* responsive layout for desktop and mobile devices,
* Polish and English language switcher,
* light and dark themes,
* automatic system theme detection,
* theme preference saved in `localStorage`,
* dynamically calculated age,
* scroll-based interface animations,
* animations working while scrolling both down and up,
* optimized mobile animations,
* responsive hamburger navigation,
* interactive education timeline,
* project cards with source code and demo links,
* technical skills grouped by category,
* certifications, interests and soft skills,
* contact section with email and social profiles,
* support for `prefers-reduced-motion`,
* protection against horizontal page overflow.

## 📄 Website sections

* About me
* Professional profile
* Technical skills
* Education
* Certifications and qualifications
* Practical development
* Projects
* Soft skills and interests
* Contact

## 🧑‍💻 Technologies

* HTML5
* CSS3
* JavaScript ES6+
* Font Awesome 6
* Google Fonts – Inter
* Local Storage API
* Intersection Observer API
* Responsive Web Design

## 📱 Responsive design

The website is designed for different screen sizes.

The interface automatically adjusts:

* section layouts,
* navigation menu,
* project cards,
* education timeline,
* buttons,
* skill tags,
* animations,
* contact section.

Animations are simplified on mobile devices to reduce browser workload and provide smoother scrolling.

## 🌗 Light and dark themes

The portfolio supports:

* manual theme switching,
* automatic system preference detection,
* saving the selected theme in `localStorage`,
* dedicated card, button, section and icon styles for both themes.

## 🌍 Language support

The website includes a language switcher:

* `PL` – Polish,
* `EN` – English.

The language can be changed without reloading the page. The selected language may be stored locally in the browser.

## 🎞️ Animations

Website elements appear while scrolling both down and up.

The animation system:

* detects when an element enters the viewport,
* does not reset elements that are still visible,
* restarts animations after an element leaves and enters the viewport again,
* applies staggered delays to cards and tags,
* reduces expensive effects on smartphones,
* respects the system reduced-motion preference.

## 📂 Project structure

```text
portfolio-wolfgangxxiii/
├── index.html
├── style.css
├── script.js
├── README.md
└── img/
    ├── avatar.jpg
    └── favicon.ico
```

## 🚀 Running locally

1. Clone the repository:

```bash
git clone https://github.com/wolfgangxxiii/portfolio-wolfgangxxiii.git
```

2. Open the project directory:

```bash
cd portfolio-wolfgangxxiii
```

3. Open `index.html` in a web browser.

The project does not require dependency installation or a development server.

You can also use the Live Server extension in Visual Studio Code.

## ⚙️ Main files

### `index.html`

Contains:

* the website structure,
* portfolio content,
* project sections,
* education information,
* certificates,
* buttons and links,
* Polish and English text content.

### `style.css`

Controls:

* page layout,
* light and dark themes,
* responsive design,
* animations,
* cards,
* timeline,
* mobile navigation,
* contact section,
* hover effects.

### `script.js`

Handles:

* theme switching,
* storing settings in `localStorage`,
* language switching,
* dynamic age calculation,
* hamburger menu,
* scroll animations,
* mobile animation optimization.

## 🧩 Projects presented in the portfolio

The portfolio includes:

* React applications,
* Electron applications,
* Windows utilities,
* automation scripts,
* Windhawk mods,
* database and web application projects.

More projects are available on GitHub:

https://github.com/wolfgangxxiii

## 🔧 Possible future improvements

* contact form,
* automated interface tests,
* project filtering by technology,
* dedicated project pages,
* Progressive Web App support,
* improved SEO and structured data,
* automatic project loading through the GitHub API.

## 📝 License

This project is available under the MIT License.

## 👤 Author

**Szymon Piotr Bławat**

* Portfolio: https://wolfgangxxiii.org
* GitHub: https://github.com/wolfgangxxiii
