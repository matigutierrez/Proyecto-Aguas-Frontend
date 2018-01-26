(function () {
  'use strict';

  angular
  .module('app')
  .component('viviendaCliente', {
    templateUrl: 'app/components/viviendaCliente/viviendaCliente.html',
    controller: viviendaClienteCtrl,
    controllerAs: 'vm'
  });

  viviendaClienteCtrl.$inject = ['ClienteService', 'ViviendaClienteService', '$state', '$rootScope'];

  function viviendaClienteCtrl(ClienteService, ViviendaClienteService, $state, $rootScope) {
    var vm = this;
    vm.viviendacli = $rootScope.datosComite.viviendaCliente();

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
