// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const {mongoConnect} = require('./utils/databaseUtil');
const mangoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3000;
mongoConnect(() => {
  
})
const DB_PATH="mongodb+srv://w47223812_db_user:GLDbEla2eVqO5QxQ@cluster0.9b7ukuc.mongodb.net/airbnb?retryWrites=true&w=majority"

mangoose.connect(DB_PATH).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.log("Error connecting to MongoDB:", err);
});