// const mongoose = require('mongoose');
const express = require("express");
const cors = require('cors') // This is new
const app = express();


app.use(cors()) // This is new


// This will fire our mongoose.connect statement to initialize our database connection
require("./server/config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));

var bodyParser = require('body-parser')
// app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));
// This is where we import the plants routes function from our plants.routes.js file
const AllMyPlantsRoutes = require("./server/routes/plants.routes");
AllMyPlantsRoutes(app);

// This is where we import the users routes function from our users.routes.js file
const AllMyUsersRoutes = require("./server/routes/users.routes");
AllMyUsersRoutes(app);

// This is where we import the tasks routes function from our tasks.routes.js file
const AllMyTasksRoutes = require("./server/routes/tasks.routes");
AllMyTasksRoutes(app);

const AllMessagesRoutes = require("./server/routes/message.routes");
AllMessagesRoutes(app);

const server = app.listen(8000, () =>
    console.log('The server is all fired up on port 8000')
);

// app.listen(8000, () => console.log("The server is all fired up on port 8000"));

const io = require('socket.io')(server, { cors: true });
//const sockets = (await io.fetchSockets()).map(socket => socket.id);

io.on('connection',socket =>{
    console.log('nice to meet you, handshake..')

    // event listner 2
    socket.on("handle_message_receive", (data) => {
        io.emit("add_message", data)
    });

})
// Norah Adding to Test بس أجرب..