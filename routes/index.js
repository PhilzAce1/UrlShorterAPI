const Router = require('express').Router()
const Url = require('../models/url');

//@route GET/:code
//@desc Redirect to the long or Orignal URl 

router.get("/:code", async(req, res) => {
  try {
      const url = await Url.findOne({urlCode: req.params.code});
    
      if (url) {
           res.redirect(url.longUrl);
          
      }else{
        return res.status(404).Json('No url found');
      }


    } catch (error) {
      console.log(err);
      res.status(500).json('Server Error');
  }
});



module.exports = Router