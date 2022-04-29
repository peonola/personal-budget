const express = require("express");
const morgan = require("morgan");
const envRouter = require("./routes/envRoutes");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/envelopes", envRouter);

const port = 4444;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
