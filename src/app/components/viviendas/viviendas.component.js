(function () {
  'use strict';

  angular
  .module('app')
  .component('viviendas', {
    templateUrl: 'app/components/viviendas/viviendas.html',
    controller: viviendasCtrl,
    controllerAs: 'vm'
  });

  viviendasCtrl.$inject = ['ViviendaService', '$state', '$rootScope'];

  function viviendasCtrl(ViviendaService) {
  	var vm = this;
    vm.vivienda = [];

    ViviendaService.query().$promise.then(function (data) {
      vm.vivienda = data;
    });
  }
})();
