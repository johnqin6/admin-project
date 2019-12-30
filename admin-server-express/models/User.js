// 用户model
const mongoose = require('mongoose');
const validation = require('../common/validation');
const Schema = mongoose.Schema;

// 创建用户Schema
const UserSchema = new Schema({
  email: {
    type: String,
    validate: { // 验证器
      validator: validation.isEmail,
      message: '`{PATH}`必须是有效的邮箱格式!'
    }
  },
  phone: {
    type: String,
    validate: { // 验证器
      validator: validation.isPhone,
      message: '`{PATH}`必须是有效的手机号格式!'
    }
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  gender: { // 性别
    type: Number,
    enum: [1, 2] // 枚举 1：男，2: 女
  },
  birthday: { // 出生日期
    type: Date
  },
  avatar: {
    type: String
  },
  // 身份
  identity: {
    type: String,
    default: 'user' // admin: 管理员，user: 普通用户
  },
  updateTime: {
    type: Date,
    default: Date.now
  },
  createOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);
