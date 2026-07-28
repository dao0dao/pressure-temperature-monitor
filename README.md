# Pressure & Temperature Monitor

Angularowa aplikacja do monitorowania danych z systemu chłodzenia (temperatura i ciśnienie w czasie) na mockowych danych, z możliwością filtrowania po zakresie dat i ręcznego dodawania nowych pomiarów.

Wykres wykorzystuje bibliotekę komponentów Vue skompilowaną jako Web Component: **[components-design](https://github.com/dao0dao/components-design)**.

> **Ważne:** branch `main` **nie zawiera** wgranej biblioteki `components-design` — trzeba ją samodzielnie wygenerować i skopiować do `libs/components-design/` przed pierwszym uruchomieniem, inaczej build/serve zakończy się błędem `Cannot find module 'components-design'`.

## Wersja hostowana

Aplikacja z brancha `vercel-deploy` jest dostępna online pod adresem: **[https://pressure-temperature-monitor-ten.vercel.app/](https://pressure-temperature-monitor-ten.vercel.app/)**

## Backend

Aplikacja **nie posiada backendu** — wszystkie dane (autoryzacja, pomiary) są mockowane wyłącznie po stronie klienta.

## Logowanie

Formularz logowania **akceptuje dowolny login i hasło** — nie ma prawdziwej autoryzacji. Wpisanie czegokolwiek i wysłanie formularza zaloguje użytkownika. Login zapisywany jest w `localStorage`, dzięki czemu **odświeżenie strony nie wylogowuje** użytkownika — sesja "trwa" do momentu ręcznego wylogowania lub wyczyszczenia danych przeglądarki.

## Dane

Wszystkie dane pomiarowe są mockowane w pamięci (`CoolingSystemMockDataService`) i **znikają po odświeżeniu strony**. Domyślny zestaw danych startowych generowany jest dynamicznie względem bieżącego momentu — **120 wpisów, co godzinę**. Dodatkowe wpisy można dodać ręcznie w widoku **Add data**.

## Wymagania

- Node.js 20+
- npm
- (opcjonalnie) Docker + Docker Compose

## Uruchomienie lokalnie (bez Dockera)

\`\`\`bash
npm install
npm start
\`\`\`

Aplikacja dostępna pod `http://localhost:4200`.

## Uruchomienie przez Docker

\`\`\`bash
docker compose -f docker/docker-compose.dev.yml up
\`\`\`

Aplikacja dostępna pod `http://localhost:4200`.

## Struktura projektu

\`\`\`
src/app/
  core/          
  layout/        
  features/      
  shared/        
libs/
  components-design/   
public/
  i18n/          
\`\`\`