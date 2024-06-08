import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRouter from "./routes/web";
import bodyParser from "body-parser";
require("dotenv").config();
const app = express();

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init web routes
initWebRouter(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(">>> JWT backend is running on http://localhost:" + PORT);
});
