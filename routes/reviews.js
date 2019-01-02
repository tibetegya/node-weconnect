var express = require('express');
var router = express.Router();

/* GET reviews */
router.get('/', function(req, res, next) {
  res.json({ title: 'Reviews' });
});

module.exports = router;
