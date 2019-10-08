const Router = require('express').Router();
const validUrl = require('valid-url');
const shortId= require('shortid');
const config = require('config');

const Url = require('../models/url');

//@route POST /api/url/shorten

router.post('/shorten', async(req, res, next) => {
    const {longUrl} = req.body;
    const baseUrl =config.get('baseUrl');

    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('invalid Url');
    }
    //create Url
    const urlCode = shortId.generate();

    //check long URl
    if(validUrl.isUri(longUrl)){
        try {
            let url = await Url.findOne({longUrl});
            if(url){
                res.json(url);
            }else{
                const shortUrl = baseUrl + '/' + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });
                await url.save();
                 res.json(url);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('server error');
        }
    }else{
        res.status(401).json('invalid Long Url');
    }
});

module.exports = Router