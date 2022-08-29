// 引入封装的mysql模块
const { sqlQuery } = require("../../utils/mysql_util");
const { SELECT_MENU } = require("../../mysql_modules/menu.sql");
const { callResult } = require("../../utils/result_util");


const menuModule = async (req, res, next) => {
  const result = await sqlQuery(SELECT_MENU);
  const type = 0;
  function getMenu(arr,type) {
    const newResult = [];
    const newResult2 = [];
    arr.forEach((el) => {
      el.parent_id == type ? newResult.push(el):newResult2.push(el);
    });
    newResult.forEach(el1 =>{
      const _children =[];
      newResult2.forEach(el2=>{
        if(el1.m_id==el2.parent_id){
          _children.push(el2);
          el1.children = _children;
        }
      })
    })
    return newResult;
  }
  const menuData = getMenu(result,type);
  if (!result[0]) return res.send(callResult({}, "菜单数据获取失败"));
  res.send(callResult(menuData, "菜单数据获取成功"));
};

module.exports = { menuModule };
