(function () {
  'use strict';

  angular
  .module('app')
  .component('cliente', {
    templateUrl: 'app/components/cliente/cliente.html',
    controller: clienteCtr,
    controllerAs: 'vm'
  });

  function clienteCtr() {}
})();
