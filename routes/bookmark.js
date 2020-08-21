/**
 * Modules
 */
const express = require('express'),
dtFormat = require('date-fns/formatDistance'),
cheerio = require('cheerio'),
got = require('got'),
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

router.get('/', ensureAuthenticated, async (req, res) => {
    const param = req.query.param;

    if (param) {
        try {
            const response = await got(param);
            const body = cheerio.load(response.body);
            const title = body('title')[0].children[0].data;

            res.render('auth/bookmark/create', {
                data: {url: param, title: title},
                title: 'Create Bookmark',
                layout: 'auth/layout'
            });
    
        } catch (e) {
            console.log(e);
            req.flash('errorMsg', 'Cannot create bookmark');
            res.redirect('/dashboard');
        }
    } else {
        res.redirect('/dashboard');
    }
});

// create
router.post('/', ensureAuthenticated, (req, res) => {
    const { title, description, url} = req.body;

    const bookmark = new Bookmark({
        title,
        description,
        url,
        user_id: req.user.id
    }).save();

    req.flash('successMsg', 'Bookmark created successfully!');
    res.redirect('/dashboard');
});

// search
router.get('/search', ensureAuthenticated, (req, res) => {
    const query = req.query.q;
    const regex = new RegExp(query, 'i');
    
    Bookmark.find({title: regex}, (err, bookmarks) => {
        res.render('auth/dashboard/index', {
            bookmarks,
            dtFormat,
            title: 'Search Results',
            layout: 'auth/layout'
        });
    });
});

// index
router.get('/:id', ensureAuthenticated, (req, res) => {
    const bookmark = Bookmark.findById(req.params.id, (err, bookmark) => {
        res.render('auth/bookmark/index', {
            bookmark: bookmark,
            title: `Edit Bookmark - ${bookmark.title}`,
            layout: 'auth/layout'
        });
    });
})


// update
router.post('/:id', ensureAuthenticated,(req, res) => {
    const { title, description, url } = req.body;

    Bookmark.findByIdAndUpdate(req.params.id, {title, description, url}, (err, bookmark) => {
        if (err) res.send(err);
        
        req.flash('successMsg', 'Bookmark updated successfully');
        res.redirect('/dashboard');
    });
});


// delete
router.post('/:id/delete', ensureAuthenticated, (req, res) => {
    Bookmark.findByIdAndDelete(req.params.id, (err, bookmark) => {
        if (err) res.send(err);

        req.flash('successMsg', 'Bookmark deleted successfully!');
        res.redirect('/dashboard');
    });
});

module.exports = router;