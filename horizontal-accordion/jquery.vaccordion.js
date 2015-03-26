/*
 *               ~ Asix Accordion v1.0 ~
 * ==============================================
 *       https://github.com/noaa99/web-applications
 *             asix-accordion
 * ==============================================
 *  created by Hyunjong Choi (github.com/noaa99)
 *        &available under the MIT license
 * http://opensource.org/licenses/mit-license.php
 * ==============================================
 *
 * Original author: Hyunjong Choi
 * Licensed under the MIT license
 */
(function (factory) {
	
	if (typeof define === 'function' && define.amd) {
	// Register as an anonymous AMD module:
		define([
			'jquery',
		], factory);
	} else {
		factory(jQuery);
	}
}(function ($) {

	var defaults = {
	    responsive: true,
	    duration: 300,
	    pageNumber: true,
	
	};
	
	
	function AsixAccordion(element, options) {
		this.element = element;
		
		// Merge the default options with user-provided options
    	this.options = $.extend(true, {}, defaults, options);
		
		// Initialize accordion
		this.init();
	}
	
	// Initialize accordion
	AsixAccordion.prototype.init = function () {
		activeItem = this.element.find('li:first');
		items = this.element.find('li');
		$(activeItem).addClass('active');
	 	
	 	if (this.options.responsive === true)
	 		this.responsiveContent();
	 	
	 	if (this.options.pageNumber === true)
	 		this.pageNumberDisplay(items);
	 	
	 	this.toggleBindingVaccordion(items, activeItem, true, 'init');
	 	this.initStyle(items, activeItem);
	 	
	 	this.keyFunction(items);
	}
	
	// Initialize styles for accordion, modify css class
	AsixAccordion.prototype.initStyle = function(items, activeItem) {
		var num = items.length;
		barWidth = 17/(num-1)+'%';
		
		// Define tab width
		items.css("width", barWidth);
		activeItem.css("width", "80%");
		
		// Define tab position, accroding to the number of tabs
		var tab_position = (-6*num - 34)+'px'; 
		$('.v_accordion .tag > span').css("left", tab_position);
	}

	// Responsive mode based on window size
	AsixAccordion.prototype.responsiveContent = function() {
		var that = this;
		var wrap = this.element.find('.contents_wrap');
		var active = this.element.find('li.active');
		
		if ($(window).width() < 760) {
			that.changeMode('h_accordion', 'v_accordion');
			//wrap.width((Number(active.css('width').slice(0, -2)) - 50 - 2)+'px');
		}
		
		$(window).resize(function() {
			var activeWidth = Number(active.css('width').slice(0, -2));
			if ($( window ).width() < 760) {
				if (that.element.hasClass('v_accordion'))
					that.changeMode('h_accordion', 'v_accordion');
			}
			else {
				if (that.element.hasClass('h_accordion'))
					that.changeMode('v_accordion', 'h_accordion');
			}
		});
	}
	
	// Change mode between vertical accordion and horizontal accordion
	AsixAccordion.prototype.changeMode = function(addClass, rmClass) {
		items = this.element.find('li');
		activeItem = this.element.find('li.active');
		
		if (this.element.hasClass(rmClass))
			this.element.removeClass(rmClass);
		this.element.addClass(addClass);
		
		if (addClass == 'v_accordion') {
			this.toggleBindingVaccordion(items, activeItem, true);
			this.initStyle(items, activeItem);
		}
		else 
			this.toggleBindingVaccordion(items, activeItem, false);
	}

	AsixAccordion.prototype.toggleBindingVaccordion = function(items, activeItem, flag, initFlag) {
		var that = this;
		//var events = $.data(items, "events");
		if (initFlag != 'init') {
			items.unbind("click");
		}
		items.removeAttr('style');
		items.find('.tag > span').removeAttr('style');
		
		if (flag) {
			$(items).click(function(event){
				event.preventDefault();
				$(activeItem).animate({width: barWidth}, {duration:that.options.duration, queue:false});
		        //$(activeItem).css("width", barWidth);
		        $(this).animate({width: "80%"}, {duration:that.options.duration, queue:false});
		        activeItem = this;
		        $(items).removeClass('active');
		        $(activeItem).addClass('active');
		    });
	  	} else {
	  		$(items).click(function(event){
	  			event.preventDefault();
	  			
		        $(activeItem).animate({height: "50px"}, {duration:that.options.duration, queue:false});
		        $(this).animate({height: "100%"}, {duration:that.options.duration, queue:false});
		        activeItem = this;
		        $(items).removeClass('active');
		        $(activeItem).addClass('active');
		    });
	  	}
	}
	
	// Page number display option
	AsixAccordion.prototype.pageNumberDisplay = function(items) {
		
		var $page = $("<span class='page_number'></span>");
		items.find('.tag').append($page);
		
		var $pagetag = items.find('.page_number');
		var count = 1;  
		$.each( $pagetag, function( element ) {
  			$pagetag[element].innerHTML = count;
  			count = count + 1;
		});
	}
	
	// This is a function for ADA compliant
	AsixAccordion.prototype.keyFunction = function(items) {
		//console.log($(items[0]));
		for (var i=0; i<items.length; i++) {
			if ($(items[i]).hasClass('active')) {
				$(items[i]).children('.contents_wrap').children().attr('tabindex', '0');
			}
			//console.log($(items[i]).children('.contents_wrap').children());
			$(items[i]).attr("aria-controls", "panel_"+(i+1));
		}
		items.attr("role", "tab");
		
		keys = this.keyCodes();
		
		// Bind arrow keys for navigation
		$(items).keydown(function(e){
			// "Enter key"
			if(e.keyCode == keys.enter) {
				e.preventDefault();
				$(items).children('.contents_wrap').children().attr('tabindex', '-1');
				$(this).click();
				$(this).children('.contents_wrap').children().attr('tabindex', '0');
			} else if (e.keyCode == keys.down || e.keyCode == keys.right) {
				e.preventDefault();
				$(this).next().focus();
			} else if (e.keyCode == keys.up || e.keyCode == keys.left) {
				e.preventDefault();
				$(this).prev().focus();
			}
		});
	}
	
	// Define keyboard key codes
	AsixAccordion.prototype.keyCodes = function() {
		// Define values for keycodes 
	  	this.tab = 9; 
	  	this.enter = 13; 
	  	this.esc = 27; 
	
	  	this.left = 37; 
	  	this.up = 38; 
	  	this.right = 39; 
	  	this.down = 40; 
	  	
	  	return this;
	}
	
	
	$.fn.AsixAccordion = function(options) {
	    var accor_instance = new AsixAccordion(this, options);
	    //console.log(accor_instance);
	    
  	}
}));