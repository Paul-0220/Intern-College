const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const route = require("./route/route");
const port = process.env.PORT || 4000;
mongoose
  .connect(
    "mongodb+srv://Prashannjeet02:ACOKkdQ1RwIlBpiP@cluster0.fl4md.mongodb.net/Project-2_Intern?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connection to database established"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(port, () => {
  console.log("Server is Running");
});
