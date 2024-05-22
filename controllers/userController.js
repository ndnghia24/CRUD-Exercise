const controller = {};
const models = require("../models");

controller.show = async (req, res) => {
  res.locals.users = await models.User.findAll({
    attributes: [
      "id",
      "imagePath",
      "username",
      "firstName",
      "lastName",
      "mobile",
      "isAdmin",
    ],
    order: [["createdAt", "DESC"]],
  });
  res.render("user-management");
};

controller.addUser = async (req, res) => {
  let { username, firstName, lastName, email, mobile, isAdmin } = req.body;
  try {
    await models.User.create({
      username,
      firstName,
      lastName,
      email,
      mobile,
      isAdmin: isAdmin == "1" ? true : false,
    });
    res.redirect("/users");
  } catch (error) {
    res.send("Cannot add user");
    console.log(error);
  }
}

controller.editUser = async (req, res) => {
  let { id, username, firstName, lastName, mobile, isAdmin } = req.body;

  console.log(req.body);

  try {
    await models.User.update(
      {
        username,
        firstName,
        lastName,
        mobile,
        isAdmin: isAdmin == "1" ? true : false,
      },
      {
        where: {
          id,
        },
      }
    );
    res.send("User updated");
  } catch (error) {
    res.send("Cannot update user");
    console.log(error);
  }
}

controller.deleteUser = async (req, res) => {
  let { id } = req.body;
  try {
    await models.User.destroy({
      where: {
        id: parseInt(id),
      },
    });
    res.send("User deleted");
  } catch (error) {
    res.send("Cannot delete user");
    console.log(error);
  }
}

module.exports = controller;
