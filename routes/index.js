const router = require('express').Router();
const Url = require('../models/url');

//@route GET/:code
//@desc Redirect to the long or Orignal URl

router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      res.status(200).json({
        success: true,
        payload: url.longUrl,
      });
    } else {
      return res.status(404).Json({ success: false, msg: 'No url found' });
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
});

module.exports = router;
