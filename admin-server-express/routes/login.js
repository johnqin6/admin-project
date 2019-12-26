var express = require('express');
var router = express.Router();

router.get('/test', function(req, res, next) {
  res.send({
    error: 1,
    message: 'success'
  });
});

module.exports = router;
