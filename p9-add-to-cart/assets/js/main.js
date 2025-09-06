const menuToggle = document.querySelector(".menu-toggle");
const offcanvas = document.getElementById("offcanvas");
const closeBtn = document.querySelector(".close-btn");

if (menuToggle && offcanvas && closeBtn) {
    menuToggle.addEventListener("click", () => {
        offcanvas.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
        offcanvas.classList.remove("active");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const itemCountDisplay = document.getElementById("item-count");
    if (itemCountDisplay) {
        itemCountDisplay.innerText =
            localStorage.getItem("itemCount") || 0;
    }
});

if (document.querySelector(".mySwiper")) {
    var swiper = new Swiper(".mySwiper", {
        navigation: {
            nextEl: ".swiper-button-prev",
            prevEl: ".swiper-button-next",
        },
    });
}