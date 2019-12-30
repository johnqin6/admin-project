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
 * $router POST users/register
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
 * $router POST users/login
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

/**
 * $route POST users/resetPassword
 * @desc 重置密码 用于忘记密码的情况
 * @access public
 */
router.post('/resetPassword', (req, res) => {
  const phone = req.body.phone || '';
  const email = req.body.email || '';
  let password = req.body.password;
  let accountType = 'email';
  let accountValue = ''
  // 验证邮箱注册还是手机注册
  if (email && validation.isEmail(email)) {
    accountType = 'email';
    accountValue = email;
  } else if(phone && validation.isPhone(phone)) {
    accountType = 'phone';
    accountValue = phone;
  } else {
    return res.send({ error: 1, message: '手机号或邮箱格式错误！' });
  }
  password = encrypte(password); // 密码加密
  User.update({ [accountType]:  accountValue}, { password }, err => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 1, message: '密码更新失败！'});
    }
    res.send({ error: 0, message: '密码修改成功！' });
  });

})

/**
 * $route POST users/updatePassword
 * @desc 修改密码 用于忘记密码的情况
 * @access private(私密的，只有令牌才能访问)
 */
router.post('/updatePassword/:id', passport.authenticate('jwt', {session: false }), (req, res) => {
  const curUserId = req.query.id;
  const userId = req.body.id;
  const password = req.body.password;
  const oldPassword = req.body.oldPassword ? encrypte(req.body.oldPassword) : '';
  const params = {
    '_id': userId
  };
  if (curUserId === userId && oldPassword) { // 如果修改当前用户密码
    params.password = oldPassword;
  }
  User.findOneAndUpdate(params, { password }, err => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 1, message: err });
    }
    res.send({ error: 0, message: '密码修改成功！' });
  });
})

/**
 * $route GET users/list
 * @desc 获取用户列表数据
 * @access private(私密的，只有管理员令牌才能访问)
 */
router.get('/list', passport.authenticate('jwt', {session: false }), (req, res) => {
  const identity = req.user.identity;
  const pageIndex = parseInt(req.query.pageIndex);
  const pageSize = parseInt(req.query.pageSize);
  const queryStr = req.query.queryStr || '';
  const params = {};
  if (identity !== 'admin') { // 用户权限非管理员, 返回空数据
    return res.send({ error: 0, data: []});
  }
  if (queryStr) { // 如果queryStr有值就模糊查询 例如{ username: /adm/ }
    params.username = new RegExp(queryStr);
  }
  const index = (pageIndex - 1) * pageSize;
  User.find(params, { '__v':  0, 'password': 0})
      .skip(index) // 从多少条取数据
      .limit(pageSize) // 去多少条
      .sort({'updateTime': -1}) // 更新时间倒序排列
      .then(users => { // 执行查询语句
        res.send({ error: 0, data: users})
      })
})

module.exports = router;
