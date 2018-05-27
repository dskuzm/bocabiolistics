var enableHover = true;
$('#header-nav .active').append("<div class='nav-circle'><span></span></div>");
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
$('#nav-drop').on('show.bs.dropdown', function () {
	 enableHover = false;
	})

	$('#nav-drop').on('hide.bs.dropdown', function () {
		var $initwidth = $('.active').width();
		$('.nav-circle').css({ 'left': '0' , 'width': $initwidth });
		enableHover = true;
	})


var count = [6, 3, 6, 3];
var lazyLoadEnabled = true;
var i = 0;

$('#lazyload')

function lazyLoad() {
	var loader = '<div id="loader" class="loading-holder"><span class="icon-loading"></span></div>';
	$('#lazyload').append(loader);
	lazyLoadEnabled = false;
	$.getJSON( "http://api.biserkov.ru/?count=" + count[i], function( data ) {
		var items = data.data;
		i++;
		lazyLoadEnabled = true;
		items.forEach(function( item ) {
		  renderItem(item);
		});
	});
}

function renderItem(item) {
	var author = item.author,
		content = item.content,
		date = item.date,
		template = '<div class="col-sm-6 col-md-4"> ' +
				'<div class="thumbnail">' +
					'<a class="top-section" href="#">' +
						'<div class="image-holder" style="background-image: url(images/img-02.jpg);"></div>' +
						'<div class="date-holder">' +
							'<span>'+ date +'</span>' +
						'</div>' +
					'</a>' +
					'<div class="caption">' +
						'<h5><a href="#">'+ author +'</a></h5>' +
						'<p>'+ content +'</p>' +
					'</div>' +
				'</div>' +
			'</div>';
		$('#lazyload').append(template);
		$('#lazyload #loader').remove();
}


$(document).scroll(function () {
	s_top = $(window).scrollTop() + $(window).height();
	yes = $("#lazyload").offset().top;
	if(s_top > yes && lazyLoadEnabled && i < count.length) {
		lazyLoad();
	}
});

$('#subscribe_form').submit(function(e) {
	e.preventDefault();
	var first_name = $('#subscribe_name').val();
	var email = $('#subscribe_email').val();
	var validate = true;

	$(".error").remove();
	if (first_name.length < 1) {
		$('#subscribe_name').after("<p class='error'>This field is required</p>");
		validate = false;
	}
	if (email.length < 1) {
		$('#subscribe_email').after('<span class="error">This field is required</span>');
		validate = false;
	} else {
		var regEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; 
		var validEmail = regEx.test(email);
		if (!validEmail) {
			$('#subscribe_email').after('<span class="error">Enter a valid email</span>');
			validate = false;
		}
	}

	if (validate) {
		console.log('send');
		$('#subscribe_name').val('');
		$('#subscribe_email').val('');
	}
});