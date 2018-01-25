(function () {
  'use strict';

  angular
  .module('app')
  .component('registroComite', {
    templateUrl: 'app/components/registroComite/registroComite.html',
    controller: registroComiteCtrl,
    controllerAs: 'vm'
  });

  registroComiteCtrl.$inject = ['ComiteService', 'ComunaService', '$state', '$scope', '$mdDialog'];

  function registroComiteCtrl (ComiteService, ComunaService, $state, $scope, $mdDialog) {
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
      $state.go('comites');
    }

    $scope.showAlert = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('This is an alert title')
          .textContent('You can specify some description text in here.')
          .ariaLabel('Alert Dialog Demo')
          .ok('Got it!')
          .targetEvent(ev)
      );
    };
  }
})();