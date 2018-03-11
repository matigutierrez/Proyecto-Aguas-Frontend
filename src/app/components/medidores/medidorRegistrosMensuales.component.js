(function () {
  'use strict';

  angular
  .module('app')
  .component('medidorRegistrosMensuales', {
    templateUrl: 'app/components/medidores/medidorRegistrosMensuales.html',
    controller: medidorRegistrosMensualesCtrl,
    controllerAs: 'vm'
  });

  medidorRegistrosMensualesCtrl.$inject = ['$rootScope', '$state'];

  var datosMedidor = {};

  function medidorRegistrosMensualesCtrl($rootScope, $state) {
    var vm = this;

    datosMedidor = $rootScope.datosMedidor;
    vm.num_medidor = datosMedidor.num_medidor;
    vm.marca_medidor = datosMedidor.marca_medidor;
    vm.fecha_registro = datosMedidor.fecha_registro;

    vm.lecturaMensual = datosMedidor.registrosmensuales();

    vm.goToRegistroMensual = function () {
      $state.go('registroMensual');
    };

    vm.goToEmitirBoleta = function () {
      $state.go('emisionCobranza');
    };

  }
})();
