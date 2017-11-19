(function () {
  'use strict';

  angular
  .module('app')
  .component('tabla', {
    templateUrl: 'app/components/tabla/tabla.html',
    controller: tablaCtr,
    controllerAs: 'vm'
  });

  function tablaCtr() {
    var vm = this;

    vm.selected = [];

    vm.query = {
      order: 'name',
      limit: 5,
      page: 1
    };
  }
})();
