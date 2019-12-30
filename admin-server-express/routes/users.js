const express = require('express');
const jst = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', (req, res) => {
  const username = req.body.userName;
  const password = req.body.password;
  // 查询数据库
  User.findOne({username, password }).then(user => {
    if (!user) {
      return res.status(400).send({ error: 1, message: '用户名或密码错误！'});
    }
    return res.send({ error: 0, data: user });
  });
});


module.exports = router;
