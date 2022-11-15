const http = require('http');
const app = require('./app');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;

const server = http.createServer(app);

mongodb.initDb((err,mongodb) =>{
    if(err) {
        console.log(err);
    } else {
        server.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});


