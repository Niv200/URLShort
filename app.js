require("dotenv").config();
const fs = require("fs");

const express = require("express");
const cors = require("cors");
const { captureRejectionSymbol } = require("events");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.use("/public", express.static(`./public`));
// app.use("/", express.static(`./views`));

//
function writeURL(content) {
  fs.writeFile("./database/database.json", content, "utf8", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}

function getData() {
  fs.readFile("./database/database.json", function read(error, data) {
    if (error) {
      throw error;
    }
    console.log(data);
  });
}
//
app.post("/api/shorturl/new", async (req, res) => {
  const fullUrl = req.body.url;
  if (isUrl(fullUrl)) {
    // res.json({ shorturl: 1, fullUrl });
    //Write into file
    // writeURL(JSON.stringify({ shorturl: 1, fullUrl: 1 }));
    getData();
  } else {
    res.json({ error: "URL is not valid!" });
  }
});

function isUrl(text) {
  let url;
  try {
    url = new URL(text);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
