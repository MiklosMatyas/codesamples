(function ($) {
	isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

	$(document).ready(function(){

		$.ajaxSetup({cache:false});
		$.when(
		    $.getJSON("/sites/default/files/data/prices-education-2024.json?gsder=sdr2", function(data) {
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

			// Set US default for US
			$('.i18n-en-US .order-licence-form #country').val('US');
			$('.i18n-en-US .order-licence-form #country').attr( "data-flag", "US" );
			
			
		//	$(window).load(function() {
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
		//	});

			$('label[for=more]').off().on('click', function(){
				$('.quote-form').addClass('quote-visible');
				$('.period-box, .mailtest-wrapper, .company-wrapper, .payment-box, .submit-button-edu, .freetrial, .small-text').hide();
				$('.include-vat, .pusd').css('visibility', 'hidden');
			});
			$('label[for=u5], label[for=u10], label[for=u20]').off().on('click', function(){
				$('.quote-form').removeClass('quote-visible');
				$('.period-box, .mailtest-wrapper, .company-wrapper, .payment-box, .submit-button-edu, .freetrial, .small-text').show();
				$('.include-vat, .pusd').css('visibility', 'visible');
			});
			$('.order-licence-form select, .order-licence-form input').off().on('change', function(){
				changePrice(priceData);
            });
            $('input[name="switch"]').off().on('change', function(){
                changePrice(priceData);
            });
            $('#edit-submitted-number-of-users-new').off().on('change', function(){
            //    var u = $(this).val();
            //    $(".student-buttons input[value="+u+"]").prop('checked', true);
            //    $("#edit-submitted-number-of-users-new").val(u);
                changePrice(priceData);
            });
            $('.period-box .total').off().on('click', function(){
				$('.period-box .total').removeClass('selected');
                $(this).addClass('selected');
				changePrice(priceData);
            });
			$('.view-full').off().on('click', function(){
				$('.period-box').toggleClass('full');
				$('.view-full').toggleClass('hide');
			});
			$('.view-full.hide').off().on('click', function(){
				$('.period-box').toggleClass('full');
				$('.view-full').toggleClass('hide');
			});

		};

        // Submit button click
        $(".cb_link").off().on('click', function (e) {
            // Form validation
			var isValid = 0;
            email = $(this).parents().find('input[name=mailtest]').val();
            company = $(this).parents().find('input[name=company]').val();
            if(validateEmail(email)){
                $(this).addClass('emailcheck');
                $(".submit-button-edu .button-order-orange").removeClass('emailcheck');
                $('.email-error').hide('fast');
                var selectedCountry = $('#country').attr("data-flag");
                var selUserVal = $('#edit-submitted-number-of-users-new').val();
                if(selectedCountry == "EU"){
                    cbCountry = realCountry;
                }
                else{
                    cbCountry = selectedCountry;
                }
				
				isValid ++;
				$('.mailtest').removeClass('error');
				$('.email-error').hide('blind', 500);

            }
            else{
				$('.email-error').html('Please enter a valid email address.').show('blind', 500);
                $('.mailtest').addClass('error');
            }
			
			if(company.length > 1){
				isValid ++;
				$('.company').removeClass('error');
				$('.company-error').hide('blind', 500);
			}
			else{
				$('.company-error').html('Please enter the name of your school.').show('blind', 500);
				$('.company').addClass('error');
			}

			if(isValid >= 2){
				chargebeeLink(company, email, cbCountry, null, selUserVal);
			}
        });
	});

	var chargebeePopup = function(comp, eml, cbCountry, coupon = null, qty){
        var cbInstance, cart;

		if (window.location.hostname == 'www.readandspell.com' || window.location.hostname == 'readandspell.com'){
			var site = "readandspell";
		}
		else {
			var site = "readandspell-test";
		}
		// For temporary testing
		var site = "readandspell";

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
					window.dataLayer = window.dataLayer || [];
					window.dataLayer.push({
						'event': 'closingPopup'});
				}
            }
        })		
		
		const planPriceId = $("#cb_plan").attr("data-plan");
		var customer = {email: eml, company: comp, billing_address:{country: cbCountry}};
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
		Drupal.watchdog('chargebeePopup', 'Email: ' + eml + ' ' + 'Company: ' + comp + ' | ' + product.planId, Array(), Drupal.watchdog.DEBUG);
	}

	var chargebeeLink = function(comp, eml, cbCountry, coupon = null, qty){
		if (window.location.hostname == 'www.readandspell.com' || window.location.hostname == 'readandspell.com'){
			var site = "readandspell";
		}
		else {
			//var site = "readandspell-test";
			var site = "readandspell";
		}
		var plan = $("#cb_plan").attr("data-plan");
		if(coupon == null){
			if($.urlParam('coupon') == null || $.urlParam('coupon') == ''){
				coupon = '';
			}
			else{
				coupon = "&coupon_ids[0]=" + $.urlParam('coupon');
			}
		}
		var link = "https://" + site + ".chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=" + plan 
				+ "&subscription_items[quantity][0]=" + qty 
				+ "&customer[email]=" + eml + coupon 
				+ "&customer[company]=" + comp 
				+ "&billing_address[country]=" + cbCountry
				+ "&billing_address[state_code]=AL";

		Drupal.watchdog('chargebeLink', 'Email: ' + eml + ' Link: ' + link, Array(), Drupal.watchdog.DEBUG);
		window.location.href = link;
	}

	var changePrice = function(priceData){
		var selUserVal = $('#edit-submitted-number-of-users-new:checked').val();
        if ($('input[name=switch]').is(':checked') == true) {
            var selPeriodVal = "annually";
			var selPeriodDisplay = " <span class='selperiod'>/year</span>";
        }
        else {
			var selPeriodVal = "monthly";
			var selPeriodDisplay = " <span class='selperiod'>/month</span>";
        }
		$('#edit-submitted-number-of-users-new').removeClass('checked');
		$('#edit-submitted-number-of-users-new[value='+selUserVal+']').addClass('checked');
		var licenceDataLite = priceData.Lite_package;
		var licenceDataStandard = priceData.Standard_package;
		var licenceDataPremium = priceData.Premium_package;
	  	selectedCountry = $('.order-licence-form #country')[0].value;
		selectedUsers = $('.order-licence-form #edit-submitted-number-of-users-new')[0].value;

		$('.order-licence-form #country').attr( "data-flag", $('.order-licence-form #country')[0].value );

		var actualCurrency = licenceDataLite[selectedCountry].currency;

		var from = "";

		if(selectedCountry == "GB" || selectedCountry == "EU" ||  selectedCountry == "IE"){
			$('.include-vat').show();
		}
		else $('.include-vat').hide();

	//	if(selectedUsers <= 20){
		console.log("selectedUsers:");
		console.log(selectedUsers);
            var tYearprLite = licenceDataLite[selectedCountry][selPeriodVal][selectedUsers];
            var tYearprStandard = licenceDataStandard[selectedCountry][selPeriodVal][selectedUsers];
            var tYearprPremium = licenceDataPremium[selectedCountry][selPeriodVal][selectedUsers];
			
			var tYearprLiteVAT = (tYearprLite * VAT[selectedCountry]).toFixed(2);
			var tYearprStandardVAT = (tYearprStandard * VAT[selectedCountry]).toFixed(2);
			var tYearprPremiumVAT = (tYearprPremium * VAT[selectedCountry]).toFixed(2);
            
			var tUserPrLite = (tYearprLite / selectedUsers).toFixed(2);
            var tUserPrStandard = (tYearprStandard / selectedUsers).toFixed(2);
            var tUserPrPremium = (tYearprPremium / selectedUsers).toFixed(2);

			$("label.period, .off").show('fast', function(){ $(this).css('overflow','visible') });

            // Updating prices on the front end.
            $(".lite .t-yearpr").html(actualCurrency + tYearprLite + selPeriodDisplay);
            $(".standard .t-yearpr").html(actualCurrency + tYearprStandard + selPeriodDisplay);
            $(".premium .t-yearpr").html(actualCurrency + tYearprPremium + selPeriodDisplay);
			
			// VAT price for UK
			if(selectedCountry == "GB") {
				$(".period-box .total").removeClass("no-VAT");
				$(".lite .t-yearpr-vat").html(actualCurrency + tYearprLiteVAT + " inc VAT").show();
				$(".standard .t-yearpr-vat").html(actualCurrency + tYearprStandardVAT + " inc VAT").show();
				$(".premium .t-yearpr-vat").html(actualCurrency + tYearprPremiumVAT + " inc VAT").show();
			}
			else {
				$(".period-box .total").addClass("no-VAT");
				$(".lite .t-yearpr-vat").html("");
				$(".standard .t-yearpr-vat").html("");
				$(".premium .t-yearpr-vat").html("");
			}

			// Per user price disabled temporary
            //$(".lite .t-userpr").html(actualCurrency + tUserPrLite + " / student");
            //$(".standard .t-userpr").html(actualCurrency + tUserPrStandard + " / student");
            //$(".premium .t-userpr").html(actualCurrency + tUserPrPremium + " / student");


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

		$(".student-acc").html('Up to ' + selectedUsers + ' users');

		var selectedPlan;

        if($(".period-box .lite").hasClass("selected")){
            selectedPlan = licenceDataLite[selectedCountry][selPeriodVal].planId;
		}
		if($(".period-box .standard").hasClass("selected")){
			selectedPlan = licenceDataStandard[selectedCountry][selPeriodVal].planId;
		}
		if($(".period-box .premium").hasClass("selected")){
			selectedPlan = licenceDataPremium[selectedCountry][selPeriodVal].planId;
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

	};



}(jQuery));

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
