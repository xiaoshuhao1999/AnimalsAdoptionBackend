const SELECT_USERS_INFO = "SELECT COUNT(*) as count FROM user_info where user_info.status = '0'";
const SELECT_USERS_LIKE = "SELECT COUNT(*) as count FROM user_info where user_info.status = '0' AND CONCAT(user_info.username,user_info.nickname) LIKE ?";
const SELECT_USERS_LIMIT = "select * from user_info where user_info.status = '0' order by id desc limit ?, ?;";
const SELECT_USERS_LIMIT_LIKE = "select * from user_info where user_info.status = '0' AND CONCAT(user_info.username,user_info.nickname) LIKE ? order by id desc limit ?, ?;";
const SELECT_USERS_STATUS = "select id from user_info where id = ?;";
const SELECT_USERS_PASSWORD = "select id,password from user_info where id = ?;";
const SELECT_USERS_NAME = "select username from user_info where username = ?;";
const UPDATE_USERS_STATUS = "UPDATE user_info SET status = ? WHERE id = ?;";
const UPDATE_USERS = "UPDATE user_info SET nickname = ? WHERE id = ?;";
const UPDATE_USERS_PASSWORD = "UPDATE user_info SET password = ? WHERE id = ?;";
const UPDATE_USERS_AVATAR = "UPDATE user_info SET avatar = ? WHERE id = ?;";
const CREATE_USERS = "insert into user_info(id,username,nickname,password,avatar,tel,createtime) values (?,?,?,?,?,?,?);";

module.exports = { 
  SELECT_USERS_INFO,SELECT_USERS_LIKE,SELECT_USERS_LIMIT,SELECT_USERS_LIMIT_LIKE,SELECT_USERS_STATUS,UPDATE_USERS_STATUS,CREATE_USERS,UPDATE_USERS,
  SELECT_USERS_NAME,UPDATE_USERS_PASSWORD,SELECT_USERS_PASSWORD,UPDATE_USERS_AVATAR
};