/**
 * Modules
 */
const express = require('express'),
	passport = require('passport'),
	dtFormat = require('date-fns/formatDistance'),
	bcrypt = require('bcrypt'),
	router = express.Router()


/**
 * Models
 */
const User = require('../models/User'),
	Bookmark = require('../models/Bookmark');

/**
 * Middlewares
 */
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

/**
 * @GET index page
 */
router.get('/', forwardAuthenticated, (req, res, next) => {
	res.render('index', { title: 'Home Page' });
});


/**
 * @GET dashboard page
 */
router.get('/dashboard', ensureAuthenticated, (req, res, next) => {
	const bookmarks = Bookmark.find({ user_id: req.user.id })
		.sort({ created_at: 'desc' })
		.exec((err, bookmarks) => {
			if (err) return res.redirect('/dashboard');

			res.render('auth/dashboard/index', {
				title: 'Dashboard Page',
				user: req.user,
				bookmarks: bookmarks,
				layout: 'auth/layout',
				dtFormat
			});
		});
});


/**
 * @GET register page
 */
router.get('/register', forwardAuthenticated, (req, res, next) => {
	res.render('register', { title: 'Register Page' });
})


/**
 * @POST create an account
 */
router.post('/register', (req, res, next) => {
	const { email, password, password2 } = req.body
	const saltRounds = 10;

	bcrypt.hash(password, saltRounds).then(passwordHash => {
		const user = new User({ email: email, password: passwordHash });
		user.save();
		res.redirect('/');
	});
});


/**
 * @GET login page
 */
router.get('/login', forwardAuthenticated, (req, res, next) => {
	res.render('login', { title: 'Login Page' });
})


/**
 * @POST login page
 */
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res) => {
	const param = req.query.param;

	if (param) {
		res.redirect(`/bookmark?param=${param}`)
	} else {
		res.redirect('/dashboard');
	}
});


/**
 * @GET logout route
 */
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('successMsg', 'You logged out successfully!');
	res.redirect('/');
});

module.exports = router;
