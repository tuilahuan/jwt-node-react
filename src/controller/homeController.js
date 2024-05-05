import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = (req, res) => {
  return res.render("user.ejs");
};

const handleLoginPage = (req, res) => {
  return res.render("login.ejs");
};

const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  connection.query(
    `INSERT INTO users (email, password, username) VALUES (?,?,?)`,
    [email, password, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    }
  );
  return res.send("create user success");
};
module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleLoginPage,
  handleCreateNewUser,
};
