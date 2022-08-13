const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => {
  res.render('auth/login', {
    title: 'Login',
    login: true,
    errorMessage: req.flash('error'),
  });
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }
    return bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.redirect('/login');
      }
      req.session.user = user;
      return req.session.save(() => {
        res.redirect('/');
      });
    });
  });
};

exports.getSignup = (req, res) => {
  res.render('auth/signup', {
    title: 'Signup',
    signup: true,
  });
};

exports.postSignup = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((userDoc) => {
    if (userDoc) {
      return res.redirect('/signup');
    }
    return bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({
        email,
        password: hashedPassword,
        cart: { items: [] },
      });
      return user.save().then(() => {
        res.redirect('/login');
      });
    });
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
