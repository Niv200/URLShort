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
function writeData(content) {
  fs.writeFile("./data/database.json", content, "utf8", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Data was saved!");
  });
}
//database functions/////////////////////////
let database;
initDB();
function initDB() {
  getData();
}

function getData() {
  fs.readFile("./data/database.json", "utf8", function (err, data) {
    if (err) {
      throw err;
    }
    database = JSON.parse(data);
  });
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

function addNewLink(url) {
  database.push(createLinkObj(url));
  database[0].idcount = getNewId();
}

function createLinkObj(url, flag) {
  let obj;
  if(!flag){
  obj = { shorturl: getNewId(), fullUrl: url };
  }else{
     obj = { shorturl: getIdByLink(url), fullUrl: url };
  }
  return obj;
}

function getIdByLink(url){
   for (i in database) {
    if (database[i].fullUrl === url) {
      return database[i].shorturl;
    }
  }
  return -1;
}

function saveDatabase() {
  writeData(JSON.stringify(database));
}

function getObjById(url) {
  for (i in database) {
    if (database[i].fullUrl === url) {
      return database[i];
    }
  }
  return -1;
}

////////////////////////////////////////////////
app.post("/api/shorturl/new", async (req, res) => {
  const fullUrl = req.body.url;
  if (isUrl(fullUrl)) {
    if (checkIfExists(fullUrl) === -1) {
      addNewLink(fullUrl);
      saveDatabase();
      res.json(createLinkObj(fullUrl, true));
    } else {
      res.json(getObjById(fullUrl));
    }
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
