function init()
{
    var map = L.map ("userMap");

    var attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";

    L.tileLayer
        ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: attrib } ).addTo(map);
            
    map.setView([50.907435, -1.404244], 14);
	
	if(navigator.geolocation)
    {
        navigator.geolocation.watchPosition (

            gpspos=> {
                console.log(`Lat ${gpspos.coords.latitude} Lon ${gpspos.coords.longitude}`); // show in console for testing purposes
				map.setView([gpspos.coords.latitude, gpspos.coords.longitude], 14);
            },

            err=> {
				//document.getElementById("responseCode").innerHTML = `An error occurred: ${err.code}`;
				document.getElementById("response").innerHTML = "sorry geolocation is not supported by your browser or you have denied the permission for us to access your location";
            },

            {enableHighAccuracy:true, maximumAge: 7000 }

        );
    }
    else
    {
		document.getElementById("error_responce").innerHTML = "sorry geolocation is not supported by your browser or you have denied the permission for us to access your location";
    }
}