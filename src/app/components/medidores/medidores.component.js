(function () {
  'use strict';

  angular
  .module('app')
  .component('medidores', {
    templateUrl: 'app/components/medidores/medidores.html',
    controller: medidoresCtr,
    controllerAs: 'vm'
  });

  medidoresCtr.$inject = ['MedidorService', '$state', '$rootScope'];

  function medidoresCtr(MedidorService, $state, $rootScope) {
    var vm = this;

    vm.medidor = $rootScope.datosComite.medidores();

    vm.busqueda = function (dato) {
      var medidores = [];
      for (var i = 0; i < vm.medidor.length; i++) {
        if (vm.medidor[i].marca_medidor === dato) {
          medidores.push(vm.medidor[i]);
        }
      }
      vm.medidor = medidores;
    };

    vm.actualizarmedidor = function (id) {
      $rootScope.id = id;
      $state.go('actualizarMedidor');
    };

    vm.eliminarmedidor = function (id) {
      MedidorService.delete({id: id});
      MedidorService.query().$promise.then(function (data) {
        vm.medidor = data;
      });
    };
  }
})();
