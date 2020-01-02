# 接口文档

## 用户相关接口

1. 注册接口
- 接口：/users/register
- 请求方式：POST
- 参数：email_or_phone(邮箱或手机号)、username(用户名)、password(密码)

2. 登录接口
- 接口：/users/login
- 请求方式：POST
- 参数：username(用户名)、password(密码)
- 返回值：token

3. 获取用户信息接口
- 接口：/users/getUserInfo
- 请求方式：GET
- 参数：无
- 返回值：id、 username(用户名)、identity(身份)、avatar(头像)

4. 重置密码接口
- 接口：/users/resetPassword
- 请求方式：POST
- 参数：phone(手机号)或email、password(密码)
- 返回值：成功或失败信息

5. 修改用户密码接口
- 接口：/users/updatePassword/:id
- 请求方式：POST
- 参数：id、password(密码)、oldPassword(老密码，可选)
- 返回值：成功或失败信息

6. 获取用户列表接口
- 接口：/users/list
- 请求方式：GET
- 参数：pageIndex(页码)、pageSize(条数)、queryStr(模糊查询条件)
- 返回值：用户列表[id、 username(用户名)、identity(身份)、avatar(头像)、updateTime(更新时间)、createOn、email、birthday(出生日期)、gender(性别)、phone(手机号)]

7. 获取用户详情接口
8. 更新用户数据接口
9. 删除用户接口
10. 更新用户头像接口
