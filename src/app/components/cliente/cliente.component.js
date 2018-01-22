(function () {
  'use strict';

  angular
  .module('app')
  .component('cliente', {
    templateUrl: 'app/components/cliente/cliente.html',
    controller: clienteCtr,
    controllerAs: 'vm'
  });

  clienteCtr.$inject = ['UsuarioLogService', 'ClienteService', '$rootScope', 'BoletaEmitidaService', 'MedidorService', 'ViviendaService', 'ObtenerClienteService', 'PdfService'];

  var datosCliente = {};

  function clienteCtr(UsuarioLogService, ClienteService, $rootScope, BoletaEmitidaService, MedidorService, ViviendaService, ObtenerClienteService, PdfService) {
    var vm = this;

    ClienteService.query().$promise.then(function (data) {

      datosCliente = $rootScope.datosCliente;
      console.log(datosCliente);
      vm.rut_cliente = datosCliente.rut_cliente;
      vm.nombre = datosCliente.nombre;
      vm.apellido_pater = datosCliente.apellido_pater;
      vm.apellido_mater = datosCliente.apellido_mater;
      vm.telefono = datosCliente.telefono;
      vm.email = datosCliente.email;
      vm.residencia = datosCliente.residencia;
    });

    UsuarioLogService.get().$promise.then(function (data) {
      vm.usuario = data;
      console.log(data);
    });

    vm.vivienda = [];
    ViviendaService.query().$promise.then(function (data) {
      vm.vivienda = data;
    });

    vm.medidor = [];
    MedidorService.query().$promise.then(function (data) {
      vm.medidor = data;
    });

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
