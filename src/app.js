import fetchCountries from "./js/fetchCountries";
import debounce from "debounce";

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';

import { info, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';

defaultModules.set(PNotifyMobile, {});




const inputRef = document.querySelector(".search");
const listRef = document.querySelector(".list");
const boxRef = document.querySelector(".box");

inputRef.addEventListener(
  "input",
  debounce((event) => {
    const value = event.target.value;
     if(value === ""){
      listRef.innerHTML = ""
      boxRef.innerHTML = ""
      return
     }

    fetchCountries(value).then((data) => {
        console.log(data);
        
      if (data.length > 10) {
        info({
          text: "Зробіть запит більш специфічний!",
          mode: "light",
          delay: 1000,
        });
      }
      if(data.length >= 2 && data.length <= 10){
         renderCoutry(data)
      }
      if(data.length === 1){
        listRef.innerHTML = ""
        renderDetailsCoutry(data)

      }
    });
  }, 500),
);

function renderDetailsCoutry(array) {
  const item = array
    .map((item) => {
      return `<div>
  <h2 class="title">${item.name}</h2>
  <div class="wrap">
    <div>
      <h3>Capital: ${item.capital}</h3>
      <p>Population:${item.population}</p>
      <h4>Languages:</h4>
      <ul>${item.languages.map((itm)=>{
          return `<li>${itm.name}</li>`
      }).join("")}</ul>
    </div>
    <img src="${item.flags.png}" alt="${item.name}" />
  </div>
</div>`;
    })
    .join("");

    boxRef.innerHTML = item
}


function renderCoutry(array){
  const item = array.map((item)=>{
    return `<li>${item.name}</li>`
  }).join("")

  listRef.innerHTML = item
}