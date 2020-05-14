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
app.get("/", (req, res) =>{
  //res.sendFile(path.join(__dirname, "../client/views", "index.html"))
  res.sendFile('dist/index.html'),
  res.status(200).json(data)
}); 
app.post("/trip", (req, res) =>{
  const {stateValue,countryValue} = req.body;
 const countryData = countryValue.substring(0,2).toUpperCase();
  const weatherbitInfo =await (
     await fetch(`https://api.weatherbit.io/v2.0/current?city=${stateValue}&country=${countryData}&key=${process.env.Weatherbit_Api_Key}`,
     {
      headers: {
        "Accept-Encoding": "gzip"
      }
    } )
  ).json();
  const pixabayImg =(await(
    await fetch(`https://pixabay.com/api/?key=${process.env.Pixibay_Api_Key}&q=travelling&image_type=illustration&category=travelling&min_width=200`)
  ).json()).hits;

  const imageURL = pixabayImg[0].webformatURL;
  
  const {city_name,weather,temp} = weatherbitInfo.data
  data.unshift({
    stateValue,
    countryValue,
    weatherInfo: { city_name, weather, temp},
    imageURL
  });
  res.status(201).json({ data: data[0] });



}
);

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT, () =>
  console.log(`Travel app listening on port ${process.env.PORT}!`)
);
