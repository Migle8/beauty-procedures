const Category = require("../models/categoryModel");

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate("excursions");
        res.status(200).json({
            status: "success",
            results: categories.length,
            data: categories,
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.getCategoryByID = async (req, res) => {
    try {
        const { id } = req.params;
        const findCategory = await Category.findById(id);

        res.status(200).json({
            status: "success",
            data: findCategory,
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.postCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);

        res.status(201).json({
            status: "success",
            data: { category: newCategory },
        });
    } catch (err) {
        req.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const ufields = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(id, ufields, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: "success",
            data: { category: updatedCategory },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        // const deletedCategort =
        await Category.findByIdAndDelete(id);

        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};
