// require("dotenv").config();
// const urlExists = require("url-exists");
// const fs = require("fs");
// const fetch = require("node-fetch");
// const Database = require("./data/database.js");
// const database = new Database();

// const express = require("express");
// const cors = require("cors");
// const { captureRejectionSymbol } = require("events");
// const app = express();
// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded());

// app.use("/public", express.static(`./public`));
// // app.use("/", express.static(`./views`));

// // app.post("/api/shorturl/new", async (req, res) => {
// //   const fullUrl = req.body.url;
// //   if (isUrl(fullUrl)) {
// //     if (database.checkIfExists(fullUrl) === -1) {
// //       database.addNewLink(fullUrl);
// //       database.saveDatabase();
// //       res.json(database.createLinkObj(fullUrl, false));
// //     } else {
// //       res.json(database.getObjWithoutStats(fullUrl));
// //     }
// //   } else {
// //     res.json({ error: "URL is not valid!" });
// //   }
// // });
// app.post("/api/shorturl/new", async (req, res) => {
//   const fullUrl = req.body.url;
//   if (isUrl(fullUrl)) {
//     urlExists(fullUrl, function (err, exists) {
//       if (exists) {
//         if (database.checkIfExists(fullUrl) === -1) {
//           database.addNewLink(fullUrl);
//           database.saveDatabase();
//           res.json(database.createLinkObj(fullUrl, false)); //changed
//         } else {
//           res.json(database.getObjByUrl(fullUrl));
//         }
//       } else {
//         res.json({ message: "Page not found" });
//       }
//     });
//   } else {
//     res.json({ error: "URL is not valid!" });
//   }
// });

// function isUrl(text) {
//   let url;
//   try {
//     url = new URL(text);
//   } catch (_) {
//     return false;
//   }
//   return url.protocol === "http:" || url.protocol === "https:";
// }

// app.get("/:id", (req, res) => {
//   res.sendFile(__dirname + "/views/index.html");
//   const id = req.params.id.replace(":", "");
//   let obj = database.getObjById(id);
//   if (obj !== -1) {
//     res.redirect(303, obj.fullUrl);
//     database.updateClicks(id);
//   }
// });
// ////////////////////////////////////////////////////////////////
// app.get("/api/statistic/:id", (req, res) => {
//   const { id } = req.params;
//   res.json(database.getObjById(id));
// });

// app.get("/api/statistics", (req, res) => {
//   res.json(database.getDatabase());
// });
// ////////////////////////////////////////////////////////////////

// module.exports = app;
