(function () {
  'use strict';

  angular
  .module('app')
  .component('cliente', {
    templateUrl: 'app/components/cliente/cliente.html',
    controller: clienteCtr,
    controllerAs: 'vm'
  });

  clienteCtr.$inject = ['ClienteService', 'PdfService', '$state', '$rootScope'];

  function clienteCtr(ClienteService, PdfService) {
    var vm = this;

    vm.noticia = [];

    ClienteService.query().$promise.then(function (data) {
      vm.noticia = data;
    });

    vm.descarga = function () {
      PdfService.get().$promise.then(function (data) {
        vm.pdf = data;
      });
    };
  }
})();
