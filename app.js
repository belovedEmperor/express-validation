const express = require("express");
const app = express();
const path = require("node:path");
const userRouter = require("./routes/userRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  }

  console.log(`Server running at port ${PORT}`);
});
