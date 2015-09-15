var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var todoSchema   = new Schema({
    text: String
});

// the schema is useless so far
// we need to create a model using it
var Todo = mongoose.model('Todo', todoSchema);

// make this available to our users in our Node applications
module.exports = Todo;