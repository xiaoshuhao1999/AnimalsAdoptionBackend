const mysql_db = require("../db/mysql");

function sqlQuery(strSql, sqlArr) {
  return new Promise((resolve, reject) => {
    mysql_db.query(strSql, sqlArr, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = { sqlQuery };
