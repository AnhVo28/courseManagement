var express = require('express');
var router = express.Router();

var nav = [{
    Link: '/Books',
    Text: 'Book'
    }, {
    Link: '/contact',
    Text: 'Contact'
    }];


router.get("/", function (req, res) {
    res.render("contact",{
        nav: nav
    } );

});

module.exports = router;
