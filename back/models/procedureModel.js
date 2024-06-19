const mongoose = require("mongoose");

const procedureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        unique: true,
    },
    image: [String],
    date: [String],
    time: {
        type: String,
        required: [true, "Time is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
    },
});

const Procedure = mongoose.model("Procedure", procedureSchema);
module.exports = Procedure;
