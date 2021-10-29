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
Beer API er en interaktiv webapplikasjon som lar brukeren lete etter ulike øltyper. Applikasjonen laster inn data fra en Mongodb database. Databasen asksesseres fra backend med MongoClient. Backend er en Apollo Server som kjører kall med GraphQL. 

Interaksjonen med backend skjer via client sin beers.tsx. Her hentes all ønskelig data.

Det er også laget enhetstester med Jest og End-2-End tester med Cypress
