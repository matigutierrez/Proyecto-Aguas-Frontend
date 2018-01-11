(function () {
  'use strict';

  angular
  .module('app')
  .component('actualizarCliente', {
    templateUrl: 'app/components/registro/actualizarCliente.html',
    controller: actualizarCliente,
    controllerAs: 'vm'
  });

  actualizarCliente.$inject = ['ClienteService', '$state', '$rootScope', '$scope'];

  var clienteid = 0;
  function actualizarCliente (ClienteService, $state, $scope) {
    var vm = this;

    $scope.$on('id', function ($event, data) {
      clienteid = data;
    });

    vm.actualizarcliente = function (cliente) {
      ClienteService.update({id: clienteid}, cliente, function () {
        $state.go('tabla');
      }, function () {});
    };
  }
})();
