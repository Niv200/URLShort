const fs = require("fs");
let database;

class Database {
  constructor() {
    this.initDB = this.initDB();
  }

  //Clear init method to allow further updates in the future that require to be initiated.
  initDB() {
    this.getData();
  }

  writeData(content) {
    fs.writeFile("./data/database.json", content, "utf8", function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Data was saved!");
    });
  }

  getData() {
    fs.readFile("./data/database.json", "utf8", function (err, data) {
      if (err) {
        throw err;
      }
      database = JSON.parse(data);
    });
  }

  getDatabase() {
    let ids = database[0].idcount;
    let arr = [];
    for (let i = 1; i < ids; i++) {
      arr.push(database[i]);
    }
    return arr;
  }

  checkIfExists(url) {
    for (let i in database) {
      if (database[i].fullUrl === url) {
        return database[i].shorturl;
      }
    }
    return -1;
  }

  getNewId() {
    return database[0].idcount + 1;
  }

  addNewLink(url) {
    database.push(this.createLinkObj(url));
    database[0].idcount = this.getNewId();
  }

  createLinkObj(url, flag) {
    let obj;
    if (!flag) {
      obj = {
        shorturl: this.getNewId(),
        fullUrl: url,
        createdAt: new Date(),
        clicks: 0,
      };
    } else {
      obj = getObjByUrl(url);
    }
    return obj;
  }

  getIdByLink(url) {
    for (let i in database) {
      if (database[i].fullUrl === url) {
        return database[i];
      }
    }
    return -1;
  }

  getDataArray() {
    return this.database;
  }

  getObjById(id) {
    for (let i in database) {
      if (database[i].shorturl == id) {
        return database[i];
      }
    }
    return -1;
  }

  getClicks(id) {
    return this.getObjById(id).clicks;
  }

  updateClicks(id) {
    this.getObjById(id).clicks = this.getClicks(id) + 1;
    this.saveDatabase();
  }

  getObjByUrl(url) {
    for (let i in database) {
      if (database[i].fullUrl == url) {
        return database[i];
      }
    }
    return -1;
  }
}

module.exports = Database;
