(function () {


  const main = document.getElementById('app'),
    ul = document.createElement('ul'),
    bag = document.createElement('div'),
    fragment = new DocumentFragment();

  let booksInCart = [];

  // MAIN-CONTENT-BOOKS

  fetch('../books.json') //path to the file with json data
    .then(response => {
      return response.json();
    })
    .then(data => {
      for (const book of data) {
        const li = document.createElement('li'),
          book_ = document.createElement('div'),
          bookCover = document.createElement('div'),
          bookCoverImg = document.createElement('img'),
          bookDescrCover = document.createElement('div'),
          bookAuthor = document.createElement('h5'),
          bookTitle = document.createElement('h3'),
          bookPrice = document.createElement('h4'),
          bookDescr = document.createElement('p'),
          addBook = document.createElement('div'),
          readMore = document.createElement('div'),
          closeBookDescr = document.createElement('div');

        fragment.append(li);
        li.classList.add('book-container');
        li.appendChild(book_);
        book_.classList.add('book');


        book_.appendChild(bookCover);
        book_.appendChild(bookCoverImg);
        bookCoverImg.setAttribute('src', book.imageLink);
        bookCoverImg.classList.add('book-cover-img');


        book_.appendChild(bookDescrCover);
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
        readMore.innerText = 'Read more...';
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
      };


      main.appendChild(ul);
      ul.append(fragment);
      ul.classList.add('book-list');

      // // ----- READ-MORE-BTN -----------------------------------------------------------
      const bookDecrBlock = document.getElementsByClassName('book-descr'),
        readMoreBtns = document.getElementsByClassName('read-more-btn'),
        closeBookDecr = document.getElementsByClassName('close-book-descr');

      for (let i = 0; i < readMoreBtns.length; i++) {
        readMoreBtns[i].onclick = function () {
          openDescription(i)
        };
        closeBookDecr[i].onclick = function () {
          openDescription(i)
        };
      }

      function openDescription(num) {
        bookDecrBlock[num].classList.toggle("book-descr-hidden");
      }

      // // ----- BAG - BLOCK -----------------------------------------------------------

      const booksList = document.createElement('ul');

      main.appendChild(bag);
      bag.setAttribute('id', 'bag')


      const logo = document.createElement('a'),
        bagDescr = document.createElement('p'),
        confirmOrderContainer = document.createElement('div'),
        totalSum = document.createElement('p'),
        confirmOrder = document.createElement('a');

      bag.appendChild(logo);
      logo.setAttribute('href', '../main/');
      logo.classList.add('logo');
      logo.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> book<span class='logo-span'>shop</span>`;

      bag.appendChild(bagDescr);
      bagDescr.classList.add('bag-descr');
      bagDescr.innerText = 'Welcome to our amazing book shop! Add your books here!'

      // // ----- ADD-TO-CART-BTN -----------------------------------------------------------
      // const addToCart = document.getElementsByClassName('add-book');



      // for (let i = 0; i < addToCart.length; i++) {
      //   addToCart[i].addEventListener('click', function (e) {
      //     getBook(e.path[0]);
      //   });
      //   addToCart[i].addEventListener('dragend', function (e) {
      //     getBook(e.toElement);
      //   });
      // }

      // function getBook(element) {

      //   // confirmOrder.setAttribute('style', 'display: flex');

      //   if (booksInCart.length > 0) {
      //     booksInCart = booksInCart.filter(e => e !== undefined)
      //     for (let book in booksInCart) {
      //       if (booksInCart[book].bookTitle === element.parentElement.children[0].innerText) {
      //         // event.stopPropagation();
      //         alert("You have already have this book in your bag!");
      //         return;
      //       }
      //     }
      //   }

      //   buildOrderList(element)
      // }

      // const removeBook = document.getElementsByClassName('book-remove');

      // window.addEventListener("DOM mutation", removeBook, (e) => console.log(e));

      // function buildOrderList(element) {
      //   const newBook = {
      //     bookTitle: element.parentElement.children[0].innerText,
      //     bookAuthor: element.parentElement.children[1].innerText,
      //     bookPrice: element.parentElement.children[2].innerText
      //   };

      //   booksInCart.push(newBook);

      //   const book = document.createElement('li'),
      //     bookTitle = document.createElement('div'),
      //     bookAuthor = document.createElement('div'),
      //     bookPrice = document.createElement('div'),
      //     removeBook = document.createElement('div');

      //   bag.appendChild(booksList);
      //   booksList.classList.add('bag-list');

      //   booksList.appendChild(book);

      //   book.appendChild(bookTitle);
      //   bookTitle.classList.add('bag-book-title');
      //   bookTitle.innerText = element.parentElement.children[0].innerText;

      //   book.appendChild(bookAuthor);
      //   bookAuthor.classList.add('bag-book-author');
      //   bookAuthor.innerText = element.parentElement.children[1].innerText;

      //   book.appendChild(bookPrice);
      //   bookPrice.classList.add('bag-book-price');
      //   bookPrice.innerText = element.parentElement.children[2].innerText;

      //   book.appendChild(removeBook);
      //   removeBook.classList.add('book-remove');
      //   removeBook.innerHTML = 'Remove book ' + '<i class="fa-solid fa-trash-can"></i>';

      //   removeBook.onclick = function () {
      //     removeBookFn(removeBook)
      //   };
      //   getTotalSum();
      // }

      // ----- REMOVE-BOOK-BTN -----------------------------------------------------------
      // function removeBookFn(book) {
      //   delete booksInCart[booksInCart.findIndex(i => i.bookTitle === book.parentElement.childNodes[0].innerText)];
      //   book.parentElement.remove();
      //   getTotalSum();
      //   if (booksInCart.length > 0) {
      //     booksInCart = booksInCart.filter(e => e !== undefined)
      //   }
      // }

      // bag.appendChild(confirmOrderContainer);
      // confirmOrderContainer.classList.add('confirm-order-container');

      // confirmOrderContainer.appendChild(totalSum);
      // totalSum.classList.add('total-sum');
      // totalSum.innerText = 'Total is 0';

      // confirmOrderContainer.appendChild(confirmOrder);
      // confirmOrder.classList.add('confirm-order');
      // confirmOrder.setAttribute('href', '../order/')
      // confirmOrder.innerText = 'Confirm order';

      // confirmOrder.addEventListener('click', function (e) {
      //   if (Number(e.path[1].children[0].innerText.slice(9)) === 0) {
      //     e.preventDefault();
      //     alert("Add book to the bag.");
      //   }
      // });

      // function getTotalSum() {
      //   let sumArray = [];
      //   if (booksInCart.length > 0) {
      //     booksInCart.forEach((item, i) => {
      //       sumArray.push(Number(item.bookPrice.slice(1)));
      //     });
      //   }
      //   const sum = sumArray.reduce((accumulator, value) => {
      //     return accumulator + value;
      //   }, 0);

      //   totalSum.innerText = 'Total is ' + sum;
      // }
    });

})();