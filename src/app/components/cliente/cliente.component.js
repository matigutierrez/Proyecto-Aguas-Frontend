(function () {
  'use strict';

  angular
  .module('app')
  .component('cliente', {
    templateUrl: 'app/components/cliente/cliente.html',
    controller: clienteCtr,
    controllerAs: 'vm'
  });

  clienteCtr.$inject = ['UsuarioLogService', '$rootScope', 'BoletaEmitidaService', 'MedidorService', 'ViviendaService', 'PdfService', 'SubsidioService'];

  var datosCliente = {};

  function clienteCtr(UsuarioLogService, $rootScope, BoletaEmitidaService, MedidorService, ViviendaService, PdfService, SubsidioService) {
    var vm = this;

    datosCliente = $rootScope.datosCliente;
    vm.rut_cliente = datosCliente.rut_cliente;
    vm.nombre = datosCliente.nombre;
    vm.apellido_pater = datosCliente.apellido_pater;
    vm.apellido_mater = datosCliente.apellido_mater;
    vm.telefono = datosCliente.telefono;
    vm.email = datosCliente.email;

    vm.subsidio_id = datosCliente.subsidio_id;

    vm.subs = [];
    SubsidioService.query().$promise.then(function (data){
      for (var i = 0; i < data.length; i++) {
        vm.subs = data[i];
        if (vm.subsidio_id == vm.subs.id) {
          vm.subsidio = vm.subs.subsidio_porcentaje;
        }
      }
    });

    UsuarioLogService.get().$promise.then(function (data) {
      vm.usuario = data;
    });

    datosCliente.getmedidores().then(
      function (data) {
        vm.medidor = data;
      }
    );
    vm.vivienda = datosCliente.getviviendas();

    vm.boleta = [];
    BoletaEmitidaService.query().$promise.then(function (data) {
      vm.boleta = data;
    });

    vm.descarga = function () {
      PdfService.get().$promise.then(function (data) {
        vm.pdf = data;
      });
    };
  }
})();
