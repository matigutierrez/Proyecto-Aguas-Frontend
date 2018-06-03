(function () {
  'use strict';

  angular
  .module('app')
  .component('parametros', {
    templateUrl: 'app/components/parametros/parametros.html',
    controller: parametrosctrl,
    controllerAs: 'vm'
  });

  parametrosctrl.$inject = ['$rootScope', '$state'];

  function parametrosctrl($rootScope, $state) {
    var vm = this;

    vm.parametros = $rootScope.datosComite.parametros();

    vm.updateParameters = function (id) {
      $rootScope.idParams = id;
      $state.go('actualizarParametros');
    };
  }
})();
