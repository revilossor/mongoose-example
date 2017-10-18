const mongoose = require('mongoose');

/*
  this module exports a model, which is built from a schema.

  we can grab the model in other files by doing :-
    const model = require(<path to this file>);

  and construct documents from the model ( var doc = new model(<json than matches the schema>) )

  or query the cullection ( model.find, etc... )

*/
module.exports = mongoose.model('Thing', new mongoose.Schema({
  timestamp: String,
}));
