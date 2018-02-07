(function () {
  'use strict';

  angular
  .module('app')
  .component('boletasAbonadas', {
    templateUrl: 'app/components/boletasAbonadas/boletasAbonadas.html',
    controller: boletasAbonadasCtrl,
    controllerAs: 'vm'
  });

  boletasAbonadasCtrl.$inject = ['AbonoService', '$state', '$mdDialog'];

  function boletasAbonadasCtrl(AbonoService, $state, $mdDialog) {
    var vm = this;
    vm.abonadas = [];

    AbonoService.query().$promise.then(function (data) {
      vm.abonadas = data;
    });

    vm.busqueda = function (dato) {
      var abonado = [];
      for (var i = 0; i < vm.abonadas.length; i++) {
        if (vm.abonadas[i].cod_abono === dato) {
          abonado.push(vm.abonadas[i]);
        }
      }
      vm.abonadas = abonado;
    };

    vm.eliminarabono = function (id) {
      var confirm = $mdDialog.confirm()
            .title('Está seguro que desea ELIMINAR el REGISTRO ?')
            .textContent('La acción no se podrá deshacer')
            .ok('SI')
            .cancel('NO');

      $mdDialog.show(confirm).then(function () {
        AbonoService.delete({id: id});
        AbonoService.query().$promise.then(function (data) {
          vm.abonadas = data;
        });
        $state.go('boletasAbonadas');

        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('REGISTRO ELIMINADO!')
            .ok('Ok!')
        );
        AbonoService.query().$promise.then(function (data) {
          vm.abonadas = data;
        });
      }, function () {
        console.log('CANCEL');
      });
    };
  }
})();
