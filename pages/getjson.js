import {
  addBtnMoreAction
} from "./cart.js";
export function getBookList() {
  let df = new DocumentFragment();
  const bookShelf = document.createElement('ul');

  bookShelf.setAttribute("class", "book-catalog");



  fetch('../books.json') //path to the file with json data
    .then(response => {
      return response.json();
    })
    .then(booksJSON => {

      booksJSON.map((book, index) =>
        bookShelf.appendChild(createBookElement(book, index))
      );

      addBtnMoreAction();



    });

  //[title, catalog].map((el) => container.appendChild(el));

  df.append(bookShelf);


  return df;

}

export function createBookElement(book, index) {


  // setting - const definitons for html elements
  const df = new DocumentFragment;
  const li = document.createElement('li');
  const bookDiv = document.createElement('div');
  const bookCover = document.createElement('div');
  const bookCoverImg = document.createElement('img');

  const bookDescrCover = document.createElement('div');
  const bookTitle = document.createElement('h3');
  const bookAuthor = document.createElement('h4');

  const bookPrice = document.createElement('span');
  const bookDescr = document.createElement('p');
  const addBook = document.createElement('button');
  const readMore = document.createElement('button');
  const closeBookDescr = document.createElement('button');


  li.classList.add('book-container');
  li.appendChild(bookDiv);
  bookDiv.classList.add('book');


  bookDiv.appendChild(bookCover);

  bookCover.appendChild(bookCoverImg);
  bookCover.classList.add('book-cover-wrapper');
  bookCoverImg.setAttribute('src', '../assets/images/covers/' + book.imageLink);
  bookCoverImg.classList.add('book-cover-img');


  bookDiv.appendChild(bookDescrCover);
  bookDescrCover.classList.add('book-descr-cover');

  bookDescrCover.appendChild(bookTitle);
  bookTitle.innerText = book.title;
  bookTitle.classList.add('book-title');

  bookDescrCover.appendChild(bookAuthor);
  bookAuthor.innerText = book.author;
  bookAuthor.classList.add('book-author');

  bookDescrCover.appendChild(bookPrice);
  bookPrice.innerText = '$' + book.price;
  bookPrice.classList.add('book-price');

  bookDescrCover.appendChild(readMore);
  readMore.innerText = 'More info';
  readMore.classList.add('read-more-btn');

  bookDescrCover.appendChild(bookDescr);
  bookDescr.innerText = book.description;
  bookDescr.classList.add('book-descr');
  bookDescr.classList.add('book-descr-hidden');
  bookDescr.appendChild(closeBookDescr);
  closeBookDescr.classList.add('close-book-descr');
  closeBookDescr.innerText = 'close';



  bookDescrCover.appendChild(addBook);
  addBook.classList.add('add-book');
  addBook.setAttribute('draggable', 'true');

  addBook.setAttribute('book', book.title);
  addBook.innerText = 'Add to cart';
  df.append(li);
  return df;


}