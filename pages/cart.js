export function createCart() {
  const df = new DocumentFragment();
  const cartContener = document.createElement('aside');
  const cartItems = document.createElement('ul');


  cartContener.setAttribute('id', 'cart-items')


  const
    cartDescription = document.createElement('p'),
    confirmOrderContainer = document.createElement('div'),
    totalSum = document.createElement('p'),
    confirmOrder = document.createElement('a');


  cartContener.appendChild(cartDescription);
  cartDescription.classList.add('cart-descr');
  cartDescription.innerText = 'Magic place to collect your books';
  df.append(cartContener)
  return df;

};

// button action 
export function addBtnMoreAction() {

  const moreInfoBtns = document.getElementsByClassName('read-more-btn');
  const closeModalBtns = document.getElementsByClassName('close-book-descr');

  for (let i = 0; i < moreInfoBtns.length; i++) {
    moreInfoBtns[i].onclick = function () {
      showModal(i);
    };
    closeModalBtns[i].onclick = function () {
      showModal(i)
    };
  }
}

function showModal(num) {
  const descModals = document.getElementsByClassName('book-descr');
  console.log('Show modal' + num);
  descModals[num].classList.toggle("book-descr-hidden");
}