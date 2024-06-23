const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

require("./conn/conn");

const authRoutes = require("./routes/auth");

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: true,
  })
);

const corsOptions = {
  origin: true, // Reflect the request origin, as defined by `req.header('Origin')`
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use("/api/v1", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
