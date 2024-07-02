const saveButton = document.getElementById("save-button");
let truc = null;
saveButton.addEventListener("click", () => {
    const cityInput = document.getElementById("city-input");
    const city = cityInput.value;
    console.log(city);
    sendPlace(city);
    loadMeteo();
    updateMeteo();
})

function sendPlace(city) {
    window.electronAPI.getMeteo(city)
}

function loadMeteo() {
    window.electronAPI.loadMeteo();
}

function updateMeteo() {
    truc = window.electronAPI.loadedMeteo()
    console.log(truc);
}
