const SELECT_INFORMS = "SELECT COUNT(*) as count FROM notice where notice.show = '0'";
const SELECT_INFORMS_LIKE = "SELECT COUNT(*) as count FROM notice where notice.show = '0' AND CONCAT(notice.title,notice.content) LIKE ?";
const SELECT_INFORMS_LIMIT = "select * from notice where notice.show = '0' order by id desc limit ?, ?;";
const SELECT_INFORMS_LIMIT_LIKE = "select * from notice where notice.show = '0' AND CONCAT(notice.title,notice.content) LIKE ? order by id desc limit ?, ?;";
const SELECT_INFORM_STATUS = "select id from notice where id = ?;";
const UPDATE_INFORM_STATUS = "UPDATE notice SET notice.status = ? WHERE notice.id = ?;";
const DELETE_INFORM_STATUS = "UPDATE notice SET notice.show = '-1' WHERE notice.id = ?;";
const CREATE_INFORM = "insert into notice(title,content,createtime) values (?,?,?);";
const UPDATE_INFORM = "UPDATE notice SET notice.title = ?,notice.content = ? WHERE notice.id = ?;";

module.exports = { 
  SELECT_INFORMS,SELECT_INFORMS_LIMIT,SELECT_INFORM_STATUS,UPDATE_INFORM_STATUS,CREATE_INFORM,UPDATE_INFORM,
  SELECT_INFORMS_LIKE,SELECT_INFORMS_LIMIT_LIKE,DELETE_INFORM_STATUS
};