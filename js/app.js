// Fetching data for product carts
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  // get products as an array
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    // product is an object
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product">
      <div>
        <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <h3>${product.rating.rate} Stars!!!</h3>
      <h3>Rating Count: ${product.rating.count}</h3>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" onclick="displayDetails('${product.id}')" class="btn btn-danger">Details</button>
    </div>
    `;
    document.getElementById("all-products").appendChild(div);
  }
};

// adding product to cart
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  // the updateTaxAndCharge function will update Tax & Charge amount
  updateTaxAndCharge();

  // the updateTotal function will update total amount
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal;
};


// this function will fetch data for a specific product and will display that 
// product details above product carts
const displayDetails = id => {
  const productDetailsContainer = document.getElementById('productDetails');
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url).then(res => res.json()).then(data => {
    productDetailsContainer.innerHTML = `
    <div class="single-product">
      <h3>${data.title}</h3>
      <div>
        <img class="product-image" src=${data.image}></img>
      </div>
      <p>Category: ${data.category}</p>
      <p>${data.description}</p>
      <h2>Price: $ ${data.price}</h2>
      <h3>${data.rating.rate} Stars!!!</h3>
      <h3>Rating Count: ${data.rating.count}</h3>
      <button onclick="hideDetail()" class="btn btn-danger">Hide Details</button>
    </div>
  `;
  });
};

// this function will close the product detail box
const hideDetail = () => { document.getElementById('productDetails').textContent = ''; };