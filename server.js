const express = require("express");
const app = express();
const port = 3000;

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("/signup", require("./routes/signup"));
app.use("/login", require("./routes/login"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.listen(port, () => console.log(`Server is live on ${port}`));
