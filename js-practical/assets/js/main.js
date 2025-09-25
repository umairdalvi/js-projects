const products = JSON.parse(localStorage.getItem("productList")) || [];

const productForm = document.getElementById("product-form")
const nameField = document.getElementById("product-name");
const categoryField = document.getElementById("product-category");
const priceField = document.getElementById("product-price");
const imageUrlField = document.getElementById("product-image");
const idField = document.getElementById("product-id");
const productGrid = document.getElementById("product-grid");
const searchField = document.getElementById("search-field");
const searchBtn = document.getElementById("search-btn")

const addBtn = document.getElementById("add-product");

let productList = ``;

function addProduct() {

    let name = nameField.value;
    let category = categoryField.value;
    let price = priceField.value;
    let imageUrl = imageUrlField.value;
    let id = idField.value;

    (!name) ? nameField.classList.add("border-danger") : nameField.classList.remove("border-danger");
    (!category) ? categoryField.classList.add("border-danger") : categoryField.classList.remove("border-danger");
    (!price) ? priceField.classList.add("border-danger") : priceField.classList.remove("border-danger");
    (!imageUrl) ? imageUrlField.classList.add("border-danger") : imageUrlField.classList.remove("border-danger");
    (!id) ? idField.classList.add("border-danger") : idField.classList.remove("border-danger");

    if (!name || !category || !price || !imageUrl || !id) return;

    let product = {
        name,
        category,
        price,
        imageUrl,
        id
    }

    products.push(product);
    localStorage.setItem("productList", JSON.stringify(products));
    displayProducts(null);
    productForm.reset();

}

function displayProducts(list = null) {
    productList = ``;
    if (list) {
        productList = list;
    } else {
        products.forEach((product, idx) => {
            productList += `
                <div class="card">
                    <img src="${product.imageUrl}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text text-danger mb-0">$${product.price}</p>
                        <p class="card-text">${product.category}</p>
                        <button class="btn btn-primary">Edit</button>
                        <button class="btn btn-danger" onclick="deleteProduct(${idx})">Delete</button>
                    </div>
                </div>
            `
        })
    }

    productGrid.innerHTML = productList;
}

function sortProducts(seq) {
    if (seq === "asc") {
        products.sort((a, b) => a.price - b.price)
    } else if (seq === "des") {
        products.sort((a, b) => b.price - a.price)
    }
    displayProducts(null);
}

function searchProducts() {
    let query = searchField.value.toLowerCase();
    productList = ``;
    let filteredProducts = products.filter(product => {
        return product.name.includes(query);
    });
    filteredProducts.forEach((product, idx) => {
        productList += `
                <div class="card">
                    <img src="${product.imageUrl}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text text-danger mb-0">$${product.price}</p>
                        <p class="card-text">${product.category}</p>
                        <button class="btn btn-primary">Edit</button>
                        <button class="btn btn-danger" onclick="deleteProduct(${idx})">Delete</button>
                    </div>
                </div>
            `
    })
    displayProducts(productList);
}

function deleteProduct(idx) {
    products.splice(idx, 1);
    localStorage.setItem("productList", JSON.stringify(products));
    displayProducts();
}

document.addEventListener("DOMContentLoaded", function () {
    displayProducts();

    productForm.addEventListener("submit", (e) => e.preventDefault());
    addBtn.addEventListener("click", addProduct);

    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        searchProducts();
    })
})