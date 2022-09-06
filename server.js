// const mongoose = require('mongoose');
const express = require("express");
const cors = require('cors') // This is new
const app = express();


app.use(cors()) // This is new


// This will fire our mongoose.connect statement to initialize our database connection
require("./server/config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));

var bodyParser = require('body-parser')
app.use(bodyParser.json());
// This is where we import the plants routes function from our plants.routes.js file
const AllMyPlantsRoutes = require("./server/routes/plants.routes");
AllMyPlantsRoutes(app);

// This is where we import the users routes function from our users.routes.js file
const AllMyUsersRoutes = require("./server/routes/users.routes");
AllMyUsersRoutes(app);

// This is where we import the tasks routes function from our tasks.routes.js file
const AllMyTasksRoutes = require("./server/routes/tasks.routes");
AllMyTasksRoutes(app);

app.listen(8000, () => console.log("The server is all fired up on port 8000"));
