const { sqlQuery } = require("../../utils/mysql_util");
const {SELECT_INFORMS,SELECT_INFORMS_LIMIT,SELECT_INFORM_STATUS,UPDATE_INFORM_STATUS, CREATE_INFORM, UPDATE_INFORM, SELECT_INFORMS_LIKE, SELECT_INFORMS_LIMIT_LIKE, DELETE_INFORM_STATUS} = require('../../mysql_modules/informs.sql');
const { callResult } = require("../../utils/result_util");
const moment = require('moment');

const noticeModule = async(req,res,next) => {
  // 首先需要拿到数据总量
  let totalCount;
  // 当前页面 没有传参 则默认为1
  let currentPage = 1;
  // 每页多少条数据 没有传参则默认为 1
  let limit = 10;
  let like = req.params.like;
  // console.log(req.params);
  if(req.params.currentPage) currentPage = JSON.parse(req.params.currentPage);
  if(req.params.limit) limit = JSON.parse(req.params.limit);
  let selectCountPages = 0;
  if(like && like !== 'all') {
    like = `%${like}%`
    selectCountPages = await sqlQuery(SELECT_INFORMS_LIKE,like);
  }else{
    selectCountPages = await sqlQuery(SELECT_INFORMS);
  }
  totalCount = selectCountPages[0].count;
  // console.log((currentPage-1)*limit,totalCount,(currentPage-1)*limit<totalCount);
  if((currentPage-1)*limit>totalCount) return res.send(callResult({totalCount,limitData:[]},'没有那么多数据',200));
  let getLimitPageData = {};
  if(like && like !== 'all'){
    like = `%${like}%`
    getLimitPageData = await sqlQuery(SELECT_INFORMS_LIMIT_LIKE,[like,(currentPage-1)*limit,limit]);
  }else{
    getLimitPageData = await sqlQuery(SELECT_INFORMS_LIMIT,[(currentPage-1)*limit,limit]);
  }
  res.send(callResult({totalCount,limitData:getLimitPageData},'数据获取成功',200));
}

const noticeStatusModule = async(req,res,next)=>{
  const { id, status } = req.params;
  // 判断id是否存在
  const selectInfromStatus = await sqlQuery(SELECT_INFORM_STATUS,id);
  if(!selectInfromStatus.length) return res.send(callResult({},'id不存在',403));
  const updateRes = await sqlQuery(UPDATE_INFORM_STATUS,[status,id]);
  if(updateRes.affectedRows!==1) return res.send(callResult({},'状态修改失败',403));
  res.send(callResult({status:'ok'},'修改成功',200));
}

const delNoticeModule = async(req,res,next)=>{
  const { id } = req.params;
  // 判断id是否存在
  const selectInfromStatus = await sqlQuery(SELECT_INFORM_STATUS,id);
  if(!selectInfromStatus.length) return res.send(callResult({},'id不存在',403));
  const updateRes = await sqlQuery(DELETE_INFORM_STATUS,id);
  if(updateRes.affectedRows!==1) return res.send(callResult({},'状态修改失败',403));
  res.send(callResult({status:'ok'},'删除成功',200));
}

const noticeCreateModule = async(req,res,next)=>{
  const { title, content } = req.body;
  const createtime = moment().format('YYYY-MM-DD HH:mm:ss');
  const createInfrom = await sqlQuery(CREATE_INFORM,[title,content,createtime]);
  if(createInfrom.affectedRows!==1) return res.send(callResult({},'添加失败',403));
  res.send(callResult({status:'ok'},'添加成功',200));
}

const noticeEditModule = async(req,res,next)=>{
  const { id, title,content } = req.body;
  // 判断id是否存在
  const selectInfromStatus = await sqlQuery(SELECT_INFORM_STATUS,id);
  if(!selectInfromStatus.length) return res.send(callResult({},'id不存在',403));
  const updateRes = await sqlQuery(UPDATE_INFORM,[title,content,id]);
  if(updateRes.affectedRows!==1) return res.send(callResult({},'修改失败',403));
  res.send(callResult({status:'ok'},'修改成功',200));
}
module.exports = { noticeModule,noticeStatusModule,noticeCreateModule,noticeEditModule,delNoticeModule };