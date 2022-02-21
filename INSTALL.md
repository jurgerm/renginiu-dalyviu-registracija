# Renginių dalyvių registracijos sistema

Diegimo ir paleidimo eiliškumas:

1. Atsiųsti iš git projektą.
2. Įdiegti ir paleisti serverį.
3. Įdiegti ir paleisti klientinę dalį.


## Serverio diegimas ir paleidimas

```
# pereiti į serverio katalogą
cd ./server
# atsisiųsti node modulius
npm i
```

Sukurti duomenų bazę ir prisijungimus.

Sukurti duomenų struktūras duomenų bazėje - įvykdyti sql scriptus iš `./server/sql` katalogo.

Nukopijuoti  `.env.example` failą kaip `.env`. Jame surašyti reikiamus nustatymus:
  * `MYSQL_HOST` - MySQL serverio adresas (pvz, localhost, 127.0.0.1 )
  * `MYSQL_PORT` - MySQL serverio portas (standartinis 3306)
  * `MYSQL_USER` - MySQL prisijungimo vardas
  * `MYSQL_PW` - MySQL prisijungimo slaptažodis
  * `MYSQL_DB` - Duomenų bazės pavadinimas
  * `PORT` - Portas, kuriuo bus pasiekami webservisai (pvz.: 8080) *Pastaba*: nepainioti su MySQL portu.
  * `JWT_SECRET` - Slaptažodis, naudojamas koduoti JWT. 

Paleisti serverį:
```
npm start
```

## Klientinės dalies diegimas ir paleidimas

```
# pereiti į klientinės dalies katalogą
cd ./client
# atsisiųsti node modulius
npm i
```
Nukopijuoti  `.env.example` failą kaip `.env`. Jame surašyti reikiamus nustatymus:
   * `REACT_APP_BASE_URL` - webservisų adresas, pvz. http://localhost:8080

Paleisti serverį:
```
npm start
```






