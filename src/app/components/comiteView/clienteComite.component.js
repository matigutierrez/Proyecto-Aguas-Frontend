(function () {
  'use strict';

  angular
  .module('app')
  .component('clienteComite', {
    templateUrl: 'app/components/comiteView/clienteComite.html',
    controller: clienteComiteCtrl,
    controllerAs: 'vm'
  });

  clienteComiteCtrl.$inject = ['$rootScope', 'ComiteService'];

  function clienteComiteCtrl($rootScope, ComiteService) {
    var vm = this;

    vm.cliente = [];
    ComiteService.query().$promise.then(function (data) {
      vm.cliente = data;
      console.log(vm.cliente);
    });
  }
})();
