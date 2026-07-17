# TUS Planner

Aplikacja dla terapeutów prowadzących trening umiejętności społecznych (TUS)
z dziećmi ze spektrum autyzmu.

**Wersja live:** https://pwasiak30.github.io/tus-planner/

## Funkcje

- **Biblioteka scenariuszy** — ćwiczenia TUS z instrukcją krok po kroku, filtrowane po umiejętności
- **Planer sesji** — rozgrzewka / ćwiczenie główne / podsumowanie z automatycznym sumowaniem czasu
- **Tracker postępów** — poziom opanowania (skala 1–5) i notatki behawioralne per uczestnik i sesja
- **Generator historyjek społecznych** — automatyczne dopasowanie piktogramów ARASAAC do wpisanych kroków
- **Karty do sesji** — drukowalne karty scenek do odgrywania ról
- **Grupy** — zarządzanie grupami i uczestnikami, eksport/import kopii zapasowej danych
- **Analiza postępu** — wykresy trendu poziomu opanowania w czasie, drukowalny raport dla rodzica/szkoły

## Dane

Wszystkie dane (uczestnicy, sesje, postępy) są zapisywane lokalnie w przeglądarce
(IndexedDB) — aplikacja działa offline i nic nie jest wysyłane na żaden serwer,
poza zapytaniami do publicznego API [ARASAAC](https://arasaac.org/) przy
generowaniu historyjek społecznych. Zrób regularną kopię zapasową (zakładka
Grupy) — czyszczenie danych przeglądarki usuwa wszystko bezpowrotnie.

## Rozwój lokalny

```
npm install
npm run dev
```

## Stos technologiczny

React + TypeScript + Vite, Tailwind CSS, Dexie (IndexedDB), React Router.
