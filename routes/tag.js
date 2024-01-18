var express = require("express");
var router = express.Router();

const tagModel = require("../model/tag");

// 查询所有标签
router.get("/tag", async (req, res, next) => {
  // 先默认插入
  let obj = {
    前端: 2,
    后端: 1,
    ios: 0,
    大数据: 3,
    综合: 4,
  };

  await Object.keys(obj).forEach((item) => {
    let obj1 = {
      name: item,
      value: obj[item],
    };
    const newTagModal = new tagModel({ ...obj1 });
    newTagModal.save().then(() => {});
  });

  let resObj = {
    status: 200,
    data: [],
    code: 1,
  };

  await tagModel.find().then((res1) => {
    if (res1 && res1.length > 0) {
      resObj.code = 0;
      resObj.data = res1;

      res.send(resObj);
      next();
    }
  });
});

module.exports = router;
