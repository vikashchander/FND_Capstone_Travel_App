require("dotenv").config();
const express = require("express");
const path = require("path");
const fetch = require('node-fetch');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("dist"));

app.get("/", (req, res) => {
  //res.sendFile(path.join(__dirname, "../client/views", "index.html"))
  res.sendFile("dist/index.html"), res.status(200).json(data);
});
app.post("/trip", (req, res) => {
  const { stateValue, countryValue } = req.body;
  console.log(stateValue, countryValue)
  const countryData = countryValue.substring(0, 2).toUpperCase();
  const WeatherbitApi = 
    fetch(
    `https://api.weatherbit.io/v2.0/current?city=${stateValue}&country=${countryData}&key=${process.env.Weatherbit_Api_Key}`
  )

  console.log(WeatherbitApi);
  res.json(WeatherbitApi);
  // const PixabayApi = fetch(
  //   `https://pixabay.com/api/?key=${process.env.Pixibay_Api_Key}&q=travelling&image_type=illustration&category=travelling&min_width=200`
  // ).then((values)=>{
  //   values.json().then(data =>console.log(data))
  // }).catch(error=>console.log(error))
  // const geonamesApi = fetch(
  //   `api.geonames.org/postalCodeSearch?postalcode=110001&country=IN&username=${process.env.Geonames_Api_Key}`
  // ).then((values)=>{
  //   values.json().then(data =>console.log(data))
  // }).catch(error=>console.log(error))   
});

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT, () =>
  console.log(`Travel app listening on port ${process.env.PORT}!`)
);
