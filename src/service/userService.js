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
  //test relationship
  let newUser = await db.User.findOne({
    attributes: ["id", "username", "email"],
    where: { id: 1 },
    raw: true,
    include: { model: db.Group, attributes: ["id", "name", "description"] },
    nest: true
  })

  let role1 = await db.Role.findAll({
    include: { model: db.Group, where: { id: 1 } },
    raw: true,
    nest: true
  })

  console.log(newUser);
  console.log('check roles', role1);

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
