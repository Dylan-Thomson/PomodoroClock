// Document Ready
$(function() {
	initListeners();
});

var breakTime = Number($("#break").text());
var sessionTime = Number($("#session").text());
var onBreak = false;

function initListeners() {
	var clock = $(".clock").FlipClock(0, {
		countdown: true,
		autoStart: false,
		clockFace: "MinuteCounter",
		callbacks: {
			interval: function() {
				if(clock.getTime() == 0) {
					setTimeout(function() {
						if(onBreak) {
							alert("Back to work");
							clock.setTime(sessionTime);
						}
						else {
							alert("Time for a break");
							clock.setTime(breakTime);
						}
						onBreak = !onBreak
						
						clock.start();
					}, 1000);
				}
			}
		}
	});

	$("#start").on("click", function() {
		clock.setTime(sessionTime);
		clock.start();
		$(this).addClass("hidden");
		$("#continue").removeClass("hidden");
		$("#reset").removeClass("hidden");
		$("#stop").removeClass("hidden");
	});

	$("#continue").on("click", function() {
		clock.start();
	});

	$("#stop").on("click", function() {
		clock.stop();
	});

	$("#reset").on("click", function() {
		$(this).addClass("hidden");
		$("#continue").addClass("hidden");
		$("#stop").addClass("hidden");
		$("#start").removeClass("hidden");
		clock.stop();
		clock.setTime(sessionTime * 60);
	});

	$("#breakLength .fa-minus").on("click", function() {
		if(breakTime > 1) {
			breakTime -= 1;
			$("#break").text(breakTime);
		}
	});	
	$("#breakLength .fa-plus").on("click", function() {
		breakTime += 1;
		$("#break").text(breakTime);

	});	
	$("#sessionLength .fa-minus").on("click", function() {
		if(sessionTime > 1) {
			sessionTime -= 1;
			$("#session").text(sessionTime);
			$("#timer").text(timeString(sessionTime * 60));
		}
	});	
	$("#sessionLength .fa-plus").on("click", function() {
		sessionTime += 1;
		$("#session").text(sessionTime);
		$("#timer").text(timeString(sessionTime * 60));
	});
}

// Convert seconds to min:sec format
function timeString(seconds) {
	var date = new Date(null);
	date.setSeconds(seconds);
	return date.toISOString().substr(14,5);
}
