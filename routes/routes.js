const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/signup', 
    passport.authenticate('signup', { session : false }), 
    async (req, res, next) => {
        res.json({
            message : 'signup successful',
            user : req.user
        })
})

router.post('/login', async (req, res, next) => { 
    passport.authenticate('login', async (err, user, info) =>{
       try {
        if(err || !user){
            const error = new Error('An Error occured')
            return next(error);
          }
          req.login(user, {session : false}, async (error) => {
              if(error) return next(error)

              const body = {_id : user._id, email : user.email}

              const token = jwt.sign({user : body}, 'top_secret')

              return res.json({ token });
          })
       } catch (e) {
        return next(e);
       }

    })(req, res, next);
})

module.exports = router