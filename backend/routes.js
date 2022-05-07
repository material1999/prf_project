const router = require('express').Router()
const mongoose = require('mongoose')
const uuid = require('uuid');

const userModel = mongoose.model('user')
const jatekModel = mongoose.model('jatek')

const passport = require('passport')

router.route('/jatekok/:id?').get((req, res) => {
    if (!req.params.id) {
        jatekModel.find((err, jatekok) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            return res.status(200).send(jatekok)
        })
    } else {
        jatekModel.findOne({ id: req.params.id }, (err, jatek) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            if (!jatek) return res.status(400).send('Nincs ilyen játék!')
            return res.status(200).send(jatek)
        })
    }
}).post((req, res) => {
    if (!req.body.cim || !req.body.ar || !req.body.leiras || !req.body.ertekeles || !req.body.kep) {
        return res.status(400).send("Hiányos input!")
    } else {
        // a teljesség kedvéért itt megírom ezt a kódot
        // de felesleges mert a sémában már definiáltuk, hogy két doksi
        // nem kaphatja ugyanazt a nevet
        var newID = uuid.v1();
        jatekModel.findOne({ id: newID }, (err, jatek) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            if (jatek) return res.status(400).send('mar van ilyen')
            const nJatek = new jatekModel({
                id: newID, cim: req.body.cim, kep: req.body.kep,
                ar: req.body.ar, leiras: req.body.leiras, ertekeles: req.body.ertekeles
            })
            nJatek.save((error) => {
                if (error) return res.status(500).send('DB hiba a betöltés során ' + error)
                return res.status(200).send(req.body)
            })
        })
    }
}).put((req, res) => {
    if (!req.params.id || (!req.body.cim && !req.body.ar && !req.body.leiras && !req.body.ertekeles)) {
        return res.status(400).send("Hiányos input!")
    } else {
        jatekModel.findOne({ id: req.params.id }, (err, jatek) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            if (!aru) return res.status(400).send('Még nincs ilyen játék')
            if (req.body.cim) jatek.cim = req.body.cim
            if (req.body.ar) jatek.ar = req.body.ar
            if (req.body.leiras) jatek.leiras = req.body.leiras
            if (req.body.ertekeles) jatek.ertekeles = req.body.ertekeles
            if (req.body.kep) jatek.kep = req.body.kep
            jatek.save((error) => {
                if (error) return res.status(500).send('DB hiba a betöltés során ' + error)
                return res.status(200).send(jatek)
            })
        })
    }
}).delete((req, res) => {
    if (!req.params.id) {
        jatekModel.deleteMany((err) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            return res.status(200).send('Törölve minden')
        })
    } else {
        /* alternatív ha szeretném ellenőrizni hogy bent volt-e az adat
            aruModel.findOne({nev: req.params.id}, (err, aru) => {
                if(err) return res.status(500).send('DB hiba ' + err)
                if(!aru) return res.status(400).send('Nincs ilyen aru!')
                aru.delete((error) => {...})
            })
         */
        jatekModel.deleteOne({ id: req.params.id }, (err) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            return res.status(200).send('Jatek torolve (feltéve ha volt)')
        })
    }
})

router.route('/users/:id?').get((req, res) => {
    if (!req.params.id) {
        userModel.find((err, users) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            return res.status(200).send(users)
        })
    } else {
        userModel.findOne({ nev: req.params.id }, (err, user) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            if (!user) return res.status(400).send('Nincs ilyen user!')
            return res.status(200).send(user)
        })
    }
}).post((req, res) => {
    if (!req.params.id || !req.body.password || !req.body.email) {
        return res.status(400).send("Hiányos input!")
    } else {
        userModel.findOne({ username: req.params.id }, (err, user) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            if (user) return res.status(400).send('mar van ilyen')
            const nUser = new userModel({
                username: req.params.id, email: req.body.email,
                password: req.body.password
            })
            nUser.save((error) => {
                if (error) return res.status(500).send('DB hiba a betöltés során ' + error)
                return res.status(200).send(req.body)
            })
        })
    }
}).put((req, res) => {
    if (!req.params.id || (!req.body.username && !req.body.password)) {
        return res.status(400).send("Hiányos input!")
    } else {
        userModel.findOne({ username: req.params.id }, (err, user) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            if (!user) return res.status(400).send('Még nincs ilyen user')
            if (req.body.password) user.password = req.body.password
            if (req.body.email) user.darab = req.body.darab
            user.save((error) => {
                if (error) return res.status(500).send('DB hiba a betöltés során ' + error)
                return res.status(200).send(user)
            })
        })
    }
}).delete((req, res) => {
    if (req.params.id) {
        userModel.deleteOne({ username: req.params.id }, (err) => {
            if (err) return res.status(500).send('DB hiba ' + err)
            return res.status(200).send('Törölve az adott user')
        })
    } else {
        return res.status(403).send('Tilos minden felhasználót törölni egyszerre!')
    }
})

router.route('/helloworld').get((req, res) => {
    return res.status(200).send("Hello World!")
}).post((req, res) => {
    if (req.body.username) {
        return res.status(200).send("Hello " + req.body.username + "!")
    }
    return res.status(400).send("Köszönni ki fog?")
})

router.route('/login').post((req, res, next) => {
    if (req.body.username, req.body.password) {
        //meghívom a passport local stratégiáját és paraméterként átadom neki a req,res objektumokat
        passport.authenticate('local', function (error, user) {
            console.log('login eredménye:',user)
            if (error) return res.status(500).send(error);
            // ezzel léptetem bele a sessionbe a felhasználót, a user objektumot utána mindig el tudom majd érni
            // req.user néven
            req.logIn(user, function (error) {
                if (error) return res.status(500).send(error);
                return res.status(200).send(user.accessLevel);
            })
        })(req, res, next);
    } else { return res.status(400).send('Hibas keres, username es password kell'); }
});

router.route('/logout').post((req, res, next) => {
    console.log('user:', req.user)
    // ha volt sikeres login és sikerült sessionbe léptetni a usert, akkor a session megszüntetéséig
    // vagyis logoutig ez az isAuthenticated() mindig true lesz majd
    if (req.isAuthenticated()) {
        
        req.logout(); // megszünteti a sessiont
        return res.status(200).send('Kijelentkezes sikeres');
    } else {
        return res.status(403).send('Nem is volt bejelentkezve');
    }
})

module.exports = router