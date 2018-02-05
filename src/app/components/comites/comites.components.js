(function () {
  'use strict';

  angular
  .module('app')
  .component('comites', {
    templateUrl: 'app/components/comites/comites.html',
    controller: comitesCtr,
    controllerAs: 'vm'
  }).controller('AutoCtrl', function AutoCtrl(){});

  comitesCtr.$inject = ['ComunaService', 'ComiteService', '$state', '$rootScope', '$mdDialog'];

  function comitesCtr(ComunaService, ComiteService, $state, $rootScope, $mdDialog) {
    var vm = this;
    vm.comite = [];

    ComiteService.query().$promise.then(function (data) {
      vm.comite = data;
    });

    vm.comuna = {};
    ComunaService.query().$promise.then(function (data) {
      vm.comuna = data;
    });

    vm.busqueda = function (dato) {
      var comites = [];
      for (var i = 0; i < vm.comite.length; i++) {
        if (vm.comite[i].nombre === dato) {
          comites.push(vm.comite[i]);
        } else if (vm.comite[i].comuna.des_comu === dato) {
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
      vm.showAlert($state.go('actualizarComite'));
    };

    vm.showAlert = function (ev) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('INFO: SOLO SE PUEDE ACTUALIZAR EL NOMBRE DEL COMITÉ')
          .ok('Entendido')
          .targetEvent(ev)
      );
    };

    vm.eliminarcomite = function (id) {
      var confirm = $mdDialog.confirm()
            .title('Está seguro que desea eliminar este comité ?')
            .textContent('La acción no se podrá deshacer')
            .ok('SI')
            .cancel('NO');

      $mdDialog.show(confirm).then(function () {
        ComiteService.delete({id: id});
        ComiteService.query().$promise.then(function (data) {
          vm.comite = data;
        });

        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Comité Eliminado!')
            .ok('Ok!')
        );
        ComiteService.query().$promise.then(function (data) {
          vm.comite = data;
        });
      }, function () {
        console.log('CANCEL');
      });

      /*ComiteService.delete({id: id});
      ComiteService.query().$promise.then(function (data) {
        vm.comite = data;
      });*/
    };



    vm.autocompletar = function(ev, comite) {
      $mdDialog.show({
        controller: AutoCtrl,
        controllerAs: 'vm',
        templateUrl: 'app/components/comites/autocompletar.dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          comite: comite
        },
      });
    };
  }


  function AutoCtrl (ComiteService, comite) {
    var vm = this;

    vm.comite = comite;
    vm.querySearch   = querySearch;

    function querySearch (query) {
      var results = query ? vm.comite.filter( createFilterFor(query) ) : vm.comite;
      return results;
    }

    function createFilterFor(query) {
      var lowercaseQuery = query;
      console.log(lowercaseQuery);

      return function filterFn(comu) {
        return (comu.nombre.indexOf(lowercaseQuery) === 0);
      };

    }
  }
})();
