// Document Ready
$(function() {
	initListeners();
});

var breakTime = Number($("#break").text());
var sessionTime = Number($("#session").text());

function initListeners() {
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