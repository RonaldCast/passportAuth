const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const app = express();
const UserModel = require('./model/model');



mongoose.connect('mongodb://localhost:27017/passport-jwt', { useNewUrlParser: true });
// mongoose.connection.on('error', error => console.log(error) );

require('./auth/auth');

app.use(bodyParser.json());
app.use( bodyParser.urlencoded({ extended : false }) );
app.use(morgan('dev'))
const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');

app.use('/', routes);

app.use('/users', passport.authenticate('jwt', {session : false }), secureRoute)


app.listen(3000, () =>{
    console.log('http://localhost:3000');
} 
)
    