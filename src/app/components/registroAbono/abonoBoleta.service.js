(function () {
  'use strict';

  angular
  .module('app')
  .service('AbonoService', abonoService);

  abonoService.$inject = ['$resource', 'API'];

  function abonoService($resource, API) {
    return $resource(API + 'abonoboleta/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
