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
			$("#controls").removeClass("fa-play");
			$("#controls").addClass("fa-pause");
			startTimer(sessionTime);
			running = true;
		}
		else if($("#clock-container").hasClass("paused")) {
			$("#clock-container").removeClass("paused");
			$("#controls").removeClass("fa-play");
			$("#controls").addClass("fa-pause");
			running = true;
		}
		else {
			$("#clock-container").addClass("paused");
			$("#controls").removeClass("fa-pause");
			$("#controls").addClass("fa-play");
			running = false;
		}
	});
	$("#volume").on("click", function() {
		if(mute) {
			$("#volume").addClass("fa-volume-up");
			$("#volume").removeClass("fa-volume-off");
		}
		else {
			$("#volume").addClass("fa-volume-off");
			$("#volume").removeClass("fa-volume-up");
		}
		mute = !mute;
	});
	$("#alert").on("click", function() {
		if(alerts) {
			$("#alert").addClass("fa-ban");
			$("#alert").removeClass("fa-exclamation-triangle");
		}
		else {
			$("#alert").addClass("fa-exclamation-triangle");
			$("#alert").removeClass("fa-ban");
		}
		alerts = !alerts;
	});
	$("#reset").on("click", function() {
		if(running || $("#clock-container").hasClass("paused")) {
			$("#clock").text("0:00");
			window.clearInterval(timer);
			$("h1").text("Pomodoro");
			$("#controls").removeClass("fa-pause");
			$("#controls").addClass("fa-play");
			if(!onBreak) {
				$("body").removeClass("red-background");
				$("body").addClass("white-background");
				$("#clock-container").removeClass("white-border");
				$("#clock-container").addClass("red-border");
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

// TODO: Fix issue where sound is not played before alert window pops up
// TODO: Fix issue where alerts and sound do not work on my mobile device
// TODO: Radial progress meter
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
					if("vibrate" in navigator) {
						window.navigator.vibrate([500, 500, 500]);
					}
					if(!mute) {
						// if(alerts) {
						// 	audio.get(0).onplay = function() {alert(alertMSG);};
						// }
						// else {
						// 	audio.get(0).onplay = null;
						// }
						// audio.get(0).play();

						// if(alerts) {
						// 	alert(alertMSG);
						// }
						// audio.play().then(function() {
						// 	if(alerts) {
						// 		alert(alertMSG);
						// 	}
						// });
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
