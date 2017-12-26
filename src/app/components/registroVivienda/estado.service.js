(function () {
  'use strict';

  angular
  .module('app')
  .service('EstadoService', estadoService);

  estadoService.$inject = ['$resource', 'API'];

  function estadoService($resource, API) {
    return $resource(API + 'estado/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
