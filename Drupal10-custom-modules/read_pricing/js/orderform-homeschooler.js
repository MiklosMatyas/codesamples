(function ($) {

	$(document).ready(function(){

		$.ajaxSetup({cache:false});
		$.when(
		    $.getJSON("/sites/default/files/data/prices-homeschool.json"),
		    $.getJSON("/sites/default/files/data/prices-home.json")
		).then(function(resp1, resp2) {
		    if (resp1) {
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

		// Autumn special option
		/*
		if($.urlParam('utm_source') != 'referral' && $.urlParam('rfsn') == null){
			$('.autumn-special').show();
		}
		*/

		var loadedFirst = function (priceData, priceDataHome = null) {
			licenceLink = "HomeLicence";
			if($('.order-form-home .order-licence-form').length >= 1){
				// Set US default for all
				//$('.selected-currency').removeClass('cy-uk').addClass('cy-us').html('<span>USD</span>');

				if(typeof cc == "undefined" || cc.length < 1) cc = "IE";
				$('.order-licence-form #country').val(cc);
				$('.order-licence-form #country, #edit-countrycodeselect').attr( "data-flag", cc );
				// Set US default for US
				$('.i18n-en-US .order-licence-form #country').val('US');
				$('.i18n-en-US .order-licence-form #country').attr( "data-flag", "US" );

				// Loading cookies
				if(Cookies.get("home-reg-form-bf-user-number") !== null){
					$('.users-box input[value="' + Cookies.get("home-reg-form-bf-user-number")+'"]').attr('checked','checked');
				}
				if(Cookies.get("home-reg-form-bf-user-period") !== null){
					$('.period-box input[value="' + Cookies.get("home-reg-form-bf-user-period")+'"]').attr('checked','checked');
				}


				changePrice(priceData, priceDataHome);
				$('#country').off().on('change', function(e){
					changePrice(priceData, priceDataHome);
				});
				$('.order-licence-form input[type=radio]').off().on('change', function(e){
					changePrice(priceData, priceDataHome);
				});
			}


			$(".submit-button.homelicence .ttrs_button").unbind().click(function (e) {
				//e.preventDefault();
				var confirm = false;
				if($('input[name="confirm"]').is(':checked')){
					var confirm = true;
					$(".confirm-error").hide('fast');
				}
				else{
					$(".confirm-error").html("Please confirm this statement.").show('blind', 500);
					var confirm = false;
				}
				// Checking email in TTRS database
				email = $(this).parents().find('input[name=mailtest]').val();
				if(confirm === true){
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
							$(".submit-button.homelicence .ttrs_button").removeClass('emailcheck');
							msgg = jQuery.parseJSON(msg);
							//console.log(msgg);
							//console.log(msgg.status);
						  	if(msgg.status == "success"){
								$('.email-error').removeClass('visible');

								var selectedCountry = $('#country').attr("data-flag");
								var selUserVal = $('input[name=users]:checked').val();
								var selPeriodVal = $('input[name=period]:checked').attr("id").substring(1);
								var selPrice = $('input[name=period]:checked').attr("data-price");
								var total = (selPrice * selPeriodVal).toFixed(2);
								var totalPrice = [];
								//totalPrice[1] = priceData.priceHomeschool[selectedCountry].monthly1[selUserVal];
								totalPrice[12] = priceData.priceHomeschool[selectedCountry].annually[selUserVal];

			   					// Sending dataLayer addToCart
								window.dataLayer = window.dataLayer || []
								dataLayer.push({
									'event': 'addToCart',
									'ecommerce': {
										'currencyCode': 'USD', // currency
										'add': { // 'add' actionFieldObject measures.
											'products': [{ // adding a product to a shopping cart.
											'name': "TTRS Home Course",
											'id': '0001',
											'price': total, // the price of the course
											'brand': 'TTRS',
											'category': 'Course',
											'variant': 'Home',
											'quantity': 1
											}]
										}
									}
								});

								if(selectedCountry == "EU"){
									cbCountry = realCountry;
								}
								else{
									cbCountry = selectedCountry;
								}

								// Annual popup
								if(typeof annualPopupShowed === 'undefined' && $(".period-box:nth(0) #m1").hasClass("checked")){
									var pm = $(".period-box:nth(0) #m1").attr("data-price");
									var py = $(".period-box:nth(0) #m12").attr("data-price");
									var dc = $(".period-box:nth(0) #m1").attr("data-curr");
									$(".annual-popup-wrapper .p-m").html(dc+pm);
									$(".annual-popup-wrapper .p-y").html(dc+py);
									$(".annual-popup-wrapper").show(100);
								}
								$(".annual-popup-wrapper a").on("click", function(){
									annualPopupShowed = true;
									$(".annual-popup-wrapper").hide(100);
									$(".annual-popup-wrapper").addClass('hidden');
									$(".buy-section.annualy").trigger("click");
									chargebeePopup(email, priceData, cbCountry);
								});
								$(".annual-popup-close").on("click", function(){
									annualPopupShowed = true;
									$(".annual-popup-wrapper").hide(100);
									$(".annual-popup-wrapper").addClass('hidden');
									$(".buy-section.monthly").trigger("click");
									chargebeePopup(email, priceData, cbCountry);
								});

								// Chargebee dynamic link
								if(typeof annualPopupShowed !== 'undefined' || $(".period-box:nth(0) #m12, .period-box:nth(0) #m12S, .period-box:nth(0) #m1").hasClass("checked")){
									if($(".period-box:nth(0) #m12S").hasClass("checked")){
										var dataCoupon = $(".period-box:nth(0) #m12S").attr("data-coupon");
									}
									chargebeePopup(email, priceData, cbCountry, dataCoupon);
								}
							}
							else{
								$('.email-error').html('This email is already registered. Please <a href="http://www.ttrsonline.com/Account/LogOn" target="_blank">log in here.</a>').addClass('visible').show('blind', 500);
								$('.mailtest').addClass('error');
							}


						});
					}
					else{
						$('.email-error').html('Please enter a valid email address.').addClass('visible').show('blind', 500);
						$('.mailtest').addClass('error');
					}
				}
			});

		};
	
	var chargebeePopup = function(eml, priceData, cbCountry, coupon = null){
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
                }
            }
        })		
		
		
		const planPriceId = $("#cb_plan").attr("data-plan");
		var customer = {email: eml, billing_address:{country: cbCountry}};
		var shippingAddress = {country: cbCountry};
		cart = cbInstance.getCart();
		const product = cbInstance.initializeProduct(planPriceId, 1);
		product.addCoupon($.urlParam('coupon'));
		if(coupon != null){
			//	product.addCoupon("AUTUMN19");
		}
		cart.setShippingAddress(shippingAddress);
		cart.setCustomer(customer);
		cart.replaceProduct(product);
		cart.proceedToCheckout();
	}

	var changePrice = function(priceData, priceDataHome = null){
		// Double form 
		var selUserVal = $('input[name=users]:checked').val();
		var selPeriodVal = $('input[name=period]:checked').val();
		$('input[name=users]').removeClass('checked');
		$('input[name=users][value='+selUserVal+']').addClass('checked');
		$('input[name=period]').removeClass('checked');
		$('input[name=period][value='+selPeriodVal+']').addClass('checked');
		$('.recurring p').hide();
		$('.recu-'+selPeriodVal).show();

			var	licenceData = priceData.priceHomeschool;
			var	licenceDataHome = priceDataHome.priceHome;
			var selectedCountry = $('.order-licence-form #country')[0].value;
			//  	console.log("selectedCountry: "+selectedCountry);
			var selectedUsers = $('input[name=users]:checked').val();
			if(selectedUsers == 5){
				planUsers = 4;
			}
			else{
				planUsers = 1;
			}

			  $('.order-licence-form #country').attr( "data-flag", $('.order-licence-form #country')[0].value );

				var ireland = "";
				if(selectedCountry == "IE"){
					selectedCountry = "EU";
					ireland = "IE";
				}
			  if(selectedCountry == "Other"){
			  //	selectedCountry = "US";
				var postfix = " <small>USD</small> ";
			  }
			  else{
				var postfix = "";
			  }

			  
			  var actualCurrency = licenceData[selectedCountry].currency;

				actualPriceMonthly1 = licenceDataHome[selectedCountry].monthly1[planUsers];
			//	actualPriceMonthly3 = licenceData[selectedCountry].monthly3[selectedUsers];
				actualPriceAnnualy = licenceData[selectedCountry].annually[selectedUsers] / 12;
				actualPriceYear = licenceData[selectedCountry].annually[selectedUsers];
				totalPrice = [];
				totalPrice['monthly'] = licenceDataHome[selectedCountry].monthly1[planUsers];
		//		totalPrice['monthly3'] = licenceData[selectedCountry].monthly3[selectedUsers];
				totalPrice['Yearly'] = licenceData[selectedCountry].annually[selectedUsers];

		//	  var annualSDiscount = licenceData[selectedCountry].annually[selectedUsers] * 0.27;
		//	  actualPriceAnnualyS = ((licenceData[selectedCountry].annually[selectedUsers] - annualSDiscount) / 12).toFixed(2);
			  if(actualPriceMonthly1 % 1 !== 0) { actualPriceMonthly1 = actualPriceMonthly1.toFixed(2); }
		//	  if(actualPriceMonthly3 % 1 !== 0) { actualPriceMonthly3 = actualPriceMonthly3.toFixed(2); }
			  if(actualPriceAnnualy % 1 !== 0) { actualPriceAnnualy = actualPriceAnnualy.toFixed(2); }
			  var from = "";
			  var vat = "";

			  if(selectedCountry == "GB" || selectedCountry == "EU"){
				$('.include-vat').show();
			  }
			  else $('.include-vat').hide();

			  //$(".ireland-box").hide('fast');
			  $(".users-box, .payment-box, .period-box, label[for=subscription]").show('fast', function(){ $(this).css('overflow','visible') });

			  var from_m = (priceDataHome.priceHome[selectedCountry].monthly1[planUsers]).toFixed(2);
			  var from_m_12 = (priceDataHome.priceHome[selectedCountry].monthly1[planUsers] * 12).toFixed(2);
			  $(".buy-section.monthly .from").html(actualCurrency + from_m + postfix);
			  $(".buy-section.monthly .from-year").html(actualCurrency + from_m_12 + postfix);
			  $(".buy-section.annualy .from").html(from + actualCurrency + actualPriceAnnualy + postfix);
			  $(".buy-section.annualy .from-year").html(actualCurrency + actualPriceYear + postfix);
			  var oldp = (priceDataHome.priceHome[selectedCountry].annually[planUsers] / 12).toFixed(2);
			  $(".oldp").html(actualCurrency + oldp + postfix);
			  if(selPeriodVal == "Yearly"){
				  var fullpr = (priceDataHome.priceHome[selectedCountry].annually[planUsers]).toFixed(2);
				//  console.log(oldp);
				  $(".t-fullpr").html(actualCurrency + fullpr + postfix);
				  $(".t-savepr").html(actualCurrency + licenceData[selectedCountry].annually[selectedUsers] + postfix);
				  $(".t-term").html("1 year");
				  $('.special-banner').show();
				}
				else{
					var savepr = (priceDataHome.priceHome[selectedCountry].monthly1[planUsers]).toFixed(2);
					$(".t-fullpr").html("");
					$(".t-savepr").html(actualCurrency + savepr + postfix);
					$(".t-term").html("/ month");
					$('.special-banner').hide();
			  }
			  

			  // Year per user price 
			  //var annualUser = (actualPriceAnnualy ) / selectedUsers;
			  var annualUser = actualPriceAnnualy;
			  //annualUser = annualUser.toFixed(2);
			  $(".buy-section.annualy .from").html(from + actualCurrency + annualUser + postfix);
			  
			  $(".buy-section.monthly .from").append(vat);
			  $(".buy-section.annualy .from").append(vat);
			  $('.order-licence-form #users').show();

			  $("input#m1").attr({"data-period": "monthly1", "data-price": actualPriceMonthly1, "data-ccode": currencyCode[selectedCountry], "data-curr": actualCurrency});
		//	  $("input#m3").attr({"data-period": "monthly3", "data-price": actualPriceMonthly3, "data-ccode": currencyCode[selectedCountry], "data-curr": actualCurrency});
			  $("input#m12").attr({"data-period": "annually", "data-price": actualPriceAnnualy, "data-ccode": currencyCode[selectedCountry], "data-curr": actualCurrency});
			  // Discount line
			  //$("input#m12S").attr({"data-period": "annually", "data-price": actualPriceAnnualyS, "data-ccode": currencyCode[selectedCountry], "data-curr": actualCurrency});
			 // var discountPrice = priceDataHome.priceHomeDiscount[selectedCountry].annually[selectedUsers];
			 // var discountPricePerMonth = (discountPrice / 12).toFixed(2);
			 // $("input#m12S").attr({"data-period": "annually", "data-price": discountPrice, "data-ccode": currencyCode[selectedCountry], "data-curr": actualCurrency});
			 // $(".buy-section.annualyS .from").html(from + actualCurrency + discountPricePerMonth + postfix);

			  // 3-month plan
		//	  var discountPrice3m = priceDataHome.priceHomeDiscount[selectedCountry].monthly3[selectedUsers];
		//	  var discountPricePerMonth3m = (discountPrice3m / 3).toFixed(2);
		//	  $("input#m3").attr({"data-period": "quarterly", "data-price": discountPrice3m, "data-ccode": currencyCode[selectedCountry], "data-curr": actualCurrency});
		//	  $(".buy-section.monthly3 .from").html(from + actualCurrency + discountPricePerMonth3m + postfix);

			$(".contact-box").hide('fast', function(){ $(this).css('overflow','visible') });
			$("label.period, .off").show('fast', function(){ $(this).css('overflow','visible') });

			  var period = $('input[name=period]:checked', '.order-licence-form').val();
			  if($('#paymentMethod').length > 0){
				var paymentMethod = "&payment=" + $('#paymentMethod')[0].value;
			  }
			  else{ var paymentMethod = ""; }
		
		// Temporary link
		// adding utm parameters to url
		var utm_parameter_string = "";
		if($.urlParam("code")) utm_parameter_string += "&code=" + $.urlParam("code");
		if($.urlParam("coupon")) utm_parameter_string += "&coupon=" + $.urlParam("coupon");

		if($.urlParam("utm_source")) utm_parameter_string += "&utm_source=" + $.urlParam("utm_source");
		if($.urlParam("utm_medium")) utm_parameter_string += "&utm_medium=" + $.urlParam("utm_medium");
		if($.urlParam("utm_campaign")) utm_parameter_string += "&utm_campaign=" + $.urlParam("utm_campaign");
		if($.urlParam("utm_term")) utm_parameter_string += "&utm_term=" + $.urlParam("utm_term");

		if(selectedCountry == "EU"){
			realCountry = Cookies.get("geoip_country");
			if(ireland == "IE"){
				realCountry = "IE";
			}
		}
		else realCountry = selectedCountry;
		period = period.charAt(0).toUpperCase() + period.slice(1);
		//if(period == "YearlyS") {period = "Yearly";}
		if(period == "Yearly") {planPeriod = "annual"}
			else planPeriod = "monthly";
		var planUsers = {"1":"individual", "5":"family"};
		if(selPeriodVal == "Yearly"){
			if(selectedUsers == 1){
				selectedPlan = licenceData[selectedCountry].planIdIndi;
			}
			if(selectedUsers == 5){
				selectedPlan = licenceData[selectedCountry].planIdFami;
			}
		}
		else{
			selectedPlan = planPeriod + "-" + planUsers[selectedUsers] + "-" + currencyCode[selectedCountry];			
		}
		// Chargebee link
		if(selectedPlan !== undefined){
			selectedPlan = selectedPlan.toLowerCase();
			$("#cb_plan").attr("data-plan", selectedPlan);
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

	});


}(jQuery));

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
