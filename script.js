
// Product data used by the favorite feature
const products = [
    {
        name: "Breads",
        description: "Freshly baked breads made with quality ingredients."
    },
    {
        name: "Pastries",
        description: "Fresh pastries prepared for our customers."
    },
    {
        name: "Cookies",
        description: "Crispy and fresh cookies from North Star Bakery."
    }
];

// Stores the products selected by the user
let favorites = [];

// Load saved favorites from localStorage
function loadFavorites() {
    const savedFavorites = localStorage.getItem("favorites");

    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
    }

    displayFavorites();
}

// Save favorites to localStorage
function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Add a product to the favorites list
function addFavorite(productName) {
    if (!favorites.includes(productName)) {
        favorites.push(productName);
        saveFavorites();
        displayFavorites();
    }
}

// Display the current favorites on the page
function displayFavorites() {
    const favoriteList = document.getElementById("favorite-list");
    const favoriteMessage = document.getElementById("favorite-message");

    if (!favoriteList || !favoriteMessage) {
        return;
    }

    favoriteList.innerHTML = "";

    if (favorites.length === 0) {
        favoriteMessage.textContent = "You have not added any favorites yet.";
        return;
    }

    favoriteMessage.textContent = "Your favorite products:";

    favorites.forEach(function (favorite) {
        const listItem = document.createElement("li");
        listItem.textContent = favorite;
        favoriteList.appendChild(listItem);
    });
}

// Set up the favorite buttons
function setupFavoriteButtons() {
    const buttons = document.querySelectorAll(".favorite-button");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            const productName = button.dataset.product;

            addFavorite(productName);

            button.textContent = "Added to Favorites";
        });
    });
}

// Run the favorite feature when the page loads
document.addEventListener("DOMContentLoaded", function () {
    loadFavorites();
    setupFavoriteButtons();
    validateContactForm();
});

// Validate the contact form
function validateContactForm() {
    const form = document.querySelector("form");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const itemDetails = document.getElementById("item-details");

    if (!form || !name || !email || !itemDetails) {
        return;
    }

    form.addEventListener("submit", function (event) {
        let isValid = true;

        clearValidationMessages();

        if (name.value.trim() === "") {
            showError(name, "Please enter your name.");
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {
            showError(email, "Please enter a valid email address.");
            isValid = false;
        }

        if (itemDetails.value.trim().length < 10) {
            showError(
                itemDetails,
                "Item details must be at least 10 characters long."
            );
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        }
    });
}
// Display an error message near a form field
function showError(field, message) {
    const error = document.createElement("p");

    error.className = "validation-error";
    error.textContent = message;

    field.insertAdjacentElement("afterend", error);
}

// Remove previous validation messages
function clearValidationMessages() {
    const errors = document.querySelectorAll(".validation-error");

    errors.forEach(function (error) {
        error.remove();
    });
}

// Set up form validation when the page loads
document.addEventListener("DOMContentLoaded", function () {
    loadFavorites();
    setupFavoriteButtons();
    validateContactForm();
});



