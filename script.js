

/* =================================

   EW CARTS - STORE FUNCTIONALITY

================================= */

// PRODUCT CATALOGUE

const products = [

    {

        id: 1,

        name: "Wireless Headphones",

        price: 18000,

        description: "Enjoy clear sound and wireless freedom.",

        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"

    },

    {

        id: 2,

        name: "Smart Watch",

        price: 25000,

        description: "A stylish companion for everyday life.",

        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"

    },

    {

        id: 3,

        name: "Premium Backpack",

        price: 22000,

        description: "Carry your essentials in style.",

        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"

    },

    {

        id: 4,

        name: "Luxury Sunglasses",

        price: 12000,

        description: "Complete your look with elegance.",

        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"

    }

];

// SHOPPING CART

let cart = [];

// FORMAT NIGERIAN CURRENCY

function formatPrice(price) {

    return "₦" + price.toLocaleString("en-NG");

}

// DISPLAY PRODUCTS

function displayProducts() {

    const productList = document.getElementById("product-list");

    if (!productList) return;

    productList.innerHTML = products.map(product => `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <h3>${formatPrice(product.price)}</h3>

            <button onclick="addToCart(${product.id})">

                Add to Cart

            </button>

        </div>

    `).join("");

}

// ADD PRODUCTS TO CART

function addToCart(productId) {

    const product = products.find(item => item.id === productId);

    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }

    updateCart();

    alert(product.name + " added to your cart!");

}

// REMOVE PRODUCTS FROM CART

function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    updateCart();

}

// CHANGE PRODUCT QUANTITY

function changeQuantity(productId, amount) {

    const item = cart.find(product => product.id === productId);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        removeFromCart(productId);

    } else {

        updateCart();

    }

}

// CREATE SHOPPING CART SECTION

function createCartSection() {

    const shop = document.querySelector(".shop");

    if (!shop) return;

    const cartSection = document.createElement("section");

    cartSection.id = "shopping-cart";

    cartSection.className = "shopping-cart";

    cartSection.innerHTML = `

        <h2>Your Shopping Cart</h2>

        <div id="cart-items"></div>

        <h3 id="cart-total">Total: ₦0</h3>

        <button id="checkout-button" onclick="checkout()">

            Proceed to Checkout

        </button>

    `;

    shop.appendChild(cartSection);

}

// UPDATE SHOPPING CART

function updateCart() {

    const cartItems = document.getElementById("cart-items");

    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is currently empty.</p>";

    } else {

        cartItems.innerHTML = cart.map(item => `

            <div class="cart-item">

                <h3>${item.name}</h3>

                <p>Price: ${formatPrice(item.price)}</p>

                <p>Quantity: ${item.quantity}</p>

                <button onclick="changeQuantity(${item.id}, -1)">

                    -

                </button>

                <button onclick="changeQuantity(${item.id}, 1)">

                    +

                </button>

                <button onclick="removeFromCart(${item.id})">

                    Remove

                </button>

            </div>

        `).join("");

    }

    const total = cart.reduce(

        (sum, item) => sum + item.price * item.quantity,

        0

    );

    cartTotal.textContent = "Total: " + formatPrice(total);

}

// CHECKOUT

function checkout() {

    if (cart.length === 0) {

        alert("Your shopping cart is empty!");

        return;

    }

    alert("Your cart is ready! Online payment and checkout will be connected in a future update.");

}

// START THE STORE

document.addEventListener("DOMContentLoaded", function() {

    createCartSection();

    displayProducts();

    updateCart();

});