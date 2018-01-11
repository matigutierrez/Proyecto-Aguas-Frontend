(function () {
  'use strict';

  angular
  .module('app')
  .component('actualizarMedidor', {
    templateUrl: 'app/components/registroMedidor/actualizarMedidor.html',
    controller: actualizarMedidor,
    controllerAs: 'vm'
  });

  actualizarMedidor.$inject = ['MedidorService', '$state', '$rootScope', '$scope'];

  var medidorid = 0;
  function actualizarMedidor(MedidorService, $state, $scope) {
    var vm = this;

    $scope.$on('id', function ($event, data) {
      medidorid = data;
    });

    vm.actualizarmedidor = function (medidor) {
      MedidorService.update({id: medidorid}, medidor, function () {
        $state.go('medidores');
      }, function () {});
    };
  }
})();
