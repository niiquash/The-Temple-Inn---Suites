const requestURL = "scripts/temples.json";

fetch(requestURL)
    .then((response) => response.json())
    .then((jsonObject) => {
        console.table(jsonObject);
        const temples = jsonObject["temples"];
        temples.forEach(displayTemples);
    });

function displayTemples(temple) {
    // Create a section/card
    let card = document.createElement("section");
    let templeName = document.createElement("p");
    let templeAddress = document.createElement("p");
    let templePhone = document.createElement("p");
    let templeWebsite = document.createElement("a");
    let templeLogo = document.createElement("img");

    // Update the textContent of each new element
    templeName.textContent = `${temple.name}`;
    templeName.setAttribute("id", "temple-name");
    templeAddress.textContent = `${temple.address}`;
    templePhone.textContent = `${temple.phone}`;
    templeWebsite.textContent = `${temple.website}`;
    templeWebsite.setAttribute('href', temple.website);
    templeLogo.setAttribute("src", temple.imageurl);
    templeLogo.setAttribute("alt", `${temple.name} logo`);

    // Appened list items in p-tags into the section/card
    card.appendChild(templeLogo)
    card.appendChild(templeName);
    card.appendChild(templeAddress);
    card.appendChild(templePhone);
    card.appendChild(templeWebsite);

    // Append card to the existing div.
    document.querySelector("div.cards").appendChild(card);
}

const gridView = document.querySelector("#directory-card-view-btn");
const listView = document.querySelector("#directory-list-view-btn");
const currentDivView = document.querySelector(".cards");

gridView.addEventListener('click', togridView);

window.addEventListener("resize", mediumScreenListView);

function mediumScreenListView() {
    // Media screen for start display (Medium View)
    if (1000 > window.innerWidth && 600 < window.innerWidth) {
        tolistView();
    }
    else {
        togridView();
    }
}

function togridView() {
    currentDivView.classList.remove("list");
    currentDivView.classList.add("cards");
}

listView.addEventListener('click', tolistView);

function tolistView() {
    currentDivView.classList.remove("cards");
    currentDivView.classList.add("list");
}