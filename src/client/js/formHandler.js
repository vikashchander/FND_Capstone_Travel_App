export const formHandler =(stateValue, countryValue)=>{
    console.log(stateValue,countryValue)
    postData(stateValue,countryValue  )
    .then(data =>{
      console.log(data);
      // console.log(stateValue,countryValue)
      // updateUI(stateValue,countryValue)
    })

}

const postData = async(stateValue = '',countryValue='') => {

  const response = await fetch('/trip', {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({stateValue,countryValue}),    
  });

  try {
    
      const newData = (await response.json()).data;
      return newData
  } catch (error) {
      console.log("error", error);
  }
}


function updateUI(stateValue,countryValue) {
  //console.log(data);

}