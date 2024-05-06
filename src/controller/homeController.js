import userService from "../service/userService";
const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = async (req, res) => {
  let listUser = await userService.getListUser();
  return res.render("user.ejs", { listUser });
};

const handleLoginPage = (req, res) => {
  return res.render("login.ejs");
};

const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;
  userService.createNewUser(email, password, username);
  return res.send("create user success");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleLoginPage,
  handleCreateNewUser,
};
