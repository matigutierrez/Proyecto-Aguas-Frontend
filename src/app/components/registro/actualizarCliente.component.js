(function () {
  'use strict';

  angular
  .module('app')
  .component('actualizarCliente', {
    templateUrl: 'app/components/registro/actualizarCliente.html',
    controller: actualizarCliente,
    controllerAs: 'vm'
  });

  actualizarCliente.$inject = ['UsuarioLogService', 'ClienteService', '$state', '$rootScope'];

  var clienteid = 0;
  function actualizarCliente (UsuarioLogService, ClienteService, $state, $rootScope) {
    var vm = this;

    UsuarioLogService.get().$promise.then(function (data) {
      vm.usuario = data;
    });

    clienteid = $rootScope.id;

    vm.actualizarcliente = function (cliente) {
      ClienteService.update({id: clienteid}, cliente, function () {
        if (vm.usuario.superadmin == 1){
          $state.go('comiteView');
        }else if (vm.usuario.superadmin == 0) {
          $state.go('tabla');
        }
      }, function () {});
    };

  }
})();
