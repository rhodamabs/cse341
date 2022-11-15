const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contacts');

//use body-parser to our incoming requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// routes to handle requests for contacts
app.use('/contacts', contactRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error,req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
}); 

module.exports = app;