(function () {
  'use strict';

  angular
  .module('app')
  .component('login', {
    templateUrl: 'app/components/login/login.html',
    controller: loginCtr,
    controllerAs: 'vm'
  });

  function loginCtr() {}
})();
