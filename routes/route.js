const router = require("express").Router()
const passport = require("passport")
const genPassword = require("../lib/passwordUtil").genPassword
const connection = require('../config/database');
const { isAuth } = require('../middleware/authMiddleware');
const User = connection.models.User;


// POST METHODS
router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success' }));
router.post('/register', (req, res, next) => {
    const saltHash = genPassword(req.body.password)

    const salt = saltHash.salt
    const hash = saltHash.hash

    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt,
        admin: true
    })

    newUser.save().then((user) => {
        console.log(user)
    })

    res.redirect('/login')
});

// GET METHODS
router.get("/", (req, res) => {
    res.sendFile(__dirname + "\\home.html")
})

router.get("/register", (req, res) => {
    res.sendFile(__dirname + "\\register.html")
})

router.get("/login", (req, res) => {
    res.sendFile(__dirname + "\\login.html")
})

router.get('/login-success', (req, res, next) => {
    res.sendFile(__dirname + "\\Login-Success.html")
});

router.get('/login-failure', (req, res) => {
    res.sendFile(__dirname + "\\Login-Failure.html")
})

router.get('/protected-route', isAuth, (req, res, next) => {
    res.sendFile(__dirname + "\\secret.html")
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/login')
})

router.get('/getcookie', (req, res) => {
    res.send(req.cookies);
})


module.exports = router;
