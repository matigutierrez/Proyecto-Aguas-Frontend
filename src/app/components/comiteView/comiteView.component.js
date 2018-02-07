(function () {
  'use strict';

  angular
  .module('app')
  .component('comiteView', {
    templateUrl: 'app/components/comiteView/comiteView.html',
    controller: comiteViewCtrl,
    controllerAs: 'vm'
  });

  comiteViewCtrl.$inject = ['$rootScope'];

  var dataComit = {};

  function comiteViewCtrl($rootScope) {
    var vm = this;

    dataComit = $rootScope.datosComite;
    vm.nombre = dataComit.nombre;
    vm.comuna_id = dataComit.comuna.des_comu;
    vm.datosCliente = dataComit.clientes();
    
  }
})();
