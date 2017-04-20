const express = require('express');
const fs = require('fs');

// http://handlebarsjs.com :: A template framework for Express
const hbs = require('hbs'); //https://www.npmjs.com/package/hbs

var app = express();

hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public/'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var logMsg = `${now}: ${req.method} ${req.url}`;
  console.log(logMsg);
  fs.appendFile('server.log', logMsg +'\n');
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenence.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome world'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error handling request'
  });
});

//port number
app.listen(3000, () => {
  console.log('Server is up on port 3000')
});
