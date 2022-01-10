const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./misc/.env" });

const app = express();

// Body Parsers
app.use(express.json());
app.use(cors());

// routers
app.use("/", require("./routes/auth/auth"));
app.use("/urls", require("./routes/urls/urls"));
app.use("/", require("./routes/"));

app.listen(process.env.PORT, () => {
  console.log("Server started on port: " + process.env.PORT);
});
