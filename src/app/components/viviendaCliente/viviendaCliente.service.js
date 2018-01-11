(function () {
  'use strict';

  angular
  .module('app')
  .service('ViviendaClienteService', viviendaClienteService);

  viviendaClienteService.$inject = ['$resource', 'API'];

  function viviendaClienteService($resource, API) {
    return $resource(API + 'viviendacliente/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
