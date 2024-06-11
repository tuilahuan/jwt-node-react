import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import bluebird from "bluebird";
import db from "../models/index"
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const createNewUser = async (email, password, username) => {
  let hashPassword = hashUserPassword(password);
  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashPassword
    })
  } catch (error) {
    console.log(error);
  }
};

const getListUser = async () => {
  let user = [];
  user = await db.User.findAll();
  return user;
};

const deleteUser = async (userId) => {
  await db.User.destroy({
    where: { id: userId }
  })
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  // try {
  //   const [row, fields] = await connection.execute(
  //     "DELETE FROM user where id =?",
  //     [id]
  //   );
  //   return row;
  // } catch (e) {
  //   console.log(e);
  // }
};

const getUserById = async (id) => {
  let user = {}
  user = await db.User.findOne({
    where: { id: id }
  })
  console.log(user);
  return user
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  // try {
  //   const [row, fields] = await connection.execute(
  //     "SELECT * FROM user where id =?",
  //     [id]
  //   );
  //   return row;
  // } catch (e) {
  //   console.log(e);
  // }
}

const updateUserInfor = async (email, username, id) => {
  await db.User.update({
    email: email, username: username
  }, {
    where: { id: id }
  })
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  // try {
  //   const [row, fields] = await connection.execute(
  //     "update user set email = ?, username = ? where id = ?",
  //     [email, username, id]
  //   );
  //   return row;
  // } catch (e) {
  //   console.log(e);
  // }
}

module.exports = {
  hashUserPassword,
  createNewUser,
  getListUser,
  deleteUser,
  getUserById,
  updateUserInfor
};
