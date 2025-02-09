let allHotels = [];

async function fetchHotels() {
    try {
        const response = await fetch('../json/hotels.json'); 
        const data = await response.json();
        allHotels = data.ads.slice(0,3);
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





        cardContent.appendChild(title);
        cardContent.appendChild(price);
        cardContent.appendChild(rating);
        cardContent.appendChild(extensions);


        internalCard.appendChild(img);
        internalCard.appendChild(cardContent);

        container.appendChild(internalCard);
    });
}

fetchHotels();