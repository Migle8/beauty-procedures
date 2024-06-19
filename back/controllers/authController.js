const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");

const signToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
};

const sendTokenCookie = (token, res) => {
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
    };
    res.cookie("jwt", token, cookieOptions);
};

exports.signup = async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newUser._id);

    sendTokenCookie(token, res);

    newUser.password = undefined;

    res.status(201).json({
        status: "success",
        token,
        data: {
            user: newUser,
        },
    });
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(
            new Error("Please provide email and password"),
        );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(
            new Error("Incorrect email or password"),
        );
    }

    const token = signToken(user._id);

    sendTokenCookie(token, res);

    user.password = undefined;

    res.status(200).json({
        status: "success",
        token,
        data: user,
    });
};

exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization
        && req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token || token === "null") {
        return next(
            new Error("You are not logged in! Please log in to get access"),
        );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const existingUser = await User.findById(decoded.id);
    if (!existingUser) {
        return next(
            new Error("The user belongin to this token does no longer exist"),
        );
    }

    req.user = existingUser;
    next();
};

exports.restricTo = (...roles) => {
    return async (req, res, next) => {
        try {
            if (!roles.includes(req.user.role)) {
                return next(
                    new Error("You do not have permission to perform this action")
                );
            }
            next();
        } catch (err) {
            res.status(403).json({
                status: "fail",
                message: err.message,
            });
        }
    }
};
