function showSection(sectionId) {
    document.querySelectorAll('.container > div').forEach(div => div.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 13);

// Add base layers
var streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' });
var satellite = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' });

var baseLayers = {
    "Streets": streets,
    "Satellite": satellite
};

streets.addTo(map);

// Load tree data from JSON
fetch('/data/tree_data.json')
    .then(response => response.json())
    .then(treeData => {
        treeData.forEach(tree => {
            L.marker([tree.lat, tree.lng])
                .bindPopup(`<b>${tree.name}</b><br><img src="${tree.image}" alt="${tree.name}" width="100">`)
                .addTo(map);
        });
    });

L.control.layers(baseLayers).addTo(map);
