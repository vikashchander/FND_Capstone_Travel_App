import {formHandler} from './js/formHandler';
import './styles/main.scss';

const stateData=document.getElementById('state');
const countryData= document.getElementById('country');
const date= document.getElementById('date');
const submitBtn= document.getElementById('submit');

submitBtn.addEventListener('click',(event)=>{
  event.preventDefault();
    if(stateData.value ===''||countryData.value ==='')
      alert('plz enter valid data');
      else
      formHandler(stateData.value,countryData.value,date.value);
})

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        console.log("SW registered: ", registration);
      })
      .catch(registrationError => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}