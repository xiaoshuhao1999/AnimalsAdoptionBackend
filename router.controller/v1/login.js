// 引入封装的mysql模块
const { sqlQuery } = require("../../utils/mysql_util");
const { SELECT_USER } = require("../../mysql_modules/login.sql");
const { callResult } = require("../../utils/result_util");
const { createToken } = require("../../utils/token_utils");


const loginModule = async (req, res, next) => {
  const {account,password} = req.body;
  const result = await sqlQuery(SELECT_USER, account);
  if (!result[0]) return res.send(callResult({}, "登录失败",401));
  if (account !== result[0].account || password !== result[0].password)
    return res.send(callResult({}, "登录失败",401));
  const token = createToken(result[0].account_id);
  delete result[0]["password"];
  res.send(callResult({ token, ...result[0] }, "登录成功",200));
};

module.exports = { loginModule };
