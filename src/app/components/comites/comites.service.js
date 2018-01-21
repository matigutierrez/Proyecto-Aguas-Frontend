(function () {
  'use strict';

  angular
  .module('app')
  .service('ComiteService', comiteService);

  comiteService.$inject = ['$resource', 'API'];

  function comiteService($resource, API) {
    return $resource(API + 'comite/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
