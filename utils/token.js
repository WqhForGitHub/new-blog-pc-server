const jsonwebtoken = require("jsonwebtoken");

const secret = "W-qh Data";

const JWT = {
  // 生成 token
  generate(value, expires) {
    // value 数据，expires 过期时间
    return jsonwebtoken.sign(value, secret, {
      expiresIn: expires,
    });
  },
  // 校验 token
  vertify(token) {
    try {
      return jsonwebtoken.verify(token, secret);
    } catch (error) {
      return false;
    }
  },
};

module.exports = JWT;
