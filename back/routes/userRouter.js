const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const {
    getAllUsers,
    postUser,
    updateUser,
} = userController;

const { signup, login } = authController;

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(postUser);
userRouter.route("/:id").patch(updateUser);

userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);

module.exports = userRouter;
