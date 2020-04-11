// Global variables to be used in map
let latlon

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(logPosition, showError);
    }
    else {
        alert("Please allow this website to use your geolocation or use a browser that supports it.");
    }
}

function logPosition(position) {
    latlon = position.coords.latitude + "," + position.coords.longitude;
}

// parseFloat(latitude) parseFloat(longitude)

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.")
            break;
    }
}


// adds a map
function createMap() {
    getLocation();
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 4, center: latlon});
}

