import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import bluebird from "bluebird";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const createNewUser = async (email, password, username) => {
  let hashPassword = hashUserPassword(password);
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  const [row, fields] = await connection.execute(
    `INSERT INTO users (email, password, username) VALUES (?,?,?)`,
    [email, hashPassword, username]
  );
};

const getListUser = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [row, fields] = await connection.execute("SELECT * FROM users");
    return row;
  } catch (e) {
    console.log(e);
  }
};

const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [row, fields] = await connection.execute(
      "DELETE FROM users where id =?",
      [id]
    );
    return row;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  hashUserPassword,
  createNewUser,
  getListUser,
  deleteUser,
};
