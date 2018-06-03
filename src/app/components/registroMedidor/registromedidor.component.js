(function () {
  'use strict';

  angular
  .module('app')
  .component('registromedidor', {
    templateUrl: 'app/components/registroMedidor/registromedidor.html',
    controller: registromedidor,
    controllerAs: 'vm'
  });

  registromedidor.$inject = ['UsuarioLogService', 'MedidorService', 'EstadoMedidorService', 'ViviendaService', '$state', '$mdDialog', '$rootScope'];

  var dataComit = {};

  function registromedidor(UsuarioLogService, MedidorService, EstadoMedidorService, ViviendaService, $state, $mdDialog, $rootScope) {
    var vm = this;

    dataComit = $rootScope.datosComite;

    vm.vivienda = [];
    ViviendaService.query().$promise.then(function (data) {
      vm.vivienda = data;
    });

    vm.estadoMedid = [];
    EstadoMedidorService.query().$promise.then(function (data) {
      vm.estadoMedid = data;
    });

    vm.usuario = [];
    UsuarioLogService.get().$promise.then(function (data) {
      vm.usuario = data;
    });

    vm.crearmedidor = function (medidor) {
      if (vm.usuario.superadmin === 1) {
        var medidor1 = {
          num_medidor: medidor.num_medidor,
          marca_medidor: medidor.marca_medidor,
          lectura_inicial: 0,
          vivienda_id: parseInt(medidor.vivienda_id, 10),
          estado_medidor_id: parseInt(medidor.estado_medidor_id, 10),
          comite_id: dataComit.id
        };
        vm.showAlert(MedidorService.save(medidor1), medidor);
        $state.go('medidores');
      } else if (vm.usuario.superadmin === 0) {
        var medidor2 = {
          num_medidor: medidor.num_medidor,
          marca_medidor: medidor.marca_medidor,
          lectura_inicial: 0,
          vivienda_id: parseInt(medidor.vivienda_id, 10),
          estado_medidor_id: parseInt(medidor.estado_medidor_id, 10),
          comite_id: vm.usuario.comite_id
        };
        vm.showAlert(MedidorService.save(medidor2), medidor);
        $state.go('medidores');
      }
    };

    vm.showAlert = function (ev, medidor) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('¡Medidor Creado Satisfactoriamente!')
          .textContent('Nro: ' + medidor.num_medidor + ', Marca: ' + medidor.marca_medidor)
          .ok('Ok!')
          .targetEvent(ev)
      );
    };
  }
})();
