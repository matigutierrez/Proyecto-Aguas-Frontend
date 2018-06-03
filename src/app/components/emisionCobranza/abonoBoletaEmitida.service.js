(function () {
  'use strict';

  angular
  .module('app')
  .service('AbonoBoletaEmitidaService', abonoBoletaEmitidaService);

  abonoBoletaEmitidaService.$inject = ['$resource', 'API'];

  function abonoBoletaEmitidaService($resource, API) {
    return $resource(API + 'abonoboleta/:id/boletaemitida', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
