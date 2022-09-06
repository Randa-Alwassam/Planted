const TaskController = require("../controllers/tasks.controller");

module.exports = app => {
  app.get("/api/tasks/", TaskController.findAllTasks);
  // app.get("/api/tasks/random", TaskController.findOneSingleRandomTask); 
  app.get("/api/tasks/:id", TaskController.findOneSingleTask);
  app.post("/api/tasks/new", TaskController.createNewTask);
  // app.put("/api/tasks/update/tow/:id", TaskController.updateExistingTaskPartTow);
  app.put("/api/tasks/update/:id", TaskController.updateExistingTask);
  app.delete("/api/tasks/delete/:id", TaskController.deleteAnExistingTask);
};