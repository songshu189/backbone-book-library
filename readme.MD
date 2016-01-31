## Book Library - Your First RESTful Backbone.js App

This project is the excercise 2 [Book Library - Your First RESTful Backbone.js App](https://addyosmani.com/backbone-fundamentals/#exercise-2-book-library---your-first-restful-backbone.js-app) from  Developing Backbone.js Applications By Addy Osmani. Please follow the instructions in that course.

### Install

Clone the repo

```bash
$ git clone https://github.com/songshu189/backbone-book-library.git
```

### Creating the backend

- Install node.js, npm, and MongoDB
  * Download and install node.js from [nodejs.org](https://nodejs.org/en/).
  * Download, install, and run MongoDB from [mongodb.com](https://www.mongodb.com/)
- Install node modules
  * With *package.json* in root directory, run

  ```bash
  $ npm install
  ```

- Make sure MongoDB is running
  * For windows system, the batch file mongo.bat at root folder is for running mongoDB if it is installed in this directory (C:\MongoDB\Server\3.2\).

  ```bash
  $ mongo.bat
  ```

- Create a simple web server
  * With *server.js* in root directory, run

  ```bash
  $ node server.js
  ```

### Run the wep application

Open http://localhost:4711 on a browser, you should see this application is running.

### Attentions: changed for express version 4

The followings are just to remind that some modules are not available on express 4, I have to install them separately, but if you have followed the above instructions you don't need do anything.

Install method-override, errohandler, serve-static modules, add corresponding require variables.

```
 express.static  ->  serveStatic
 bodyParser()    ->  bodyParser.urlencoded({ extended: true })
 app.configure() // **this line is removed**
 express.methodOverride -> methodOverride
 app.use(app.router); // **this line is removed**
 express.errorHandler -> errorHandler
```