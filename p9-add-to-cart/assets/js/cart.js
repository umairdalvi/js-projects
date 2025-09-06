let cart = JSON.parse(localStorage.getItem("cart")) || [];

const subTotal = document.getElementById("cart-subtotal");
const shipping = document.getElementById("cart-shipping");
const total = document.getElementById("cart-total");
const table = document.getElementById("cart-items");

function incQty(productIdx) {
    cart[productIdx].productQuantity++;
    document.getElementById(`qty-${productIdx + 1}`).value =
        cart[productIdx].productQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function decQty(productIdx) {
    if (cart[productIdx].productQuantity === 1) return;
    cart[productIdx].productQuantity--;
    document.getElementById(`qty-${productIdx + 1}`).value =
        cart[productIdx].productQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {
    cart.forEach((product, productIdx) => {
        const input = document.getElementById(`qty-${productIdx + 1}`);
        let newQty =
            parseInt(input.value) <= 0 ? 1 : parseInt(input.value);
        product.productQuantity = newQty;
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    localStorage.removeItem("itemCount");
    cart = [];
    renderCart();
}

function removeItem(productIdx) {
    cart.splice(productIdx, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("itemCount", JSON.stringify(cart.length));
    renderCart();
}

function renderCart() {
    document.getElementById("item-count").innerText = cart.length;
    let subTotalValue = 0;
    let shippingCost = 0;
    let totalCost = 0;

    let cartDetails = "";
    table.innerHTML = "";

    if (cart.length) {
        cart.forEach((product, productIdx) => {
            let productTotal =
                product.productPrice * product.productQuantity;
            subTotalValue += productTotal;

            cartDetails += `
                    <tr class="table-body-row">
                        <td class="table-data remove-btn" onclick="removeItem(${productIdx})"><i class="ri-delete-bin-5-line"></i></td>
                        <td class="table-data product-thumbnail-wrapper">
                            <img class="product-thumbnail" src="${product.productImg}" alt="productImage">
                        </td>
                        <td class="table-data product-name">${product.productName}</td>
                        <td class="table-data product-price">$${product.productPrice}</td>
                        <td class="table-data product-quantity">
                            <div class="quantity">
                                <button class="dec qty-btn" onclick="decQty(${productIdx})">-</button>
                                <input type="number" name="qty" id="qty-${productIdx + 1}" value="${product.productQuantity}" min="1">
                                <button class="inc qty-btn" onclick="incQty(${productIdx})">+</button>
                            </div>
                        </td>
                        <td class="table-data product-total-price">$${product.productQuantity * product.productPrice}</td>
                    </tr>
                `;
        });

        shippingCost = 20;
    } else {
        subTotalValue = 0;
        shippingCost = 0;
        totalCost = 0;

        cartDetails = `
            <div class="empty-cart">
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added anything to your cart yet.</p>
            </div>
        `;
    }

    subTotal.innerText = `$${subTotalValue}`;
    shipping.innerText = `$${shippingCost}`;
    totalCost = subTotalValue + shippingCost;
    total.innerText = `$${totalCost}`;
    table.innerHTML = cartDetails;
}

document.addEventListener("DOMContentLoaded", function () {
    renderCart();

    const clearBtn = document.getElementById("clear-cart");
    const updateBtn = document.getElementById("update-cart");

    clearBtn.addEventListener("click", clearCart);
    updateBtn.addEventListener("click", updateCart);
});
