(function () {
  'use strict';

  angular
  .module('app')
  .service('BoletaEmitidaService', boletaEmitidaService);

  boletaEmitidaService = ['$resource', 'API'];

  function boletaEmitidaService($resource, API) {
    return $resource(API + 'boletaemitida/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
