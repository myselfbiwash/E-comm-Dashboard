const Jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;

function verifyToken(req, resp, next) {
    let token = req.headers['authorization'];
    if (token) {
      token = token.split(' ')[1];
      Jwt.verify(token, jwtKey, (err, valid) => {
        if (err) {
          resp.status(401).send({ result: 'Please provide valid token' });
  
        } else {
          const decoded = Jwt.decode(token);
          const user = decoded.user;
          req.user = user;
          next();
        }
      })
  
    } else {
      resp.status(403).send({ result: 'Please add token with header' });
    }
  
  
  };

module.exports = {verifyToken,};