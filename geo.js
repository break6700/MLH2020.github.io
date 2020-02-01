
//variables
var teamColour = "";
var corner1 = L.latLng(0, 0),
corner2 = L.latLng(0, 0),
bounds = L.latLngBounds(corner1, corner2);
corner1 = map.local({watch:true});
// create an orange rectangle FIXME: change colour variables
L.rectangle(bounds, {color: teamColour, weight: 1}).addTo(map);
// zoom the map to the rectangle bounds
//map.fitBounds(bounds);




/*
TODO:

    - Get location
        - set to array
    -get second array
        -save to second array
    -create rectangle using array
    -find area of rectangle
*/

x = map.local({watch:true});






// define rectangle geographical bounds
var bounds = [[54.559322, -5.767822], [56.1210604, -3.021240]];
// create an orange rectangle
L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);
// zoom the map to the rectangle bounds
map.fitBounds(bounds);