(function () {
  'use strict';

  angular
  .module('app')
  .service('AllClientsService', allClientsService);

  allClientsService.$inject = ['$resource', 'API'];

  function allClientsService($resource, API) {
    return $resource(API + 'cliente/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
