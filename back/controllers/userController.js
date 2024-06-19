const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
    const users = await User.find().populate("procedures.procedureId");
    res.status(200).json({
        status: "success",
        results: users.length,
        data: { users },
    });
};

exports.postUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
            status: "success",
            data: { user: newUser },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updFields = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, updFields, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: "success",
            data: { user: updatedUser },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};
