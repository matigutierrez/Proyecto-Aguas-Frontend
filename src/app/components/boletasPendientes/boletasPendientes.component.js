(function () {
  'use strict';

  angular
  .module('app')
  .component('boletasPendientes', {
    templateUrl: 'app/components/boletasPendientes/boletasPendientes.html',
    controller: boletasPendientesCtrl,
    controllerAs: 'vm'
  });

  function boletasPendientesCtrl() {}
})();
