// Document Ready
$(function() {
	initControlListeners();
	initSetTimerListeners();
});

var breakTime = Number($("#break").text());
var sessionTime = Number($("#session").text());
var onBreak = false;
var running = false;
var mute = false;
var alerts = true;
var timer;
var audio = new Audio("sounds/buzz.mp3");
// var audio = $("#audio");

// TODO: Refactor code
function initControlListeners() {
	$("#controls").on("click", function() {
		if(!running && !$("#clock-container").hasClass("paused")) {
			$("#controls").toggleClass("fa-pause fa-play");
			startTimer(sessionTime);
			running = true;
		}
		else if($("#clock-container").hasClass("paused")) {
			$("#clock-container").removeClass("paused");
			$("#controls").toggleClass("fa-pause fa-play");
			running = true;
		}
		else {
			$("#clock-container").addClass("paused");
			$("#controls").toggleClass("fa-pause fa-play");
			running = false;
		}
	});
	$("#volume").on("click", function() {
		$("#volume").toggleClass("fa-volume-off fa-volume-up");
		mute = !mute;
	});
	$("#alert").on("click", function() {
		$("#alert").toggleClass("fa-exclamation-triangle fa-ban");
		alerts = !alerts;
	});
	$("#reset").on("click", function() {
		if(running || $("#clock-container").hasClass("paused")) {
			$("#clock").text("0:00");
			window.clearInterval(timer);
			$("h1").text("Pomodoro");
			$("#controls").toggleClass("fa-pause fa-play");
			if(!onBreak) {
				$("body").toggleClass("white-background red-background");
				$("#clock-container").toggleClass("white-border red-border");
			}
			onBreak = false;
			running = false;
			$("#clock-container").removeClass("paused");
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

// TODO: Radial progress meter
function startTimer() {
	var time;
	var alertMSG;
	if(!onBreak) {
		time = sessionTime;
		alertMSG = "Time for a break!";
		$("#clock").text(timeString(sessionTime));
		$("h1").text("Work");
	}
	else {
		time = breakTime;
		alertMSG = "Back to work!";
		$("#clock").text(timeString(breakTime));
		$("h1").text("Break");
	}

	$("body").toggleClass("white-background red-background");
	$("#clock-container").toggleClass("white-border red-border");
	timer = window.setInterval(function() {
		if(!$("#clock-container").hasClass("paused")) {
			time -= 1;
			$("#clock").text(timeString(time));
			if(time <= 0) {
				onBreak = !onBreak;
				window.clearInterval(timer);
				window.setTimeout(function() {
					if(!mute) {
						if("vibrate" in navigator) {
							window.navigator.vibrate([500, 500, 500]);
						}
						if(alerts) {
							audio.play();
							setTimeout(function() {
								alert(alertMSG);
							}, 200);
						}
						else {
							audio.play();
						}
					}
					else if(alerts) {
						alert(alertMSG);
					}
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
