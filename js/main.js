function onBuyClicked(e) {

  // enable Payment Apithis via chrome://flags/#enable-experimental-web-platform-features
  if (!window.PaymentRequest) {
    // PaymentRequest API is not available. Forwarding to
    // legacy form based experience.
    location.href = '/checkout';
    return;
  }

  var supportedInstruments = [{
    supportedMethods: ['amex', 'diners', 'discover', 'jcb', 'mastercard', 'unionpay', 'visa']
  }];

  var details = {
    total: {label: 'Donation', amount: {currency: 'GBP', value: '55.00'}},
    displayItems: [
      {
        label: 'Original donation amount',
        amount: {currency: 'GBP', value: '45.00'}
      },
      {
        label: 'mini Donation',
        amount: {currency: 'GBP', value: '10.00'}
      }
    ],
    shippingOptions: [
      {
        id: 'standard',
        label: 'Standard shipping',
        amount: {currency: 'GBP', value: '0.00'},
        selected: true
      },
      {
        id: 'express',
        label: 'Express shipping',
        amount: {currency: 'GBP', value: '12.00'}
      }
    ]
  };

  var options = {
     requestPayerEmail: true,
     requestPayerPhone: true
  };

  // Initialization
  var request = new PaymentRequest(supportedInstruments, details, options);

  request.show().then( function (result) {
    console.log('woot');
  }).catch( function(err) {
    console.error('failed', err)
  });
  // Show UI then continue with user payment info
  // request.show().then( function (result) {
  //   // Manually clone the resulting object
  //   var data = {};
  //   data.methodName = result.methodName;
  //   data.details    = result.details;
  //   data.payerEmail = result.payerEmail;
  //   data.payerPhone = result.payerPhone;
  //   data.address    = toDict(result.shippingAddress);
  //   data.shipping   = result.shippingOption;

  //   // POST the object to the server
  //   return fetch('/pay', {
  //     method: 'POST',
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   }).then( function (res) {
  //     // Only if successful
  //     if (res.status === 200) {
  //       return res.json();
  //     } else {
  //       throw 'Failure';
  //     }
  //   }).then( function (response) {
  //     // You should have received a JSON object
  //     if (response.success == true) {
  //       return result.complete('success');
  //     } else {
  //       return result.complete('fail');
  //     }
  //   }).then( function (){
  //     console.log('Thank you!',
  //         result.shippingAddress,
  //         result.methodName,
  //         result.details);
  //   }).catch( function () {
  //     return result.complete('fail');
  //   });
  // }).catch(function(err) {
  //   console.error('Uh oh, something bad happened: ' + err.message);
  // });
}

// convert `addr` into a dictionary
var toDict = function(addr) {
  var dict = {};
  if (addr) {
    dict.country           = addr.country;
    dict.region            = addr.region;
    dict.city              = addr.city;
    dict.dependentLocality = addr.dependentLocality;
    dict.addressLine       = addr.addressLine;
    dict.postalCode        = addr.postalCode;
    dict.sortingCode       = addr.sortingCode;
    dict.languageCode      = addr.languageCode;
    dict.organization      = addr.organization;
    dict.recipient         = addr.recipient;
    dict.careOf            = addr.careOf;
    dict.phone             = addr.phone;
  }
  return dict;

  console.log(e)

  e.preventDefault();
  e.stopPropagation();
};

document.querySelector('#start').addEventListener('click', onBuyClicked, false);