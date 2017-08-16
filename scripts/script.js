// Document Ready
$(function() {
	initPlayPauseListener();
	initVolumeListener();
	initAlertListener();
	initResetListener();
	initSetTimerListeners();
});

var time;
var timer;
var breakTime = Number($("#break").text());
var sessionTime = Number($("#session").text());
var onBreak = false;
var running = false;
var mute = false;
var alerts = true;
var audio = new Audio("sounds/buzz.mp3");


// TODO REFACTOR
// Play button
function initPlayPauseListener() {
	$("#controls").on("click", function() {
		if(!running && !$("#clock-container").hasClass("paused")) {
			$("#controls").toggleClass("fa-pause fa-play");
			$("#breakLength, #sessionLength").toggleClass("disabled");
			startTimer();
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
}

// Mute/unmute button
function initVolumeListener() {
	$("#volume").on("click", function() {
		$("#volume").toggleClass("fa-volume-off fa-volume-up");
		mute = !mute;
	});	
}

// Alerts on/off button
function initAlertListener() {
	$("#alert").on("click", function() {
		$("#alert").toggleClass("fa-exclamation-triangle fa-ban");
		alerts = !alerts;
	});	
}


// TODO: REFACTOR
// Reset button
function initResetListener() {
	$("#reset").on("click", function() {
		if(running || $("#clock-container").hasClass("paused")) {
			$("#clock").text("00:00");
			$(".radial-progress-cover").attr("stroke-dashoffset", 0);
			window.clearInterval(timer);
			$("h1").text("Pomodoro");
			$("#breakLength, #sessionLength").toggleClass("disabled");
			if(!$("#clock-container").hasClass("paused")) {
				$("#controls").toggleClass("fa-pause fa-play");
			}
			if(!onBreak) {
				toggleTheme()
			}
			onBreak = false;
			running = false;
			$("#clock-container").removeClass("paused");
		}
	});	
}

// Break Length and Work Length controls
function initSetTimerListeners() {
	$("#breakLength .fa-minus").on("click", function() {
		if(!running	&& !$("#clock-container").hasClass("paused")) {
			if(breakTime > 1) {
				breakTime -= 1;
				$("#break").text(breakTime);
			}
		}
	});	

	$("#breakLength .fa-plus").on("click", function() {
		if(!running	&& !$("#clock-container").hasClass("paused")) {
			if(breakTime < 60) {
				breakTime += 1;
				$("#break").text(breakTime);		
			}
		}
	});	
	$("#sessionLength .fa-minus").on("click", function() {
		if(!running	&& !$("#clock-container").hasClass("paused")) {
			if(sessionTime > 1) {
				sessionTime -= 1;
				$("#session").text(sessionTime);
			}
		}
	});	
	$("#sessionLength .fa-plus").on("click", function() {
		if(!running	&& !$("#clock-container").hasClass("paused")) {
			if(sessionTime < 60) {
				sessionTime += 1;
				$("#session").text(sessionTime);
			}	
		}
	});
}

// TODO: REFACTOR THIS
function startTimer() {
	var alertMSG;
	if(!onBreak) {
		time = sessionTime * 60;
		alertMSG = "Time for a break!";
		$("#clock").text(timeString(sessionTime * 60));
		$("h1").text("Work");
	}
	else {
		time = breakTime * 60;
		alertMSG = "Back to work!";
		$("#clock").text(timeString(breakTime * 60));
		$("h1").text("Break");
	}

	toggleTheme();

	var radius = 9;
	var circumference = 2 * radius * Math.PI;
	$("circle").attr("stroke-dasharray", circumference + "em");
	var currentCount = 1;
	var maxCount = time;

	timer = window.setInterval(function() {
		if(!$("#clock-container").hasClass("paused")) {
			var offset = -(circumference / maxCount) * currentCount + 'em';
			$(".radial-progress-cover").attr("stroke-dashoffset", offset);
			currentCount++;
			time -= 1;
			$("#clock").text(timeString(time));
			if(time <= 0) {
				onBreak = !onBreak;
				window.clearInterval(timer);
				window.setTimeout(function() {
					$(".radial-progress-cover").attr("stroke-dashoffset", 0);
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

// Toggle page colors
function toggleTheme() {
	$("body").toggleClass("white-background red-background white-text red-text");
	$(".radial-progress-cover, .radial-progress-background").toggleClass("red-stroke white-stroke");
	$("text").toggleClass("red-fill white-fill");
}

// Convert seconds to min:sec format
function timeString(seconds) {
	var date = new Date(null);
	date.setSeconds(seconds);
	return date.toISOString().substr(14,5);
}