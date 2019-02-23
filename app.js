const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    exphbs = require('express-handlebars'),
    session = require('express-session'),
    validator = require('express-validator'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    LocalStrategy = require('passport-local').Strategy,
    routes = require('./routes/index'),
    auth = require('./routes/auth'),
    helpers = require('./lib/helpers'),
    result = require('dotenv').config();

/*  Load .env file */
if(result.error){
    console.log('Error loading env file'+result.error);
}

/*  Connect yo database garbage */
mongoose.connect(process.env.DB_HOST+'/'+process.env.DB_NAME, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('connected', function () {
    console.log('Connected to Database');
});
db.on('error', function (error) {
    console.log('Could not Connect to database');
    console.log(error);
});

/*  Flash message initialisation */
app.use(flash());

/*  Set view-engine */
let hbs = exphbs.create({
    defaultLayout:'main',
    helpers: helpers
});
app.engine('handlebars',hbs.engine);
app.set('view engine','handlebars');

/*   Body parser initialisation */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

/* Express-validator */
app.use(validator());
app.use(express.json());

/* Express-session */
app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:true
}));

/* Passport */
app.use(passport.initialize());
app.use(passport.session());

/* Local strategy */


/*  Request variables   */
app.use('/',(req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || "";
    if ((req.url.indexOf('/vendors/') === -1) && req.url.indexOf('/resources/') === -1 )
        console.log(req.method + " request was made at " + req.url);
    next();
});

app.use('/',routes);
    
app.use(express.static('public'));

app.listen(process.env.PORT,()=>{
    console.log('server started on port '+process.env.PORT);
})