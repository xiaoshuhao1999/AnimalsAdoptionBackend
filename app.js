const createError = require("http-errors");
const express = require("express");
const path = require("path");
// 设置跨域
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// 导入数据库模块
const mysql_db = require("./db/mysql");
// 导入token验证模块
const { checkToken } = require("./utils/token_utils");
//  返回信息模块
const { callResult } = require("./utils/result_util");
//  路由数组模块
const { totalRoutes } = require("./totalRoutes/index");

const api_v1_Router = require("./routes/v1/index");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

// 路由拦截
app.use(function (req, res, next) {
  // 判断请求的路由是否存在 如果不存在则向下执行 到错误路由
  if (!totalRoutes.includes(req.url)) return next();
  if (req.url == "/api/v1/login" && req.method == "POST") return next();
  const tk = req.headers.token;
  checkToken(tk)
    .then((res) => {
      next();
    })
    .catch((err) => {
      const d = callResult({}, err, 401);
      res.status(405).send(d);
    });
});

app.use("/api/v1", api_v1_Router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(callResult({}, "访问路径不存在", 404));
});

app.listen(3000, () => {
  console.log(`localhost:3000 Example app listening on port 3000`);
});
