(function ($) {
	isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

	$(document).ready(function(){

		$.ajaxSetup({cache:false});
		$.when(
		    $.getJSON("/sites/default/files/data/prices-home-tier.json"),
		    $.getJSON("/sites/default/files/data/prices-home-discount.json")
		).then(function(resp1, resp2) {
		    if (resp1) {
		    	priceData = resp1[0];
		    	priceDataDiscount = resp2[0];
		        loadedFirst(resp1[0], resp2[0]);
		    }
		    else {
		        // Request for graphic data didn't work, handle it
		        console.log("error");
		    }

		}).fail(function (problem) {
	      // handle errors (some request has failed)
	      console.log(problem);
  		});


		currencyCode={"GB": "GBP", "IE": "EUR", "EU": "EUR", "US": "USD", "CA": "CAD", "AU": "AUD", "NZ": "NZD", "Other": "USD"};
		VAT={"GB": 1.2, "IE": 1.23, "EU": 1.23, "US": 1, "CA": 1, "AU": 1, "NZ": 1, "Other": 1};

		var loadedFirst = function (priceData, priceDataDiscount) {
			licenceLink = "EducationSubscription";

			// Set US default for US
			$('.i18n-en-US .order-licence-form #country').val('US');
			$('.i18n-en-US .order-licence-form #country').attr( "data-flag", "US" );
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

			changePrice(priceData, priceDataDiscount);

			$('.order-licence-form select, .order-licence-form input').off().on('change', function(){
				changePrice(priceData, priceDataDiscount);
			});

            $('.users-box .plus').on('click', function(){
				$('input[name="users"]').each(function(){
					if($(this).get(0).value < 10) {
						$(this).get(0).value++;
					}
				});
				changePrice(priceData, priceDataDiscount);
            });
            $('.users-box .minus').on('click', function(){
				$('input[name="users"]').each(function(){
					if($(this).get(0).value > 1) {
                    	$(this).get(0).value--;
                	}
				});
				changePrice(priceData, priceDataDiscount);
            });

		}
	});

	$("a.cb_link").unbind().on('click', function(e) {
		// Checking email in TTRS database

		// @debug
		email = $(this).parents().find('input[name=mailtest]').val();
	//	Drupal.watchdog('Start now click', 'Email: ' + email + ' Click test OK', Array(), Drupal.watchdog.DEBUG);
		if(validateEmail(email)){

					$('.email-error').hide('fast');

					var selectedCountry = $('#country').attr("data-flag");
					var selUserVal = $('input[name=users]').val();
					var selPeriodVal = $('input[name=period]:checked').attr("id").substring(1);
					var selPrice = $('input[name=period]:checked').attr("data-price");
					var total = (selPrice * selPeriodVal).toFixed(2);

					if(selectedCountry == "EU"){
						cbCountry = realCountry;
					}
					else{
						cbCountry = selectedCountry;
					}

					if($('body.mobile').length > 0 || $('body.safari').length > 0 ){
						chargebeeLink(email, priceData, cbCountry, null, selUserVal);
					}
					else{
						chargebeePopup(email, priceData, cbCountry, null, selUserVal);
					}

				// @debug
			//	Drupal.watchdog('Start now click', 'Email: ' + email + ' ' + request.responseText, Array(), Drupal.watchdog.DEBUG);

		}
		else{
			$('.email-error').html('Please enter a valid email address.').show('blind', 500);
			$('.mailtest').addClass('error');
		}
	});

	var chargebeePopup = function(eml, priceData, cbCountry, coupon = null, qty){

        var cbInstance, cart;
		
		if (window.location.hostname == 'www.readandspell.com' || window.location.hostname == 'readandspell.com'){
			var site = "readandspell";
		}
		else {
			var site = "readandspell-test";
		}
        cbInstance = Chargebee.init({
            site: site,
            isItemsModel: true,
        });

        cbInstance.setCheckoutCallbacks(function(cart) {
            return {
                success: function(hpid) {
                    console.log('success', hpid)
                },
				close: function() {
					console.log("checkout closed");
					window.dataLayer = window.dataLayer || [];
					window.dataLayer.push({
						'event': 'closingPopup'});
				}
            }
        })		
		
		
		const planPriceId = $("#cb_plan").attr("data-plan");
		var customer = {email: eml, billing_address:{country: cbCountry}};
		var shippingAddress = {country: cbCountry};
		cart = cbInstance.getCart();
		const product = cbInstance.initializeProduct(planPriceId, qty);
		product.addCoupon($.urlParam('coupon'));
		if(coupon != null){
			//	product.addCoupon("AUTUMN19");
		}
        
		cart.setShippingAddress(shippingAddress);
		cart.setCustomer(customer);
		cart.replaceProduct(product);
		cart.proceedToCheckout();
		
		// @debug
		//Drupal.watchdog('chargebeePopup', 'Email: ' + eml + ' ' + product.planId, Array(), Drupal.watchdog.DEBUG);
	}
	
	var chargebeeLink = function(eml, priceData, cbCountry, coupon = null, qty){
		if (window.location.hostname == 'www.readandspell.com' || window.location.hostname == 'readandspell.com'){
			var site = "readandspell";
		}
		else {
			var site = "readandspell-test";
		}
		var plan = $("#cb_plan").attr("data-plan");
		if(coupon == null){
			if($.urlParam('coupon') == null){
				coupon = '';
			}
			else{
				coupon = "&coupon_ids[0]=" + $.urlParam('coupon');
			}
		}
		var link = "https://" + site + ".chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=" + plan + "&subscription_items[quantity][0]=" + qty + "&customer[email]=" + eml + coupon;
	//	Drupal.watchdog('chargebeLink', 'Email: ' + eml + ' Link: ' + link, Array(), Drupal.watchdog.DEBUG);
		window.location.href = link;
	}
	
	changePrice = function(priceData, priceDataDiscount){
		if (window.location.hostname == 'www.readandspell.com' || window.location.hostname == 'readandspell.com'){
			var planBase = "Home-1-10";
		}
		else {
			var planBase = "Test_1-10";
		}
		// Double form
		var selUserVal = $('input[name=usersstarter]:checked').val();
		var selPeriodVal = $('input[name=period]:checked').val();
		$('input[name=usersstarter]').removeClass('checked');
		$('input[name=usersstarter][value='+selUserVal+']').addClass('checked');
		$('input[name=period]').removeClass('checked');
		$('input[name=period][value='+selPeriodVal+']').addClass('checked');
		var	licenceData = priceData.priceHome;
		var	licenceDataS = priceDataDiscount.priceHomeDiscount;
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


	  	actualPriceMonthly1 = licenceData[selectedCountry].monthly1[selectedUsersInJson];
			actualPriceMonthly3 = licenceDataS[selectedCountry].monthly3[selectedUsers];
		//actualPriceMonthly6 = licenceData[selectedCountry].monthly6[selectedUsers];
		actualPriceAnnualy = licenceData[selectedCountry].annually[selectedUsersInJson];

		var from = "";
		var vat = "";

		if(selectedCountry == "GB" || selectedCountry == "EU" ||  selectedCountry == "IE"){
			$('.include-vat').show();
		}
		else $('.include-vat').hide();

	//	if(selectedUsers > 4) selectedUsers = 4;

		mpm = licenceData[selectedCountry].monthly1[1];
		mpm2 = licenceData[selectedCountry].monthly1[2];
		ypy = licenceData[selectedCountry].annually[1];
		ypy2 = licenceData[selectedCountry].annually[2];

        var tiersM = 0;
        var tiersY = 0;
        if(selectedUsers > 1) {
            tiersM = (selectedUsers - 1) * mpm2;
            tiersY = (selectedUsers - 1) * ypy2;
        }

		var mum = (mpm + tiersM).toFixed(2);
		var mpy = (mum*12).toFixed(2);
		var fullpr = (ypy + tiersY).toFixed(2);
		var fullprY = (ypy + tiersY).toFixed(2);
		var yum = ((ypy + tiersY)/12).toFixed(2);

		if(selPeriodVal == "monthly"){
			var total = mum;
		}
		if(selPeriodVal == "monthly3"){
			var total = mum3;
		}
		if(selPeriodVal == "Yearly"){
			var total = (ypy + tiersY).toFixed(2);
		}

		$(".period.monthly1 .from").html(from + actualCurrency + mum + postfix);
		$(".period.monthly1 .from-year").html(from + actualCurrency + mpy + postfix);
		$(".period.annualy .from").html(from + actualCurrency + yum + postfix);
		$(".period.annualy .from-year").html(from + actualCurrency + fullprY + postfix);
		$(".t-savepr").html(from + actualCurrency + total + postfix);


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

		period = period.charAt(0).toUpperCase() + period.slice(1);
		if(period == "YearlyS") {period = "Yearly";}
		if(period == "Yearly") {planPeriod = "Yearly"}
			else planPeriod = "Monthly";

		var selectedPlan;
		if($("#m1").hasClass("checked")){
			var planUsers = {"1":"individual", "4":"family"};
			selectedPlan = planBase + '-' + currencyCode[selectedCountry] + '-' + planPeriod;
			$(".t-fullpr").html("");
			$(".t-term").html("/ month");
			$('.special-banner').hide();
		}
		if($("#m12").hasClass("checked")){
			var planUsers = {"1":"individual", "4":"family"};
			selectedPlan = planBase + '-' + currencyCode[selectedCountry] + '-' + planPeriod;
			$(".t-fullpr").html(from + actualCurrency + mpy + postfix);
			$(".t-term").html("1 year");
			$('.special-banner').hide();
		}

		if(selectedPlan !== undefined){
			//selectedPlan = selectedPlan.toLowerCase();
			$("#cb_plan").attr("data-plan", selectedPlan);
			$("#start_now_button").attr("data-cb-item-0", selectedPlan);
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

	};

}(jQuery));

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
