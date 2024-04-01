// middleware/isAuthenticated.js
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // If the user is not authenticated, redirect to the login page
    res.redirect('/users/login');
}

module.exports = isAuthenticated;
