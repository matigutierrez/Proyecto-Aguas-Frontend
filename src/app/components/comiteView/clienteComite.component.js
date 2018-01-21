(function () {
  'use strict';

  angular
  .module('app')
  .component('clienteComite', {
    templateUrl: 'app/components/comiteView/clienteComite.html',
    controller: clienteComiteCtrl,
    controllerAs: 'vm'
  });

  clienteComiteCtrl.$inject = ['$rootScope', 'ComiteClienteService'];

  function clienteComiteCtrl($rootScope, ComiteClienteService) {
    var vm = this;

    //esto está malo
    vm.cliente = [];
    ComiteClienteService.query().$promise.then(function (data) {
      vm.cliente = data;
      console.log(vm.cliente);
    });
  }
})();
