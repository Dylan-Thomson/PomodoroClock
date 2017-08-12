// Document Ready
$(function() {
	initSetTimerListeners();
	initButtonListeners();
});

var breakTime = Number($("#break").text());
var sessionTime = Number($("#session").text());
var onBreak = false;
var timer;

function initButtonListeners() {
	$("#start").on("click", function() {
		$("#continue, #reset, #stop").removeClass("hidden");
		$("#start").addClass("hidden");
		$("#clock").text(timeString(sessionTime));
		startTimer(sessionTime);
	});

	$("#continue").on("click", function() {
	});

	$("#stop").on("click", function() {
	});

	$("#reset").on("click", function() {
		$("#start").removeClass("hidden");
		$("#reset, #continue, #stop").addClass("hidden");
		$("#clock").text("0:00");
		window.clearInterval(timer);
		onBreak = false;
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

function startTimer() {
	var time;
	var alertMSG;
	if(!onBreak) {
		time = sessionTime;
		alertMSG = "Time for a break!";
	}
	else {
		time = breakTime;
		alertMSG = "Back to work!";
	}
	timer = window.setInterval(function() {
		time -= 1;
		$("#clock").text(timeString(time));
		if(time <= 0) {
			onBreak = !onBreak;
			window.clearInterval(timer);
			alert(alertMSG);
			return startTimer();
		}
	}, 1000);
}

// Convert seconds to min:sec format
function timeString(seconds) {
	var date = new Date(null);
	date.setSeconds(seconds);
	return date.toISOString().substr(14,5);
}
