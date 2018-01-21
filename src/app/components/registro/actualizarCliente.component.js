(function () {
  'use strict';

  angular
  .module('app')
  .component('actualizarCliente', {
    templateUrl: 'app/components/registro/actualizarCliente.html',
    controller: actualizarCliente,
    controllerAs: 'vm'
  });

  actualizarCliente.$inject = ['ClienteService', '$state', '$rootScope'];

  var clienteid = 0;
  function actualizarCliente (ClienteService, $state, $rootScope) {
    var vm = this;

    clienteid = $rootScope.id;

    vm.actualizarcliente = function (cliente) {
      ClienteService.update({id: clienteid}, cliente, function () {
        $state.go('tabla');
      }, function () {});
    };
  }
})();
