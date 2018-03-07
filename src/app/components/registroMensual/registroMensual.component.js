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

    vm.lecturas = [];
    vm.lecturas = vm.dataMedidor.registrosmensuales();
    console.log(vm.lecturas);

    vm.dataMedidor.ultimoRegistro().$promise.then(function (data){
      vm.lecturaMensual = data;

      if (vm.lecturas.length == 0 ){
        var lecturaAnterior = 0;
      } else {
        var lecturaAnterior = parseInt(vm.lecturaMensual.lectura);
      }

      vm.calcular = function (lecMensual) {
        vm.consumo = (parseInt(lecMensual.lectura) - lecturaAnterior);
        console.log(vm.consumo);

        var valor_consumo = (parseInt(vm.parametros.valor_metro) * vm.consumo);
        console.log(valor_consumo);

        var metrosSobreConsumo = parseInt(vm.parametros.metros_sobre_consumo);
        var valorSobreConsumo = parseInt(vm.parametros.valor_sobre_consumo);

        var valorAlcantarillado = (parseInt(vm.parametros.alcantarillado) * vm.consumo);

        if (vm.consumo > metrosSobreConsumo) {
          var sobreConsumo = (vm.consumo - metrosSobreConsumo);
          console.log(sobreConsumo);

          var valorTotalSobreConsumo = (sobreConsumo * valorSobreConsumo);
          console.log(valorTotalSobreConsumo);

          vm.valorPagar = (valor_consumo + parseInt(vm.parametros.cargo_fijo) + valorAlcantarillado + valorTotalSobreConsumo);
          console.log(vm.valorPagar);
        } else if (vm.consumo <= metrosSobreConsumo) {
          vm.valorPagar = (valor_consumo + parseInt(vm.parametros.cargo_fijo) + valorAlcantarillado);
          console.log(vm.valorPagar);
        }
      };

      vm.registrolectura = function (lecMensual) {
        var lecturamen = {
          year: parseInt(lecMensual.year, 10),
          lectura: parseInt(lecMensual.lectura, 10),
          saldo_pagado: parseInt(lecMensual.saldo_pagado, 10),
          consumo: parseInt(vm.consumo, 10),
          valor_pagar: parseFloat(vm.valorPagar, 10),
          lectura_anterior: parseInt(vm.lecturaMensual.lectura, 10),
          cargo_fijo: parseFloat(vm.parametros.cargo_fijo, 10),
          alcantarillado: parseFloat(vm.parametros.alcantarillado, 10),
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
            .textContent('Lectura: ' + lecMensual.lectura + ', Consumo: ' + vm.consumo)
            .ok('Ok!')
            .targetEvent(ev)
        );
      };
    });
  }
})();
