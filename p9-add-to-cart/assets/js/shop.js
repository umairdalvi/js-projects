const products = [
    {
        productId: 1,
        productName: "CozyCloud Sofa",
        productDsc: "A plush, oversized sofa designed for ultimate comfort.",
        productPrice: 300,
        productImg: "../assets/images/best-product-01.webp",
    },
    {
        productId: 2,
        productName: "ModernNest Coffee Table",
        productDsc: "A sleek, minimalist coffee table made from tempered glass and metal.",
        productPrice: 80,
        productImg: "../assets/images/prod-05-270x300.webp",
    },
    {
        productId: 3,
        productName: "RusticCharm Armchair",
        productDsc: "A beautifully crafted armchair with a distressed wood frame and soft upholstery.",
        productPrice: 150,
        productImg: "../assets/images/prod-08-700x778.webp",
    },
    {
        productId: 4,
        productName: "Whimsical Nightstand",
        productDsc: "A charming nightstand with a unique design.",
        productPrice: 70,
        productImg: "../assets/images/prod-06-270x300.webp",
    },
    {
        productId: 5,
        productName: "ComfortSeat Office Chair",
        productDsc: "An ergonomic office chair with adjustable height and lumbar support.",
        productPrice: 100,
        productImg: "../assets/images/prod-09-700x778.webp",
    },
    {
        productId: 6,
        productName: "CozyReading Chair",
        productDsc: "A comfortable reading chair with a wide seat and soft fabric.",
        productPrice: 90,
        productImg: "../assets/images/prod-10.webp",
    },
    {
        productId: 7,
        productName: "OutdoorBreeze Patio Chair",
        productDsc: "A weather-resistant patio chair made from durable materials.",
        productPrice: 100,
        productImg: "../assets/images/prod-03.webp",
    },
    {
        productId: 8,
        productName: "Foldable SpaceSaver Chair",
        productDsc: "A practical foldable chair that combines style and functionality.",
        productPrice: 80,
        productImg: "../assets/images/prod-02.webp",
    },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const itemCountDisplay = document.getElementById("item-count");
const productGrid = document.getElementById("product-grid");

function renderProducts() {
    if (!productGrid) return;
    let productList = "";
    products.forEach((product, idx) => {
        productList += `
      <div class="product-card">
        <div class="product-actions">
          <button title="Wishlist" class="action-btn"><i class="ri-heart-line"></i></button>
          <button title="View" class="action-btn"><i class="ri-eye-line"></i></button>
        </div>
        <div class="product-image-wrapper">
          <img class="product-image" src="${product.productImg}" alt="productImage">
        </div>
        <div class="product-details">
          <p class="product-name">${product.productName}</p>
          <p class="product-dsc">${product.productDsc}</p>
          <p class="product-price">$${product.productPrice}</p>
          <button title="Add to cart" class="add-to-cart" onclick="addToCart(${idx})">+Add to Cart</button>
        </div>
      </div>
    `;
    });

    productGrid.innerHTML = productList;
}

function addToCart(productIdx) {
    const product = products[productIdx];
    let existingItem = cart.find(
        (item) => item.productId === product.productId
    );

    if (existingItem) {
        existingItem.productQuantity =
            (existingItem.productQuantity || 0) + 1;
    } else {
        let item = { ...product };
        item.productQuantity = 1;
        cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    if (itemCountDisplay) {
        itemCountDisplay.innerText = cart.length;
    }

    Swal.fire({
        position: "top-end",
        title: "Product successfully added to cart.",
        showConfirmButton: false,
        timer: 1300,
        backdrop: false,
    });
}

function sortProducts(seq) {
    if (seq === "asc") {
        products.sort((a, b) => a.productPrice - b.productPrice);
    } else if (seq === "des") {
        products.sort((a, b) => b.productPrice - a.productPrice);
    }
    renderProducts();
}

document.addEventListener("DOMContentLoaded", function () {
    if (itemCountDisplay) itemCountDisplay.innerText = cart.length;
    renderProducts();
});
