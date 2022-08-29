const jwt = require("jsonwebtoken");
const fs = require("fs");
const privateKey = fs.readFileSync("private.key");

function createToken(payload) {
  return jwt.sign({ payload }, privateKey, {
    expiresIn: "7d",
  });
}

function checkToken(token) {
  return new Promise((resovle, reject) => {
    jwt.verify(token, privateKey, (err, data) => {
      if (err) {
        reject("token 验证失败.");
      }
      resovle(data);
    });
  });
}

module.exports = {
  createToken,
  checkToken,
};
