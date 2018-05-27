var enableHover = true;
$('.active').append("<div class='nav-circle'><span></span></div>");
$(window).on('load resize', function() {
	var $thisnav = $('.active').offset().left;

	$('.nav li').hover(function() {
		if (enableHover) {
			var $left = $(this).offset().left - $thisnav;
			var $width = $(this).outerWidth();
			var $start = 0;
			$('.nav-circle').css({ 'left': $left , 'width': $width });
		}
	},function() {
			if (enableHover) {
				var $initwidth = $('.active').width();
				$('.nav-circle').css({ 'left': '0' , 'width': $initwidth });
			}
	});
});
// todo add id selector
$('#nav-drop').on('show.bs.dropdown', function () {
	 enableHover = false;
	})

	$('#nav-drop').on('hide.bs.dropdown', function () {
		var $initwidth = $('.active').width();
		$('.nav-circle').css({ 'left': '0' , 'width': $initwidth });
		enableHover = true;
	})
