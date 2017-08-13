// Document Ready
$(function() {
	initSetTimerListeners();
	initClockListener();
});

var breakTime = Number($("#break").text());
var sessionTime = Number($("#session").text());
var onBreak = false;
var running = false;
var timer;

function initClockListener() {
	$("#clock-container").on("click", function() {
		if(!running && !$("#clock-container").hasClass("paused")) {
			startTimer(sessionTime);
			running = true;
		}
		else if($("#clock-container").hasClass("paused")) {
			$("#clock-container").removeClass("paused");
			running = true;
		}
		else {
			$("#clock-container").addClass("paused");
			running = false;
		}
	});
}

function initSetTimerListeners() {
	$("#breakLength .fa-minus").on("click", function() {
		if(breakTime > 1) {
			breakTime -= 1;
			$("#break").text(breakTime);
		}
	});	

	$("#breakLength .fa-plus").on("click", function() {
		if(breakTime < 60) {
			breakTime += 1;
			$("#break").text(breakTime);		
		}
	});	
	$("#sessionLength .fa-minus").on("click", function() {
		if(sessionTime > 1) {
			sessionTime -= 1;
			$("#session").text(sessionTime);
		}
	});	
	$("#sessionLength .fa-plus").on("click", function() {
		if(sessionTime < 60) {
			sessionTime += 1;
			$("#session").text(sessionTime);
		}
	});
}

function startTimer() {
	var time;
	var alertMSG;
	if(!onBreak) {
		time = sessionTime;
		alertMSG = "Time for a break!";
		$("#clock").text(timeString(sessionTime));
		$("h1").text("Work");
		$("body").addClass("red-background");
		$("body").removeClass("white-background");
		$("#clock-container").addClass("white-border");
		$("#clock-container").removeClass("red-border");
	}
	else {
		time = breakTime;
		alertMSG = "Back to work!";
		$("#clock").text(timeString(breakTime));
		$("h1").text("Break");
		$("body").addClass("white-background");
		$("body").removeClass("red-background");
		$("#clock-container").addClass("red-border");
		$("#clock-container").removeClass("white-border");
	}
	timer = window.setInterval(function() {
		if(!$("#clock-container").hasClass("paused")) {
			time -= 1;
			$("#clock").text(timeString(time));
			if(time <= 0) {
				onBreak = !onBreak;
				window.clearInterval(timer);
				window.setTimeout(function() {
					alert(alertMSG);
					return startTimer();
				}, 1000);
			}
			
		}
	}, 1000);
}

// Convert seconds to min:sec format
function timeString(seconds) {
	var date = new Date(null);
	date.setSeconds(seconds);
	return date.toISOString().substr(14,5);
}
