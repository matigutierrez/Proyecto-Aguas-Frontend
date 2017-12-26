(function () {
  'use strict';

  angular
  .module('app')
  .component('menuListas', {
    templateUrl: 'app/components/menuListas/menuListas.html',
    controller: menuListasCtr,
    controllerAs: 'vm'
  });

  function menuListasCtr() {}
})();
