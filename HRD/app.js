// import express dan router
const express = require("express");
const router = require("./routes/api.js");

// import dotenv dan menjalankan method config
require("dotenv").config();

// destructing object process.env
const { APP_PORT } = process.env;

// membuat object express
const app = express();

// menggunakan middleware
app.use(express.json());
app.use(express.urlencoded());

// menggunakan routing (router)
app.use(router);

// mendefinisikan port
const PORT = 3000;
app.listen(APP_PORT, () =>
  console.log(`Server running at: http://localhost:${APP_PORT}`)
);