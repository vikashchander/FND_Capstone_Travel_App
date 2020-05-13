require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("dist"));
const weatherbitApi =`https://api.weatherbit.io/v2.0/current?city=Delhi&country=IN&key=${process.env.Weatherbit_Api_Key}`;
const PixabayApi =`https://pixabay.com/api/?key=${process.env.Pixibay_Api_Key}&q=travelling&image_type=illustration&category=travelling&min_width=200`;
const geonamesApi =`api.geonames.org/postalCodeSearch?postalcode=110001&country=IN&username=${process.env.Geonames_Api_Key}`;
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/views", "index.html"))
);

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT, () =>
  console.log(`Travel app listening on port ${process.env.PORT}!`)
);
