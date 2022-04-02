// Display menu on button click
function toggleMenu() {
    document.getElementById("main-nav").classList.toggle("open");
}

// Adding a button event listener to nav button
const navBtn = document.getElementById("nav-btn");
navBtn.onclick = toggleMenu;