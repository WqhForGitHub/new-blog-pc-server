const mongoose = require("../db/init");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  // 博客标题
  name: {
    type: String,
    default: ''
  },
  // 简介
  value: {
    type: String,
    default: ''
  },
});

module.exports = mongoose.model("tags", tagSchema);
