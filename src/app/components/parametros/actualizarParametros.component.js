(function () {
  'use strict';

  angular
  .module('app')
  .component('actualizarParametros', {
    templateUrl: 'app/components/parametros/actualizarParametros.html',
    controller: actualizarParametrosCtrl,
    controllerAs: 'vm'
  });

  actualizarParametrosCtrl.$inject = ['ParametrosService', 'ComiteService', '$rootScope', '$state'];

  var paramsId = 0;

  function actualizarParametrosCtrl(ParametrosService, ComiteService, $rootScope, $state) {
    var vm = this;

    paramsId = $rootScope.idParams;

    vm.actualizarParametros = function (params) {
      ParametrosService.update({id: paramsId}, params, function () {
        $state.go('parametros');
      }, function () {});
    }

    vm.parametros = $rootScope.datosComite.parametros();
  }
})();
