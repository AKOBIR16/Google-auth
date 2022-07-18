const express = require('express')
const passport = require('passport')
const router = express()

router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))

router.get('/google/auth',passport.authenticate('google', { failureRedirect: '/' }),(req, res) => {
      res.redirect('/log')
    }
  )

router.get('/logout', (req, res) => {
 
    req.logout(function(err) {
      if (err) { 
        console.log(err); 
        res.status(500).send("something went wrong on server")}
      res.redirect('/');
    });
})
  
  module.exports = router