import {
  createHeader,
  createMain,

} from "./sections.js";


const myApp = document.getElementById("app");


window.addEventListener("load", () => {
  myApp.append(createHeader());
  myApp.append(createMain());

});