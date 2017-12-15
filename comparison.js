$(document).ready(function(){
	var debug = true;
	var comparePosition = {}; //Object to hold each comparison value
	var containerWidth = $('.compareContainer').width();
	var compareContainer = $('.compareContainer');
	var controlsContainer,
		controlsDivider,
		controlsHandle,
		redrawInterval;
	var createControls = function(){
		controlsContainer = $('<div class="controlsContainer"></div>').appendTo(compareContainer);
		controlsDivider = $('<div class="controlsDivider"></div>').appendTo(compareContainer);
		controlsHandle = $('<button class="controlsHandle">Handle</button>').appendTo(controlsContainer);
	}
	
	var createElements = function(){
		$(compareContainer).each(function(){
			$(this).find('img').each(function(index){
				$(this).wrap('<div class="compareImages"></div>');
				if(index == 0){
					$(this).parent().addClass('compareLeft');
				}
			}).append();
		});
		if(debug){
			$(compareContainer).each(function(){
				$(this).append('<p class="display"></p>');
			});
		}
	}
	createControls();
	createElements();
	
	$('.compareContainer').each(function(index, element){
		$(this).mousemove(function(e){
			comparePosition[index] = e.pageX; //Need to isolate this to specific dimensions
		    $(this).find('.display').html("X Axis : " + e.pageX + " Y Axis : " + e.pageY + " comparePosition: " + comparePosition[index]);
		});
		
		
		$(element).find('.controlsHandle').on('mousedown', function(event){
			redrawInterval = setInterval(function(){
				if(comparePosition[index] < containerWidth && comparePosition[index] > 0){
					$(element).find('.compareLeft').width(comparePosition[index]);
					$(element).find('.controlsContainer, .controlsDivider').css('left',comparePosition[index]);
				}
			}, 50);	
		}).on('mouseup', function(event){
			clearInterval(redrawInterval);
		});
	});
	
	/* Stop dragging when mouseup occurs on other elements to prevent weird behavior */
	$('body').on('mouseup', function(event){
		clearInterval(redrawInterval);
	})
});