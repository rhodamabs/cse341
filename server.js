const express = require('express');

const mongodb = require('./db/connect');

const swaggerRoutes = require('./routes/swagger');

const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contacts');

const port = process.env.PORT || 8080;
const app = express();

// routes to handle requests for contacts
app.use('/', require('./routes'));

// use body-parser to our incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type,Accept, Z-Key'
  );
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Headers', 'GET,POST,PUT,DELETE,OPTIONS');
  next();
});




app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

mongodb.initDb((err,mongodb) =>{
 if(err) {
       console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});


