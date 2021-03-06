class Database {
  constructor(path) {
    this.path = path;
  }

  writeURL(content) {
    fs.writeFile(this.path, content, "utf8", function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  }

  getData() {
    fs.readFile(this.path, function (err, data) {
      if (err) {
        throw err;
      }
      console.log(data);
    });
  }
}
