(function () {
  'use strict';

  angular
  .module('app')
  .component('menuRegistros', {
    templateUrl: 'app/components/menuRegistros/menuRegistros.html',
    controller: menuRegistroCtr,
    controllerAs: 'vm'
  });

  menuRegistroCtr.$inject = ['UsuarioLogService'];

  function menuRegistroCtr(UsuarioLogService) {
    var vm = this;

    UsuarioLogService.get().$promise.then(function (data) {
      vm.usuario = data;
    });
  }
})();
