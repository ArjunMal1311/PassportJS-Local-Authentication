require('dotenv').config();
const express = require("express")
const session = require("express-session")
const passport = require("passport")
const MongoStore = require('connect-mongo')(session)
const routes = require('./routes/route');
const connection = require("./config/database")
const cookieParser = require('cookie-parser');

require('./config/paspport');
const app = express()
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = new MongoStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => { // Middleware just to check the process!
    console.log("Session : ", req.session)
    console.log("User : ", req.user)
    next()
})

app.use(routes);

app.listen(5000, () => {
    console.log("Server running successfully at port 5000")
})