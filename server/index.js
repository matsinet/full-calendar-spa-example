// 'Import' the Express module instead of http
const express = require("express");
// Require mongoose for accessing mongoDB
const mongoose = require("mongoose");
// Require dotenv to load environment variables
const dotenv = require("dotenv");

// Require models
const appointments = require("./routers/appointments");

dotenv.config();

// Initialize the Express application
const app = express();
// Get a port from .env - We use || to provide a default value
const PORT = process.env.PORT || 4040;
// Connect mongoose to the database
mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

// =======================
// HERE GOES MIDDLEWARE
// =======================

// CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

// Logging all calls to our server
const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};

// tell the app to use the middleware
app.use(cors);
app.use(express.json());
app.use(logging);

// =======================
// HERE GO THE ROUTES
// =======================
app.use("/appointments", appointments);

// Handle the request with HTTP GET method
//  from http://localhost:4040/status
app.get("/status", (request, response) => {
  // Create the headers for response by default 200
  // Create the response body
  // End and return the response
  response.send(JSON.stringify({ message: "Service healthy" }));
});

// funky status check for teapot
app.get("/", (request, response) => {
  response
    .status(418)
    .json({ message: "No Resource Found Here, Please see instructions" });
});

// route to return the post body
app.post("/", (request, response) => {
  const body = request.body;
  body.date = Date.now();
  response.json(body);
});

// Tell the Express app to start listening
// Let the humans know I am running and listening on 4040
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
