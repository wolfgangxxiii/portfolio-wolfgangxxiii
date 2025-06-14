
# Portfolio – Szymon Piotr Bławat


Nowoczesne, responsywne portfolio programisty – zbudowane z myślą o prostocie, czytelności i płynnych animacjach.  
Projekt posiada tryb ciemny, automatycznie wykrywa preferencje systemowe i działa zarówno na desktopie, jak i na urządzeniach mobilnych.

**Live demo:**  
👉 https://portfolio-wolfgangxxiii.netlify.app/

## ✨ Funkcjonalności

- **Sekcje:** O mnie, Umiejętności, Wykształcenie, Projekty, Kontakt
- **Pełna responsywność** – dopasowanie do ekranu smartfona, tabletu i desktopa
- **Animacje fade-in on scroll**  
- **Tryb ciemny/jasny** z automatycznym wykrywaniem motywu systemowego i przełącznikiem
- **Menu hamburger** na urządzeniach mobilnych
- **Dynamiczny wiek** (liczony na podstawie daty urodzenia)
- **Prezentacja projektów** wraz z linkami do kodu i demo
- **Dane kontaktowe i social media**
- **Estetyczne ikony** dla technologii, zainteresowań, projektów (Font Awesome)

## 📱 Mobile-first

Kod CSS oraz logika JavaScript zostały napisane w stylu mobile-first.  
Menu nawigacji oraz sekcje dostosowują się do małych ekranów (breakpointy: 700px, 480px).

## 🚀 Szybki start (dewelopersko)

1. **Klonuj repozytorium:**
   git clone https://github.com/wolfgangxxiii/portfolio-wolfgangxxiii.git
   cd portfolio-wolfgangxxiii

2. **Otwórz plik `index.html`** w przeglądarce  
   (nie wymaga backendu ani kompilacji!)

## 📂 Struktura plików

/

├── index.html     # Główna strona portfolio

├── style.css      # Stylowanie + media queries mobile

├── script.js      # Interaktywność (dark mode, menu, fade-in, wiek)

├── img            # Folder z grafiką 

## 🧑‍💻 Technologie

- HTML5, CSS3 (własne media queries)
- JavaScript (vanilla, bez frameworków)
- Font Awesome 6 (ikony)
- Google Fonts: Inter

## ⚡ Najważniejsze fragmenty

- **Responsywne menu:**  
  `hamburger` + automatyczne zamykanie na kliknięcie w link, styl mobilny od 700px
- **Dark mode:**  
  Przechowywanie wyboru w localStorage + detekcja motywu systemowego
- **Animacje fade-in:**  
  Klasy CSS `.fade-in` i `.fade-in.visible` + JS nasłuchuje scroll i ładowanie
- **Pełna polska lokalizacja**

## 🛠️ Możliwości rozwoju

- Dodanie własnych projektów do sekcji Projects (HTML)
- Rozbudowa sekcji Kontakt o formularz
- Dodanie wersji językowej EN

## 📝 Licencja

MIT

---

**Autor:** Szymon Piotr Bławat  
GitHub: https://github.com/wolfgangxxiii

---
