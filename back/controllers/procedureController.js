const Procedure = require("../models/procedureModel");
const User = require("../models/userModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../front/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

exports.uploadImage = multer({ storage: storage });

exports.getAllProcdures = async (req, res) => {
  try {
    const excludedFields = ["page", "limit", "sort", "fields"];
    const filter = { ...req.query };
    excludedFields.forEach((key) => delete filter[key]);

    let queryString = JSON.stringify(filter);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );

    let query = Procedure.find(JSON.parse(queryString));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("date");
    }

    if (req.query.page) {
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 10;
      const skipValue = (page - 1) * limit;

      query = query.skip(skipValue).limit(limit);

      const procedureCount = await Procedure.countDocuments();
      if (skipValue >= procedureCount)
        throw new Error("This page doesn't exsit");
    }

    const procedures = await query;

    res.status(200).json({
      status: "success",
      results: procedures.length,
      data: { procedures },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getProcedureByID = async (req, res) => {
  try {
    const { id } = req.params;
    const findProcedure = await Procedure.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        procedure: findProcedure,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.postProcedure = async (req, res) => {
  try {
    const newProcedure = await Procedure.create({
      ...req.body,
      image: `/images/${req.file.originalname}`,
    });

    res.status(201).json({
      status: "success",
      data: { procedure: newProcedure },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateProcedure = async (req, res) => {
  try {
    // const { id } = req.params;
    // const updatedFields = req.body;
    // const updatedExcursion = await Excursion.findByIdAndUpdate(
    //   id,
    //   ...updatedFields,
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // );

    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/images/${req.file.originalname}`;
    }

    const updatedProcedure = await Procedure.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: { procedure: updatedProcedure },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteProcedure = async (req, res) => {
  try {
    const { id } = req.params;
    // const deletedExcursion =
    await Procedure.findByIdAndDelete(id);

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

exports.createMyProcedure = async (req, res) => {
  try {
    const procedureId = req.params.procedureId;
    const userId = req.user._id;
    const { date } = req.body;

    const dateStr = Array.isArray(date) ? date[0] : date;

    await User.findByIdAndUpdate(userId, {
      $push: { procedures: { procedureId, date: dateStr } },
    });

    res.status(201).json({
      status: "success",
      data: null,
      message: "Procedure created successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateMyProcedure = async (req, res) => {
  try {
    const procedureId = req.params.procedureId;
    const userId = req.user._id;
    const { date, rating, comment } = req.body;

    await User.findByIdAndUpdate(userId, {
      $pull: { procedures: { procedureId } },
    });

    await User.findByIdAndUpdate(userId, {
      $push: {
        procedures: {
          procedureId,
          date, 
          rating, 
          comment, 
        },
      },
    });

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteMyProcedure = async (req, res) => {
  try {
    const procedureId = req.params.procedureId;
    const userId = req.user._id;
    await User.findByIdAndUpdate(userId, {
      $pull: { procedures: { procedureId } },
    });
    res.status(204).json({
      status: "success",
      data: null,
      message: "Procedure deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
