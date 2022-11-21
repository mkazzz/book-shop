const container = document.getElementsByTagName("main");


let books;
fetch('assets/json/books.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    books = data;
  });



const header1 = document.createElement("h1");

const node = document.createTextNode("Online book shop");
header1.appendChild(node);