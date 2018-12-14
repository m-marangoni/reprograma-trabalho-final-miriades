
$(".parallax-wrapper").mousemove(function(e) {
	var x = e.pageX - $(this).offset().left - $(this).width() / 2;
	var y = e.pageY - $(this).offset().top - $(this).height() / 2;

	$("*[data-mouse-parallax]").each(function() {
		var factor = parseFloat($(this).data("mouse-parallax"));
		x = x * factor;
		y = y * factor;

		$(this).css({ transform: "translate3d( " + x + "px, " + y + "px, 0 )" });
	});
});
