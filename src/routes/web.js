import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();

const initWebRouter = (app) => {
  router.get("/", homeController.handleHelloWorld);

  router.get("/user", homeController.handleUserPage);

  router.post("/user/create-user", homeController.handleCreateNewUser);

  router.get("/login", homeController.handleLoginPage);

  return app.use("/", router);
};

export default initWebRouter;
