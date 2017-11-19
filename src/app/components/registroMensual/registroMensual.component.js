(function () {
  'use strict';

  angular
  .module('app')
  .component('registroMensual', {
    templateUrl: 'app/components/registroMensual/registroMensual.html',
    controller: registroMensualCtrl,
    controllerAs: 'vm'
  });

  function registroMensualCtrl() {}
})();
