const passport = require('passport');
const { validPassword } = require('../lib/passwordUtil');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = connection.models.User;

passport.use(new LocalStrategy((username, password, CallBack) => {
    User.findOne({ username: username }).then((user) => {
        if (!user) {
            return CallBack(null, false)
        }

        const isValid = validPassword(password, user.hash, user.salt)

        if (isValid) {
            return CallBack(null, user)
        }

        else {
            return CallBack(null, false)
        }
    }).catch((err) => {
        CB(err)
    })
}))

passport.serializeUser((user, CB) => {
    CB(null, user.id)
})

passport.deserializeUser((userId, CB) => {
    User.findById(userId).then((user) => {
        CB(null, user)
    }).catch((err) => {
        CB(err)
    })
})