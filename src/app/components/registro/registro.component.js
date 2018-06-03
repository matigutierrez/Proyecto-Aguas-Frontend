(function () {
  'use strict';

  angular
  .module('app')
  .component('registro', {
    templateUrl: 'app/components/registro/registro.html',
    controller: registroCtr,
    controllerAs: 'vm'
  });

  registroCtr.$inject = ['UsuarioLogService', 'ComiteService', 'SubsidioService', 'ClienteService', '$state', '$mdDialog'];

  function registroCtr(UsuarioLogService, ComiteService, SubsidioService, ClienteService, $state, $mdDialog) {
    var vm = this;

    vm.subsidio = [];
    SubsidioService.query().$promise.then(function (data) {
      vm.subsidio = data;
    });

    vm.crearcliente = function (cliente) {
      var client = {
        rut_cliente: parseInt(cliente.rut_cliente, 10),
        nombre: cliente.nombre,
        apellido_pater: cliente.apellido_pater,
        apellido_mater: cliente.apellido_mater,
        telefono: cliente.telefono,
        email: cliente.email,
        estado_cliente: 1,
        subsidio_id: parseInt(cliente.subsidio_id, 10)
      };
      vm.showAlert(ClienteService.save(client), cliente);
      $state.go('tabla');

      vm.clienteid = [];
      ClienteService.query().$promise.then(function (data) {
        vm.clienteid = data;

        var ultimoCliente = vm.clienteid[vm.clienteid.length - 1];

        var usuario = {};
        UsuarioLogService.get().$promise.then(function (data) {
          usuario = data;
        });

        var comite = new ComiteService({id: usuario.comite_id});
        comite.addCliente(ultimoCliente.id);
      });
    };

    vm.showAlert = function (ev, cliente) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('¡Cliente Creado Satisfactoriamente!')
          .textContent('Nombre: ' + cliente.nombre + ' ' + cliente.apellido_pater + ' ' + cliente.apellido_mater)
          .ok('Ok!')
          .targetEvent(ev)
      );
    };
  }
})();
