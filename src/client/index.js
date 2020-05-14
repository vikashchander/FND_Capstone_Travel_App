import {formHandler} from './js/formHandler';
import './styles/main.scss';

const stateData=document.getElementById('state');
const countryData= document.getElementById('country');
const submitBtn= document.getElementById('submit');

submitBtn.addEventListener('click',()=>{
    if(stateData.value ===''||countryData.value ==='')
      alert('plz enter valid data');
      else
        formHandler(stateData.value,countryData.value);
})
