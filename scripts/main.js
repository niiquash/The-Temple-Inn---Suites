// Display menu on button click
function toggleMenu() {
    document.getElementById("main-nav").classList.toggle("open");
}

// Adding a button event listener to nav button
const navBtn = document.getElementById("nav-btn");
navBtn.onclick = toggleMenu;

// Display Today's date to the user
const options = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
document.getElementById("today-date").innerHTML = new Date().toLocaleDateString('en-US', options);