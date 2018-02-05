(function () {
  'use strict';

  angular
  .module('app')
  .component('menuAdmin', {
    templateUrl: 'app/components/menuAdmin/menuAdmin.html',
    controller: menuAdminCtrl,
    controllerAs: 'vm'
  });

  function menuAdminCtrl() {}
})();
