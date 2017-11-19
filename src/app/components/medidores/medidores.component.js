(function () {
  'use strict';

  angular
  .module('app')
  .component('medidores', {
    templateUrl: 'app/components/medidores/medidores.html',
    controller: medidoresCtr,
    controllerAs: 'vm'
  });

  function medidoresCtr() {}
})();
