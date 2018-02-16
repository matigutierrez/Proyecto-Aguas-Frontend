(function () {
  'use strict';

  angular
  .module('app')
  .component('cliente', {
    templateUrl: 'app/components/cliente/cliente.html',
    controller: clienteCtr,
    controllerAs: 'vm'
  });

  clienteCtr.$inject = ['UsuarioLogService', '$rootScope', 'BoletaEmitidaService', 'MedidorService', 'ViviendaService', 'PdfService'];

  var datosCliente = {};

  function clienteCtr(UsuarioLogService, $rootScope, BoletaEmitidaService, MedidorService, ViviendaService, PdfService) {
    var vm = this;

    datosCliente = $rootScope.datosCliente;
    vm.rut_cliente = datosCliente.rut_cliente;
    vm.nombre = datosCliente.nombre;
    vm.apellido_pater = datosCliente.apellido_pater;
    vm.apellido_mater = datosCliente.apellido_mater;
    vm.telefono = datosCliente.telefono;
    vm.email = datosCliente.email;

    UsuarioLogService.get().$promise.then(function (data) {
      vm.usuario = data;
    });

    vm.medidor = datosCliente.getmedidores();
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
