(function () {
  'use strict';

  angular
  .module('app')
  .component('cliente', {
    templateUrl: 'app/components/cliente/cliente.html',
    controller: clienteCtr,
    controllerAs: 'vm'
  });

  clienteCtr.$inject = ['ClienteService', '$scope', 'BoletaEmitidaService', 'MedidorService', 'ViviendaService', 'ObtenerClienteService', 'PdfService'];

  var datosCliente = {};

  function clienteCtr(ClienteService, $scope, BoletaEmitidaService, MedidorService, ViviendaService, ObtenerClienteService, PdfService) {
    var vm = this;

    $scope.$on('datoscliente', function ($event, datos) {
      datosCliente = datos;
      console.log(datosCliente);
    });

    ClienteService.query().$promise.then(function (data) {
      datosCliente = data;
      console.log(datosCliente);
      for (var i = 0; i < data.length; i++) {

          vm.rut_cliente = datosCliente[i].rut_cliente;
          vm.nombre = datosCliente[i].nombre;
          vm.apellido_pater = datosCliente[i].apellido_pater;
          vm.apellido_mater = datosCliente[i].apellido_mater;
          vm.telefono = datosCliente[i].telefono;
          vm.email = datosCliente[i].email;
          vm.residencia = datosCliente[i].residencia;
      };
    });

    /*$scope.$on('datoscliente', function ($event, data) {
      console.log('si entra');
      ClienteService.query().$promise.then(function (data) {
        datosCliente = data;
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          console.log('entra');
          vm.rut_cliente = datosCliente[i].rut_cliente;
          vm.nombre = datosCliente[i].nombre;
          vm.apellido_pater = datosCliente[i].apellido_pater;
          vm.apellido_mater = datosCliente[i].apellido_mater;
          vm.telefono = datosCliente[i].telefono;
          vm.email = datosCliente[i].email;
          vm.residencia = datosCliente[i].residencia;
        };
      });
    });*/

    /*vm.rut_cliente = datosCliente.rut_cliente;
    vm.nombre = datosCliente.nombre;
    vm.apellido_pater = datosCliente.apellido_pater;
    vm.apellido_mater = datosCliente.apellido_mater;
    vm.telefono = datosCliente.telefono;
    vm.email = datosCliente.email;
    vm.residencia = datosCliente.residencia;*/

    /*vm.id = $stateParams.id;
    vm.nombre = $stateParams.nombre;

    ClienteService.get({id: $stateParams.id}).$promise.then(function (data) {
      vm.noticia = data;
    });*/

    /*vm.noticia = [];
    ClienteService.query().$promise.then(function (data) {
      vm.noticia = data[0];
    });*/


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


    /*ObtenerClienteService.query().$promise.then(function (data) {
      vm.cliente = data[0];
    });*/
  }
})();
