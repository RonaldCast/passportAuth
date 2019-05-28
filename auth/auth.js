const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const UserModel = require('../model/model')
const JWTstrategy  = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('signup', new localStrategy({
    usernameField : 'email',
    passwordField : 'password'
}, async (email, password, done) => {
    try {
        const user = await UserModel.create({email, password})
        return done(null, user)
    } catch (e) {
        done(e)
    }
}))

passport.use('login', new localStrategy({
    usernameField : 'email',
    passwordField : 'password'
}, async (email, password, done) =>{

    try {
        const user = await UserModel.findOne({ email })
        if( !user ){
            return done(null, false, { massage : 'User not found' })

        }

        const validate = await user.isValidPassword(password)
        
        if( !validate ){
            return done(null, false, {message : 'Wrong Password'} )
        }

        return done(null, user, { message : 'Logged in successfully '})

    } catch (e) {
       return done(e)
    }
}))

//perificar el token enviado por el usuario 

passport.use(new JWTstrategy({
    secretOrKey : 'top_secret',
    jwtFromRequest : ExtractJWT.fromAuthHeaderWithScheme('jwt')
}, async (token, done) => {
    try {
        return done(null, token.user)
    } catch (e) {
        done(error)
    }
}))