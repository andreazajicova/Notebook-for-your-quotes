const express = require('express');
const app = express();
const routes = require('./routes');
const exphbs = require('express-handlebars');
const path = require('path');

// Handlebars Middleware
app.enable('etag');
app.engine(
	'hbs',
	exphbs({
		defaultLayout: 'main',
		extname: '.hbs',
		layoutsDir: __dirname + '/views/layouts'
	})
);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res, next) {
    res.render('index.hbs', { 
        title: 'Home',
        description: 'My page'
    });
});

app.get('/newQuote', function (req, res, next) {
    res.render('newQuote.hbs', { title: 'New quote'});
})
const hbs = exphbs.create({});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/api', routes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
      error: {
          message: err.message
      }
  })
})

app.listen(3000, () => console.log('Quote API listening on port 8080!'));

