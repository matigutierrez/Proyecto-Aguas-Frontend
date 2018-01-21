(function () {
  'use strict';

  angular
  .module('app')
  .service('ComiteClienteService', comiteClienteService);

  comiteClienteService.$inject = ['$resource', 'API'];

  function comiteClienteService($resource, API) {
    return $resource(API + 'comite/clientes/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
