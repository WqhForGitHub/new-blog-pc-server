let mongoose = require("mongoose");

// mongoose.connect("mongodb://host.docker.internal:27017/my-blog");
mongoose.connect("mongodb://127.0.0.1:27017/my-blog");

const conn = mongoose.connection;

conn.on("open", () => {
  console.log("数据库连接成功");
});

conn.on("error", (err) => {
  console.log("失败" + err);
});

module.exports = mongoose;
