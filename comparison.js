$(document).ready(function(){
	var comparePosition = 0;
	var updatePosition = false;
	var containerWidth = $('.compareContainer').width();
	var compareContainer = $('.compareContainer');
	var controlsContainer, controlsDivider, controlsHandle;
	var createControls = function(){
		controlsContainer = $('<div class="controlsContainer"></div>').appendTo(compareContainer);
		controlsDivider = $('<div class="controlsDivider"></div>').appendTo(compareContainer);
		controlsHandle = $('<button class="controlsHandle">Handle</button>').appendTo(controlsContainer);
	}
	
	var  createElements = function(){
		compareContainer.find('img').each(function(index){
			$(this).wrap('<div class="compareImages"></div>');
			if(index == 0){
				$(this).parent().addClass('compareLeft');
			}
		});
	}
	createControls();
	createElements();
	
	$('.compareContainer').mousemove(function(e){
		comparePosition = e.pageX;
	    $('#display').html("X Axis : " + e.pageX + " Y Axis : " + e.pageY + " comparePosition: " + comparePosition);
	});
	
	var int00;
	$('.controlsHandle').on('mousedown', function(event){
		int00 = setInterval(function(){
			//updateWidth();
			if(comparePosition < containerWidth && comparePosition > 0){
				$('.compareLeft').width(comparePosition);
				$('.controlsContainer, .controlsDivider').css('left',comparePosition);
			}
		}, 50);	
	}).on('mouseup', function(event){
		clearInterval(int00);
	});
	$('body').on('mouseup', function(event){
		clearInterval(int00);
	})
});