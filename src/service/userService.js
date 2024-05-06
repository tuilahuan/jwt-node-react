import mysql from "mysql2";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

const hashUserPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const createNewUser = (email, password, username) => {
  let hashPassword = hashUserPassword(password);
  connection.query(
    `INSERT INTO users (email, password, username) VALUES (?,?,?)`,
    [email, hashPassword, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    }
  );
};

const getListUser = () => {
  let user = [];
  connection.query("SELECT * FROM users", function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log("check result", results);
  });
};

module.exports = {
  hashUserPassword,
  createNewUser,
  getListUser,
};
