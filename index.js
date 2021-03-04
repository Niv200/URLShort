const app = require("./app");
const PORT = process.env.PORT || 3000;

// let submitButton = document.getElementById("submit");

//Adding function to submit button
// submitButton.addEventListener("click", shortenLink);

// function shortenLink() {
//   // let urlText = document.getElementById("url_input").value;
//   if (isURL(urlText)) {
//     let obj = { original_url: urlText, short_url: 1 };
//     var asJSON = JSON.stringify(obj);
//     return asJSON;
//   } else {
//     //Not a url
//     let obj = { not_a_valid_url: "URL is not valid!" };
//     var asJSON = JSON.stringify(obj);
//   }
// }

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
