const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 3000;
const dbURL = process.env.DATABASE_URL;

async function main() {
    await mongoose.connect(dbURL);
    console.log("Database connected");
}
main().catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
