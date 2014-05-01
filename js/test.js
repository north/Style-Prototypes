(function () {
  'use strict';

  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

  window.addEventListener('DOMContentLoaded', function () {
    var partials = document.querySelectorAll('[data-sp-class="section--header"] ~ span[ng-include]');

    for (var i in partials) {
      if (!partials[i].nextSibling) {
        var source = partials[i].innerHTML;
        if (source) {
          source = source.replace(/<!--/g, '\n<!--').replace(/-->/g, '-->\n');
          var sourceContainer = document.createElement('pre');
          sourceContainer.setAttribute('data-sp-class', 'source--html');
          var sourceView = document.createElement('code');
          sourceView.setAttribute('class', 'language-markup');
          sourceView.textContent = source;
          sourceContainer.appendChild(sourceView);

          insertAfter(partials[i], sourceContainer);
        }
      }
    }

    // partials.innerHTML.replace(/</g, '&lt').replace(/>/g, '&gt')

  });
})();