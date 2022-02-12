const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, Authorizated deined' });
  }
  //verif token
  try {
    //decoded the token
    const decoded = jwt.verify(token, config.get('jwtToken'));
    req.user = decoded.user;
    next();
  } catch (e) {
    return res.status(401).json({ msg: 'Token is not vaild' });
  }
};
