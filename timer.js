function start_timer(){
	var counter = {};
	// COUNTDOWN IN SECONDS
	// EXAMPLE - 5 MINS = 5 X 60 = 300 SECS
	counter.end = 300;

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
				counter.end = 0;
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
