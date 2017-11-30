(function () {
  'use strict';

  angular
  .module('app')
  .component('cliente', {
    templateUrl: 'app/components/cliente/cliente.html',
    controller: clienteCtr,
    controllerAs: 'vm'
  });

  clienteCtr.$inject = ['ClienteService', '$state', '$rootScope'];

  function clienteCtr(ClienteService) {
  	var vm = this;

  	vm.noticia = [];

    ClienteService.query().$promise.then(function (data) {
      vm.noticia = data;
    });

  }
})();
