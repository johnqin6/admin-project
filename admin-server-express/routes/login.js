var express = require('express');
var router = express.Router();

router.get('/test', function(req, res, next) {
  res.send({
    error: 0,
    data: 'success'
  });
});

module.exports = router;
