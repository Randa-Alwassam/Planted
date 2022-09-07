const UserController = require("../controllers/users.controller");

module.exports = app => {
  app.get("/api/users/", UserController.findAllUsers);
  // app.get("/api/users/random", UserController.findOneSingleRandomUser); 
  app.get("/api/users/plants/:id", UserController.findOneSingleUserPlants);
  app.get("/api/users/name/:username", UserController.findOneSingleUserByName);
  app.get("/api/users/:id", UserController.findOneSingleUser);
  app.post("/api/users/new", UserController.createNewUser);
  // app.put("/api/users/update/tow/:id", UserController.updateExistingUserPartTow);
  app.put("/api/users/update/:id", UserController.updateExistingUser);
  app.delete("/api/users/delete/:id", UserController.deleteAnExistingUser);
};