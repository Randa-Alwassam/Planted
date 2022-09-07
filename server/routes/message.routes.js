const MessageCtrl = require("../controllers/message.controller");

module.exports = app => {
  app.get("/api/messages/", MessageCtrl.findAllMessages);
  app.get("/api/messages/:id", MessageCtrl.findOneSingleMessage);
  app.post("/api/messages/new", MessageCtrl.createNewMessage);
  app.delete("/api/messages/delete/:id", MessageCtrl.deleteAnExistingMessage);
  app.delete("/api/messages/delete", MessageCtrl.deleteAllMessages);
};