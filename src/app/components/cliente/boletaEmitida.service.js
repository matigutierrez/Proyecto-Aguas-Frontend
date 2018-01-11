(function () {
  'use strict';

  angular
  .module('app')
  .service('BoletaEmitidaService', boletaEmitidaService);

  boletaEmitidaService.$inject = ['$resource', 'API'];

  function boletaEmitidaService($resource, API) {
    return $resource(API + 'boletaemitida/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
