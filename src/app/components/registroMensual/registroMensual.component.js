(function () {
  'use strict';

  angular
  .module('app')
  .component('registroMensual', {
    templateUrl: 'app/components/registroMensual/registroMensual.html',
    controller: registroMensualCtrl,
    controllerAs: 'vm'
  });

  registroMensualCtrl.$inject = ['LecturaMensualService', 'MesService', '$state', '$mdDialog'];

  function registroMensualCtrl(LecturaMensualService, MesService, $state, $mdDialog) {
  	var vm = this;

    vm.mes = [];
    MesService.query().$promise.then(function (data) {
      vm.mes = data;
    });

  	vm.registrolectura = function (lecMensual) {
      var lecturamen = {
      	year: parseInt(lecMensual.year, 10),
      	lectura: parseInt(lecMensual.lectura, 10),
      	saldo_pagado: parseInt(lecMensual.saldo_pagado, 10),
      	consumo: parseInt(lecMensual.consumo, 10),
      	valor_pagar: parseInt(lecMensual.valor_pagar, 10),
      	lectura_anterior: 0,
      	cargo_fijo: parseInt(lecMensual.cargo_fijo, 10),
      	alcantarillado: parseInt(lecMensual.alcantarillado, 10),
        vivienda_id: parseInt(lecMensual.vivienda_id, 10),
        medidor_id: parseInt(lecMensual.medidor_id, 10),
        mes_id: parseInt(lecMensual.mes_id, 10)
      };
      vm.showAlert(LecturaMensualService.save(lecturamen), lecMensual);
      $state.go('lecturaMensual');
    };

    vm.showAlert = function (ev, lecMensual) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('¡Registro Mensual Creado Satisfactoriamente!')
          .textContent('Lectura: ' + lecMensual.lectura + ', Consumo: ' + lecMensual.consumo)
          .ok('Ok!')
          .targetEvent(ev)
      );
    };
  }
})();
