import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import bluebird from "bluebird";

const salt = bcrypt.genSaltSync(10);

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

const getListUser = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  let users = [];
  // connection.query("SELECT * FROM users", function (err, results, fields) {
  //   if (err) {
  //     console.log(err);
  //     return users;
  //   }
  //   users = results;
  // });
  try {
    const [row, fields] = await connection.execute("SELECT * FROM users");
    return row;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  hashUserPassword,
  createNewUser,
  getListUser,
};
