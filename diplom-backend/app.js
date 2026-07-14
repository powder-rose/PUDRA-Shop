require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const routes = require("./routes");

const port = 3001;
const app = express();


app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());


app.use("/", routes);


app.use(express.static(path.join(__dirname, "../diplom-frontend/dist")));

app.use((req, res) => {
  res.sendFile(
      path.join(__dirname, "../diplom-frontend/dist/index.html")
  );
});


mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      app.listen(port, () => {
        console.log(`Listening on port ${port}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });