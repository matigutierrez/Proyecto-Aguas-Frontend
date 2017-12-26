(function () {
  'use strict';

  angular
  .module('app')
  .component('lecturaMensual', {
    templateUrl: 'app/components/lecturaMensual/lecturaMensual.html',
    controller: lecturaMensualCtrl,
    controllerAs: 'vm'
  });

  lecturaMensualCtrl.$inject = ['LecturaMensualService', '$state', '$rootScope'];

  function lecturaMensualCtrl(LecturaMensualService) {
    var vm = this;
    vm.lecturaMensual = [];

    LecturaMensualService.query().$promise.then(function (data) {
      vm.lecturaMensual = data;
    });

    vm.busqueda = function (dato) {
      var lectura = [];
      for (var i = 0; i < vm.lecturaMensual.length; i++) {
        if (vm.lecturaMensual[i].vivienda_id === dato) {
          lectura.push(vm.lecturaMensual[i]);
        }
      }
      vm.lecturaMensual = lectura;
    };
  }
})();
