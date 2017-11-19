(function () {
  'use strict';

  angular
  .module('app')
  .component('registromedidor', {
    templateUrl: 'app/components/registroMedidor/registromedidor.html',
    controller: registromedidor,
    controllerAs: 'vm'
  });

  function registromedidor() {}
})();
