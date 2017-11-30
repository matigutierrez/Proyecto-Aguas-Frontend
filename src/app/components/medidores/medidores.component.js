(function () {
  'use strict';

  angular
  .module('app')
  .component('medidores', {
    templateUrl: 'app/components/medidores/medidores.html',
    controller: medidoresCtr,
    controllerAs: 'vm'
  });

  medidoresCtr.$inject = ['MedidorService', '$state', '$rootScope'];

  function medidoresCtr(MedidorService) {
  	var vm = this;
    vm.medidor = [];

    MedidorService.query().$promise.then(function (data) {
      vm.medidor = data;
    });
  }
})();
