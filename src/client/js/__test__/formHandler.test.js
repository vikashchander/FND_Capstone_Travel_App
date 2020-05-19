window.fetch = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    json: () =>
      Promise.resolve({
        data: {
          countryValue: "india",
          imageURL: "https://cdn.pixabay.com/photo/2016/07/08/00/26/elephant-1503503_150.png",
          stateValue: "delhi",
          weatherInfo:{
            city_name: "New Delhi",
            temp: 47.2,
            weather:{
              code: "800",
              description: "Clear sky",
              icon: "qwer"
            }          ​​​        
}
        }
      })
  });
});