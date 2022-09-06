const PlantController = require("../controllers/plants.controller");

module.exports = app => {
  app.get("/api/plants/", PlantController.findAllPlants);
  // app.get("/api/plants/random", PlantController.findOneSingleRandomPlant); 
  // app.get("/api/plants/user/:id", PlantController.findPlantsOfUser);
  app.get("/api/plants/tasks/:id", PlantController.findPlantTasks);
  app.get("/api/plants/:id", PlantController.findOneSinglePlant);
  app.post("/api/plants/new", PlantController.createNewPlant);
  // app.put("/api/plants/update/tow/:id", PlantController.updateExistingPlantPartTow);
  app.put("/api/plants/update/:id", PlantController.updateExistingPlant);
  app.delete("/api/plants/delete/:id", PlantController.deleteAnExistingPlant);
};