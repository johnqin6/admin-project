// 手动添加用户数据
const mongoose = require('mongoose');
const mongodbUrl = require('../config/key').mongoULI;
const User = require('../models/User');
const gravatar = require('gravatar'); // 生成头像插件

// 连接数据库
mongoose.connect(mongodbUrl, { useNewUrlParser: true })
        .then(() => console.log('数据库已连接'))
        .catch(err => console.error(err));

function creteUser(params) {
  // 获取头像
  params.avatar = gravatar.url(params.email, {s: '200', r: 'pg', d: 'mm'});
  console.log(params);
  const user = new User(params);
  user.save((err, res) => {
    if (err) console.error(err);
    console.log(res, '用户创建成功！');
  })
}

function findUser(params) {
  User.findOne(params).then(user => {
    console.log(user);
  });
}

findUser({ username: 'admin', password: 'admin'});


// creteUser({
//   email: 'admin@rektec.com.cn',
//   password: 'admin',
//   username: 'admin',
//   identity: 'admin'
// });

// creteUser({
//   email: 'user@qq.com.cn',
//   password: 'user',
//   username: '123456',
//   identity: 'user'
// });

// creteUser({
//   phone: '15188202033',
//   password: 'user',
//   username: '123456',
//   identity: 'user'
// });

