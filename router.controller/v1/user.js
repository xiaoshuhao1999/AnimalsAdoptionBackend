const { SELECT_USERS_LIKE, SELECT_USERS_INFO, SELECT_USERS_LIMIT_LIKE, SELECT_USERS_LIMIT, SELECT_USERS_STATUS,UPDATE_USERS_STATUS, CREATE_USERS, 
  SELECT_USERS_NAME, UPDATE_USERS, UPDATE_USERS_PASSWORD,UPDATE_USERS_AVATAR} = require("../../mysql_modules/user.sql");
const { sqlQuery } = require("../../utils/mysql_util");
const { callResult } = require("../../utils/result_util");
const moment = require('moment');
const random = require('string-random');
const { generateHash,compareHash } = require('../../utils/bcrypt.util');
const {client,ali_oss} = require('../../utils/ali_oss.util')
const multer  = require('multer');
const fs = require('fs');
const co = require('co');
const path = require('path')
const upload = multer({ dest: 'uploads/' }).single('avatar'); // 上传单图


const userModule = async(req,res,next)=>{
  // 首先需要拿到数据总量
  let totalCount;
  // 当前页面 没有传参 则默认为1
  let currentPage = 1;
  // 每页多少条数据 没有传参则默认为 1
  let limit = 10;
  let like = req.params.like;
  if(req.params.currentPage) currentPage = JSON.parse(req.params.currentPage);
  if(req.params.limit) limit = JSON.parse(req.params.limit);
  let selectCountPages = 0;
  if(like && like !== 'all') {
    like = `%${like}%`
    selectCountPages = await sqlQuery(SELECT_USERS_LIKE,like);
  }else{
    selectCountPages = await sqlQuery(SELECT_USERS_INFO);
  }
  totalCount = selectCountPages[0].count;
  if((currentPage-1)*limit>totalCount) return res.send(callResult({totalCount,limitData:[]},'没有那么多数据',200));
  let getLimitPageData = {};
  if(like && like !== 'all'){
    like = `%${like}%`
    getLimitPageData = await sqlQuery(SELECT_USERS_LIMIT_LIKE,[like,(currentPage-1)*limit,limit]);
  }else{
    getLimitPageData = await sqlQuery(SELECT_USERS_LIMIT,[(currentPage-1)*limit,limit]);
  }
  const msg = getLimitPageData.length == 0  ? '没有那么多数据' : '数据获取成功';
  getLimitPageData.forEach(el => {
    delete el.password
  });
  res.send(callResult({totalCount,limitData:getLimitPageData},msg,200));
}

const userStatusModule = async(req,res,next)=>{
  const { id, status } = req.params;
  // 判断id是否存在
  const selectUserStatus = await sqlQuery(SELECT_USERS_STATUS,id);
  if(!selectUserStatus.length) return res.send(callResult({},'id不存在',403));
  const updateRes = await sqlQuery(UPDATE_USERS_STATUS,[status,id]);
  if(updateRes.affectedRows!==1) return res.send(callResult({},'状态修改失败',403));
  res.send(callResult({status:'ok'},'修改成功',200));
}

const userCreateModule = async(req,res,next)=>{
  const { username, password, tel } = req.body;
  // console.log(req.body);
  // 先查看用户名是否已被注册
  const isReg = await sqlQuery(SELECT_USERS_NAME,username);
  // console.log(isReg);
  if(isReg.length !== 0) return res.send(callResult({},'该用户已存在',403));
  const id = random(8, {letters: 'ABCDEFGHKMNPVW'});
  const nickname = 'Nick_'+random(10, {letters: 'ABCDEFHKMNPVWabcdefhkmnpvw'});
  const hashPassword = generateHash(password);
  
  const avatar = 'https://jianlu.oss-cn-hangzhou.aliyuncs.com/Ellipse2.png?versionId=CAEQahiBgMDpvbGZlhgiIDBiMDI2Y2I1NDZkYjQzOTY4YjUzZGQ5MmUwNDU3ODk4';
  const createtime = moment().format('YYYY-MM-DD HH:mm:ss');
  const createInfrom = await sqlQuery(CREATE_USERS,[id,username,nickname,hashPassword,avatar,tel,createtime]);
  if(createInfrom.affectedRows!==1) return res.send(callResult({},'添加失败',403));
  res.send(callResult({status:'ok'},'添加成功',200));
}

const userUpdateModule = async(req,res,next)=>{
  const { id,nickname } = req.body;
  // 判断id是否存在
  const selectUserStatus = await sqlQuery(SELECT_USERS_STATUS,id);
  if(!selectUserStatus.length) return res.send(callResult({},'id不存在',403));
  const updateRes = await sqlQuery(UPDATE_USERS,[nickname,id]);
  if(updateRes.affectedRows!==1) return res.send(callResult({},'状态修改失败',403));
  res.send(callResult({status:'ok'},'修改成功',200));
}

const userUpdatePassword = async(req,res)=>{
  const { id, password } = req.body;
  // 判断id是否存在
  const selectUserStatus = await sqlQuery(SELECT_USERS_STATUS,id);
  if(!selectUserStatus.length) return res.send(callResult({},'id不存在',403));
  const hashPassword = generateHash(password);
  const updateRes = await sqlQuery(UPDATE_USERS_PASSWORD,[hashPassword,id]);
  if(updateRes.affectedRows!==1) return res.send(callResult({},'密码修改失败',403));
  res.send(callResult({status:'ok'},'密码修改成功',200));
}

const userUpdateAvatar = async(req,res)=>{
  upload(req, res, function (err) {
    const { id } = req.body;
    if (err instanceof multer.MulterError) {
      res.send(callResult({err},'头像上传过程',102));
    } else if (err) {
      res.send(callResult({err},'头像上传失败',102));
    }
    // 文件路径
    const filePath = path.join('uploads/') + req.file.filename;  
    // 文件类型
    const temp = req.file.originalname.split('.'); // 'xxx.png'
    const fileType = temp[temp.length - 1]; // 获取图片类型
    const lastName = '.' + fileType;
    // 构建图片名
    const fileName = req.file.filename + lastName;
    // console.log(fileName,filePath);
    fs.rename(filePath, fileName, (err) => {
      if (err) {
        return res.send(callResult({err},'文件写入失败',102))
      }else{
        co(function* () {
          client.useBucket(ali_oss.bucket);  
          const key = fileName;
          const createtime = moment().format('YYYY-MM-DD');
          const result = yield client.put(createtime+'/'+key, fileName);
          // 上传之后删除本地文件
          fs.unlinkSync(fileName);
          // 判断返回的状态码
          if(result.res.statusCode!==200){
            return res.send(callResult({},'文件上传失败',403))
          }
          // 否则就是上传成功 则把返回的url存入数据库
          const avatarUrl = result.url;
          const updateRes = yield sqlQuery(UPDATE_USERS_AVATAR,[avatarUrl,id])
          if(updateRes.affectedRows!==1) return res.send(callResult({},'头像上传失败',403));
          res.send(callResult({status:'ok'},'头像上传成功',200));
        }).catch(function (err) {
        // 上传之后删除本地文件
          fs.unlinkSync(fileName);
          return res.send(callResult({err},'文件写入失败',102))
        });
      }
    });
  })
}
module.exports = { userModule,userStatusModule,userCreateModule,userUpdateModule,userUpdatePassword,userUpdateAvatar }