    // server.js
    var Todo = require('./models/todo');
    // set up ========================
    var express  = require('express');
    var app      = express();                             
    var mongoose = require('mongoose');                   
    var morgan = require('morgan');  
    var bodyParser = require('body-parser');
    var methodOverride = require('method-override');

    // configuration =================
    // DATABASE SETUP
    // =============================================================================
    mongoose.connect('mongodb://localhost/todoappdb');


    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // =============================================================================
    // ROUTES FOR OUR API
    // =============================================================================
    var router = express.Router();  

    router.get('*', function(req, res) {
        res.sendfile('./public/index.html'); 
        // load the single view file (angular will handle the page changes on the front-end)
    });

    // api ---------------------------------------------------------------------
    // get all todos
    router.get('/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

    router.post('/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });
           // delete a todo
    router.delete('/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");
    app.use('/api', router);