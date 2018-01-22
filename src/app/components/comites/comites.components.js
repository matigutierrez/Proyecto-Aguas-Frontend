(function () {
  'use strict';

  angular
  .module('app')
  .component('comites', {
    templateUrl: 'app/components/comites/comites.html',
    controller: comitesCtr,
    controllerAs: 'vm'
  });

  comitesCtr.$inject = ['ComunaService', 'ComiteService', '$state', '$rootScope'];

  function comitesCtr(ComunaService, ComiteService, $state, $rootScope) {
    var vm = this;
    vm.comite = [];

    ComiteService.query().$promise.then(function (data) {
      vm.comite = data;
    });

    vm.comuna = [];
    ComunaService.query().$promise.then(function (data) {
      vm.comuna = data;
    });

    vm.busqueda = function (dato) {
      var comites = [];
      for (var i = 0; i < vm.comite.length; i++) {
        if (vm.comite[i].nombre === dato) {
          comites.push(vm.comite[i]);
        }else if (vm.comite[i].comuna.des_comu === dato) {
          comites.push(vm.comite[i]);
        }
      }
      vm.comite = comites;
    };

    vm.vercomite = function (index) {
      var data = vm.comite[index];
      $rootScope.datosComite = data;
      $state.go('comiteView');
    };

    vm.actualizarcomite = function (id) {
      $rootScope.id = id;
      $state.go('actualizarComite');
    };

    vm.eliminarcomite = function (id) {
      ComiteService.delete({id: id});
      ComiteService.query().$promise.then(function (data) {
        vm.comite = data;
      });
    };
  }
})();
