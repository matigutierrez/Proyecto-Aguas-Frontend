(function () {
  'use strict';

  angular
  .module('app')
  .component('viviendaCliente', {
    templateUrl: 'app/components/viviendaCliente/viviendaCliente.html',
    controller: viviendaClienteCtrl,
    controllerAs: 'vm'
  });

  viviendaClienteCtrl.$inject = ['ViviendaClienteService', '$state', '$rootScope'];

  function viviendaClienteCtrl(ViviendaClienteService, $state, $rootScope) {
    var vm = this;
    vm.viviendacli = [];

    ViviendaClienteService.query().$promise.then(function (data) {
      vm.viviendacli = data;
    });

    vm.busqueda = function (dato) {
      var viviencli = [];
      for (var i = 0; i < vm.viviendacli.length; i++) {
        if (vm.viviendacli[i].cliente_id === dato) {
          viviencli.push(vm.viviendacli[i]);
        }
      }
      vm.viviendacli = viviencli;
    };
  }
})();
