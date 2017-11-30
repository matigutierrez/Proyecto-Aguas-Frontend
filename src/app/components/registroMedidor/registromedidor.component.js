(function () {
  'use strict';

  angular
  .module('app')
  .component('registromedidor', {
    templateUrl: 'app/components/registroMedidor/registromedidor.html',
    controller: registromedidor,
    controllerAs: 'vm'
  });

  registromedidor.$inject = ['MedidorService', '$state', '$rootScope'];

  function registromedidor(MedidorService, $state) {
    var vm = this;

    vm.crearmedidor = function (medidor) {
      var medid = {
        num_medidor: medidor.num_medidor,
        marca_medidor: medidor.marca_medidor,
        lectura_inicial: 0,
        vivienda_id: medidor.vivienda_id,
        estado_medidor_id: 1
      };

      MedidorService.save(medid);
      $state.go('tabla');
    };
  }
})();
