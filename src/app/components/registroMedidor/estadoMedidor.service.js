(function () {
  'use strict';

  angular
  .module('app')
  .service('EstadoMedidorService', estadoMedidorService);

  estadoMedidorService.$inject = ['$resource', 'API'];

  function estadoMedidorService($resource, API) {
    return $resource(API + 'estadomedidor/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
