// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    bodyParser = require('body-parser'), //Parser for reading request body
    methodOverride = require('method-override'), //Lets HTTP verbs (PUT/GET) in places where the client doesn't support
    serveStatic = require('serve-static'), //Create a new middleware function to serve files from within a given root directory
    errorHandler = require('errorhandler'), //Development-only error handler middleware
    path = require( 'path' ), //Utilities for dealing with file paths
    mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express();

//Where to serve static content
app.use( serveStatic(path.join( application_root, 'site')) );
app.use( bodyParser.urlencoded({ extended: true }) );
//app.use(bodyParser());

//Start server
var port = 4711;

app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});


// Routes
app.get( '/api', function( request, response ) {
    response.send( 'Library API is running' );
});

var dbURI = 'mongodb://localhost:27017/library_database';
//Connect to database
mongoose.connect( dbURI );

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

//Schemas
var Keywords = new mongoose.Schema({keyword: String}, { _id: false });

//Schemas
var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date,
    keys: [ Keywords ]                       // NEW
});

//Models
var BookModel = mongoose.model( 'Book', Book );

// Configure server
(function() {
    //parses request body and populates request.body
    app.use( bodyParser.urlencoded({ extended: true })  );

    //checks request.body for HTTP method overrides
    app.use( methodOverride() );

    //Where to serve static content
    app.use( serveStatic(path.join( application_root, 'site')) );

    //Show all errors in development
    app.use( errorHandler({ dumpExceptions: true, showStack: true }));
})();


//Get a list of all books
app.get( '/api/books', function( request, response ) {
    return BookModel.find( function( err, books ) {
        if( !err ) {
            return response.send( books );
        } else {
            return console.log( err );
        }
    });
});

//Insert a new book
app.post( '/api/books', function( request, response ) {
    var book = new BookModel({
        title: request.body.title,
        author: request.body.author,
        releaseDate: request.body.releaseDate,
        keys: request.body.keywords       // NEW
    });
    book.save( function( err ) {
        if( !err ) {
            console.log( 'created' );
            return response.send( book );
        } else {
            return console.log( err );
        }
    });

});

//Get a single book by id
app.get( '/api/books/:id', function( request, response ) {
    return BookModel.findById( request.params.id, function( err, book ) {
        if( !err ) {
            return response.send( book );
        } else {
            return console.log( err );
        }
    });
});

//Update a book
app.put( '/api/books/:id', function( request, response ) {
    console.log( 'Updating book ' + request.body.title );
    return BookModel.findById( request.params.id, function( err, book ) {
        book.title = request.body.title;
        book.author = request.body.author;
        book.releaseDate = request.body.releaseDate;
        book.keys = request.body.keywords; // NEW

        return book.save( function( err ) {
            if( !err ) {
                console.log( 'book updated' );
            } else {
                console.log( err );
            }
            return response.send( book );
        });
    });
});

//Delete a book
app.delete( '/api/books/:id', function( request, response ) {
    console.log( 'Deleting book with id: ' + request.params.id );
    return BookModel.findById( request.params.id, function( err, book ) {
        return book.remove( function( err ) {
            if( !err ) {
                console.log( 'Book removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});