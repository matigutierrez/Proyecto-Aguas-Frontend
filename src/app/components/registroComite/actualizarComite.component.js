(function () {
  'use strict';

  angular
  .module('app')
  .component('actualizarComite', {
    templateUrl: 'app/components/registroComite/actualizarComite.html',
    controller: actualizarComite,
    controllerAs: 'vm'
  });

  actualizarComite.$inject = ['ComiteService', 'ComunaService', '$state', '$rootScope'];

  var comiteid = 0;
  function actualizarComite (ComiteService, ComunaService, $state, $rootScope) {
    var vm = this;

    vm.comuna = [];
    ComunaService.query().$promise.then(function (data) {
      vm.comuna = data;
    });

    comiteid = $rootScope.id;

    vm.actualizarcomite = function (comite) {
      ComiteService.update({id: comiteid}, comite, function () {
        $state.go('comites');
      }, function () {});
    };
  }
})();