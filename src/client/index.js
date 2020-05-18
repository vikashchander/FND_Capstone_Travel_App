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
      console.log(stateData.value,countryData.value,date.value)
      formHandler(stateData.value,countryData.value,date.value);
})
