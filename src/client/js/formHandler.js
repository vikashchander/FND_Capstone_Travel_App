export const formHandler = (stateValue, countryValue) => {
  event.preventDefault();
  postData(stateValue, countryValue).then((data) => {
    updateUI(data);
  });
};

const postData = async (stateValue = "", countryValue = "") => {
  const response = await fetch("/trips", {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ stateValue, countryValue }),
  });

  try {
    const newData = (await response.json()).data;
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

function updateUI(data) {
  const stateData = document.getElementById("state");
  const countryData = document.getElementById("country");
  const date = document.getElementById("date");
  var today = new Date();
  var presentDate =`${today.getFullYear()}-0${(today.getMonth() + 1)}-${today.getDate()}`;
  stateData.value = "";
  countryData.value = "";
  date.value = `${presentDate.toString()}`;
  const cardContainer = document.createElement("div");
  cardContainer.className = " card";
  const cardInfo = document.createElement("div");
  cardInfo.className = " card-info";
  const imgTag = document.createElement("img");
  imgTag.className = " card-preview";
  imgTag.setAttribute("src", data.imageURL);
  const tripData = document.createElement("h2");
  tripData.innerText = `My Trip : ${data.stateValue},${data.countryValue}`;
  const weatherInfo = document.createElement("h3");
  weatherInfo.innerText = "Typical Weather for then is :";
  const weatherData = document.createElement("h5");
  weatherData.innerText = `Temperature : ${data.weatherInfo.temp} °C`;
  const weatherDesc = document.createElement("h6");
  weatherDesc.innerText = `${data.weatherInfo.weather.description}`;
  cardInfo.appendChild(tripData);
  cardInfo.appendChild(weatherInfo);
  cardInfo.appendChild(weatherData);
  cardInfo.appendChild(weatherDesc);
  cardContainer.appendChild(imgTag);
  cardContainer.appendChild(cardInfo);
  let mainContainer = document.getElementById("container");
  mainContainer.appendChild(cardContainer);
}
