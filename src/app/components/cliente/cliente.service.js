(function () {
  'use strict';

  angular
  .module('app')
  .service('ClienteService', clienteService);

  clienteService.$inject = ['$resource', 'API'];

  function clienteService($resource, API) {
    return $resource(API + 'cliente/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
