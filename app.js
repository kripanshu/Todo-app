import express from 'express';
var todoController = require('./controllers/todoController').default;

var app = express();

// set up template engine

app.set('view engine', 'ejs');


// static files
app.use(express.static('./public'));

todoController(app);
// listen to port
app.listen(3000);
console.log("To-Do app is listening to port 3000");