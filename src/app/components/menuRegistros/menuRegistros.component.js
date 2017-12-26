(function () {
  'use strict';

  angular
  .module('app')
  .component('menuRegistros', {
    templateUrl: 'app/components/menuRegistros/menuRegistros.html',
    controller: menuRegistroCtr,
    controllerAs: 'vm'
  });

  function menuRegistroCtr() {}
})();
