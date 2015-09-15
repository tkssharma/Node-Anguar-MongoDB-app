# EXpress JS Route and Mongo db with angular front end 

Angular is on its own in the frontend. It accesses all the data it needs through the Node API. Node hits the database and returns JSON information to Angular based on the RESTful routing.
This application can be used to create any further big application .
npm install
node server

```sh
    var express  = require('express');
    var app      = express();                             
    var mongoose = require('mongoose');  // DB client                 
    var morgan = require('morgan');      // logging api
    var bodyParser = require('body-parser'); // get data from request body
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

```
# creating schema 

```sh
	var mongoose     = require('mongoose');
	var Schema       = mongoose.Schema;

	var todoSchema   = new Schema({
	    text: String
	});

	// the schema is useless so far
	// we need to create a model using it
	var Todo = mongoose.model('Todo', todoSchema);

```
# All different methods on schema object 
```sh
	http://localhost:8080/api/todos HTTP GET
	http://localhost:8080/api/todos HTTP POST
	http://localhost:8080/api/todos/:ID HTTP DELETE

```


