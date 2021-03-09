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

  saveDatabase() {
    this.writeData(JSON.stringify(database));
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
      obj = this.getObjByUrl(url);
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

  getNewObjByLink(url) {}

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

  getObjWithoutStats(url) {
    for (let i in database) {
      if (database[i].fullUrl == url) {
        return { shorturl: database[i].shorturl, fullUrl: database[i].fullUrl };
      }
    }
    return -1;
  }
}

module.exports = Database;
