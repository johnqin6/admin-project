const express = require('express');
const jst = require('jsonwebtoken');
const User = require('../models/User');
const validation = require('../common/validation');
const router = express.Router();


/**
 * $router POST /users/register
 * @desc 注册接口
 * @access public
 */
router.post('/register', (req, res) => {
  const email_or_phone = req.body.email_or_phone;
  const username = req.body.userName;
  const password = req.body.password;
  let accountType = '';
  // 验证邮箱注册还是手机注册
  if (validation.isEmail(email_or_phone)) {
    accountType = 'email';
  } else if(validation.isPhone(email_or_phone)) {
    accountType = 'phone';
  } else {
    return res.send({ error: 1, message: '手机号或邮箱格式错误！' });
  }

  // 查询该邮箱或手机号是否已注册
  User.findOne({ $or: [
    { email: email_or_phone },
    { phone: email_or_phone}
  ]}).then(user => {
    if (user) {
      return res.send({ error: 1, message: '该邮箱或手机号已被注册！'});
    }
    User.save({
      username,
      password,
      [accountType]: email_or_phone
    }).then(err => {
      if (err) {
        return res.status(500).send({ error: 1, message: err });
      }
      return res.send({ error: 0, data: null });
    })
  })
});

/**
 * $router POST /users/login
 * @desc 登录接口
 * @access public
 */
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
