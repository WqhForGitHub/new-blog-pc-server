var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const blogRouter = require("./routes/blog");
const tagRouter = require("./routes/tag");
const expressJwt = require("express-jwt");

require("./db/init");


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  expressJwt({
    secret: "test_token",
  }).unless({
    path: ["/login", "/getPublicKey", "/addUser", '/tag'], //白名单,除了这里写的地址，其他的URL都需要验证
  })
);

app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/", blogRouter);
app.use("/", tagRouter);

// 验证 token 是否过期
app.use((req, res, next) => {});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // 这里验证
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ code: -1, msg: "token错误" });
  } else {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  }
});

app.listen(3000);

module.exports = app;
