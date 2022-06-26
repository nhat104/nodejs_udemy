const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const hbs = require('express-handlebars');

const app = express();

// app.engine('hbs', hbs.engine());
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(adminData.router);
app.use(shopRoutes);

app.use((req, res) => {
  res.status(404).render('404', { docTitle: 'Page Not Found' });
});

app.listen(8080);
