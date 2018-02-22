(function () {
  'use strict';

  angular
  .module('app')
  .component('registroMensual', {
    templateUrl: 'app/components/registroMensual/registroMensual.html',
    controller: registroMensualCtrl,
    controllerAs: 'vm'
  });

  registroMensualCtrl.$inject = ['LecturaMensualService', 'MesService', '$state', '$mdDialog', '$rootScope'];

  //var datosMedidor = {};

  function registroMensualCtrl(LecturaMensualService, MesService, $state, $mdDialog, $rootScope) {
  	var vm = this;

    vm.mes = [];
    MesService.query().$promise.then(function (data) {
      vm.mes = data;
    });

    vm.parametros = [];
    vm.parametros = $rootScope.datosComite.parametros();

    vm.anios = ('2018 2017 2016 2015 2014 2013 2012 2011 2010 2009 2008 2007 2006 2005 2004 2003 2002 2001 2000').split(' ').map(function(anio) {
        return {abbrev: anio};
    });

    vm.dataMedidor = [];
    vm.dataMedidor = $rootScope.datosMedidor;
    console.log(vm.dataMedidor);

    vm.lecturaMensual = [];
    vm.lecturaMensual = vm.dataMedidor.registrosmensuales();
    console.log(vm.lecturaMensual);

  	vm.registrolectura = function (lecMensual) {
      var lecturamen = {
      	year: parseInt(lecMensual.year, 10),
      	lectura: parseInt(lecMensual.lectura, 10),
      	saldo_pagado: parseInt(lecMensual.saldo_pagado, 10),
      	consumo: parseInt(lecMensual.consumo, 10),
      	valor_pagar: parseInt(lecMensual.valor_pagar, 10),
      	lectura_anterior: 0,
      	cargo_fijo: parseInt(vm.parametros.cargo_fijo, 10),
      	alcantarillado: parseInt(vm.parametros.alcantarillado, 10),
        vivienda_id: parseInt(vm.dataMedidor.vivienda_id, 10),
        medidor_id: parseInt(vm.dataMedidor.id, 10),
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
