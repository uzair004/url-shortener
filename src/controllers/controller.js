const mongoose = require('mongoose');

// import mongoose schema model
const ShortURL = require('../models/url');

// homepage with shortened urls list
exports.renderHomePage = async (req, res) => {
    const allData = await ShortURL.find();

    res.render('index', {shortUrls: allData});
}

// save shortened url to DB
exports.urlShortener = async (req, res) => {
    const fullUrl = req.body.fullUrl;

    const record = new ShortURL({
        full: fullUrl
    });

    await record.save();

    res.redirect('/');
}


exports.redirectToURL = async (req, res) => {
    const shortid = req.params.shortid;

    // look for requested url in DB
    const rec = await ShortURL.findOne({short: shortid});
    // if null then respond 404
    if(!rec) return res.sendStatus(404);

    // otherwise inc clicks on link
    rec.clicks++;
    await rec.save();

    console.log(`Full-URL ${rec.full} >>>>> Short-URL ${rec.short}`);

    // redirect to original
    res.redirect(rec.full);
}