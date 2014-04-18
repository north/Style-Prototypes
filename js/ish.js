(function ($) {
  'use strict';

  var domain = window.location.protocol + '//' + window.location.host;
  var iframe = document.getElementById('sg-viewport').contentWindow;

  $('#search').each(function () {
    var elem = $(this);

    elem.data('old-value', elem.val());

    // Look for changes in the value
    elem.bind('propertychange keyup input paste', function(){
      // If value has changed...
      if (elem.data('old-value') !== elem.val()) {
       // Updated stored value
       elem.data('old-value', elem.val());
       console.log('Search: ' + elem.val());
       iframe.postMessage(elem.val(), domain);
     }
    });
  });
})(window.jQuery);