(function () {
  'use strict';

  angular
  .module('app')
  .component('tabla', {
    templateUrl: 'app/components/tabla/tabla.html',
    controller: tablaCtr,
    controllerAs: 'vm'
  });

  tablaCtr.$inject = ['ClienteService', '$state', '$rootScope'];

  function tablaCtr(ClienteService) {
    var vm = this;
    vm.cliente = [];

    ClienteService.query().$promise.then(function (data) {
      vm.cliente = data;
    });
  }
})();
