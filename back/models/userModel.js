const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: [true, "Email already exists"],
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email"],
        trim: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        message: "Role must be one of: user, admin",
        default: "user",
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlenght: [8, "Password should be at least 8 characters long!"],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator(el) {
                return el === this.password;
            },
            message: "Passwords are not the same",
        },
    },
    procedures: [
        {
            procedureId: {
              type: mongoose.Schema.ObjectId,
              ref: "Procedure",
            },
            date: {
              type: String,
            },
            rating: {
              type: Number,
            },
            comment: {
              type: String,
            },
          },
    ],
    // date: [{
    //     type: String,
    // }],
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword,
) {
    const comparePass = await bcrypt.compare(candidatePassword, userPassword);
    return comparePass;
};

module.exports = mongoose.model("User", userSchema);
