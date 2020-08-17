module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.flash('errorMsg', 'Please log in to view that page');
            res.redirect('/login');
        }
    },
    forwardAuthenticated: (req, res, next) => {
        if (!req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/dashboard');
        }
    }
}