export const booksCart = [];
export function createCart() {
  const df = new DocumentFragment();
  const cartContener = document.createElement('aside');
  const cartItems = document.createElement('div');


  cartContener.setAttribute('id', 'cart-items')


  const
    cartDescription = document.createElement('p'),
    confirmOrderContainer = document.createElement('div'),
    totalSum = document.createElement('p'),
    confirmOrder = document.createElement('a');

  cartContener.appendChild(cartItems);
  cartContener.appendChild(cartDescription);
  cartDescription.classList.add('cart-descr');
  cartDescription.innerText = 'Magic place to collect your books';
  cartContener.appendChild(confirmOrder);
  df.append(cartContener)
  return df;

};

// button action 
export function addBtnMoreAction() {

  const moreInfoBtns = document.getElementsByClassName('read-more-btn');
  const closeModalBtns = document.getElementsByClassName('close');

  for (let i = 0; i < moreInfoBtns.length; i++) {
    moreInfoBtns[i].onclick = function () {
      showModal(i);
    };
    closeModalBtns[i].onclick = function () {
      closeModal(i)
    };
  }
}

function showModal(num) {
  const descModals = document.getElementsByClassName('modal');
  console.log('Show modal' + num);
  descModals[num].style.display = 'block'
}

function closeModal(num) {
  const modal = document.getElementsByClassName('modal');
  console.log('Show modal' + num);
  modal[num].style.display = 'none'
}


export function addBookToCart() {
  const addToCart = document.getElementsByClassName('add-book');
  for (let i = 0; i < addToCart.length; i++) {
    addToCart[i].addEventListener('click', function (e) {
      getBook(e.path[0]);
    });
    addToCart[i].addEventListener('dragend', function (e) {
      getBook(e.toElement);
    });
  }
}

function getBook(element) {

  if (booksCart.length > 0) {
    booksCart = booksCart.filter(e => e !== undefined)
    for (let book in booksCart) {
      if (booksCart[book].bookTitle === element.parentElement.children[0].innerText) {

        alert("Another one?");
        return;
      }
    }
  }

  buildOrderList(element)
}


function buildOrderList(element) {
  const booksCart = [];
  const newBook = {
    bookTitle: element.parentElement.children[0].innerText,
    bookAuthor: element.parentElement.children[1].innerText,
    bookPrice: element.parentElement.children[2].innerText
  };

  booksCart.push(newBook);

  const book = document.createElement('li'),
    bookTitle = document.createElement('div'),
    bookAuthor = document.createElement('div'),
    bookPrice = document.createElement('div'),
    removeBook = document.createElement('div');

  cartContener.appendChild(booksList);
  cartItems.classList.add('bag-list');

  cartItems.appendChild(book);

  book.appendChild(bookTitle);
  bookTitle.classList.add('bag-book-title');
  bookTitle.innerText = element.parentElement.children[0].innerText;

  book.appendChild(bookAuthor);
  bookAuthor.classList.add('bag-book-author');
  bookAuthor.innerText = element.parentElement.children[1].innerText;

  book.appendChild(bookPrice);
  bookPrice.classList.add('bag-book-price');
  bookPrice.innerText = element.parentElement.children[2].innerText;

  book.appendChild(removeBook);
  removeBook.classList.add('book-remove');
  removeBook.innerHTML = 'Remove book ' + '<i class="fa-solid fa-trash-can"></i>';

  // removeBook.onclick = function () {
  //   removeBookFn(removeBook)
  // };
  // getTotalSum();
}