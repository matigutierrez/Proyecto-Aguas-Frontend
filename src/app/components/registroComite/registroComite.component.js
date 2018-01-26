(function () {
  'use strict';

  angular
  .module('app')
  .component('registroComite', {
    templateUrl: 'app/components/registroComite/registroComite.html',
    controller: registroComiteCtrl,
    controllerAs: 'vm'
  });

  registroComiteCtrl.$inject = ['ComiteService', 'ComunaService', '$state', '$scope'];

  function registroComiteCtrl (ComiteService, ComunaService, $state, $scope) {
    var vm = this;

    vm.comuna = [];
    ComunaService.query().$promise.then(function (data) {
      vm.comuna = data;
    });

    vm.crearcomite = function (comite) {
      var comit = {
        nombre: comite.nombre,
        comuna_id: parseInt(comite.comuna_id, 10)
      };

      ComiteService.save(comit);
      $state.go('registroAdmin');
    }
  }
})();