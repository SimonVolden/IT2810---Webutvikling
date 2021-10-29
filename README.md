# Prosjekt 3 - Gruppe 44 - Dokumentasjon:

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

Vi har lagt på egne aria-labels der det virket naturlig, vi har også passet på at man kan navigere siden med taster slik som "tab". Mye kom gratis med @material-ui og vi har for det meste kun endret ting dersom det virket naturlig.

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
