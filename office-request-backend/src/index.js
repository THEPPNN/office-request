const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

const userRoutes = require("./routes/user");
const requestRoutes = require("./routes/request");
const managerRoutes = require("./routes/manager");
const loginRoutes = require("./routes/login");

app.use("/users", userRoutes);
app.use("/requests", requestRoutes);
app.use("/managers", managerRoutes);
app.use("/login", loginRoutes);

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});