(function (Drupal, $, window) {

	Drupal.behaviors.menu = {
    	attach: function (context, settings) {
		  $('#block-menubutton').click(function(e) {
		        e.preventDefault();
		        $('#navbar').addClass( "expanded" );
		  });
		  $('h2#block-tdsc-main-menu-menu').click(function(e) {
		        e.preventDefault();
		        $('#navbar').removeClass( "expanded" );
		  });
	  	}
	};
} (Drupal, jQuery, this));