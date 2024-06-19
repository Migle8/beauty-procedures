const express = require("express");
const categoryController = require("../controllers/categoryController");

const {
    getAllCategories,
    getCategoryByID,
    postCategory,
    updateCategory,
    deleteCategory,
} = categoryController;

const categoryRouter = express.Router();

categoryRouter.route("/").get(getAllCategories).post(postCategory);
categoryRouter.route("/:id").get(getCategoryByID).patch(updateCategory).delete(deleteCategory);

module.exports = categoryRouter;
