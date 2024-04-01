var express = require('express');
var router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

// User model
const User = require('../models/user'); // Ensure you have a User model at this path

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/users/login');
}

// Middleware to check if the user is logged out
function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/');
}

/* GET users listing. */
router.get('/', isLoggedIn, function(req, res, next) {
    res.send('respond with a resource');
});

/* GET user registration page. */
router.get('/register', isLoggedOut, function(req, res, next) {
    res.render('register'); // You should have a register.hbs view file for this render
});

/* POST user registration. */
router.post('/register', isLoggedOut, function(req, res, next) {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) throw err;
        new User({
            username,
            email,
            password: hashedPassword
        }).save()
        .then(user => {
            res.redirect('/users/login');
        })
        .catch(err => console.log(err));
    });
});

/* GET user login page. */
router.get('/login', isLoggedOut, function(req, res, next) {
    res.render('login'); // You should have a login.hbs view file for this render
});

/* POST user login. */
router.post('/login', isLoggedOut, passport.authenticate('local', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login',
    failureFlash: true
}));

/* GET user profile page. */
router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('profile', { user: req.user }); // Pass the logged-in user's data to the profile view
});

/* GET user logout. */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/users/login');
});

module.exports = router;
