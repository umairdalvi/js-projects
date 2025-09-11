let cart = JSON.parse(localStorage.getItem("cart")) || [];

const subTotal = document.getElementById("cart-subtotal");
const shipping = document.getElementById("cart-shipping");
const total = document.getElementById("cart-total");
const table = document.getElementById("cart-items");
const emptyState = document.getElementById("empty-state");
const tableWrapper = document.getElementById("cart-table-wrapper");
const cartTotals = document.getElementById("cart-totals");

function renderCart() {
    document.getElementById("item-count").innerText = cart.length;
    let subTotalValue = 0;
    let shippingCost = 20;
    let totalCost = 0;

    let cartDetails = "";
    table.innerHTML = "";

    if (cart.length) {
        emptyState.classList.add("hidden");
        tableWrapper.classList.remove("hidden");
        cartTotals.classList.remove("hidden");
        
        cart.forEach((product, productIdx) => {
            let productTotal = product.productPrice * product.productQuantity;
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
                                <button class="dec qty-btn" onclick="updateQty(${productIdx}, -1)">-</button>
                                <input type="number" name="qty" id="qty-${productIdx + 1}" value="${product.productQuantity}" min="1">
                                <button class="inc qty-btn" onclick="updateQty(${productIdx}, 1)">+</button>
                            </div>
                        </td>
                        <td class="table-data product-total-price">$${product.productQuantity * product.productPrice}</td>
                    </tr>
                `;
        });

        subTotal.innerText = `$${subTotalValue}`;
        shipping.innerText = `$${shippingCost}`;
        totalCost = subTotalValue + shippingCost;
        total.innerText = `$${totalCost}`;

        table.innerHTML = cartDetails;

    } else {
        emptyState.classList.remove("hidden");
        tableWrapper.classList.add("hidden");
        cartTotals.classList.add("hidden");
    }

}

function saveCart() { localStorage.setItem("cart", JSON.stringify(cart)); }

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

function updateQty(productIdx, value) {
    let item = cart[productIdx];
    item.productQuantity += value;
    if (item.productQuantity <= 0) {
        removeItem(productIdx);
        return;
    }
    document.getElementById(`qty-${productIdx + 1}`).value = item.productQuantity;
    saveCart();
}

function clearCart() {
    cart = [];
    saveCart();
    renderCart();
}

function removeItem(productIdx) {
    cart.splice(productIdx, 1);
    saveCart();
    renderCart();
}

document.addEventListener("DOMContentLoaded", function () {
    renderCart();

    const clearBtn = document.getElementById("clear-cart");
    const updateBtn = document.getElementById("update-cart");

    clearBtn.addEventListener("click", clearCart);
    updateBtn.addEventListener("click", updateCart);
});