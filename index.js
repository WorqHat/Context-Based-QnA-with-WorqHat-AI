/* jshint esversion:9 */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
  limit: "50mb",
});
const jsonParser = bodyParser.json({ limit: "50mb" });
const app = express();
const server = require("http").createServer(app);

app.set("port", process.env.PORT || 8080);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
console.log("Editor App Started");

app.use(urlencodedParser);
app.use(jsonParser);

app.use("/style", express.static("style"));
app.use("/javascript", express.static("javascript"));
app.use("/resources", express.static("resources"));

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(app.get("port"), () => {
  console.log("server started at port" + app.get("port"));
});
