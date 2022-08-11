const User = require('../models/user');

exports.getLogin = (req, res) => {
  res.render('auth/login', {
    title: 'Login',
    login: true,
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.redirect('/login');
    } else {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(() => {
        res.redirect('/');
      });
    }
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
