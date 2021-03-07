async function doSubmit() {
  let ele = document.getElementById("url_input");
  let obj = {
    url: ele.value,
  };
  let response = await fetch("/api/shorturl/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  let result = await response.json();
  if (result.shorturl) {
    const url = "http://localhost:3000/" + result.shorturl;
    document.getElementById("link").innerHTML = url;
    document.getElementById("link").href = url;
  } else if (result.shorturl == null || result.shorturl == undefined) {
    window.location.href = "/404.html";
  }
}

function gotoStats() {}
