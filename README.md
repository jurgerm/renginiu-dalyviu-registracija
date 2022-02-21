# Renginių dalyvių registracijos sistema

## Reikalavimai

Šios projekto metu reikės sukurti programą naudojant React, NodeJS Express ir MongoDB arba MySQL. 

Programos tikslas - leisti renginių organizavimu užsiimančiai įmonei, registruoti telefonu paskambinusius asmenis į renginį. 

Renginių organizatorius, prisijungęs prie programos, matys: 

1. Registracijos formą joje nurodoma: 
  i) vardas ir pavardė; 
  ii) el. paštas; 
  iii) amžius.

1. Užsiregistravusių vartotojų sąrašą (nurodoma lentelė su vartotojo vardu ir pavarde, el. paštu, gimimo data, administravimo mygtukais).

Funkcionalumas:

1. CRUD operacijos (registracijos formoje galima sukurti vartotoją, lentelėje matyti, atnaujinti ir ištrinti vartotojus).

1. Duomenų saugojimas (vartotojai saugomi duomenų bazėje). Jeigu naudojate MySQL duomenų bazę būtina sukurti sąryšius tarp lentelių ir naudoti "Primary Key" bei "Foreign Key" apribojimus.

1. Dizainas. Dizainą sukurkite patys, tačiau minimalus dizainas būtinas.

## Išpildymas

Sistema sudaryta iš dviejų dalių: 
  * frontend - sąsaja su naudotojasi, naudotojų įvedamos informacijos validacija.
    * React, Bulma, react-bulma-components, scss, FontAwesome.
  * backend - naudotojų autentifikacija, informacijos priėmimas per REST, saugojimas duomenų bazėje.
    * NodeJs, NodeJs Express.
  * duomenų saugykla - MySQL.

Terminai:
  * Renginių registratoriai - atskiri naudotojai. Vienas renginys, vienas registratorius. 
  * Dalyviai - suvedama informacija.

## Acceptance Criteria

- [x] Panaudoti React.
- [x] Panaudoti NodeJS.
- [x] Panaudoti Express.
- [x] Panaudoti MySQL.
- [x] (optional) Renginio organizatorius turi galėti užsiregistruoti.
- [x] (optional) Renginio organizatorius turi galėti prisijungti.
- [x] Renginio dalyvio registracijos forma:
  - [x] vardas ir pavardė.
    - [x] (optional) validacija, ar užpildyta.
  - [x] el. paštas.
    - [x] (optional) validacija, ar užpildyta.
    - [x] (optional) validacija, ar teisingas el.pašto adresas (regex).
  - [x] amžius. _Padaryta gimimo data, nes visur kitur yra naudojama gimimo data._ 
    - [x] (optional) validacija, ar užpildyta.
    - [x] (optional) validacija, ar tai data.
    - [x] (optional) validacija, ar dalyvis pilnametis. _Tikrinama, ar šiemet jam bus 18 metų, nes iš reikalavimų neaišku, kada registruojama ir kada vyks renginys_.
- [x] Užsiregistravusių dalyvių sąrašas. _Rodomas su tuo pačiu prisijungimu užregistruoti dalyviai._
  - [x] Lentelė. _Lentelių naudojimas nėra mobile friendly sprendimas, bet toks yra reikalavimas. Tačiau atliekant naudota Bulma Columns, kas, esant reikalavimui, leistų įjungti kitokį vaizdavima mobile._
    - [x] Dalyvio vardas.
    - [x] Dalyvio pavardė.
    - [x] Dalyvio el. paštas.
    - [x] Dalyvio gimimo data.
    - [x] Administravimo mygtukai:
      - [x] Redaguoti Dalyvio informaciją.
      - [x] Ištrinti Dalyvio informaciją.
        - [x] Apsauga nuo netyčinio ištrynimo.
    - [x] (optional) Rikiavimas:
      - [x] pagal Dalyvio vardą. 
      - [x] pagal Dalyvio pavardę.
      - [x] pagal Dalyvio el.paštą.
      - [x] pagal Dalyvio gimimo datą.
- [x] CRUD operacijos:
  - [x] Dalyvio registracijos formoje galima sukurti dalyvį.
  - [x] Lentelėje matyti dalyvius.
  - [x] Atnaujinti Dalyvio informaciją.
  - [x] Ištrinti Dalyvio informaciją.
- [x] Duomenų saugojimas:
  - [x] Duomenų saugojimas duomenų bazėje.
  - [x] Naudojant MySQL.
    - [x] Sukurti sąryšius tarp lentelių.
    - [x] Naudoti "Primary Key" apribojimus.
    - [x] Naudoti "Foreign Key" apribojimus.  
- [x] Dizainas:
  - [x] Minimalus dizainas.
  - [x] Logotipas.
  - [x] Spalvos. _Standartinė tema pakeista naudojant scss ir bulma temos kintamuosius._

## Papildomai

  * Context panaudojimas autentifikacijai ir pranešimų siuntimui tarp atskirų React komponentų.
  * Vieninga pranešimų vieta, rodyti pranešimams iš kreipimųsi į webservisus, validacijas.
  * Validacijos metu laukeliai su klaidomis paryškinami, įvedus informaciją teisingai paryškinimas nusiima. 
  * Tam, kad pademonstruočiau sugebėjimą naudoti tiek NodeJS `require`, tiek ES module `import `/` export`,  backend ir frontend padaryta skirtingai: backend buvo panaudota  `require`, o frontend - `import `/` export`.