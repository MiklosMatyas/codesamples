(function ($) {
	isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

	$(document).ready(function(){

		$.ajaxSetup({cache:false});
		$.when(
		    $.getJSON("/sites/default/files/data/prices-education.json?gsder=sdr2", function(data) {
		        priceData = data;
		    })
		).then(function() {
		    if (priceData) {
		        loadedFirst(priceData);
		    }
		    else {
		        // Request for graphic data didn't work, handle it
		    }
		});




		currencyCode={"GB": "GBP", "IE": "EUR", "EU": "EUR", "US": "USD", "CA": "CAD", "AU": "AUD", "NZ": "NZD", "Other": "USD"};
		VAT={"GB": 1.2, "IE": 1.2, "EU": 1.2, "US": 1, "CA": 1, "AU": 1, "NZ": 1, "Other": 1};

		//loadPrice().always(function (priceData) {
		var loadedFirst = function (priceData) {
			licenceLink = "EducationSubscription";

			if(typeof hljs !== 'undefined'){
				hljs.initHighlightingOnLoad();
			}
			mySlider = $("#edit-submitted-number-of-users-new").bootstrapSlider({
				ticks: [100, 300, 500, 1000, 3000, 5001],
			    ticks_positions: [1, 20, 40, 60, 80, 100],
			    ticks_labels: ['100', '300', '500', '1000', '3000', '5000+'],
			    min: 100,
			    max: 10000,
			    value: 100,
			    ticks_snap_bounds: 5,
			    tooltip: "hide",
			});
			mySlider.on("slideStop", function(sliderValue) {
				// Rounding - disabled
				/*
				if(sliderValue.value > 100 && sliderValue.value <= 200){
					userman = 100;
					mySlider.bootstrapSlider('setValue', userman, false, false);
				}
				if(sliderValue.value > 200 && sliderValue.value < 300){
					userman = 300;
					mySlider.bootstrapSlider('setValue', userman, false, false);
				}
				if(sliderValue.value > 300 && sliderValue.value <= 500){
					userman = 300;
					mySlider.bootstrapSlider('setValue', userman, false, false);
				}
				if(sliderValue.value > 500 && sliderValue.value < 1000){
					userman = 1000;
					mySlider.bootstrapSlider('setValue', userman, false, false);
				}
				*/
				changePrice(priceData);
			});

			$(document).on("keyup", "input[name=users]", function (e) {
				var userman = $("input[name=users]").val();
				// Above 1000
				// if(userman > 1000){
				// 	mySlider.bootstrapSlider('setAttribute', 'ticks_labels', ['0', '20', '50', '100', '300', '1000+']);
				// 	mySlider.bootstrapSlider('setAttribute', 'ticks', [0, 20, 50, 100, 300, userman]);
				// 	mySlider.bootstrapSlider('refresh');
				// }
				mySlider.bootstrapSlider('setValue', userman, false, false);
				changePrice(priceData);
			});


			// Set US default for US
			$('.i18n-en-US .order-licence-form #country').val('US');
			$('.i18n-en-US .order-licence-form #country').attr( "data-flag", "US" );
			
			
			$(window).on('load', function() {
				if(typeof cc == "undefined" || cc.length < 1) cc = "GB";
				$('.order-licence-form #country').val(cc);
				$('.order-licence-form #country, #edit-countrycodeselect').attr( "data-flag", cc );
				$('.i18n-en-US .order-licence-form #country').val('US');
				$('.i18n-en-US .order-licence-form #country').attr( "data-flag", "US" );
				
				// Loading cookies
				if(Cookies.get("home-reg-form-bf-user-number") !== null){
					$('.users-box input[value="'+Cookies.get("home-reg-form-bf-user-number")+'"]').attr('checked','checked');
				}
				if(Cookies.get("home-reg-form-bf-user-period") !== null){
					$('.period-box input[value="'+Cookies.get("home-reg-form-bf-user-period")+'"]').attr('checked','checked');
				}
				
				changePrice(priceData);
			});


			$('.order-licence-form select, .order-licence-form input').off().on('change', function(){
				if($(this)[0].name == "users"){
					$('input[name=users').val($(this).val());
					mySlider.bootstrapSlider('setValue', $(this).val(), false, false);
				}
				changePrice(priceData);
		  	});

			$('.submit-button-more a').on('click', function(e){
				e.stopImmediatePropagation();
				$('#block-readandspell-price-list-education-starter .users-box, #block-readandspell-price-list-education-starter .users-box-starter').toggle();
			});
			$('.mobile-users').off().on('click', function(e){
				$('.users-box-pop').toggleClass('open');
				$(this).toggleClass('open');
			});

		};
	});

	$(".cb_link").unbind().click(function (e) {
		//e.preventDefault();
		// Checking email in TTRS database
		email = $(this).parents().find('input[name=mailtest]').val();
		if(validateEmail(email)){
			$(this).addClass('emailcheck');
			var request = $.ajax({
			  url: "https://ttrsonline.com/registration/ApiIsEmailExist",
			  type: "POST",
			  data: {email : email},
			  dataType: "html"
			});


			request.fail(function(jqXHR, textStatus) {
			  console.log( "Request failed: " + textStatus );
			});

			request.done(function(msg) {
				$(".submit-button-edu .button-order-orange").removeClass('emailcheck');
				msgg = jQuery.parseJSON(msg);
				//console.log(msgg);
				//console.log(msgg.status);
			  	if(msgg.status == "success"){
					$('.email-error').hide('fast');

					var selectedCountry = $('#country').attr("data-flag");
					var selUserVal = $('input[name=users]').val();
					var selPeriodVal = $('input[name=period]:checked').attr("id").substring(1);
					var selPrice = $('input[name=period]:checked').attr("data-price");
					var total = (selPrice * selPeriodVal).toFixed(2);
					//var totalPrice = [];
					//totalPrice[1] = priceData.priceHome[selectedCountry].monthly1[selUserVal];
					//totalPrice[12] = priceData.priceHome[selectedCountry].annually[selUserVal];


					if(selectedCountry == "EU"){
						cbCountry = realCountry;
					}
					else{
						cbCountry = selectedCountry;
					}


					chargebeePopup(email, priceData, cbCountry, null, selUserVal);

				}
				else{
					$('.email-error').html('This email is already registered. Please <a href="http://www.ttrsonline.com/Account/LogOn" target="_blank">log in here.</a>').addClass('visible').show('blind', 500);
					$('.mailtest').addClass('error');
				}


			});
		}
		else{
			$('.email-error').html('Please enter a valid email address.').show('blind', 500);
			$('.mailtest').addClass('error');
		}
	});




	var chargebeePopup = function(eml, priceData, cbCountry, coupon = null, qty){
		var plan = $("#cb_plan").attr("data-plan");
		let cbInstance = Chargebee.getInstance();
		var customer = {email: eml, billing_address:{country: cbCountry}};
		var shippingAddress = {country: cbCountry};
		let cart = cbInstance.getCart();
		let product = cbInstance.initializeProduct(plan);
		product.setPlanQuantity(qty);
		product.addCoupon($.urlParam('coupon'));
		if(coupon != null){
		//	product.addCoupon("AUTUMN19");
		}
		cart.setShippingAddress(shippingAddress);
		cart.setCustomer(customer);
		cart.replaceProduct(product);
		cart.proceedToCheckout();
	}



	var changePrice = function(priceData){
		// Double form
		var selUserVal = $('input[name=users]:checked').val();
		var selPeriodVal = $('input[name=period]:checked').val();
		$('input[name=users]').removeClass('checked');
		$('input[name=users][value='+selUserVal+']').addClass('checked');
		$('input[name=period]').removeClass('checked');
		$('input[name=period][value='+selPeriodVal+']').addClass('checked');
		var licenceData = priceData.priceEdu;
	  	selectedCountry = $('.order-licence-form #country')[0].value;
		selectedUsers = $('.order-licence-form #edit-submitted-number-of-users-new')[0].value;

		$('.order-licence-form #country').attr( "data-flag", $('.order-licence-form #country')[0].value );

		if(selectedCountry == "IE"){
			selectedCountry = "EU";
			var ireland = "IE";
		}
		if(selectedCountry == "Other"){
			//	selectedCountry = "US";
			var postfix = " <small>USD</small> ";
		}
		else{
			var postfix = "";
		}
		var actualCurrency = licenceData[selectedCountry].currency;

	  	selectedUsersInJson = selectedUsers;
	  	if(selectedUsers>400){
	  		selectedUsersInJson = 401;
	  	}

	  	actualPriceMonthly1 = licenceData[selectedCountry].monthly1[selectedUsersInJson];
		//actualPriceMonthly3 = licenceData[selectedCountry].monthly3[selectedUsers];
		//actualPriceMonthly6 = licenceData[selectedCountry].monthly6[selectedUsers];
		actualPriceAnnualy = licenceData[selectedCountry].annually[selectedUsersInJson];
		var tiers = licenceData[selectedCountry].annually;
		if (!Object.keys) {
		  Object.keys = function(obj) {
		    var keys = [];

		    for (var i in obj) {
		      if (obj.hasOwnProperty(i)) {
		        keys.push(i);
		      }
		    }

		    return keys;
		  };
		}
		var tiersMax = Math.max.apply(this, Object.keys(tiers));
		var from = "";
		var vat = "";

		if(selectedCountry == "GB" || selectedCountry == "EU" ||  selectedCountry == "IE"){
			$('.include-vat').show();
		}
		else $('.include-vat').hide();

		var mpy = (actualPriceMonthly1*12*selectedUsers).toFixed(2);

		if(selectedUsers <= tiersMax){
			var mpm = 0;
			var ypy = 0;
			var ypys = 0;
			for (var i = 0; i <= selectedUsers; i++) {
				mpm += licenceData[selectedCountry].monthly1[i];
				ypy += licenceData[selectedCountry].annually[i];
				ypys += licenceData[selectedCountry].special[i];
			}
		}
		else{
			var mpm = 0;
			var ypy = 0;
			var ypys = 0;
			for (var i = 0; i <= tiersMax; i++) {
				mpm += licenceData[selectedCountry].monthly1[i];
				ypy += licenceData[selectedCountry].annually[i];
				ypys += licenceData[selectedCountry].special[i];
			}
			j = selectedUsers - tiersMax;
			mpm += j * licenceData[selectedCountry].monthly1[tiersMax];
			ypy += j * licenceData[selectedCountry].annually[tiersMax];
			ypys += j * licenceData[selectedCountry].special[tiersMax];
		}
		//var yuy = ((ypy / selectedUsers)/VAT[selectedCountry]);
		ypy = (ypy/VAT[selectedCountry]);
		ypys = (ypys/VAT[selectedCountry]);
		mpm = (mpm/VAT[selectedCountry]);

		var mum = mpm.toFixed(2);
		var fullpr = (mum*12).toFixed(2);
		var fullprY = ypy.toFixed(2);
		var fullprYS = ypys.toFixed(2);
		var yum = (ypy/12).toFixed(2);
		var yums = (ypys/12).toFixed(2);
		var perstudentM = (mpm / selectedUsers).toFixed(2);
		var perstudentY = (ypy / 12 / selectedUsers).toFixed(2);
		var perstudentYS = (ypys / 12 / selectedUsers).toFixed(2);

		if(selPeriodVal == "monthly"){
			var total = mum;
		}
		if(selPeriodVal == "Yearly"){
			var total = ypy.toFixed(2);
		}
		if(selPeriodVal == "YearlyS"){
			var total = ypys.toFixed(2);
		}

		$(".period.monthly1 .from").html(from + actualCurrency + mum + postfix);
		//$(".period.monthly1 .from-year").html(from + actualCurrency + fullpr + postfix);
		$(".period.monthly1 .from-year-student").html(from + actualCurrency + perstudentM + postfix);
		$(".period.annualy .from").html(from + actualCurrency + yum + postfix);
		//$(".period.annualy .from-year").html(from + actualCurrency + fullprY + postfix);
		$(".period.annualy .from-year-student").html(from + actualCurrency + perstudentY + postfix);
		$(".period.annualyS .from").html(from + actualCurrency + yums + postfix);
		//$(".period.annualyS .from-year").html(from + actualCurrency + fullprYS + postfix);
		$(".period.annualyS .from-year").html(from + actualCurrency + perstudentYS + postfix);
		$(".t-savepr").html(from + actualCurrency + total + postfix);


		if(selectedUsers > 5000){
			$("label.period, .off").hide('fast', function(){ $(this).css('overflow','visible') });
			$(".contact-box").show('fast', function(){ $(this).css('overflow','visible') });
		}
		else{
			$(".contact-box").hide('fast', function(){ $(this).css('overflow','visible') });
			$("label.period, .off").show('fast', function(){ $(this).css('overflow','visible') });
		}
		var period = $('input[name=period]:checked', '.order-licence-form').val();
		if($('#paymentMethod').length > 0){
			var paymentMethod = "&payment=" + $('#paymentMethod')[0].value;
		}
		else{ var paymentMethod = ""; }


		// Temporary link
		// adding utm parameters to url
		var utm_parameter_string = "";
		if($.urlParam("code")) utm_parameter_string += "&code=" + $.urlParam("code");
		if($.urlParam("utm_source")) utm_parameter_string += "&utm_source=" + $.urlParam("utm_source");
		if($.urlParam("utm_medium")) utm_parameter_string += "&utm_medium=" + $.urlParam("utm_medium");
		if($.urlParam("utm_campaign")) utm_parameter_string += "&utm_campaign=" + $.urlParam("utm_campaign");
		if($.urlParam("utm_term")) utm_parameter_string += "&utm_term=" + $.urlParam("utm_term");

		if(selectedCountry == "EU"){
			realCountry = Cookies.get("geoip_country");
		}
		else realCountry = selectedCountry;

		//	$(".total-text").html(actualCurrency + total);
		//	$(".term-text").html(termText);

		var selectedPlan;
		if($("#m1").hasClass("checked")){
			selectedPlan = licenceData[selectedCountry].planIdMonthly;
			$(".t-fullpr").html("");
			$(".t-term").html("/ month");
			$('.special-banner').hide();
		}
		if($("#m12").hasClass("checked")){
			selectedPlan = licenceData[selectedCountry].planIdYearly;
			$(".t-fullpr").html(from + actualCurrency + fullpr + postfix);
			$(".t-term").html("1 year");
			$('.special-banner').hide();
		}
		if($("#m12S").hasClass("checked")){
			selectedPlan = licenceData[selectedCountry].planIdSpecial;
			$(".t-fullpr").html(from + actualCurrency + fullprY + postfix);
			$(".t-term").html("1 year");
			$('.special-banner').show();
		}


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

		$("#cb_plan").attr("data-plan", selectedPlan);

	//	});
	};
	/*
	$(".submit-button-edu .button-order-orange").unbind().on('click', function(e){
		var email="testmail001@testmail.test";
		var priceData = $(".button-order-orange").attr("data-plan");
		if(selectedCountry == "EU"){
			cbCountry = realCountry;
		}
		else{
			cbCountry = selectedCountry;
		}

		chargebeePopup(email, priceData, cbCountry, null, selectedUsers);
	});
	*/


}(jQuery));

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
