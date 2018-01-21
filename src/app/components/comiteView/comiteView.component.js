(function () {
  'use strict';

  angular
  .module('app')
  .component('comiteView', {
    templateUrl: 'app/components/comiteView/comiteView.html',
    controller: comiteViewCtrl,
    controllerAs: 'vm'
  });

  comiteViewCtrl.$inject = ['$rootScope', 'ComiteService'];

  var dataComit = {};

  function comiteViewCtrl($rootScope, ComiteService) {
    var vm = this;

    ComiteService.query().$promise.then(function (data) {
      dataComit = $rootScope.datosComite;
      console.log(dataComit);
      vm.nombre = dataComit.nombre;
      vm.comuna_id = dataComit.comuna.des_comu;
    });
  }
})();
