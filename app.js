const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const studentRoute = require("./api/routes/student");
const userRoute = require("./api/routes/user");
const categoryRoute = require("./api/routes/category");
const productRoute = require("./api/routes/product");
const { urlencoded, json } = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

mongoose.connect(
  "mongodb+srv://priyankayadavyy01:q8D46issbbPaPXRs@priyanka.km6zcjm.mongodb.net/?retryWrites=true&w=majority&appName=Priyanka"
);
mongoose.connection.on("error", (err) => {
  console.log("connection failed");
});

mongoose.connection.on("connected", (connected) => {
  console.log("connected with database.......");
});

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(_dirname, "frontend", "build")));
  res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
});
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use("/student", studentRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/category", categoryRoute);

app.use((req, res, next) => {
  res.status(404).json({
    error: "url not found",
  });
});

app.use((req, res, next) => {
  res.status(200).json({
    message: "app is running",
  });
});

module.exports = app;
