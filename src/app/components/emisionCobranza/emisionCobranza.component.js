(function () {
  'use strict';

  angular
  .module('app')
  .component('emisionCobranza', {
    templateUrl: 'app/components/emisionCobranza/emisionCobranza.html',
    controller: emisionCobranzaCtrl,
    controllerAs: 'vm'
  });

  function emisionCobranzaCtrl() {}
})();
