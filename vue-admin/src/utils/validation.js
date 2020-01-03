// 验证器方法

// 验证手机号
export function isPhone (v) {
  return /1[3|5|7|8]\d{9}/.test(v)
}
// 验证邮箱
export function isEmail (v) {
  return /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(v)
}

export function isAbsolutePath (path) {
  return /^(https?|tel|mailto)/.test(path)
}
