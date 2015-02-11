/* Customize Initialization
* This file includes all initialization functions to customize APIs.
* This should be included at the bottom of body tag. 
* Hyunjong Choi - 1/28/2015
*/

$(function(){

	// Initialize poptrox like fancybox
	// Section two for portfolio
	
	$('#two').poptrox({
		caption: function($a) { return $a.next('h3').text(); },
		overlayColor: '#2c2c2c',
		overlayOpacity: 0.85,
		popupCloserText: '',
		popupLoaderText: '',
		selector: '.work-item a',
		usePopupCaption: false,
		usePopupDefaultStyling: false,
		usePopupEasyClose: false,
		usePopupNav: true,
		windowMargin: (skel.isActive('small') ? 0 : 50)
	});

	var $onehalf = $('#one-half');
	$onehalf._parallax();

	if ($('.acc-box').length) {
		var $box = $('.acc-box');
		$box.each(function () {
			var $trigger = $('.acc-trigger', $(this));
			$trigger.on('click', function() {
				var $this = $(this);
				if ($this.data('mode') === 'toggle') {
					$this.toggleClass('active').next().stop(true, true).slideToggle(300);
				} else {
					if ($this.next().is(':hidden')) {
						$trigger.removeClass('active').next().slideUp(300);
						$this.toggleClass('active').next().slideDown(300);
					} else if ($this.hasClass('active')) {
						$this.removeClass('active').next().slideUp(300);
					}
				}
				return false;
			});
		});
	}

});