const cheerio = require('cheerio'),
    got = require('got');

// models
const Bookmark = require('../models/Bookmark');

module.exports = {
    createBookmark: async (req, res, param) => {
        try {
            const response = await got(param);
            const body = cheerio.load(response.body);
            const title = body('title')[0].children[0].data;

            const bookmark = new Bookmark({
                title: title,
                url: param,
                user_id: req.user.id
            }).save();

            return bookmark;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}