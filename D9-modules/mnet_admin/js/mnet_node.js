/**
 * @file
 * Attaches js for MNET back-end node.
 */

(function ($) {

	$('#edit-field-starts-ends-0-value-date').on('change', function(){
    	if ($(this).val()) {
	    	var datetime =  new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric", second: "numeric"});
	    	$('#edit-field-starts-ends-0-value-time').val(datetime);
    	}
	})
 	$('#edit-field-starts-ends-0-end-value-date').on('change', function(){
    	if ($(this).val()) {
	    	$('#edit-field-starts-ends-0-end-value-time').val("23:59:59");
    	}
	})

	if($('input[type=url].required').length > 0 && $('input[type=url]').val() == ""){
		$('input[type=url].required').val("https://");
	}
    
})(jQuery);
