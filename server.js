const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

app.use(express.json());

app.use("/signup", require("./routes/signup"));
app.use("/login", require("./routes/login"));

app.listen(port, () => console.log(`Server is live on ${port}`));
