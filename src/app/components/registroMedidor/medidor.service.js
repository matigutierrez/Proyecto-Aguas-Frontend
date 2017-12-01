(function () {
  'use strict';

  angular
  .module('app')
  .service('MedidorService', medidorService);

  medidorService.$inject = ['$resource', 'API'];

  function medidorService($resource, API) {
    return $resource(API + 'medidor/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
