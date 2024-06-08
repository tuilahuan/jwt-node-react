import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRouter from "./routes/web";
import bodyParser from "body-parser";
import connection from "./config/connectDB"
require("dotenv").config();
const app = express();

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection db
connection();

//init web routes
initWebRouter(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(">>> JWT backend is running on http://localhost:" + PORT);
});
