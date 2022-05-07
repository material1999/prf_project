# Programrendszerek fejlesztése gyakorlat <br><br> Webshop projekt dokumentáció <br><br> Készítette: Vass Máté (GEVJ5W)

<br>

## Feladatleírás
Az általam választott feladat egy digitális játékokat árusító webáruház megalkotása volt. A felhasználók regisztráció és bejelentkezés után tekinthetik meg a különböző játékszoftvereket, amiket aztán meg is vásárolhatnak.

**TODO**

<br>

## Munkanapló

<br>

#### *2022.05.02. - 2022.05.04*
Mivel év közben nem tudtam a gyakorlatokon részt venni, ezért a projekt elkezdése előtt a tavalyi gyakorlati videókat néztem végig.

<br>

#### *2022.05.05.*
Csütörtökön a munkakörnyezet konfigurálása következett. Az órán elkészített kódrészleteket a saját gépemen is teszteltem, a kódsorokat alaposan áttanulmányoztam. Ezek után következhetett a projekt két fő részének, a backend-nek és a frontend-nek a beüzemelése.

A backend-hez kiindulásképp az órán is elkészített NodeJS + MongoDB programkódot vettem alapul. Egy online MongoDB adatbázis létrehozása után csupán az adatbázis elérési útvonalát kellett átírnom, és Postman-ből máris tudtam tesztelni a sikeres csatlakozást.

Az Angular-os frontend beüzemelése közbenn problémákba ütköztem. A különféle függőségek nem akartak egymással megfelelően működni, több óra próbálkozás után sem sikerült működésre bírnom a saját gépemen az órai kódot. Úgy döntöttem, egy teljesen új Angular projektet generálok, és ebbe fogok majd az órai anyagból átemelni kódrészleteket.

<br>

#### *2022.05.05.*
Pénteken az első dolgom a backend és a frontend összekapcsolása volt. Ekkor még a saját gépemen futtattam mindkettőt, így a CORS nem okozott problémát a tesztelésnél. Először kézileg vettem fel Postman-nel felhasználókat az adatbázisba, és a bejelentkezést igyekeztem tesztelni, közben folyamatosan olvasva a böngészőm fejlesztői konzolját. Miután megbizonyosodtam róla, hogy a kapcsolat létrejött az adatbázis, az ezt meghajtó szerver, és a felhasználói felület között, nekiláthattam a különféle alapvető funkciók megvalósítsának.

Egy egyszerű felhasználói felületre beviteli mezőket helyeztem el, és navigálást valósítottam meg a be- és kijelentkezés kezeléséhez, felhasználva az órái programkódokat. Ezek után a session kezelés és az AuthGuard bekötése következett, hogy csakis bejelentkezett felhasználók érhessék el a későbbiekben majd játékokat kilistázó oldalt. Ellenkező esetben a bejelentkezési oldalra navigáltatom őket vissza. Elkészítettem egy 404 Error oldalt is, ami olyan URL-ek esetén triggerelődik, melyek nem is léteznek.

Végül a regisztrációt is hassonló módon készítettem el. Itt figyeltem a hibakezelésre is, azaz létező felhasználónevet, valamint hibás formátumú email címet sem engedek meg az adatbázisba való felvétel esetén. Az aktuális hibáról természetesen a felhasználót is tájékoztatom hibaüzenet formájában.

<br>

#### *2022.05.06.*
Ezen a napon következhetett a további funkciók elkészítése. Előtte azonban kisebb hibajavításokat végeztem, valamint egy egyszerű oldalsó navigációs menüsort is elkészítettem a különböző komponensek közötti navigáláshoz. Ezen kívül egy accessLevel változót is felvettem a localStorage-ba, ezzel figyelve azt, hogy a bejelentkezett felhasználó admin, vagy pedig sima felhasználó.

Első körben az adatbázisban eltárolt elemeket sikerült kilistáznom a bejelentkezés után betöltődő komponensben. Ebbe rekordonként beletartoznak különböző egyszerű szöveges és számszerű adatok, valamint egy base64-ként eltárolt kép is.

Két újabb komponenst hoztam létre, melyekkel a lista elemeiről további információkat érhetünk el, valamint vásárolhatunk is. Itt a megfelelő elérési útvonalak, navigálások megvalósítása bizonyult a legnehezebb feladatnak, a kommunikáció során küldött JSON információk szépen működtek.

A korábbi rendelések kilistázása esetén admin felhasználó minden, az oldalon leadott rendelést lát, a sima felhasználók csak a sajátjaikat. Ezen kívül egy admin fület is készítettem, ezt természetesen az egyszerű felhasználók nem látják. Itt pedig az összes regisztrált felhasználóról érhetjük el a regisztrációkor megadott adatokat (a jelszavakat természetesen hash-elve).

<br>

#### *2022.05.07.*
A munkám utolsó napjára maradt az alkalmazás Heroku-ra való deploy-olása.

<br>

## Képernyőképek


<br>

## Deploy
