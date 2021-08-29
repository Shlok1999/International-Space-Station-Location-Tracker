


//Map and Tiles creation
var mymap = L.map('mapid').setView(
    [33.490983542115, -103.4767028923], 2
);
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const tiles = L.tileLayer(tileURL, { attribution })
tiles.addTo(mymap)

//Adding  different icon

const issIcon = L.icon({
    iconUrl: 'iss200.png',
    iconSize: [32, 32],
    iconAnchor: [25, 16]
})
const marker = L.marker([0, 0],
    {
    icon:issIcon,
    options: {
        stroke: true,
        color: 'black',
        weight: 3,
        opacity: 1.0

    }

}).addTo(mymap)

let api_url = 'https://api.wheretheiss.at/v1/satellites/25544'



//Get Location
let firstTime=true
async function getISSLocation() {
    const response = await fetch(api_url)
    const data = await response.json()

    const { latitude, longitude, velocity } = data
  
    marker.setLatLng([latitude, longitude])
    if(firstTime){
        mymap.setView([latitude, longitude], 2)
        firstTime=false
    }

    const lat = document.getElementById('lat').textContent = latitude.toFixed(2);
    const long = document.getElementById('lon').textContent = longitude.toFixed(2);
    const vel = document.getElementById('vel').textContent = velocity.toFixed(2);
}
setInterval(getISSLocation, 1000) 













