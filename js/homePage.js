
document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("loggedInEmail")) {
        window.location.href = "../HTML/logInPage.html";
    }
});



let allHotels = [];
let wishList = JSON.parse(localStorage.getItem("wishList")) || [];

async function fetchHotels() {
    try {
        const response = await fetch('../json/hotels.json'); 
        const data = await response.json();
        allHotels = data.ads.map((hotel, index) => ({
            ...hotel,
            country: ["USA", "Canada", "UK", "France", "Germany"][index % 5]
        }));
        renderHotels(allHotels);
    } catch (error) {
        console.error("Error fetching hotels:", error);
    }
}

function renderHotels(hotels) {
    const container = document.getElementById('hotels-container');
    container.innerHTML = "";

    hotels.forEach(hotel => {
        const internalCard = document.createElement('div');
        internalCard.classList.add('internalCard');

        const img = document.createElement('img');
        img.src = hotel.thumbnail;
        img.alt = hotel.title;

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const title = document.createElement('h3');
        title.textContent = hotel.title;

        const price = document.createElement('p');
        price.textContent = `Price: ${hotel.price}`;

        const rating = document.createElement('p');
        rating.textContent = `Rating: ${hotel.rating} ⭐ (${hotel.reviews} reviews)`;

        const extensions = document.createElement('p');
        extensions.textContent = `Features: ${hotel.extensions.join(", ")}`;

        const link = document.createElement('a');
        link.href = hotel.tracking_link;
        link.target = "_blank";
        link.textContent = "Book Now";

        const wishListLink = document.createElement('button');
        wishListLink.textContent = "Add to Wish List";
        wishListLink.classList.add("wish-list-btn");
        wishListLink.dataset.hotel = JSON.stringify(hotel);
        wishListLink.addEventListener("click", addToWishList);

        cardContent.appendChild(title);
        cardContent.appendChild(price);
        cardContent.appendChild(rating);
        cardContent.appendChild(extensions);
        cardContent.appendChild(link);
        cardContent.appendChild(wishListLink);

        internalCard.appendChild(img);
        internalCard.appendChild(cardContent);

        container.appendChild(internalCard);
    });
}

function addToWishList(event) {
    const loggedInEmail = localStorage.getItem("loggedInEmail");

    const hotel = JSON.parse(event.target.dataset.hotel);
    let wishLists = JSON.parse(localStorage.getItem("wishList")) || {}; 

    if (!wishLists[loggedInEmail]) {
        wishLists[loggedInEmail] = [];
    }

    if (!wishLists[loggedInEmail].some(h => h.title === hotel.title)) {
        wishLists[loggedInEmail].push(hotel);
        localStorage.setItem("wishList", JSON.stringify(wishLists));
        alert("Added to Wish List!");
    } else {
        alert("This hotel is already in your Wish List!");
    }
}

function logout() {
    localStorage.removeItem("loggedInEmail"); 
    window.location.href = "../HTML/homePage.html";
}

document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logout-btn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
});




document.getElementById('country-select').addEventListener('change', function () {
    const selectedCountry = this.value;
    if (selectedCountry === "all") {
        renderHotels(allHotels);
    } else {
        const filteredHotels = allHotels.filter(hotel => hotel.country === selectedCountry);
        renderHotels(filteredHotels);
    }
});

fetchHotels();
