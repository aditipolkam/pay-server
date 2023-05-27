require("dotenv").config();
var express = require("express");
var http = require("http");

var registerRouter = require("./routes/register");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", registerRouter);

app.set("port", port);

var server = http.createServer(app);

server.listen(port, function () {
  console.log("Example app listening on port 3000!");
});
