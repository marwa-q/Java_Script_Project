document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("loggedInEmail")) {
        window.location.href = "../HTML/logInPage.html"; 
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const wishListContainer = document.getElementById('hotels-container');

    function renderWishList() {
        const loggedInEmail = localStorage.getItem("loggedInEmail");
        let wishLists = JSON.parse(localStorage.getItem("wishList")) || {}; 
        let wishList = wishLists[loggedInEmail] || [];

        
        wishListContainer.innerHTML = "";

        if (wishList.length === 0) {
            wishListContainer.innerHTML = `<div class="empty-wishlist">No hotels in your Wish List.</div>
            `;
            return;
        }

        wishList.forEach(hotel => {
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

            const removeBtn = document.createElement('button');
            removeBtn.textContent = "Remove";
            removeBtn.classList.add("remove-btn");
            removeBtn.dataset.title = hotel.title;
            removeBtn.addEventListener("click", removeFromWishList);

            cardContent.appendChild(title);
            cardContent.appendChild(price);
            cardContent.appendChild(rating);
            cardContent.appendChild(extensions);
            cardContent.appendChild(link);
            cardContent.appendChild(removeBtn);

            internalCard.appendChild(img);
            internalCard.appendChild(cardContent);

            wishListContainer.appendChild(internalCard);
        });
    }

    function removeFromWishList(event) {
        const loggedInEmail = localStorage.getItem("loggedInEmail");
        let wishLists = JSON.parse(localStorage.getItem("wishList")) || {}; 
        let wishList = wishLists[loggedInEmail] || [];

        const title = event.target.dataset.title;
        wishList = wishList.filter(hotel => hotel.title !== title);
        wishLists[loggedInEmail] = wishList;
        localStorage.setItem("wishList", JSON.stringify(wishLists));

        renderWishList();
    }

    renderWishList();
});

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
