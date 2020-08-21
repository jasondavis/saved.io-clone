/**
 * Modules
 */
const LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt');


/**
 * Models
 */
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(
        'local',
        new LocalStrategy(
            { passReqToCallback: true, usernameField: 'email' },
            (req, email, password, done) => {
                User.findOne({ email }, (err, user) => {
                    if (err) return done(err);

                    if (user) {
                        bcrypt.compare(password, user.password).then(function (isMatch) {
                            if (!user || !isMatch) {
                                return done(null, false, req.flash('errorMsg', 'Invalid Email/Password'));
                            } else {
                                return done(null, user);
                            }
                        });
                    } else {
                        return done(null, false, req.flash('errorMsg', 'Invalid Email/Password'));
                    }
                });
            }
        )
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}