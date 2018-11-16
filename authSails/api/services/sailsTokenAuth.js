const jwt = require('jsonwebtoken');


module.exports.issueToken=function(payload) {
  return jwt.sign(
          payload,
          process.env.TOKEN_SECRET || "abhishek__1996"
        );
};


module.exports.verifyToken=function(token,verified) {
  return jwt.verify(
            token,
            process.env.TOKEN_SECRET || "abhishek__1996",
            {},
            verified
         );
};
