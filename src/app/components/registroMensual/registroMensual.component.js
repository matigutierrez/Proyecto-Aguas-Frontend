(function () {
  'use strict';

  angular
  .module('app')
  .component('registroMensual', {
    templateUrl: 'app/components/registroMensual/registroMensual.html',
    controller: registroMensualCtrl,
    controllerAs: 'vm'
  });

  registroMensualCtrl.$inject = ['LecturaMensualService', 'MesService', '$state', '$mdDialog', '$rootScope', 'SubsidioService'];

  function registroMensualCtrl(LecturaMensualService, MesService, $state, $mdDialog, $rootScope, SubsidioService) {
    var vm = this;

    vm.mes = [];
    MesService.query().$promise.then(function (data) {
      vm.mes = data;
    });

    vm.parametros = [];
    vm.parametros = $rootScope.datosComite.parametros();

    vm.anios = ('2018 2017 2016 2015 2014 2013 2012 2011 2010 2009 2008 2007 2006 2005 2004 2003 2002 2001 2000').split(' ').map(function (anio) {
      return {abbrev: anio};
    });

    vm.dataMedidor = $rootScope.datosMedidor;

    vm.lecturas = [];
    vm.lecturas = vm.dataMedidor.registrosmensuales();

    vm.dataMedidor.ultimoRegistro().$promise.then(function (data) {
      vm.lecturaMensual = data;

      if (vm.lecturaMensual.lectura_anterior === undefined) {
        vm.lecturaMensual.lectura_anterior = 0;
      } else {
        vm.lecturaMensual.lectura_anterior = parseInt(vm.lecturaMensual.lectura);
      }

      vm.clienteMedidor = vm.dataMedidor.clienteMedidor().then(function (data) {
        vm.subsidioCliente = data.subsidio_id;
        vm.subsidio = [];
        SubsidioService.query().$promise.then(function (data) {
          for (var i = 0; i < data.length; i++) {
            vm.subsidio = data[i];
            if (vm.subsidioCliente === vm.subsidio.id) {
              vm.valorSubsidio = vm.subsidio.subsidio_porcentaje;
            }
          }
        });
      });

      vm.calcular = function (lecMensual) {
        var valorMetro = parseInt(vm.parametros.valor_metro);
        var valorSubsidio = parseInt(vm.valorSubsidio);

        var descuentoSubsidio = (valorMetro * valorSubsidio) / 100;
        var valorMetroConDescuento = valorMetro - descuentoSubsidio;
        console.log("DESCUENTO SUBSIDIO " + descuentoSubsidio);
        console.log("VALOR METRO CON DESCUENTO " + valorMetroConDescuento);

        if (lecMensual.lectura < vm.lecturaMensual.lectura_anterior) {
          vm.showAlert2(lecMensual.lectura < vm.lecturaMensual.lectura_anterior);
        } else if (lecMensual.lectura > vm.lecturaMensual.lectura_anterior) {
          vm.consumo = (parseInt(lecMensual.lectura) - vm.lecturaMensual.lectura_anterior);
          console.log("CONSUMO " + vm.consumo);
        } else if (lecMensual.lectura === vm.lecturaMensual.lectura_anterior) {
          vm.consumo = (parseInt(lecMensual.lectura) - vm.lecturaMensual.lectura_anterior);
        }

        var metrosSobreConsumo = parseInt(vm.parametros.metros_sobre_consumo);
        var valorSobreConsumo = parseInt(vm.parametros.valor_sobre_consumo);

        //dejar como valor unico
        //var valorAlcantarillado = (parseInt(vm.parametros.alcantarillado) * vm.consumo);
        var valorAlcantarillado = vm.parametros.alcantarillado;

        if (vm.consumo > metrosSobreConsumo) {
          var sobreConsumo = (vm.consumo - metrosSobreConsumo);
          console.log("SOBRE CONSUMO " + sobreConsumo);

          var diferenciaConsumo_SobreConsumo = (vm.consumo - sobreConsumo);
          console.log("DIFERENCIA CONSUMO SOBRECONSUMO " + diferenciaConsumo_SobreConsumo);

          var valorTotalSobreConsumo = (sobreConsumo * valorSobreConsumo);
          console.log("VALOR TOTAL SOBRECONSUMO " + valorTotalSobreConsumo);

          var valor_consumo = (diferenciaConsumo_SobreConsumo * valorMetroConDescuento);
          console.log("VALOR CONSUMO " + valor_consumo);

          vm.valorPagar = valorTotalSobreConsumo + valor_consumo + parseInt(vm.parametros.cargo_fijo) + valorAlcantarillado;
          vm.valorPagar = Number(vm.valorPagar.toFixed(1));
          console.log("VALOR A PAGAR CON SOBRECONSUMO " + vm.valorPagar);
        } else if (vm.consumo <= metrosSobreConsumo) {
          var valor_consumo_normal = (vm.consumo * valorMetroConDescuento);
          valor_consumo_normal = Number(valor_consumo_normal.toFixed(1));
          console.log("VALOR CONSUMO NORMAL " + valor_consumo_normal);

          vm.valorPagar = (valor_consumo_normal + parseInt(vm.parametros.cargo_fijo) + valorAlcantarillado);
          vm.valorPagar = Number(vm.valorPagar.toFixed(1));
          console.log("VALOR A PAGAR NORMAL " + vm.valorPagar);
        }

        if (vm.lecturaMensual.saldo_pagado === undefined || vm.lecturaMensual.saldo_pagado === null) {
          vm.lecturaMensual.saldo_pagado = 0;
          vm.saldoAnterior = vm.lecturaMensual.saldo_pagado;
        } else {
          vm.saldoAnterior = vm.lecturaMensual.saldo_pagado + vm.valorPagar;
        }

        if (vm.lecturaMensual.lectura === undefined ) {
          vm.lecturaMensual.lectura = 0;
        } else {
          vm.lecturaMensual.lectura = parseInt(vm.lecturaMensual.lectura);
        }
      };

      vm.showAlert2 = function (ev) {
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('LECTURA ACTUAL DEBE SER MAYOR O IGUAL QUE LA LECTURA ANTERIOR')
            .ok('Ok!')
            .targetEvent(ev)
        );
      };

      vm.registrolectura = function (lecMensual) {
        var lecturamen = {
          year: parseInt(lecMensual.year, 10),
          lectura: parseInt(lecMensual.lectura, 10),
          saldo_pagado: parseInt(vm.saldoAnterior, 10),
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
