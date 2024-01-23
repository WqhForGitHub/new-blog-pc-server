var express = require("express");
var router = express.Router();
const blogModel = require("../model/blog");
let mongoose = require("mongoose");
const { off } = require("../model/user");

// 添加博客
router.post("/blog", function (req, res, next) {
  let {
    blogTitle,
    motto,
    tag,
    isMarked,
    blogContent,
    author,
    pictureUrl,
    userId,
  } = req.body;

  let obj = {
    code: 1,
    status: 200,
  };

  let blog = {
    id: "Blog" + new Date().getTime(),
    blogTitle, // 博客标题
    blogMotto: motto, // 博客简介
    tag, // 种类
    isMarked, // 是否是 markdown
    blogMarkDownContent: blogContent, // markdown 语法标签
    author,
    blogPictureURL: pictureUrl,
    userId,
  };

  const newBlog = new blogModel({ ...blog });

  newBlog.save().then((res1) => {
    obj.msg = "添加成功！";
    obj.code = 0;
    res.send(obj);
    next();
  });

  next();
});

// 查询博客
router.get("/blog", async function (req, res, next) {
  let resObj = {
    status: 200,
    code: 1,
    data: [],
    total: 0,
  };

  let { pageNum, pageSize, tagValue } = req.query;

  let skip = (Number.parseInt(pageNum) - 1) * Number.parseInt(pageSize);
  // 根据分类查
  if (tagValue) {
    await blogModel
      .find({ tag: tagValue })
      .count()
      .then((res) => {
        resObj.total = res ? res : 0;
        next();
      });

    await blogModel
      .find({ tag: tagValue })
      .limit(Number.parseInt(pageSize))
      .skip(skip)
      .then((res1) => {
        if (res1 && res1.length > 0) {
          resObj.code = 0;
          resObj.data = res1;

          res.send(resObj);
          next();
        } else {
          resObj.code = 0;
          resObj.data = res1;

          res.send(resObj);
        }
      });
  } else {
    // 普通查询
    await blogModel
      .find()
      .count()
      .then((res) => {
        resObj.total = res ? res : 0;
        next();
      });

    await blogModel
      .find()
      .limit(Number.parseInt(pageSize))
      .skip(skip)
      .then((res1) => {
        if (res1 && res1.length > 0) {
          resObj.code = 0;
          resObj.data = res1;

          res.send(resObj);
          next();
        } else {
          resObj.code = 0;
          resObj.data = res1;

          res.send(resObj);
        }
      });
  }
});

// 新增观看数接口
router.post("/addWatchedNum", function (req, res, next) {
  let statusObj = {
    status: 200,
    code: 1,
  };

  blogModel.findOne({ id: req.body.id }).then((res1) => {
    res1.watchedNum++;
    res1.save();
    statusObj.code = 0;
    res.send(statusObj);
    next();
  });
});

// 新增点赞数
router.post("/addLikeNum", function (req, res, next) {
  let statusObj = {
    status: 200,
    code: 1,
  };

  blogModel.findOne({ id: req.body.id }).then((res1) => {
    res1.likeNum++;
    res1.save();
    statusObj.code = 0;
    res.send(statusObj);
    next();
  });
  next();
});

// 发表评论
router.post("/publishComments", function (req, res, next) {
  let statusObj = {
    status: 200,
    code: 1,
  };

  console.log(req.body);
  blogModel.findOne({ id: req.body.id }).then((res1) => {
    let obj = {
      userId: req.body.userId,
      content: req.body.value,
      avatarURL: req.body.avatarURL,
      userName: req.body.userName,
      commentId: req.body.commentId,
      commentArr: req.body.commentArr,
    };
    res1.commentArr.push(obj);
    res1.save();
    statusObj.code = 0;
    res.send(statusObj);
    next();
  });
});

// 发表子评论
router.post("/publishSubComments", function (req, res, next) {
  let statusObj = {
    status: 200,
    code: 1,
  };

  console.log(req.body);

  // res1.commentArr commentId
  // if(req.body.commentArr) {
  //   for(let i = 0; i < req.body.commentArr.length; i++) {
  //     let obj = {

  //     }
  //     if(req.body.commentArr[i].commentId === req.body.commentId) {
  //       req.body.commentArr[i].commentArr
  //     }
  //   }
  // }

  blogModel.findOne({ id: req.body.id }).then((res1) => {
    let obj = {
      userId: req.body.dataObj.userId,
      content: req.body.dataObj.value,
      avatarURL: req.body.dataObj.avatarURL,
      userName: req.body.dataObj.userName,
      commentId: req.body.dataObj.commentId,
    };
    let targetObj = {}
    if (res1.commentArr) {
      for (let i = 0; i < res1.commentArr.length; i++) {
        if (res1.commentArr[i].commentId === req.body.commentId) {
          targetObj = res1.commentArr[i];
        }
      }
    }

   
    targetObj.commentArr.push(obj)
    console.log(res1.commentArr)

    res1.save();
    statusObj.code = 0;
    res.send(statusObj);
    next();
  });
});

// 修改博客
router.put("/blog", function (req, res, next) {});

// 删除博客
router.delete("/blog", function (req, res, next) {});

module.exports = router;
