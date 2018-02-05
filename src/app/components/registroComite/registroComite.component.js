(function () {
  'use strict';

  angular
  .module('app')
  .component('registroComite', {
    templateUrl: 'app/components/registroComite/registroComite.html',
    controller: registroComiteCtrl,
    controllerAs: 'vm'
  });

  registroComiteCtrl.$inject = ['ComiteService', 'ComunaService', '$state', '$mdDialog'];

  function registroComiteCtrl(ComiteService, ComunaService, $state, $mdDialog) {
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
      vm.showAlert(ComiteService.save(comit), comite);
      //ComiteService.save(comit);
      $state.go('registroAdmin');
    };

    vm.showAlert = function(ev, comite) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('¡Comité Creado Satisfactoriamente!')
          .textContent('Nombre: ' + comite.nombre)
          .ok('Ok!')
          .targetEvent(ev)
      );
    };
  }
})();
