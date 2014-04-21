(function (w) {
  'use strict';
  w.addEventListener('DOMContentLoaded', function () {
    var $ = document.querySelector.bind(document),
      vw = document.body.clientWidth, // Viewport Width
      vh = document.body.clientHieght, // Viewport Height
      minVW = 240, // Minimum Viewport Width
      maxVW = 2600, // Maximum Viewport Width
      handleWidth = 14, // Drag-to-resize Handle Size
      viewport = $('[data-sp-id="viewport--window"]'), // Viewport element
      size = $('[data-sp-class="ish--size-px"]'), // Toolbar Size
      bodySize = 16,
      discoID = false,
      discoMode = false,
      hayMode = false,
      hash = window.location.hash.replace(/^.*?#/,'');


    w.addEventListener('resize', function () {
      vw = document.body.clientWidth;
      vh = document.body.clientHieght;

      if (viewport.innerWidth > vw) {
        viewport.width = vw;
      }
    });

    //////////////////////////////
    // Resize the Viewport
    //
    // - size: target size of the viewport
    // - animate: boolean for turning CSS animation on or of
    //////////////////////////////
    var sizeViewport = function (size, animate) {
      var theSize;

      if (size > maxVW) {
        theSize = maxVW;
      }
      else if (size < minVW) {
        theSize = minVW;
      }
      else {
        theSize = size;
      }

      $('[data-sp-id="viewport--container"]').width = theSize + handleWidth;
      viewport.width = theSize;
      size.value = theSize;
    }

    w.addEventListener('load', function () {
      sizeViewport(vw);
    });
  });





  // var domain = window.location.protocol + '//' + window.location.host;
  // var iframe = document.getElementById('sg-viewport').contentWindow;

  // $('#search').each(function () {
  //   var elem = $(this);

  //   elem.data('old-value', elem.val());

  //   // Look for changes in the value
  //   elem.bind('propertychange keyup input paste', function(){
  //     // If value has changed...
  //     if (elem.data('old-value') !== elem.val()) {
  //      // Updated stored value
  //      elem.data('old-value', elem.val());
  //      console.log('Search: ' + elem.val());
  //      iframe.postMessage(elem.val(), domain);
  //    }
  //   });
  // });
})(window);