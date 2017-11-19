(function () {
  'use strict';

  angular
  .module('app')
  .component('registroPagos', {
    templateUrl: 'app/components/registroPagos/registroPagos.html',
    controller: registroPagosCtrl,
    controllerAs: 'vm'
  });

  function registroPagosCtrl() {}
})();
