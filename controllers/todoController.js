var bodyParser = require('body-parser');
// var data = [{item:'get milk'}, {item:'Do SDN work'}, {item:'Go to walmart'}];
var mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://admin:admin123@ds147073.mlab.com:47073/todo', { useNewUrlParser: true });

// create a schema
var todoSchema = new mongoose.Schema({
    item: String
});

// create model
var Todo = mongoose.model('Todo', todoSchema);



var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports =  function(app){

    app.get('/todo', function(req, res){
        Todo.find({}, function(err,data){
            if(err) throw err;
            res.render('todo', {todos: data});
        });
       
    });

    app.post('/todo', urlencodedParser, function(req, res){
    
    // get data from view and add it
    var itemOne = Todo(req.body).save(function(err,data){
        if (err) throw err;
        console.log('item saved');
        res.json(data);
    });
        
        
    });

    app.delete('/todo/:item', function(req, res){
        Todo.find({item:req.params.item.replace(/\-/g," ")}).deleteOne(function(err,data){
            if(err) throw err;
            res.json(data);
        });
        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g,'-') !== req.params.item;
        // });
        // res.json(data);
    });

};


//mongodb://<dbuser>:<dbpassword>@ds147073.mlab.com:47073/todo