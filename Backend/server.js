const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const reportRoutes = require("./src/routes/ReportRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/", reportRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
