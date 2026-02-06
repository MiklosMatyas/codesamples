(function ($) {

	function loadPrice() {
		// Loading Education prices from .json file
		$.ajaxSetup({cache:false});
		return $.getJSON("/sites/default/files/data/prices-education.json?gsder=sdr2");
	}

	$(document).ready(function(){
		currencyCode={"GB": "GBP", "IE": "EUR", "EU": "EUR", "US": "USD", "CA": "CAD", "AU": "AUD", "NZ": "NZD", "Other": "USD"};
		VAT={"GB": 1.2, "IE": 1, "EU": 1, "US": 1, "CA": 1, "AU": 1, "NZ": 1, "Other": 1};

		loadPrice().always(function (priceData) {
			// Set US default for US
			$('.i18n-en-US .order-licence-form #country').val('US');
			$('.i18n-en-US .order-licence-form #country').attr( "data-flag", "US" );
			$(window).on('load', function() {
				if(typeof cc == "undefined" || cc.length < 1) cc = "GB";
				$('.order-licence-form #country').val(cc);
				$('.order-licence-form #country, #edit-countrycodeselect').attr( "data-flag", cc );
				$('.i18n-en-US .order-licence-form #country').val('US');
				$('.i18n-en-US .order-licence-form #country').attr( "data-flag", "US" );
			});

			$('.order-licence-form select, .order-licence-form input').on('change', function(){
				changePrice(priceData);
				});
			$('select[name=country]').on('change', function(){
				changePrice(priceData);
				});

			changePrice(priceData);
		});
	});

	// Trial course form Whatami options
	if($("#edit-type").length > 0){
		$("#edit-type").on("change", function(){
			var trialType = $(this).val();
			$("#edit-whatami option[value='']").attr('selected', true);
			if(trialType == "Home"){
				$("#edit-whatami option[value='teacher'], #edit-whatami option[value='tutor']").hide();
				$("#edit-whatami option[value='parent'], #edit-whatami option[value='adult learner']").show();
			}
			if(trialType == "Education"){
				$("#edit-whatami option[value='teacher'], #edit-whatami option[value='tutor']").show();
				$("#edit-whatami option[value='parent'], #edit-whatami option[value='adult learner']").hide();
			}
		});
	}

	var changePrice = function(priceData){
		// Double form 
		//var selUserVal = $('input[name=period]:checked').attr("data-users");
		var selPeriodVal = $('input[name=period]:checked').val();
		$('input[name=period]').removeClass('checked');
		$('input[name=period][value='+selPeriodVal+']').addClass('checked');

		var licenceData = priceData.priceEdu;
	  	var selectedCountry = $('.order-licence-form #country')[0].value;

		$('.order-licence-form #country').attr( "data-flag", $('.order-licence-form #country')[0].value );

		selectedVAT = selectedCountry;

		if(selectedCountry == "Other"){
		//	selectedCountry = "US";
			var postfix = " <small>USD</small> ";
		}
		else{
			var postfix = "";
		}

		var actualCurrency = licenceData[selectedCountry].currency;
		var from = "";
		var vat = "";

		if(selectedCountry == "GB" || selectedCountry == "EU"){
			$('.include-vat').show();
		}
		else $('.include-vat').hide();


		$('input[name=period]').each(function() {
			var selectedUsers = $(this).attr("data-users");
		 	var userNumbers = licenceData[selectedCountry].monthly1;
		 	var last = Object.keys(userNumbers)[Object.keys(userNumbers).length - 1];
		  	selectedUsersInJson = selectedUsers;
		  	if(selectedUsers>=last){
		  		selectedUsersInJson = last;
		  	}

			actualPriceAnnualy = licenceData[selectedCountry].annually[selectedUsersInJson];
			var tiersAnnually = licenceData[selectedCountry].annually;
			var tiersMaxAnnually = Math.max(...Object.keys(tiersAnnually));

			if(selectedUsers <= tiersMaxAnnually){
				var ypy = 0;
				for (var i = 0; i <= selectedUsers; i++) {
					ypy += licenceData[selectedCountry].annually[i];
				}
			}
			else{
				var ypy = 0;
				for (var i = 0; i <= tiersMaxAnnually; i++) {
					ypy += licenceData[selectedCountry].annually[i];
				}
				j = selectedUsers - tiersMaxAnnually;
				ypy += j * licenceData[selectedCountry].annually[tiersMaxAnnually];
			}
			$("label[for=" + $(this).attr("id") + "] .from .um-data").html(from + actualCurrency + ypy.toFixed(2) + postfix);

		});
		 
		var period = "Yearly";
		var selectedUsers = $('input[name=period]:checked').attr("data-users")
		if($('#paymentMethod').length > 0){
			var paymentMethod = "&payment=" + $('#paymentMethod')[0].value;
		}
		else{ var paymentMethod = ""; }

		if(selectedCountry == "EU"){
			realCountry = Cookies.get("geoip_country");
			cbCountry = realCountry;
		}
		else{
			realCountry = selectedCountry;
			cbCountry = selectedCountry;
		}
		
		// adding utm parameters to url
		var utm_parameter_string = "";
		if($.urlParam("code")) utm_parameter_string += "&code=" + $.urlParam("code");
		if($.urlParam("utm_source")) utm_parameter_string += "&utm_source=" + $.urlParam("utm_source");
		if($.urlParam("utm_medium")) utm_parameter_string += "&utm_medium=" + $.urlParam("utm_medium");
		if($.urlParam("utm_campaign")) utm_parameter_string += "&utm_campaign=" + $.urlParam("utm_campaign");
		if($.urlParam("utm_term")) utm_parameter_string += "&utm_term=" + $.urlParam("utm_term");

		// Order now button Annual
		//$(".submit-button-edu .button-order-orange").attr("href", "https://ttrsonline.com/registration/EducationSubscription?country="+realCountry+"&period="+period+"&studentsCount="+selectedUsers+paymentMethod);
			  
		$(".price-are").hide();
		if(selectedCountry == "US"){
			$(".USD").show();
		}
		if(selectedCountry == "CA"){
			$(".CAD").show();
		}
		if(selectedCountry == "AU"){
			$(".AUD").show();
		}
		if(selectedCountry == "NZ"){
			$(".NZD").show();
		}

	//	});
	};

}(jQuery));

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
