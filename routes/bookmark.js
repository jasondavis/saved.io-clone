/**
 * Modules
 */
const express = require('express'),
    router = express.Router();

/**
 * Models
 */
const
    User = require('../models/User'),
    Bookmark = require('../models/Bookmark');

/**
 * Middlewares
 */
const { ensureAuthenticated } = require('../config/auth');

router.get('/:id', ensureAuthenticated, (req, res) => {
    const bookmark = Bookmark.findById(req.params.id, (err, bookmark) => {
        res.render('auth/bookmark/index', {
            bookmark: bookmark,
            title: bookmark.title,
            layout: 'auth/layout'
        });
    });
})

router.post('/:id', ensureAuthenticated,(req, res) => {
    const { title } = req.body;

    Bookmark.findByIdAndUpdate(req.params.id, {title}, (err, bookmark) => {
        if (err) res.send(err);
        
        res.redirect('/dashboard');
    });
});

router.post('/:id/delete', ensureAuthenticated, (req, res) => {
    Bookmark.findByIdAndDelete(req.params.id, (err, bookmark) => {
        if (err) res.send(err);

        req.flash('successMsg', 'Bookmark deleted successfully!');
        res.redirect('/dashboard');
    });
});

module.exports = router;