function writeURL(url, jsonObj) {
  const fs = require("fs");
  fs.writeFile("./database/database.json", jsonObj, (err) => {
    if (err) {
      console.log("Was not able to write into database.json");
      throw err;
    }
    console.log("Data is saved in database.json");
  });
}

function checkExists(url) {}

function getUrl(url) {}

function createShortUrl(url) {}
