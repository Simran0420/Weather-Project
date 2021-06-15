const express = require("express");

const https = require("https");

const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.CityName;
  const appid = "66190b32adf19673e324bb0520e5d844#";
  const units = "metric";
  const url = ("https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + units + "");
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const weatherDescription = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageurl = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather description is " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + query + " is" + temp + "degree celcius.</h1>");
      res.write("<img src=" + imageurl + ">");
      res.send();
    });
  });

});








app.listen(3000, function() {
  console.log("server is running at port 3000");
});
