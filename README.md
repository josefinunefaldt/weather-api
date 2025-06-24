# WeatherApp

Det här projektet genererades med hjälp av: [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

För att starta applikationen:

```bash
ng serve
```
Eller för att köra ESLint innan start:
```bash
npm run start
```
Vid lyckat test körs ng serve automatiskt.


## Applikationens syfte
Syftet med applikationen är att hämta och visa aktuell temperatur för valfri stad. Jag har byggt hela lösningen i Angular, och även om jag först funderade på att använda .NET för backend (då det är den teknik jag är mest van vid), valde jag istället att utmana mig själv och jobba fullt ut med Angular för att lära mig mer.
Applikationen byggdes stegvis. Jag började med att sätta upp ESLint, Bootstrap, och konfigurera projektet. Därefter började jag arbeta direkt i AppComponent, eftersom detta är en liten applikation. Hade projektet varit större, hade jag självklart delat upp det i fler komponenter.
Jag ville ta fasta på något som ni skrev i mejlet: "Vi tycker om kreativa lösningar". Därför valde jag att gå ett steg längre än vad uppgiften krävde, och integrera ett ytterligare API (Geoapify). Det gör det möjligt för användaren att skriva in ett valfritt stadsnamn, som då omvandlas till latitud och longitud automatiskt, vilket ger en mer flexibel och användarvänlig upplevelse.

För att förbättra användarflödet har jag även gjort så att knappen "GET CSV" endast är aktiv efter att temperaturdata har hämtats, och om ett fel uppstår vid API-anrop (t.ex. felstavat stadsnamn), så visas i stället temperaturen för Stockholm som standard. På så sätt garanteras att applikationen alltid visar någon data, oavsett fel.

## Kod och struktur

Jag har strukturerat applikationen efter bästa förmåga utifrån min kunskap inom Angular. Koden är organiserad enligt följande:

/environment: Innehåller API-nyckeln för Geoapify. Jag har valt att lägga den här istället för direkt i koden, för bättre säkerhet och struktur.

/services: Här finns min WeatherService, som är applikationens kärna. Den ansvarar för båda API-anropen, först till Geoapify för att hämta koordinater, sedan till Open-Meteo för att hämta temperatur.
Denna service är @Injectable({ providedIn: 'root' }), vilket betyder att den är tillgänglig globalt som singleton. Om applikationen skulle växa, skulle jag kunna använda den på fler ställen utan att behöva lägga till den i varje komponent.

Jag använder också HttpClient, som är en native Angular-funktion, vilket var något som efterfrågades i instruktionerna.
/types: Innehåller TypeScript-typer för API-responsen. Jag har utgått från respektive API:s dokumentation för att matcha datatyperna korrekt.

App component html:
- Ett inputfält som använder [(ngModel)], en inbyggd Angular-funktion för two-way binding, vilket binder det användaren skriver direkt till city-variabeln i komponenten.
- Användning av Angulars <ng-container> och *ngIf-direktiv för att på ett effektivt sätt visa laddningsindikator medan data hämtas, detta är också native Angular-funktionalitet som styr dynamisk rendering.
- Bootstrap används för styling och layout.
- En modalruta visar temperaturinformation efter klick.
- En knapp för att spara väderdatan till CSV-fil (genererad i frontend med Blob).
- En bakgrundsbild som jag lagt till i app.component.css för att ge ett trevligare visuellt intryck.


