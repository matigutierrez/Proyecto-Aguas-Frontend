(function () {
  'use strict';

  angular
  .module('app')
  .component('boletasEmitidas', {
    templateUrl: 'app/components/boletasEmitidas/boletasEmitidas.html',
    controller: boletasEmitidasCtrl,
    controllerAs: 'vm'
  });

  boletasEmitidasCtrl.$inject = ['BoletaEmitidaService', '$state', '$mdDialog'];

  function boletasEmitidasCtrl(BoletaEmitidaService, $state, $mdDialog) {
    var vm = this;
    vm.emitidas = [];

    BoletaEmitidaService.query().$promise.then(function (data) {
      vm.emitidas = data;
    });

    vm.busqueda = function (dato) {
      var emitido = [];
      for (var i = 0; i < vm.emitidas.length; i++) {
        if (vm.emitidas[i].nro_boleta === dato) {
          emitido.push(vm.emitidas[i]);
        }
      }
      vm.emitidas = emitido;
    };

    vm.eliminarBoletaEmitida = function (id) {
      var confirm = $mdDialog.confirm()
            .title('Está seguro que desea ELIMINAR este REGISTRO ?')
            .textContent('La acción no se podrá deshacer')
            .ok('SI')
            .cancel('NO');

      $mdDialog.show(confirm).then(function () {
        BoletaEmitidaService.delete({id: id});
        BoletaEmitidaService.query().$promise.then(function (data) {
          vm.emitidas = data;
        });
        $state.go('boletasEmitidas');

        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('REGISTRO ELIMINADO!')
            .ok('Ok!')
        );
        BoletaEmitidaService.query().$promise.then(function (data) {
          vm.emitidas = data;
        });
      }, function () {
        console.log('CANCEL');
      });
    };
  }
})();
