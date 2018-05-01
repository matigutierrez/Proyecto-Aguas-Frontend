(function () {
  'use strict';

  angular
  .module('app')
  .component('emisionCobranza', {
    templateUrl: 'app/components/emisionCobranza/emisionCobranza.html',
    controller: emisionCobranzaCtrl,
    controllerAs: 'vm'
  });

  emisionCobranzaCtrl.$inject = ['$rootScope', 'SubsidioService', 'BoletaEmitidaService', '$mdDialog', '$state'];

  function emisionCobranzaCtrl($rootScope, SubsidioService, BoletaEmitidaService, $mdDialog, $state) {
  	var vm = this;
  	
    var inicio = 0;
    var termino = 1;

    inicio = inicio + termino;
    vm.nroBoleta = inicio;
    console.log(vm.nroBoleta); 

    vm.dataMedidor = $rootScope.datosMedidor;

    vm.clienteMedidor = vm.dataMedidor.clienteMedidor().then(function (data){
      vm.nombreCompleto = data.nombre + " " + data.apellido_pater + " " + data.apellido_mater;
      vm.subsidioCliente = data.subsidio_id;

      vm.subsidio = [];
  	  SubsidioService.query().$promise.then(function (data){
  	  	for (var i = 0; i < data.length; i++) {
  	  		vm.subsidio = data[i];
          if (vm.subsidioCliente == vm.subsidio.id) {
            vm.valorSubsidio = vm.subsidio.subsidio_porcentaje;
          }
  	  	}
  	  });
    });
    

    vm.dataLectura = $rootScope.datosLectura;

    vm.parametros = [];
    vm.parametros = $rootScope.datosComite.parametros();

    vm.totalAbonos = 0;

    vm.pagaBoleta = 0;

    vm.total = 0;


    //var date = new Date();
    /*var day = date.getDate();
    var monthIndex = date.getMonth()+1;
    var year = date.getFullYear();

    var fecha = year + '-' + monthIndex + '-' + day;*/

    var a = new Date();
    var day = a.getDate();
    var monthIndex = a.getMonth()+1;
    var year = a.getFullYear();
     var fecha = year + '-' + monthIndex + '-' + day;

    vm.emitirCobranza = function (dataLectura) {
      var boleta = {
        nro_boleta: parseInt(vm.nroBoleta, 10),
        nombre_cliente: vm.nombreCompleto,
        domicilio: vm.dataMedidor.vivienda.direccion,
        saldo: parseInt(vm.dataLectura.saldo_pagado, 10),
        monto_pagar: parseInt(vm.dataLectura.valor_pagar, 10),
        lectura_anterior: parseInt(vm.dataLectura.lectura_anterior, 10),
        lectura_actual: parseInt(vm.dataLectura.lectura, 10),
        consumo: parseInt(vm.dataLectura.consumo, 10),
        subsidio: vm.valorSubsidio,
        total: parseInt(vm.total, 10),
        fecha_pago: fecha,
        cargo_fijo: parseInt(vm.parametros.cargo_fijo, 10),
        alcantarillado: parseInt(vm.parametros.alcantarillado, 10),
        multa_reunion: parseInt(vm.nroBoleta, 10),
        multa_corte: parseInt(vm.nroBoleta, 10),
        multa_adulteracion: parseInt(vm.nroBoleta, 10),
        total_abono: parseInt(vm.totalAbonos, 10),
        paga_boleta: parseInt(vm.pagaBoleta, 10),
        medidor_id: parseInt(vm.dataMedidor.id, 10)
      };
      vm.showAlert(BoletaEmitidaService.save(boleta), dataLectura);
      $state.go('medidorRegistrosMensuales');
    };

    vm.showAlert = function (ev, dataLectura) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('¡Registro de Boleta Creado Satisfactoriamente!')
          .textContent('Nro Boleta: ' + vm.nroBoleta + ', Total: $' + vm.total)
          .ok('Ok!')
          .targetEvent(ev)
      );
    };
  }
})();
