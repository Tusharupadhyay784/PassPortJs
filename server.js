const express = require('express')
const app = express();
const { connectMongoose, User } = require('./database')
const ejs = require('ejs')
const passport = require('passport');
const { initializingPassport } = require('./passportConfig');
const expressSession = require('express-session')
app.use(express.json()); // data ka adaan pradan hota hai isse
app.use(express.urlencoded({ extended: true }))
app.use(expressSession({ secret: "secret", resave: false, saveUninitialized: false }))
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", 'ejs') // this is for making the server js file to read our ejs file
connectMongoose();

initializingPassport(passport);


app.get('/', (req, res) => {
    res.render("index")
})

app.get('/register', (req, res) => {
    res.render('register')
})
app.get('/login', (req, res) => {
    res.render('login')
})








app.post("/register", async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if (user) return res.status(400).send("User Already Exist")
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);

})

app.post('/login', passport.authenticate('local',{failureRedirect:"/register"}), async (req, res) => {

})



app.listen(100, (err) => {
    console.log("server is running on ", 100);
})