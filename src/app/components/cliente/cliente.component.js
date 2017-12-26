(function () {
  'use strict';

  angular
  .module('app')
  .component('cliente', {
    templateUrl: 'app/components/cliente/cliente.html',
    controller: clienteCtr,
    controllerAs: 'vm'
  });

  clienteCtr.$inject = ['BoletaEmitidaService', 'MedidorService', 'ViviendaService', 'ClienteService', 'ObtenerClienteService', 'PdfService', '$state', '$rootScope'];

  function clienteCtr(BoletaEmitidaService, MedidorService, ViviendaService, ClienteService, ObtenerClienteService, PdfService) {
    var vm = this;

    vm.noticia = [];
    ClienteService.query().$promise.then(function (data) {
      vm.noticia = data[0];
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

    ObtenerClienteService.query().$promise.then(function (data) {
      vm.cliente = data[0];
    });
  }
})();
