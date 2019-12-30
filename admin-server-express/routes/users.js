const express = require('express');
const jst = require('jsonwebtoken');
const gravatar = require('gravatar');
const passport = require('passport');
const User = require('../models/User');
const validation = require('../common/validation');
const { encrypte } = require('../utils/crypto');
const key = require('../config/key');
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
    let avatar = '';
    if (accountType === 'email') {
      // 获取头像
      avatar = gravatar.url(email_or_phone, {s: '200', r: 'pg', d: 'mm'});
    }
    avatar = gravatar.url('admin@rektec.com.cn', {s: '200', r: 'pg', d: 'mm'});
    // 密码加密
    passport = encrypte(password);
    const newUser = new User({
      username,
      password,
      avatar,
      [accountType]: email_or_phone
    });
    newUser.save().then(err => {
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
  const password = encrypte(req.body.password); // 密码加密
  // 查询数据库
  User.findOne({username, password }).then(user => {
    if (!user) {
      return res.status(400).send({ error: 1, message: '用户名或密码错误！'});
    }
    const rule = {
      id: user._id,
      name: user.username,
      avatar: user.avatar,
      identity: user.identity
    }
    // 设置token
    // jst.sign("规则", "加密名称", "过期时间", "箭头函数")
    jst.sign(rule, key.secretOrkey, { expiresIn: 3600}, (err, token) => {
      if (err) throw err;
      res.send({
        error: 0,
        token: 'Bearer ' + token
      });
    });
    // return res.send({ error: 0, data: user });
  });
});

/**
 * $route GET users/getUserInfo
 * @desc 验证token, 获取用户信息
 * @access private(私密的，只有令牌才能访问)
 */
router.get('/getUserInfo', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.send({
    error: 0,
    data: {
      id: req.user.id,
      username: req.user.username,
      identity: req.user.identity,
      avatar: req.user.avatar
    }
  });
})

module.exports = router;
