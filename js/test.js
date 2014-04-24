(function () {
  'use strict';

  window.addEventListener('DOMContentLoaded', function () {
    var base = document.getElementById('base--obj');
    console.log('foo');
    if (base) {
      console.log(base);
      base.style.color = 'red';
    }

  });
})();