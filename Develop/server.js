const express = require("express");
const mongoose = require("mongoose");
const htmlRoutes= require("./routes/html")
const apiRoutes= require("./routes/api")
const PORT = process.env.PORT || 3000;
const dotenv = require ("dotenv")


dotenv.config()
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => console.log("database connected"))
.catch(err=> console.log(err))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


// routes
app.use("/",htmlRoutes)
app.use("/api",apiRoutes)
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
