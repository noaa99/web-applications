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
});