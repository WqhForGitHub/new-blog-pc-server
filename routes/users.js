const express = require("express");
const router = express.Router();
const userModel = require("../model/user");
const blogModel = require("../model/blog");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { log } = require("util");

var dayjs = require("dayjs");

/**
 * 生成 RSA 公私钥对
 * @return {*} publicKey: 公钥, privateKey: 私钥
 */
function genRSAKeyPaire() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });

  publicKeyStr = publicKey;
  privateKeyStr = privateKey;
  return { publicKey, privateKey };
}

/**
 * 使用私钥解密
 * @return {*}
 */
function privateDecrypt1(privateKey, data) {
  const msgBuffer = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(data, "base64")
  );
  return JSON.parse(msgBuffer.toString("utf8"));
}

// 获取公钥
router.get("/getPublicKey", function (req, res, next) {
  let resObj = {
    status: 200,
    data: "",
    code: 0,
  };

  const { publicKey } = genRSAKeyPaire();

  resObj.data = publicKey;
  return res.send(resObj);

  next();
});

/**
 * 新建用户
 * @return {*}
 */
router.post("/addUser", function (req, res, next) {
  const { userName, password, avatarUrl } = req.body;

  let resObj = {
    status: 200,
    data: [],
    code: 1,
  };

  const user = new userModel({
    userId: new Date().getTime() + "2024",
    userName,
    // 密码
    passWord: password,
    // 姓名
    name: "",
    // 性别
    sex: "",
    // 年龄
    age: 27,
    // 发布
    publishNum: 20,
    // 点赞
    likeNum: 10,
    // 评论
    commentNum: 10,
    // 头像地址
    avatarURL: avatarUrl,
    createTime: dayjs().format("YYYY/MM/DD"),
  });

  user.save().then((res1) => {
    if (res1 && res1.length == 0) {
      resObj.code = 1;
      return res.send(resObj);
      next();
    } else {
      resObj.code = 0;
      return res.send(resObj);
      next();
    }
  });
});

/**
 * 登录
 * @return {*}
 */
router.post("/login", async (req, res, next) => {
  let resObj = {
    status: 200,
    code: 1,
    msg: "",
    data: {},
  };

  // 使用私钥进行解密
  const { res1 } = req.body;
  let loginInfo = privateDecrypt1(privateKeyStr, res1);
  let count = 0;
  await blogModel
    .find({
      author: loginInfo.userName,
    })
    .count()
    .then((rs) => {
      count = rs;
    });
  let [count111, count222] = [0, 0];
  await blogModel
    .find({
      author: loginInfo.userName,
    })
    .then((res) => {
      if (res && res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          count111 += res[i].likeNum;
          count222 += res[i].commentNum;
        }
      }
    });

  await userModel
    .find({
      userName: loginInfo.userName,
      passWord: loginInfo.password,
    })
    .then((res1) => {
      if (res1 && res1.length > 0) {
        // 生成token
        // ...
        const token = jwt.sign(
          {
            userName: res1.userName,
          },
          "test_token", // secret
          { expiresIn: 60 * 60 }
        ); // 60 * 60

        resObj.code = 0;
        resObj.msg = "登录成功！";
        resObj.data = res1;
        resObj.token = token;
        resObj.count = count;
        resObj.likeNum = count111;
        resObj.commentNum = count222;
        return res.send(resObj);
        next();
      } else {
        return res.send(resObj);
        next();
      }
    });
  next();
});

module.exports = router;
