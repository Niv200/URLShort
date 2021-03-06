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
  fs.writeFile("./data/database.json", content, "utf8", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}
//database functions
let database;
function initDB() {
  database = [
    { idcount: 4 },
    { shorturl: 1, fullUrl: "https://github.com/Niv200" },
    { shorturl: 2, fullUrl: "https://google.com" },
    { shorturl: 3, fullUrl: "https://reddit.com" },
    { shorturl: 4, fullUrl: "https://ebay.com" },
  ];
}
function getData() {
  fs.readFile("./data/database.json", "utf8", function (err, data) {
    if (err) {
      throw err;
    }
    initDB();
    processData(data);
  });
}

function processData(data) {
  // database = JSON.parse(data);
  // console.log(data[1]);
  console.log(database);
  console.log(checkIfExists("https://ebay.com")); //return id 4; -1 if not found
  console.log(getNewId());
}

function checkIfExists(url) {
  for (i in database) {
    if (database[i].fullUrl === url) {
      return database[i].shorturl;
    }
  }
  return -1;
}

function checkIfExists(url) {
  for (i in database) {
    if (database[i].fullUrl === url) {
      return database[i].shorturl;
    }
  }
  return -1;
}

function getNewId() {
  return database[0].idcount + 1;
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

function containURL(urlToCheck) {}
