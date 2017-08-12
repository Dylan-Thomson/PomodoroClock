// Document Ready
$(function() {
	initListeners();
});

var breakTime = Number($("#break").text());
var sessionTime = Number($("#session").text());
var onBreak = false;

function initListeners() {
	// var clock = $(".clock").FlipClock(0, {
	// 	countdown: true,
	// 	autoStart: false,
	// 	clockFace: "MinuteCounter",
	// 	callbacks: {
	// 		interval: function() {
	// 			if(clock.getTime() == 0) {
	// 				setTimeout(function() {
	// 					if(onBreak) {
	// 						alert("Back to work");
	// 						clock.setTime(sessionTime);
	// 					}
	// 					else {
	// 						alert("Time for a break");
	// 						clock.setTime(breakTime);
	// 					}
	// 					onBreak = !onBreak
						
	// 					clock.start();
	// 				}, 1000);
	// 			}
	// 		}
	// 	}
	// });

	$("#start").on("click", function() {
		$("#continue, #reset, #stop").removeClass("hidden");
		$("#start, #sessionLength, #breakLength").addClass("hidden");
	});

	$("#continue").on("click", function() {

	});

	$("#stop").on("click", function() {

	});

	$("#reset").on("click", function() {
		$("#start, #sessionLength, #breakLength").removeClass("hidden");
		$("#reset, #continue, #stop").addClass("hidden");
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
		}
	});	
	$("#sessionLength .fa-plus").on("click", function() {
		sessionTime += 1;
		$("#session").text(sessionTime);

	});
}

// Convert seconds to min:sec format
function timeString(seconds) {
	var date = new Date(null);
	date.setSeconds(seconds);
	return date.toISOString().substr(14,5);
}
