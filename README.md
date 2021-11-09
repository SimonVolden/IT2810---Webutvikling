# Prosjekt 4 d) - Gruppe 44 - Web Accessibility:

## Mappeinndeling:

Backend er plassert under mappen server. Frontend under mappen client.

## Installasjon og kjøring:

Start opp to terminaler
Naviger til server og client mappene
Bruk npm for å installere pakkene under de ulike mappene.

### Backend

```bash
cd server
npm install

```

### Frontend

```bash
cd client
npm install
```

For å kjøre prosjektet, bruk npm under de ulike mappene.

### Backend

```bash
cd server
npm start

```

### Frontend

```bash
cd client
npm start

```

# Introduksjon

Beer API er en interaktiv webapplikasjon som lar brukeren lete etter ulike øltyper. Applikasjonen laster inn data fra en Mongodb database. Databasen aksesseres fra backend med MongoClient. Backend er en Apollo Server som kjører kall med GraphQL.

Interaksjonen med backend skjer via client sin beers.tsx. Her hentes all ønskelig data. State managementet er basert på Redux, men Apollo lagrer også innlastede data.

Det er også laget enhetstester med Jest og End-2-End tester med Cypress

## State Management

Gruppen valgte å ta i bruk Redux da bruken minnet om State funksjonaliteten man allerede finner i React. Dette krevde selvsagt litt boilerplate code som måtte skrives, men gruppen opplevde ikke dette som krevende.

Redux er implementert i mappen [stateManagement](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-44/prosjekt-3/-/tree/master/client/src/stateManagement). Her er strukturen delt opp i:

- [actions.tsx](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-44/prosjekt-3/-/blob/master/client/src/stateManagement/actions.tsx)
- [reducers.tsx](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-44/prosjekt-3/-/blob/master/client/src/stateManagement/reducers.tsx)
- [store.tsx](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-44/prosjekt-3/-/blob/master/client/src/stateManagement/store.tsx)
- [types.tsx](https://gitlab.stud.idi.ntnu.no/it2810-h21/team-44/prosjekt-3/-/blob/master/client/src/stateManagement/types.tsx)

Dette for å gjøre det mer oversiktlig. vi har i hovedsak kun en type: Appstate, der alle nødvendige states ligger. Gruppen har vært fornøyd med valget av State Manager.

Det er også verdt å nevne at kallene fra backend lagres frem til søket endres. Dette kan observers ved at blaing til nye sider i listen har en liten forsinkelse, men blaing til allerede viste sider skjer umiddelbart.

## Gjenbruk av kode

Gruppen brukte i hovedsak @Material-ui (se: [Material UI](https://mui.com/)) ved forrige prosjekt. Komponenter slik som Header, og Dark mode er hentet fra dette prosjektet. Bruken av State og Context er tilpasset Redux. Da dette prosjekt hadde mer krav til endringer av komponenter måtte gruppen ta i bruk @mui, som er en nyere versjon av @Material-ui. Det finnes derfor steder i prosjekt der begge bibliotekene er tatt i bruk. Dette er selvfølgelig litt uheldig, men gruppen er likevel fornøyd med designet.

## Filtrering, Søk og Sortering

Som default er ølene sortert på deres ID i databasen. Det er mulig å bla ved å trykke på pilknappene eller gå direkte til en gyldig side. Dersom det er ønskelig å sortere på f.eks. navn, likes, eller alkoholinnhold kan brukeren bruke hamburgermenyen. Dersom brukeren velger samme valg som den akkurat har, vil man endre rekkefølge (fra stigende til synkende el.). Det er også mulig å søke på enkelt øl med søkelfeltet. Dersom man endrer søke/sorteringsmetode vil siden bli satt til ASC (økende) igjen. Clear knappen setter alt tilbake til default.

## GraphQL

Vi har valgt å bruke Apollo som GraphQL-server til å interagere med MongoDB. Her har vi laget egne skjemaer hvor vi definerer typene
som trengs i forhold til dataene vi bruker. Eksempler på disse er Beer, Users og Likes. Vi har også skrevet egne Resolvers for queries og mutations som kjører kall til MongoDB og enten returnerer data vi kan bruke i React, eller legger til/oppdaterer data i databasen.

## Brukergenerert data

Vi har imprementert en enkel måte å lage brukere og innlogging. Med dette kan vi la hver enkelt bruker trykke "tommel opp" på de ølene de liker. Dette lagres på databasen, her er hver like bundet til en bruker.

## Universell utforming / Web accessibility

I oppgave 4d) er oppgaven å utforme nettsiden slik at den opprettholder kravene i forhold til Web Accessibility-standarden WCAG-2.1. Denne standarden inneholder en rekke krav som vi skal prøve å organisere og presentere slik at dere får et innblikk i hva som er gjort og hvorfor. Merk: Vi fokuserer kun på de punktene som er relevante i forhold til nettsiden vår, f.eks. vi vil ikke på tegn-språk-alternativ til lyd o.l. Vi har gått systematisk igjennom alle punktene fra https://www.w3.org/TR/WCAG21/.

1. **Presentasjon:**

   1. Text Alternatives:
      - **"All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for situations like: Controls, Input, Time-Based-Media, Test, Sensory, CAPTCHA, Decoration, Formatting, Invisible"**:
      - Dette har vi utført ved å gi alle knapper og tekstbokser Aria-labels som beskriver funksjonen til det objektet.
   2. Time-based Media:
      - Urelevant da nettsiden vår ikke inneholder noen form for media
   3. Adaptable:
      - **Sensory Characteristics**: Grensesnittet baserer seg på flere karakteristikker som tekst, farge, og ikoner, og er ikke begrenset til kun 1 av de.
      - **Orientation**: Nettsiden er også fullt brukbar i landskapsmodus
      - **Input function**: Alle tekstfelt er lablet med deres funksjon, samt at innloggingsfeltene bruker auto-complete for både email-adresse og passord.
   4. Distinguishable:
      - **Use of color**: Farge er ikke det eneste visuelle måten å frembringe informasjon på, da farge ikke blir brukt for det formålet. All informasjon er enten gitt gjennom tekst eller labels.
      - **Contrast**: SKAL GJØRES NOE MED DETTE !!!!!!!! IKKE GLEM
      - **Resize Text**: Tekst skalerer brukbart opp til 500% (maksgrense) og nettsiden er fremdeles funskjonell, må gjøres noe med søkeboksen. Kriteriet er forsåvidt for opp til 200%.
      - **Images of text**: Vi har ingen bilder som inneholder tekst, utenom etiketten på øl-flaskene, og logoer er utelatt fra dette kriteriet.
      - **Low or no background audio**: Vi har ingen bakgrunnslyd.
      - **Visual Presentation**: Farger kan endres ved bruk av Dark Mode. Bredden er ikke mer enn 80 symboler. Teksten er midtjustert, ikke venstre- eller høyre-justert. Linjeavstand er minimum 1.5, og mer i undermenyene Description, Methods og Ingredients. Tekst kan enkelt justeres ved å zoome inn, uten av brukeren er nødt til å scrolle horisontalt for å lese en hel linje med tekst.
      - **Content on Hover or Focus**: Vi bruker ikke slik funksjonalitet.

2. **Operable**:

   1. **Keyboard Accessible**:
      - **Keyboard**: All funksjonalitet er opererbart gjennom bruk av kun tastatur. Alle knapper og tekstbokser er mulig å navigere seg fram til ved hjelp av TAB og SHIFT + TAB og bruk av Spacebar til å "klikke".
      - **No Keyboard Traps**: Alle knapper er alltid mulig å komme seg ut av.
      - **Keyboard shortcuts**: Vi har ingen keyboard shortcuts.
   2. **Enough Time**:
      - **Timing**: Vi har ingen funksjonalitet som krever hensyn til timing.
      - **Re-authentication**: Vi bruker ikke re-authentication. Hvis en bruker er logget inn, er den logget inn fram til den logger ut. Hvis man logger ut er det ingen tap av data når man logger inn igjen.
   3. **Seizures and Physical Reactions**:
      - Vi har ingen blinkende lys eller animasjoner som kan føre til epileptiske anfall.
   4. **Navigable**:
      - **Bypass Blocks**: Vi har ingen slik funksjonalitet per nå, men vi ser på det som ikke kritisk, da hver side har et endelig antall, < 50 elementer som man kan trykke på, og navigere seg gjennom ved bruk av TAB. Vi mener at en slik funksjonalitet vil kunne gjøre det vanskeligere å navigere da man vil bli nødt til å bruke tastatur-snarveier til å skille mellom blokk-hopp og vanlige hopp.
      - **Page Titled**: Vi har kun 3 distinkte sider, login, signup og hovedsiden, og hver av de har en form for overskrift som er lett synlig.
      - **Focus Order**: Rekkefølgen på elemenetene på siden, vil aldri endres utenom når man endrer sortering, og da vil man uansett være på sorteringsknappen og dermed ikke bli påvirket av at rekkefølgen på elementene har endret seg.
      - **Headings and Labels**: Hver knapp har enten en label som forklarer hva den er, eller tekst som sier hva den gjør. Eksempler på dette er Description og Methods/Timings, og Clear-knappen. Filtermenu (hamburgermenyen) har en aria-label som sier hva den gjør, ettersom den ikke bruker noe tekst.
      - **Focus Visible**: Vi mener dette er oppfylt da elementer i fokus (ved bruk av TAB) vil bli highlighted slik at det er synlig hvilket element som er i fokus til hvert øyeblikk.
      - **Location**: Brukeren kan se side-antallet på toppen av siden.
      - **Link Purpose**: Det er brukt linker 2 plasser på siden, i login og signup. Her har man "Don't have an account? Sign up" og "Already have an account? log in" og disse gir en god beskrivelse på hva linken gjør og hvor den tar deg videre.
   5. **Input Modalities**:
      - **Pointer Gestures**: Vi har funksjonalitet som krever pointer-gestures.
      - **Pointer Cancellation**: Alle knapper på siden er mulig å avbryte ved å flytte musen bort fra knappen før man slipper museknappen. Det betyr at ingen knapper aktiveres ved mousedown, kun ved et fullt mouseclick. Det er også fullt mulig å gjøre om på enhver handling ved å klikke på nytt.
      - **Motion Activation**: Vi har ingen slik funksjonalitet
      - **Target Size**: Alle input-targets (knapper o.l.) har en størrelse på over 44x44 piksler.

3. **Understandable**:
   1. **Readable**:
      - **Language of Page**: Default-språket er bestemt: Engelsk
      - **Abbreviations**: Vi har ingen forkortelser.
      - **Reading Level**: Vi mener at språket er på et lavt nivå, og skal være lett forståelig.
   2. **Predictable**:
      - **On Focus**: Når en komponent er i fokus, endrer den ikke context før brukeren eksplisitt trykker Space/Enter
      - **On Input**: Et bruker-interface-element skal ikke automatisk endre context ved bruker-input uten at brukeren har blitt opplyst over oppførselen til komponenten på forhånd. Her bryter søkefeltet litt med kravet, men vi føler at søket blir mer responsivt ved at resultatet hentes umiddelbart når man skriver inn søketeksten, og siden det ikke er en permament endring (Det er lett å viske ut teksten igjen), mener vi at dette er greit i forhold til Web Accessibility.
      - **Consistent Navigation**: All navigering opptrer på samme måte gjennom hele siden.
      - **Consistent Identification**: Alle komponenter som har samme funksjonalitet, identifiseres på en konsekvent måte.
      - **Change of Request**: Context-endringer skjer kun etter brukeren har gjort et input.
   3. **Input Assistance**:
      - **Error Identification**: Hvis bruker har oppgitt feil epost-adresse eller passord vil brukeren få varsel om dette, samt hvis en bruker prøver å lage en ny bruker med en eksisterende epost-adresse. Ellers er nettsiden utformet slik at en bruker ikke vil klare å skrive feil input. Eksempel på dette er at bruker ikke kan skrive bokstaver i sidetall o.l.
      - **Labels or Instructions**: Det alle teksbokser er merket med hvilket input som er ønsket, f.eks email og passord.
      - **Error Suggestion**: Dette er ikke implemenetert eksplisitt, men kombinasjonen av labels og error identification vil sammen gjøre dette overflødig i vårt tilfelle.
      - **Error Prevention (Legal, Financial, Data)**: Ikke nødvendig i vårt tilfelle. Dette kravet er for sider som fører til juridiske forpliktelser eller finansielle transaksjoner.
      - **Hjelp**: Kompleksiteten til nettsiden er ikke stor nok til at en hjelp-knapp vil føre til mer aksessibilitet.
      - **Error Prevention (All)**: Alle brukerhandlinger er reversible med de samme handlingene som er brukt til å utføre de. Det eneste unntaket er logout-knappen, men denne er godt synlig i høyre hjørne.
   4. **Robust**:
      1. **Compatible**:
         - **Parsing**: Det er ikke brukt ren HTML i nettsiden, og alle React-Elementer er indeksert med unike ID'er.
         - **Name, Role, Value**: Alle komponenter er lablet med ARIA-name og role. "NOTE
           This success criterion is primarily for Web authors who develop or script their own user interface components. For example, standard HTML controls already meet this success criterion when used according to specification." Vi har brukt Material-UI for alle våre komponenter, og denne funksjonaliteten er innebygd.
         - **Status Messages**: Ikke relevant i forhold til nettsiden vår.
   5. **Conformance**: 2. **Conformance Requirements**:
      - **Conformance Level**: Ettersom at nettsiden tilfredstiller alle suksesskriteriene merket A og AA, kan vi si at nettsiden er på nivå AA. Den er derimot ikke i samsvar med absolutt alle krav merket med AAA, og dermed kan ikke være på dette nivået. Det er ikke anbefalt å kreve samsvar med alle krav på AAA for hele nettsider da det for enkelte typer innhold ikke er mulig å oppfylle alle kravene, og det mener vi er i overensstemmelse med nettsiden vår.
      - **Complete Processes**: Dette punktet betyr at nettsiden må opprettholde kravene til suksesskriteriene gjennom hele prosessen når en bruker gjør en aktivitet på nettsiden. I vår nettside vil dette bety at en bruker logger inn/ lager bruker og så går inn på nettsiden og f.eks. ser på oppskrifter. Hele denne prosessen må opprettholde kravene, til AA (samme som for hele nettsiden), noe vi mener den gjør.
      - **Only Accessibility-Supported Ways of Using Technologies**: Vi har ingen alternativ versjon av nettsiden for personer med alternative behov, men den er lagt opp slik at hvem som helst kan bruke den samme versjonen.
      - **Non-Interference**: Nettsiden skal ikke bli påvirket av at en bruker bruker ekstern teknologi for å navigere siden. Nettsiden opprettholder også kravene 1.4.2, 2.1.2, 2.3.1, og 2.2.2.

## Testing

Vi har i dette prosjektet tatt i bruk enhetstester med jest der det opplevdes naturlig. Gruppen har også laget end-2-end tester med [Cypress](https://www.cypress.io/). Testene skrevet med Cypress kan kjøres ved å navigere til client mappen og kjøre node_modules\.bin\cypress open:

```bash
cd client
node_modules\.bin\cypress open
```

Testene kjører på den live versjonen av applikasjonen, men kan enkelt endres til lokalhost.

Vi synes Cypress var et godt valg, enkel i bruk og veldig effektivt. Denne oppdaget fort feil med siden som oppstod når vi lastet den opp på VM.

## Noe å legge merke til

Vi bruker egentlig React-Router til å bytte mellom vinduene (f.eks. login og signup), men fikk problemer med dette når applikasjonen kjører på VM. Så vi har implementert en enkel switch som bruker redux states som bytter mellom sidene når det trengs. Dette er ikke optimalt hvis man har en større applikasjon men fungerer bra på VM med vår applikasjon.
