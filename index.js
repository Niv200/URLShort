const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
// let submitButton = document.getElementById("submit");

//Adding function to submit button
// submitButton.addEventListener("click", shortenLink);

function shortenLink() {
  // let urlText = document.getElementById("url_input").value;
  if (isURL(urlText)) {
    let obj = { original_url: urlText, short_url: 1 };
    var asJSON = JSON.stringify(obj);
  } else {
    //Not a url
  }
}

function isUrl(text) {
  if (true) {
    //Check if text is URL
    return true;
  } else {
    return false;
  }
}
