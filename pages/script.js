import {
  getBookList
} from "./getjson.js";
import {
  createCart
} from "./cart.js";




// settings
const myApp = document.getElementById('app');
const bookDiv = document.createElement('div');
const docBody = document.querySelector('body');
let ul = document.createElement('ul');
const booksCart = [];


myApp.append(getBookList());

// aside section with book cart
myApp.after(createCart());

window.addEventListener("load", () => {
  //init book cart

  const test = document.getElementsByClassName('book-descr');


});

// main code in book fetch 