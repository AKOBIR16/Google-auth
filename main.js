const express = require('express');
const mongoose=require('mongoose');
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')
let MongoStore = require('connect-mongo')
var app=express();
const PORT = 3000;
require('./config/passport')(passport)
dotenv.config()

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
app.use(express.static('public'))
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({  
        mongoUrl: process.env.MONGODB_URL,
               ttl: 14 * 24 * 60 * 60,
                autoRemove: 'native'}),
    })
)
  // Passport middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(require("./routes/index"))
app.use('/api', require('./routes/auth'))

app.listen(PORT,console.log(`listening at ${PORT}`))