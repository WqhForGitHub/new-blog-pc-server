const mongoose = require("../db/init");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  id: {
    type: String,
    default: "",
  },
  // 博客标题
  blogTitle: {
    type: String,
    default: "",
  },
  // 简介
  blogMotto: {
    type: String,
    default: "",
  },
  // 博客链接
  blogPictureURL: {
    type: String,
    default: "",
  },
  // 博客内容
  blogContent: {
    type: String,
    default: "",
  },
  // 博客Markdown
  blogMarkDownContent: {
    type: String,
    default: "",
  },
  // 作者
  author: {
    type: String,
    default: "",
  },
  isMarked: {
    type: Boolean,
    default: false,
  },
  watchedNum: {
    type: Number,
    default: 0,
  },
  // 点赞数
  likeNum: {
    type: Number,
    default: 0,
  },
  // 评论数:
  commentNum: {
    type: Number,
    default: 0,
  },
  // 分类
  tag: {
    type: String,
    default: "",
  },
  userId: {
    type: String,
    default: "",
  },
  commentArr: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("blog", blogSchema);
