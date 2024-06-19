const express = require("express");
const procedureController = require("../controllers/procedureController");
const authController = require("../controllers/authController");

const {
    getAllProcdures,
    getProcedureByID,
    postProcedure,
    updateProcedure,
    deleteProcedure,
    uploadImage,
    createMyProcedure,
    updateMyProcedure,
    deleteMyProcedure,
} = procedureController;

const { protect } = authController;

const procedureRouter = express.Router();

procedureRouter.route("/").get(getAllProcdures).post(uploadImage.single("image"), postProcedure);
procedureRouter.route("/:id").get(getProcedureByID).patch(uploadImage.single("image"), updateProcedure).delete(deleteProcedure);
procedureRouter.route("/myprocedures/:procedureId").post(protect, createMyProcedure).patch(protect, updateMyProcedure).delete(protect, deleteMyProcedure);

module.exports = procedureRouter;
