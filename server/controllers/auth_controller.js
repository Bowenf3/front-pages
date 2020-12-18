const User = require('../models/User');

exports.login = (req, res) => {
  res.redirect('/');
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.currentUser = async (req, res) => {
  if (!req.user) {
    return res.sendStatus(402);
  } else {
    const googleid = await req.user;
    const userData = await User.findOne({googleId: `${googleid}`});
    res.status(200).send(userData);
  }
};