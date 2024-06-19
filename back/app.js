const express = require("express");
const cors = require("cors");

const categoryRouter = require("./routes/categoryRouter");
const userRouter = require("./routes/userRouter");
const procedureRouter = require("./routes/procedureRouter");

const app = express();

// app.use(
//     cors({
//         origin: "http://localhost:5173/",
//     }),
// );

app.use(cors());

const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "8mb" }));

app.use(express.json());

app.use("/api/v1/procedures", procedureRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
