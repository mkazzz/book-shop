const df = new DocumentFragment;

const rootElement = document.getElementById("app");
let totalPrice = 0; // total sum
let ul = document.createElement('ul'); // booklist
ul.setAttribute("class", "book-catalog");

const cartContener = document.createElement('aside');
cartContener.setAttribute('id', 'cart-items')


const cartItems = document.createElement('ul');
const
  cartDescription = document.createElement('h4'),
  confirmOrderContainer = document.createElement('div'),
  totalSum = document.createElement('h4'),
  confirmOrder = document.createElement('button');


cartContener.appendChild(cartDescription);
cartDescription.classList.add('cart-descr');
cartDescription.innerText = 'Magic place to collect (drag) your books';
cartContener.appendChild(totalSum);
confirmOrderContainer.appendChild(confirmOrder);

const linkConfirm = document.createElement("a")
linkConfirm.setAttribute("href", "order.html")
const confirm = document.createElement("button")
confirm.textContent = "Confirm order";
linkConfirm.appendChild(confirm);
confirmOrder.appendChild(linkConfirm);
confirmOrderContainer.append(confirmOrder);
cartContener.appendChild(confirmOrderContainer);




fetch('../books.json') //path to the file with json data
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    let books = data
    return books.map((book) => {
      // setting - const definitons for html elements

      const li = document.createElement('li');
      const bookDiv = document.createElement('div');
      const bookCover = document.createElement('div');
      const bookCoverImg = document.createElement('img');

      const bookDescrCover = document.createElement('div');
      const bookTitle = document.createElement('h3');
      const bookAuthor = document.createElement('h4');

      const bookPrice = document.createElement('span');
      const bookDescr = document.createElement('div');
      const bookDescrP = document.createElement('p');
      const addBook = document.createElement('button');
      const readMore = document.createElement('button');
      const closeBookDescr = document.createElement('button');


      li.classList.add('book-container');
      li.appendChild(bookDiv);
      bookDiv.classList.add('book');


      bookDiv.appendChild(bookCover);

      bookCover.appendChild(bookCoverImg);
      bookCover.classList.add('book-cover-wrapper');
      bookCover.setAttribute("draggable", "true");
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
      bookDescr.classList.add('book-descr');
      bookDescr.classList.add('modal');
      bookDescr.appendChild(bookDescrP);
      bookDescrP.classList.add('book-descr-p');
      bookDescrP.innerText = book.description;

      bookDescr.appendChild(closeBookDescr);
      closeBookDescr.classList.add('close');
      closeBookDescr.innerText = 'close';



      bookDescrCover.appendChild(addBook);
      addBook.classList.add('add-book');
      addBook.addEventListener("click", addToBag);


      addBook.setAttribute('book', book.title);
      addBook.innerText = 'Add to cart';
      ul.appendChild(li);
      rootElement.appendChild(ul);
      rootElement.after(cartContener);




      // button action 


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
      //drag event
      bookCover.addEventListener("dragstart", startDrag);
      bookCover.addEventListener("dragend", endDrag);

      function startDrag(e) {
        const bookObject = {
          "author": `${book.author}`,
          "title": `${book.title}`,
          "price": `${book.price}`
        }
        e.dataTransfer.setData("text/plain", JSON.stringify(bookObject));
      }

      function endDrag(e) {
        e.target.classList.add("dragendimage");
      }

      function addToBag() {
        const bagCard = document.createElement("div");
        bagCard.setAttribute("class", "bagcard");
        cartContener.appendChild(bagCard);
        const imgclose = document.createElement("img");
        imgclose.setAttribute("src", "../assets/icons/trash.svg");
        bagCard.appendChild(imgclose);
        imgclose.addEventListener("click", removeFromBag);
        const author = document.createElement("p");
        const title = document.createElement("h5");
        const price = document.createElement("p");
        author.classList.add("author");
        title.classList.add("title");
        price.classList.add("price");
        author.textContent = `${book.author}`;
        title.textContent = `${book.title}`;
        price.textContent = `Price: ${book.price}$`;
        bagCard.appendChild(title);
        bagCard.appendChild(author);
        bagCard.appendChild(price);

        totalPrice = totalPrice + book.price;
        totalSum.textContent = `Total: ${totalPrice}$`;
      }

      function removeFromBag(event) {
        const bagBook = event.target.closest(".bagcard");
        bagBook.parentNode.removeChild(bagBook);
        totalSum = totalSum - book.price;
        total.textContent = `Total: ${totalSum}$`;
      }
    })
  })
  .catch((err) => {
    return err
  })