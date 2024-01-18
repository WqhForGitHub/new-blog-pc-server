const mongoose = require("../db/init");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    default: "",
  },
  // 用户名
  userName: {
    type: String,
    required: true, // 必填
  },
  // 密码
  passWord: {
    type: String,
    required: true,
    default: "",
  },
  // 姓名
  name: {
    type: String,
    maxlength: 10,
    default: "",
  },
  // 性别
  sex: {
    type: String,
    default: "",
  },
  // 年龄
  age: {
    type: Number,
    min: 0,
    default: "",
  },
  // 发布
  publishNum: {
    type: Number,
    min: 0,
    default: "",
  },
  // 点赞
  likeNum: {
    type: Number,
    min: 0,
    default: "",
  },
  // 评论
  commentNum: {
    type: Number,
    min: 0,
    default: "",
  },
  // 头像地址
  avatarURL: {
    type: String,
    default: "",
  },
  // 创建时间
  createTime: {
    type: String,
    required: true, // 必填
    default: "",
  },
});

module.exports = mongoose.model("user", userSchema);
