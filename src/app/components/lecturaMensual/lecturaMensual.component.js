(function () {
  'use strict';

  angular
  .module('app')
  .component('lecturaMensual', {
    templateUrl: 'app/components/lecturaMensual/lecturaMensual.html',
    controller: lecturaMensualCtrl,
    controllerAs: 'vm'
  });

  lecturaMensualCtrl.$inject = ['LecturaMensualService', '$rootScope', '$state', '$mdDialog'];

  function lecturaMensualCtrl(LecturaMensualService, $rootScope, $state, $mdDialog) {
    var vm = this;
    
    vm.lecturaMensual = $rootScope.datosComite.registrosmensuales();

    vm.busqueda = function (dato) {
      var lectura = [];
      for (var i = 0; i < vm.lecturaMensual.length; i++) {
        if (vm.lecturaMensual[i].medidor_id === dato) {
          lectura.push(vm.lecturaMensual[i]);
        }
      }
      vm.lecturaMensual = lectura;
    };

    vm.eliminarLecturaMensual = function (id) {
      var confirm = $mdDialog.confirm()
            .title('Está seguro que desea ELIMINAR este REGISTRO ?')
            .textContent('La acción no se podrá deshacer')
            .ok('SI')
            .cancel('NO');

      $mdDialog.show(confirm).then(function () {
        LecturaMensualService.delete({id: id});
        LecturaMensualService.query().$promise.then(function (data) {
          vm.lecturaMensual = data;
        });
        $state.go('lecturaMensual');

        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('REGISTRO ELIMINADO!')
            .ok('Ok!')
        );
        LecturaMensualService.query().$promise.then(function (data) {
          vm.lecturaMensual = data;
        });
      }, function () {
        console.log('CANCEL');
      });
    };
  }
})();
