import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRouter from "./routes/web";
require("dotenv").config();
const app = express();

//config view engine
configViewEngine(app);

//init web routes
initWebRouter(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(">>> JWT backend is running on http://localhost:" + PORT);
});
