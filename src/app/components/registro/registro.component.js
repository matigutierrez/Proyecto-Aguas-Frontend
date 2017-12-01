(function () {
  'use strict';

  angular
  .module('app')
  .component('registro', {
    templateUrl: 'app/components/registro/registro.html',
    controller: registroCtr,
    controllerAs: 'vm'
  });

  registroCtr.$inject = ['ClienteService', '$state', '$rootScope'];

  function registroCtr(ClienteService, $state) {
    var vm = this;

    vm.crearcliente = function (cliente) {
      var client = {
        rut_cliente: parseInt(cliente.rut_cliente),
        nombre: cliente.nombre,
        apellido_pater: cliente.apellido_pater,
        apellido_mater: cliente.apellido_mater,
        telefono: cliente.telefono,
        email: cliente.email,
        residencia: cliente.residencia
      };

      ClienteService.save(client);
      $state.go('tabla');
    };
  }
})();
