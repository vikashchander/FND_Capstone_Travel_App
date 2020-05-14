export const formHandler =(stateValue, countryValue)=>{
    console.log(stateValue,countryValue)
    postData(stateValue,countryValue  )
    .then(function(stateValue,countryValue){
      console.log(stateValue,countryValue)
      updateUI(stateValue,countryValue)
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
      body, // body data type must match "Content-Type" header        
  });

  try {
      const newData = await response.json();
      console.log(newData.data);
      return newData
  } catch (error) {
      //console.log("error", error);
  }
}


function updateUI(stateValue,countryValue) {
  //console.log(data);

}