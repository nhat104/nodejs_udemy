const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('express-handlebars');

const errorController = require('./controllers/error');
const { mongoConnect } = require('./utils/database');

const app = express();

app.engine('hbs', hbs.engine());
app.set('view engine', 'hbs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, _, next) => {
  User.findById('62e3ed9e200add6954dc1920')
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.getError);

mongoConnect(() => {
  app.listen(8080);
});
