function init()
{
    var map = L.map ("userMap");

    var attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";

    L.tileLayer
        ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: attrib } ).addTo(map);

    map.setView([50.907435, -1.404244], 14);
	
	var polygon1 = L.polygon([
		    [50.9117, -1.4036],
		    [50.9117, -1.4098],
		    [50.9458, -1.4098],
		    [50.9458, -1.4036],
		]).addTo(map);
	
	var polygon2 = L.polygon([
		    [50.9217, -1.4016],
		    [50.9217, -1.4068],
		    [50.9458, -1.4068],
		    [50.9458, -1.4016],
		]).addTo(map);
	
	var polygon3 = L.polygon([
		    [50.927384, -1.422523],
		    [50.925112, -1.420292],
		    [50.929872, -1.402611],
		    [50.926627, -1.400723],
		]).addTo(map);
	

	if(navigator.geolocation)
    {
        navigator.geolocation.watchPosition (

            gpspos=> {
                console.log(`Lat ${gpspos.coords.latitude} Lon ${gpspos.coords.longitude}`); // show in console for testing purposes
				map.setView([gpspos.coords.latitude, gpspos.coords.longitude], 14);
		document.getElementById("latitude").innerHTML= "Your latitude is: " + gpspos.coords.latitude.toFixed(6);
                document.getElementById("longitude").innerHTML = "Your longitude is: " + gpspos.coords.longitude.toFixed(6);
		    
		var marker = L.marker([gpspos.coords.latitude, gpspos.coords.longitude], {
    		color: 'red',
		fillColor: '#ff0033',
		fillOpacity: 0.5,
		 radius: 20
		}).addTo(map);
		 
		
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
    function getTimeRemaining(endtime){
      var t = Date.parse(endtime) - Date.parse(new Date());
      var seconds = Math.floor( (t/1000) % 60 );
      var minutes = Math.floor( (t/1000/60) % 60 );
      var hours = Math.floor( (t/(1000*60*60)) % 24 );
      var days = Math.floor( t/(1000*60*60*24) );
      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }
}
