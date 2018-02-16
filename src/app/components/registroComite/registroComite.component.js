(function () {
  'use strict';

  angular
  .module('app')
  .component('registroComite', {
    templateUrl: 'app/components/registroComite/registroComite.html',
    controller: registroComiteCtrl,
    controllerAs: 'vm'
  });

  registroComiteCtrl.$inject = ['ParametrosService', 'ComiteService', 'ComunaService', '$state', '$rootScope', '$mdDialog'];

  function registroComiteCtrl(ParametrosService, ComiteService, ComunaService, $state, $rootScope, $mdDialog) {
    var vm = this;

    vm.comuna = [];
    ComunaService.query().$promise.then(function (data) {
      vm.comuna = data;
    });

    vm.parametros = [];
    ParametrosService.query().$promise.then(function (data) {
      vm.parametros = data;
    });

    vm.crearcomite = function (comite, index) {
      var comit = {
        nombre: comite.nombre,
        comuna_id: parseInt(comite.comuna_id, 10)
      };
      vm.showAlert(ComiteService.save(comit), comite);
      $state.go('registroAdmin');

      vm.comite = [];
      ComiteService.query().$promise.then(function (data) {
        vm.comite = data;
        var ultimo = vm.comite[vm.comite.length - 1];

        var params = {
          comite_id: ultimo.id,
          valor_metro:  0,
          valor_maximo_descuento: 0,
          valor_sobre_consumo: 0,
          metros_sobre_consumo: 0,
          cargo_fijo: 0,
          alcantarillado: 0,
          multa_reunion: 0,
          multa_corte: 0,
          multa_adulteracion: 0
        };
        ParametrosService.save(params);
      });
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
