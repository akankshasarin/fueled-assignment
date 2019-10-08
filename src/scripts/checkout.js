import "../scss/checkout.scss";

const apiUrl = "/api/cart.json";
let myCart = [];
const cartBody = document.getElementById("cartBody");

function currency(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  }).format(number);
}

const priceTemlpate = function(subTotal, tax) {
  return `
    <div class="price__item">
      <div class="price__label">Sub Total</div>
      <div class="price__amount">${currency(subTotal)}</div>
    </div>
    <div class="price__item">
      <div class="price__label">Tax</div>
      <div class="price__amount">${currency(tax)}</div>
    </div>
    <div class="price__item price__item--total">
      <div class="price__label">Total</div>
      <div class="price__amount">${currency(subTotal + tax)}</div>
    </div>
`;
};

const updateCart = function(el, id) {
  const quantity = el.value;
  myCart.forEach(product => {
    if (product.hasOwnProperty("id") && product.id == id) {
      product.quantity = quantity;
    }
  });
  cartBody.innerHTML = "";
  createCart(myCart);
};

const deleteProduct = function(id) {
  myCart.forEach((product, index) => {
    if (product.hasOwnProperty("id") && product.id == id) {
      myCart.splice(index, 1);
    }
  });
  console.log(myCart);
  cartBody.innerHTML = "";
  createCart(myCart);
};

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("cart__update")) {
    const id = e.target.dataset.id;
    const qtyInput = document.getElementById(`quantity_${id}`);
    updateCart(qtyInput, id);
  } else if (e.target.classList.contains("cart__delete")) {
    const id = e.target.dataset.id;
    deleteProduct(id);
  } else {
    return false;
  }
});

const template = function(product) {
  // Destructuring keys from the object
  const { image, imageAlt, name, id, price, quantity } = product;

  return `
      <div class="cart__media">
        <img
          class="cart__image"
          src="${image}"
          alt="${imageAlt}"
        />
      </div>
      <div class="cart__product">
        <div class="cart__name">${name}</div>
        <div class="cart__desc">${id}</div>
      </div>
      <div class="cart__price">${currency(price * quantity)}</div>
      
      <div class="cart__quantity">
        <input
          type="text"
          name="quantity"
          id="quantity_${id}"
          class="cart__input"
          value="${quantity}"
          pattern="[0-9]{1,2}"
          required
        />
        <span class="cart__update" data-id=${id}>Update</span>
      </div>
      <div class="cart__remove text-center">
        <button type="button" class="btn cart__delete" data-id="${id}">&times;</button>
      </div>
    `;
};

function createCart(products) {
  let subTotal = 0,
    tax = 0;

  products.forEach(product => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart__item";
    cartItem.innerHTML = `${template(product)}`;
    cartBody.appendChild(cartItem);
    subTotal = subTotal + product.price * product.quantity;
  });

  updatePrice(subTotal, tax);
  const cartCount = document.querySelector(".header__cart__count");
  cartCount.textContent = products.length;
}

function updatePrice(subTotal, tax) {
  const priceTable = document.querySelector(".price");
  priceTable.innerHTML = priceTemlpate(subTotal, tax);
}

window.onload = function() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      myCart = data;
      createCart(myCart);
    });
};
