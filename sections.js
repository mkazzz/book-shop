// Header

export const createHeader = () => {
  let fragment = new DocumentFragment();
  const container = document.createElement("div");
  container.setAttribute("class", "container");

  const headerEl = document.createDocumentFragment();
  const header = document.createElement("header");
  header.setAttribute("class", "header");
  header.setAttribute("id", "header");

  const heading = document.createElement("h1");
  heading.setAttribute("class", "heading-h1");
  heading.textContent = "Book store";


  container.appendChild(heading);

  const nav = document.createElement("nav");
  const navList = document.createElement("ul");
  navList.setAttribute("class", "navigation");
  const links = [{
      text: "Contact us",
      href: "#contact"
    },
    {
      text: "About our store",
      href: "#about"
    },
    {
      text: "My basket ",
      href: "/"
    },
  ];

  links.map((link) => {
    const li = document.createElement("li");
    li.setAttribute("class", "nav-link");
    const a = document.createElement("a");
    a.textContent = link.text;
    a.setAttribute("href", link.href);
    li.appendChild(a);
    if (link.text == "My basket") {
      const span = document.createElement("span");
      span.setAttribute("id", "cart");
      span.textContent = " (0)";
      li.appendChild(span);
    }
    navList.appendChild(li);
  });

  nav.appendChild(navList);
  container.appendChild(nav);
  header.appendChild(container);
  headerEl.appendChild(header);
  fragment.appendChild(headerEl);
  return fragment;
}




// create main body

export const createMain = () => {
  let fragment = new DocumentFragment();
  const mainEl = document.createDocumentFragment();
  const main = document.createElement("main");
  main.setAttribute("class", "main");
  main.setAttribute("id", "main");

  main.appendChild(createBookShelf());
  mainEl.appendChild(main);
  fragment.appendChild(mainEl);
  return fragment;
}


// creating book shelf

function createBookShelf() {
  const books = document.createElement("wrapper");
  books.setAttribute("class", "wrapper book-shelf");
  books.setAttribute("id", "catalog");
  const container = document.createElement("div");
  container.setAttribute("class", "container");

  const title = document.createElement("h2");
  title.textContent = "Book shelf";

  const catalog = document.createElement("div");
  catalog.setAttribute("class", "book-catalog");

  fetch("./books.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.map((bookInfo, index) =>
        catalog.appendChild(createBook(bookInfo, index))
      );
    });

  [title, catalog].map((el) => container.appendChild(el));
  books.appendChild(container);

  return books;
}

// Create separate book for the catalog

function createBook(bookInfo, index) {
  const book = document.createElement("div");
  book.setAttribute("class", "book-card");
  book.setAttribute("id", `${index}`);

  const imgWrapper = document.createElement("div");

  if (index % 9 == 0 || index % 9 == 5 || index % 9 == 7) {
    imgWrapper.setAttribute("class", "book-image blue");
  } else if (index % 9 == 1 || index % 9 == 3 || index % 9 == 8) {
    imgWrapper.setAttribute("class", "book-image red");
  } else {
    imgWrapper.setAttribute("class", "book-image yellow");
  }

  const img = document.createElement("img");
  img.setAttribute("src", "assets/images/covers/" +
    `${bookInfo.imageLink}`);


  imgWrapper.appendChild(img);

  const textWrapper = document.createElement("div");
  textWrapper.setAttribute("class", "book-text");
  const author = document.createElement("p");
  author.setAttribute("class", "author");
  author.textContent = `${bookInfo.author}`;
  const title = document.createElement("p");
  title.setAttribute("class", "title");
  title.textContent = `${bookInfo.title}`;

  const rateWrapper = document.createElement("div");
  rateWrapper.setAttribute("class", "rating");
  const starsWrapper = document.createElement("div");
  starsWrapper.setAttribute("class", "stars");



  const reviews = document.createElement("p");
  const n = bookInfo.reviews;
  const numberFormatter = Intl.NumberFormat("en-US");
  const formatted = numberFormatter.format(n);
  reviews.textContent = `${bookInfo.rate} (${formatted})`;

  [starsWrapper, reviews].map((el) => rateWrapper.appendChild(el));

  const priceWrapper = document.createElement("div");
  priceWrapper.setAttribute("class", "price");
  const p = document.createElement("p");
  p.textContent = "Price: ";
  const price = document.createElement("span");
  price.textContent = `$${bookInfo.price}`;

  [p, price].map((el) => priceWrapper.appendChild(el));

  const moreDetailsBtn = document.createElement("button");
  moreDetailsBtn.textContent = "Book info";
  moreDetailsBtn.setAttribute("class", "btn btn-white");
  const addToCartBtn = document.createElement("button");
  addToCartBtn.textContent = "Add to cart";
  addToCartBtn.setAttribute("class", "btn btn-yellow");

  [author, title, rateWrapper, priceWrapper, moreDetailsBtn, addToCartBtn].map(
    (el) => textWrapper.appendChild(el)
  );

  book.appendChild(imgWrapper);
  book.appendChild(textWrapper);

  return book;
}