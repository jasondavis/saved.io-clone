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
            { usernameField: 'email' },
            (email, password, done) => {
                User.findOne({ email }, (err, user) => {
                    const falseMessage = { message: 'Invalid Email/Password' };

                    if (err) return done(err);

                    if (!user) return done(null, false, falseMessage);

                    bcrypt.compare(password, user.password).then(function (isMatch) {
                        if (!isMatch) {
                            return done(null, false, falseMessage);
                        } else {
                            return done(null, user);
                        }
                    });
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