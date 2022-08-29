var express = require("express");
var router = express.Router();
const { loginModule } = require("../../router.controller/v1/login.js");
const { menuModule } = require("../../router.controller/v1/menu.js");
const { userModule,userStatusModule,userCreateModule,userUpdateModule,userUpdatePassword,userUpdateAvatar } = require("../../router.controller/v1/user.js");
const { noticeModule,noticeStatusModule,noticeCreateModule,noticeEditModule,delNoticeModule } = require("../../router.controller/v1/notice.js");

/**
 * @api {post} /login 管理员登录请求
 * @apiVersion 0.1.0
 * @apiName UserLogin
 * @apiGroup User
 *
 * @apiBody {String} account  用户账号.
 * @apiBody {String} password  用户密码.
 *
 * @apiSuccess {Object} data 返回数据.
 * @apiSuccess {String} msg  返回信息.
 * @apiSuccess {Number} code  返回状态码.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiMWNhNTYiLCJpYXQiOjE2NjA5MjI2MDksImV4cCI6MTY2MTUyNzQwOX0.PSQ_SU-lY6TirY7MmeUicqPRGq_d03WukCqu9Orj3vc",
 *        "account_id": "1ca56",
 *        "account": "admin"
 *        }
 *       "msg": "登录成功",
 *       "code": 200"
 *     }
 */
router.post("/login", loginModule);

/**
 * @api {post} /notice_list/status/:id/:status 修改通知状态
 * @apiVersion 0.1.0
 * @apiName ChangeNoticeStatus
 * @apiGroup NoticeList
 *
 * @apiParam {String} id  通知id
 * @apiParam {String} status  需要修改的状态
 *
 * @apiSuccess {Object} data 返回数据.
 * @apiSuccess {String} msg  返回信息.
 * @apiSuccess {Number} code  返回状态码.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *        "status":'ok'
 *        }
 *       "msg": "修改成功",
 *       "code": 200"
 *     }
 */
router.post("/notice_list/status/:id/:status", noticeStatusModule);

/**
 * @api {post} /notice_list/del/:id 删除通知
 * @apiVersion 0.1.0
 * @apiName DeleteNotice
 * @apiGroup NoticeList
 *
 * @apiParam {String} id  通知id
 *
 * @apiSuccess {Object} data 返回数据.
 * @apiSuccess {String} msg  返回信息.
 * @apiSuccess {Number} code  返回状态码.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *        "status":'ok'
 *        }
 *       "msg": "删除成功",
 *       "code": 200"
 *     }
 */
router.post("/notice_list/del/:id", delNoticeModule);

/**
 * @api {get} /menu_list 获取后台菜单列表
 * @apiVersion 0.1.0
 * @apiName GetMenuList
 * @apiGroup Index
 *
 * @apiHeader {String} token Index 需要传入token.
 *
 * @apiSuccess {Object} data 返回数据.
 * @apiSuccess {String} msg  返回信息.
 * @apiSuccess {Number} code  返回状态码.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *         menuList:Array<MenuList>
 *        }
 *       "msg": "请求成功",
 *       "code": 200"
 *     }
 */
router.get("/menu_list", menuModule);

/**
 * @api {get} /notice_list/:currentPage?/:limit?/:like? 获取通知数据
 * @apiVersion 0.1.0
 * @apiName GetNoticeList
 * @apiGroup NoticeList
 *
 * @apiHeader {String} token Index 需要传入token.
 * 
 * @apiParam {String} currentPage  当前页码 默认1
 * @apiParam {String} limit  每页大小 默认10
 * @apiParam {String} like  模糊匹配 默认为all查询所有
 *
 * @apiSuccess {Object} data 返回数据.
 * @apiSuccess {String} msg  返回信息.
 * @apiSuccess {Number} code  返回状态码.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *         noticeList:Array<NoticeList>
 *        }
 *       "msg": "请求成功",
 *       "code": 200"
 *     }
 */
router.get("/notice_list/:currentPage?/:limit?/:like?", noticeModule);

/**
 * @api {post} /notice_list/create 创建通知
 * @apiVersion 0.1.0
 * @apiName CreateNotice
 * @apiGroup NoticeList
 *
 * @apiParam {String} title  通知标题
 * @apiParam {String} content  通知内容
 *
 * @apiSuccess {Object} data 返回数据.
 * @apiSuccess {String} msg  返回信息.
 * @apiSuccess {Number} code  返回状态码.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *        "status":'ok'
 *        }
 *       "msg": "创建成功",
 *       "code": 200"
 *     }
 */
router.post("/notice_list/create", noticeCreateModule);

/**
 * @api {post} /notice_list/edit 修改通知数据
 * @apiVersion 0.1.0
 * @apiName ChangeNotice
 * @apiGroup NoticeList
 *
 * @apiParam {String} id  通知id
 * @apiParam {String} title  通知标题
 * @apiParam {String} content  通知内容
 *
 * @apiSuccess {Object} data 返回数据.
 * @apiSuccess {String} msg  返回信息.
 * @apiSuccess {Number} code  返回状态码.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *        "status":'ok'
 *        }
 *       "msg": "修改成功",
 *       "code": 200"
 *     }
 */
router.post("/notice_list/edit", noticeEditModule);

/**
 * @api {get} /notice_list/:currentPage?/:limit?/:like? 获取用户数据
 * @apiVersion 0.1.0
 * @apiName GetUserList
 * @apiGroup UserList
 *
 * @apiHeader {String} token Index 需要传入token.
 * 
 * @apiParam {String} currentPage  当前页码 默认1
 * @apiParam {String} limit  每页大小 默认10
 * @apiParam {String} like  模糊匹配 默认为all查询所有
 *
 * @apiSuccess {Object} data 返回数据.
 * @apiSuccess {String} msg  返回信息.
 * @apiSuccess {Number} code  返回状态码.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *         userList:Array<UserList>
 *        }
 *       "msg": "请求成功",
 *       "code": 200"
 *     }
 */
router.get("/user_list/:currentPage?/:limit?/:like?",userModule)

/**
 * @api {post} /notice_list/status/:id/:status 修改用户账号状态
 * @apiVersion 0.1.0
 * @apiName ChangeUserStatus
 * @apiGroup UserList
 *
 * @apiParam {String} id  用户id
 * @apiParam {String} status  需要修改的状态
 *
 * @apiSuccess {Object} data 返回数据.
 * @apiSuccess {String} msg  返回信息.
 * @apiSuccess {Number} code  返回状态码.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *        "status":'ok'
 *        }
 *       "msg": "修改成功",
 *       "code": 200"
 *     }
 */
 router.post("/user_list/status/:id/:status", userStatusModule);

/**
 * @api {post} /user_list/create 添加用户
 * @apiVersion 0.1.0
 * @apiName CreateUser
 * @apiGroup UserList
 *
 * @apiParam {String} username  用户名
 * @apiParam {String} password  密码
 * @apiParam {String} tel  手机号
 *
 * @apiSuccess {Object} data 返回数据.
 * @apiSuccess {String} msg  返回信息.
 * @apiSuccess {Number} code  返回状态码.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *        "status":'ok'
 *        }
 *       "msg": "添加成功",
 *       "code": 200"
 *     }
 */
router.post("/user_list/create", userCreateModule);

/**
 * @api {post} /user_list/update 更新用户信息
 * @apiVersion 0.1.0
 * @apiName UpdateUser
 * @apiGroup UserList
 *
 * @apiParam {String} id  用户id
 * @apiParam {String} username  用户名
 * @apiParam {String} nickname  用户昵称
 * @apiParam {String} tel  手机号
 *
 * @apiSuccess {Object} data 返回数据.
 * @apiSuccess {String} msg  返回信息.
 * @apiSuccess {Number} code  返回状态码.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *        "status":'ok'
 *        }
 *       "msg": "添加成功",
 *       "code": 200"
 *     }
 */
router.post("/user_list/update", userUpdateModule);

/**
 * @api {post} /user_list/edit/password 更新用户密码(管理员操作)
 * @apiVersion 0.1.0
 * @apiName UpdateUserPassword
 * @apiGroup UserList
 *
 * @apiParam {String} id  用户id
 * @apiParam {String} password  用户密码
 *
 * @apiSuccess {Object} data 返回数据.
 * @apiSuccess {String} msg  返回信息.
 * @apiSuccess {Number} code  返回状态码.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *        "status":'ok'
 *        }
 *       "msg": "修改成功",
 *       "code": 200"
 *     }
 */
router.post("/user_list/edit/password", userUpdatePassword);

/**
 * @api {post} /user_list/edit/avatar 更新用户头像(管理员操作)
 * @apiVersion 0.1.0
 * @apiName UpdateUserAvatar
 * @apiGroup UserList
 *
 * @apiParam {String} id  用户id
 * @apiParam {File} avatar  用户头像 类型file
 *
 * @apiSuccess {Object} data 返回数据.
 * @apiSuccess {String} msg  返回信息.
 * @apiSuccess {Number} code  返回状态码.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": {
 *        "status":'ok'
 *        }
 *       "msg": "修改成功",
 *       "code": 200"
 *     }
 */
router.post("/user_list/edit/avatar", userUpdateAvatar);

module.exports = router;
