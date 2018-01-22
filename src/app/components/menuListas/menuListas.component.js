(function () {
  'use strict';

  angular
  .module('app')
  .component('menuListas', {
    templateUrl: 'app/components/menuListas/menuListas.html',
    controller: menuListasCtr,
    controllerAs: 'vm'
  });

  menuListasCtr.$inject = ['UsuarioLogService'];

  function menuListasCtr(UsuarioLogService) {
  	var vm = this;

  	UsuarioLogService.get().$promise.then(function (data) {
      vm.usuario = data;
    });
  }
})();
