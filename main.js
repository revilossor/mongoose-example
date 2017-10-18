const DATABASE_URL = 'mongodb://user:password@ds123725.mlab.com:23725/mongoose-test';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_URL);    // connect to the database...

const db = mongoose.connection;   // then get the connection object...

// listen to error events from the connection object, and log if there are any
db.on('error', (err) => { console.log(`db connection error : ${err.message}`); });

// listen for open events too - this is when the connection is okay to use.
db.once('open', () => {

  console.log('connection is open!');

  //get the model
  const Thing = require('./models/thing');

  console.log('creating a document from the model')
  const doc = new Thing({
    timestamp: Date.now()         // the argument to new Thing should be JSON that matches the schema.
  });

  console.log('saving the document');
  doc.save(function(err, doc) {       // the save function of the document takes a function argument
    if(err) {
      console.log('there was an error saving the document ' + err.message);
    } else {
      console.log('the document saved okay!');
      listAllDocuments(Thing);
    }
  });
});

// this is a function that gets all the documents in a model and logs them.
function listAllDocuments(model) {
  console.log('list all documents...');
  model.find({}, function(err, docs) {
    if(err) { return console.log('[listAllDocuments] there was an error finding documents!')}
    docs.forEach((doc) => {
      console.log(JSON.stringify(doc) + ' was saved at ' + (new Date(parseInt(doc.timestamp))) );
    });
  });
}
