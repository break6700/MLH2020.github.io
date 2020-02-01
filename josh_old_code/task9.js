function init() {
    document.getElementById("submitbtn").addEventListener("click", ()=> 
        { 
            sendAjax(map, markers);
        } 
    );
	
	document.getElementById("formbookbtn").addEventListener("click", ()=> 
        {
			ID = document.getElementById("formbookbtn").className;
            sendAjax2(ID);
        } 
    );
	
	var map = L.map ("userMap");

    var attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";

    L.tileLayer
        ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: attrib } ).addTo(map);
            
    map.setView([50.907435, -1.404244], 14);
	
	var markers = L.layerGroup();
}

var pubIcon = L.icon({
	iconUrl: 'pubIcon.png', //marker icon image
	shadowUrl: 'markershadow.png', //shadow image
	iconSize:     [38, 95], // icon size
	shadowSize:   [50, 51], // shadow size
	iconAnchor:   [19, 95], // the point on the icon which will be the actual co-ordinance of the marker on the map
	shadowAnchor: [0, 51],  // anchor point for the shadow
	popupAnchor:  [-3, -76] // the point where the popup will appear based upon the iconanchor
});

var hotelIcon = L.icon({
	iconUrl: 'hotelIcon.png', //marker icon image
	shadowUrl: 'markershadow.png', //shadow image
	iconSize:     [38, 95], // icon size
	shadowSize:   [50, 51], // shadow size
	iconAnchor:   [19, 95], // the point on the icon which will be the actual co-ordinance of the marker on the map
	shadowAnchor: [0, 51],  // anchor point for the shadow
	popupAnchor:  [-3, -76] // the point where the popup will appear based upon the iconanchor
});

var campsiteIcon = L.icon({
	iconUrl: 'campsiteIcon.png', //marker icon image
	shadowUrl: 'markershadow.png', //shadow image
	iconSize:     [38, 95], // icon size
	shadowSize:   [50, 51], // shadow size
	iconAnchor:   [19, 95], // the point on the icon which will be the actual co-ordinance of the marker on the map
	shadowAnchor: [0, 51],  // anchor point for the shadow
	popupAnchor:  [-3, -76] // the point where the popup will appear based upon the iconanchor
});

var BnBIcon = L.icon({
	iconUrl: 'BandBIcon.png', //marker icon image
	shadowUrl: 'markershadow.png', //shadow image
	iconSize:     [38, 95], // icon size
	shadowSize:   [50, 51], // shadow size
	iconAnchor:   [19, 95], // the point on the icon which will be the actual co-ordinance of the marker on the map
	shadowAnchor: [0, 51],  // anchor point for the shadow
	popupAnchor:  [-3, -76] // the point where the popup will appear based upon the iconanchor
});

function sendAjax(map, markers) {
        // Read in the input from the form fields
        var userlocation = document.getElementById('location').value;
        
        // Set up our AJAX connection
        var ajaxConnection = new XMLHttpRequest();
		
		if(markers) {
			markers.clearLayers();
		}
    
        // Set up the callback function as an arrow function
        ajaxConnection.addEventListener ("load",e => 
            { 
				if(e.target.status==404)
				{
					document.getElementById("response").innerHTML = "We could not find any accomidation in that location sorry";
				}
				else {
					var output = "<p>Select an accomidation from the table bellow or click the book button on the map accomidation marker popup and then fill in the form bellow the map to book!</p><br /><table style='width:100%'><tr><th>Name</th><th>Type</th><th>Location</th><th>Description</th><th>Book?</th></tr>"; // initialize output to start of table
					var allAcc = JSON.parse(e.target.responseText);
					allAcc.forEach( currentAcc => 
						{
							// add the details of the current song to the "output" variable
							output = output + "<tr><td id='" + currentAcc.ID + "'>" + currentAcc.name + "</td><td>" + currentAcc.type + "</td><td>" + currentAcc.location + "</td><td>" + currentAcc.description + "</td><td><input id='bookbtn" + currentAcc.ID + "' type='button' value='Book this accomdiation!' onclick='bookingfields(" + currentAcc.ID + ")'/></td></tr>";
							
							var pos = [currentAcc.latitude, currentAcc.longitude];
							console.log(pos);
							
							//now add the markers to the layer group based upon which accomidation type they are
							if(currentAcc.type == "pub") {
								var currentMarker = L.marker(pos, {icon: pubIcon}).addTo(markers);
								console.log("accIon has pub in it");
							}
							else if(currentAcc.type == "hotel") {
								var currentMarker = L.marker(pos, {icon: hotelIcon}).addTo(markers);
								console.log("accIon has hotel in it");
							}
							else if(currentAcc.type == "campsite") {
								var currentMarker = L.marker(pos, {icon: campsiteIcon}).addTo(markers);
								console.log("accIon has campsite in it");
							}
							else if(currentAcc.type == "BandB") {
								var currentMarker = L.marker(pos, {icon: BnBIcon}).addTo(markers);
								console.log("accIon has BandB in it");
							}
							else {
								var currentMarker = L.marker(pos).addTo(markers);
								console.log("accIon has nothing in it");
							}
							
							var currentAccname = currentAcc.name;
							var currentAcctype = currentAcc.type;
							var currentAccdescription = currentAcc.description;
							var currentaccID = currentAcc.ID;
							
							console.log(currentAccname);
							console.log(currentAcctype);
							console.log(currentAccdescription);
							console.log(currentaccID);
							
							var markertext = "Name: " + currentAccname + "\n Type: " + currentAcctype + "\n Description: " + currentAccdescription + "\n <input id='bookbtn" + currentaccID + "' type='button' value='Book!' onclick='bookingfields(" + currentAcc.ID + ") '/>";
							
							console.log(markertext);
						
							currentMarker.bindPopup(markertext);
						} );
					output = output + "</table>";
					
					map.addLayer(markers);
					
					document.getElementById("response").innerHTML = output;
				}
            });
    
   
        // Open the connection to the web service.
        ajaxConnection.open("GET" , `https://edward2.solent.ac.uk/~wad1937/town/${userlocation}`);
		
		///out the userlocation to the console for testing purposes
		console.log(userlocation)
    
        // Send the request.
        ajaxConnection.send();
}

function sendAjax2(ID) {
	var userAccID = document.getElementById('accIDfield').className;
	var userUsername = document.getElementById('username').value;
	var userThedate = document.getElementById('thedate').value;
	var userNpeople = document.getElementById('npeople').value;
	
	console.log(userAccID);
	console.log(userUsername);
	console.log(userThedate);
	console.log(userNpeople);
	
	var formdata = "accID=" + userAccID + "&thedate=" + userThedate + "&username=" + userUsername + "&npeople=" + userNpeople;
	
	var bookingresponcewrapper = document.getElementById("bookingresponcewrapper");
	
	// Set up our AJAX connection
	var ajaxConnection2 = new XMLHttpRequest();

	// Set up the callback function as an arrow function
	ajaxConnection2.addEventListener ("load",e => 
		{
			if(e.target.status==400)
			{
				bookingresponcewrapper.innerHTML = "Please make sure to enter all the booking details in the table bellow";
			}
			else {
				bookingresponcewrapper.innerHTML = e.target.responseText;
			}
		});
		
	var url = "https://edward2.solent.ac.uk/~wad1937/book/" + userAccID


	// Open the connection to the web service.
	ajaxConnection2.open("POST" , url, true);
	
	ajaxConnection2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	// Send the request.
	ajaxConnection2.send(formdata);
}



function bookingfields(ID) {
	var IDfield = document.getElementById("accIDfield");
	
	var accNameInTable = document.getElementById(ID).innerHTML;
	
	var accNameLable = document.getElementById("accName").innerHTML = "Currently selected accomidation: " + accNameInTable;
	
	var bookbtn = document.getElementById("formbookbtn").className = ID;
	
	var usernamefield = document.getElementById("username").style.display = "block";
	var datefield = document.getElementById("thedate").style.display = "block";
	var npeoplefield = document.getElementById("npeople").style.display = "block";
	var submitbutton = document.getElementById("formbookbtn").style.display = "block";
	var unamelable = document.getElementById("unamelable").style.display = "block";
	var thedatelable = document.getElementById("thedatelable").style.display = "block";
	var npeoplelable = document.getElementById("npeoplelable").style.display = "block";
	
	console.log(ID);
	
	IDfield.className = ID;
}