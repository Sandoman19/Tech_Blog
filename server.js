// Dependencies
// path module
const path = require("path");
// Express.js server
const express = require("express");
// Express session to handle session cookies
const session = require("express-session");
// Handlebars template engine for front-end
const exphbs = require("express-handlebars");
// All routes as defined in the controllers folder
const routes = require("./controllers");
// Handlebars helpers
const helpers = require("./utils/helpers");
// Initialize handlebars for the html templates
const hbs = exphbs.create({ helpers });
// Sequelize connection to the database
const sequelize = require("./config/connection");
// Sequelize store to save the session so the user can remain logged in
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Initialize sessions
const sess = {
  secret: 'Super secret secret',
  cookie: { maxAge: 7200000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Initialize the server
const app = express();
// Define the port for the server
const PORT = process.env.PORT || 3001;

// Set handlebars as the template engine for the server
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Tell the app to use Express Session for the session handling
app.use(session(sess));

// Have Express parse JSON and string data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Give the server a path to the public directory for static files
app.use(express.static(path.join(__dirname, "public")));

// Give the server the path to the routes
app.use(routes);

// Turn on connection to db and then to the server
// force: true to reset the database and clear all values, updating any new relationships
// force: false to maintain data - aka normal operation
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
