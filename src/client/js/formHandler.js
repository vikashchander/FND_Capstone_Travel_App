export const formHandler =(stateValue, countryValue)=>{
    postData(stateValue,countryValue)
    .then(data =>{
      updateUI(data)
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


function updateUI(data) {
  //console.log(data);

}