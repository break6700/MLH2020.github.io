var team = "None";

var map;

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
		    [51.0458, -1.4068],
		    [50.9172, -1.4216],
		    [50.8217, -1.4668],
		    [51.0458, -1.4016],
		]).addTo(map);
	
	
	//ideas: move the gps code to a function so we can call it whenever we need to and return the lon and lat from it
	
	document.getElementById("userfinder").addEventListener("click", ()=> 
        {
			locate_user(map);
        } 
    );
	
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
				document.getElementById("error_responce").innerHTML = "sorry geolocation is not supported by your browser or you have denied the permission for us to access your location";
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

var latitudeBefore = gpspos.coords.latitude
var longitudeBefore = gpspos.coords.longitude

function join_blue(){
	var team = "Blue";
	show_team(team);
}

function join_red(){
	var team = "Red";
	show_team(team);
}

function show_team(team){
	document.getElementById("currentTeam").innerHTML = "Your currently selected team is: " + team + "!";
}

function place_marker(map, colour){
	if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition (

            gpspos=> {
				var lat = gpspos.coords.latitude;
				var lon = gpspos.coords.longitude;
		    
				var marker = L.marker([lat,lon], {
					color: colour,
					fillColor: colour,
					fillOpacity: 0.5,
					radius: 20
				}).addTo(map);
            },
            err=> {
				//document.getElementById("responseCode").innerHTML = `An error occurred: ${err.code}`;
				document.getElementById("error_responce").innerHTML = "sorry geolocation is not supported by your browser or you have denied the permission for us to access your location";
            }
        );
    }
    else
    {
		document.getElementById("error_responce").innerHTML = "sorry geolocation is not supported by your browser or you have denied the permission for us to access your location";
    }
}

function start_timer(){
	var counter = {};
	// COUNTDOWN IN SECONDS
    // EXAMPLE - 5 MINS = 5 X 60 = 300 SECS
    //Changed from Tassilo to 120 sec
	counter.end = 120;
	place_marker(map, "red");

	// Get he containers
	counter.min = document.getElementById("cd-min");
	counter.sec = document.getElementById("cd-sec");

	// Start if not past end date
	if (counter.end > 0) {
		counter.ticker = setInterval(function(){
			// Stop if passed end time
			counter.end--;
			if (counter.end <= 0) {
				clearInterval(counter.ticker);
				place_marker(map, "blue");
                counter.end = 0;
                
                var nextPolygon = L.polygon([
                    [latitudeBefore, longitudeBefore],
                    [latitudeBefore, gpspos.coords.longitude],
                    [gpspos.coords.latitude, gpspos.coords.longitude],
                    [gpspos.coords.latitude, longitudeBefore],
                ]).addTo(map);
			}

			// Calculate remaining time
			var secs = counter.end;
			var mins  = Math.floor(secs / 60); // 1 min = 60 secs
			secs -= mins * 60;

			// Update HTML
			if(secs < 10) {
				secs = "0" + secs;
			}
			var ye = mins + ":" + secs;
			counter.min.innerHTML = ye;
		}, 1000);
	}
	document.getElementById("start_button").disabled = true;
}

function locate_user(map){
	if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition (

            gpspos=> {
				var lat = gpspos.coords.latitude;
                var lon = gpspos.coords.longitude;
                console.log(lat);
				console.log(lon);
				
				map.setView([lat, lon], 14);
            },
            err=> {
				//document.getElementById("responseCode").innerHTML = `An error occurred: ${err.code}`;
				document.getElementById("error_responce").innerHTML = "sorry geolocation is not supported by your browser or you have denied the permission for us to access your location";
            }
        );
    }
    else
    {
		document.getElementById("error_responce").innerHTML = "sorry geolocation is not supported by your browser or you have denied the permission for us to access your location";
    }
}
