const mysql = require('mysql2');
const db_util = require('../mysqlConfig');

const mysql_db = mysql.createConnection(db_util);

mysql_db.connect(function (err) {
  if (err) {
      console.error(`error connecting: ${err.stack}`);
      return;
  }
  console.log(`Mysql is connected! 连接id: ${mysql_db.threadId}`);
});

module.exports = mysql_db;