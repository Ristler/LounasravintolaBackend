# Ohjeistus Lounasravintola Projektiin

Tiedosto sisältää ohjeistuksen lounasravintola projektin sisällöstä. Tiedostossa on esitelty projektin idea,
kohderyhmä, sovelluksen toiminnallisuus ja ohjeistus projektin toiminnallisuuksien löytmämisestä ja lokaalisesta käytöstä.

## Sovelluksen idea ja kohderyhmä

Sovelluksen idea on luoda lounasravintola, joka tarjoaa asiakkailleen mahdollisuuden valita lounasruokansa tilausjärjestelmällä.
Asiakkaan on mahdollista lisätä erillaisia lounaita ostoskoriin ja tarkastella ostoskorin sisältöä. Asiakas voi tarkistella ruokia ja ostoskoria
ilman sisään kirjautumista, mutta tarvitsee oman tilin viimesitään tilausta suorittaessa.

Jos asiakkaalla on tili, pääse asiakas katsomaan omaa profiilia, joka listaa käyttäjän tilaushistorian. Tilaushistoriasta asiakas voi katsoa kaikki
aikaisemmat tilaukset ja niiden tiedot.

Sovelluksen kohderyhmänä on asiakkaat, jotka haluavat tilata kotiruokaa helposti ja nopeasti. Työikäiset sekä eläkeläiset.

## Toiminnallisuus

Sovellukseksessa asiakas voi tilata lounaita sovelluksen lounaslistalta. Listassa näkyy lounaan hinta ja ostoskorin kautta, lounaan määrää voi nostaa.
Ostokorista näkyy myös tilauksen yhteishinta. Asiakas voi tarkistaa ostoskorin sisällön ja poistaa lounaita ostoskorista.

Profiili sivulla asiakas näkee omat tiedot. Tietojen ala-puolella on listattu tilausten kokonais määrä. Oikealla asiakas näkee koko tilaushistorian.
Tilaushistoriasta asiakas voi tarkastella tilaukseen kuulivia lounaita, painamalla tilausta. Tilauksen kohdalla näkyy myös tilauksen tilanne.

Tilauksen pystyy toimittaa vain ainoastaan Admin käyttäjä, joka voi merkitä tilauksen toimitetuksi. Admin käyttäjä voi myös poistaa tilauksia.

## Asennus ja Suoritus

Sovelluksen voi asentaa ja käyttää paikallisesti seuraavien ohjeiden mukaan:

### Backend ja Frontend Asennus

Asenna backend ja frontend seuraavien repositorioiden avulla:
 - Backend: [Backend](https://github.com/Ristler/LounasravintolaBackend)
 - Frontend: [Frontend](https://github.com/Ristler/LounasRavintolaFront)

Katso että sinulla on Node ja olet suorittanut "npm install" komennon molemmissa repositorioissa.

### MongoDB

Rekisteröidy MongoDB [Atlas](https://www.mongodb.com/cloud/atlas/register) palveluun ja luo uusi klusteri tietokantaa varten, jonka sisällä on tietokanta "lounasravintola". 

Backend sisältää kansion "mongoDB" joka sisältää JSON tiedostot listojen luomiseen. 

Tiedostoissa "users" ja "orders" sisältävät vain tyhjät esimerkit, miltä tietokannan pitäisi näyttää.

Voit halutessasi ladata MongoDBCompass, jona kautta voit seurata tietokannan sisältöä ja luoda uusia tietokantoja.

### Env

Backendissä on .env tiedosto, joka sisältää seuraavat muuttujat:
- MONGO_URI: MongoDB URI, joka löytyy MongoDB Atlasista
- JWT_SECRET: Salaisuus, jota käytetään esim, salasanan salaamiseen tietokantaan
- PORT: 3000

Frontendissä on .env tiedosto, joka sisältää seuraavat muuttujat:
- VITE_FOODS_API=http://localhost:3000/foods
- VITE_USERS_API=http://localhost:3000/users
- VITE_AUTH_API=http://localhost:3000/auth
- VITE_ORDER_API=http://localhost:3000/orders 

## Sovelluksen käynnistys

Suorita "npm run dev" Frontend ja Backend repositorioissa.

### Sovelluksen käyttö

Luo uusi käyttäjä ja kirjaudu sisään. Voit luoda uuden käyttäjän rekisteröitymis sivulla, jonka jälkeen sivu ohjaa sinut kirjautumis sivulle.
Kirjaudu sisään ja siirry lounaslistalle, josta voit valita lounaita ostoskoriin. Ostoskorista voit tarkistaa ostoskorin sisällön ja poistaa lounaita ostoskorista.

Ostokorista voit pistää tilauksen eteenpäin, ja siirtyä profiili sivulle, josta voit tarkistaa omat tiedot ja tilaushistorian. Voit myös poistaa oman käyttäjän.

Tilauksen voi hyväksyä ainoastaa käyttäjä jolla on "admin" rooli. Admin käyttäjä voi merkitä tilauksie toimitetuiksi.
Admin käyttäjä pitää luoda manuaalisesti lähettämällä Requesti jossa rooli on "admin" (Tietoturva riski)
