require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const data = [];
app.use(express.static("dist"));

app.get("/", (req, res) => {
  //res.sendFile(path.join(__dirname, "../client/views", "index.html"))
  res.sendFile("dist/index.html"), res.status(200).json(data);
});
app.post("/trip", async (req, res) => {
  const { stateValue, countryValue } = req.body;
  const countryData = countryValue.substring(0, 2).toUpperCase();

  const geonamesInfo = await (
    await fetch(
      `http://api.geonames.org/postalCodeSearchJSON?username=${process.env.Geonames_Api_Key}&placename=${stateValue}&country=${countryData}`,
    )
  ).json();
  const {lat, lng } = geonamesInfo.postalCodes[0];
  const weatherbitInfo = await (
    await fetch(
      `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&country=${countryData}&key=${process.env.Weatherbit_Api_Key}`,
      {
        headers: {
          "Accept-Encoding": "gzip",
        },
      }
    )
  ).json();
  const pixabayImg = (
    await (
      await fetch(
        `https://pixabay.com/api/?key=${process.env.Pixibay_Api_Key}&q=${countryValue}&image_type=illustration&category=travelling&min_width=200`
      )
    ).json()
  ).hits;

  const imageURL = pixabayImg[2].webformatURL;
  const { city_name, weather, temp } = weatherbitInfo.data[0];
  data.unshift({
    stateValue,
    countryValue,
    weatherInfo: { city_name, weather, temp },
    imageURL,
  });
 // console.log({ data: data[0] });
  res.status(201).json({ data: data[0] });
});

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT, () =>
  console.log(`Travel app listening on port ${process.env.PORT}!`)
);
