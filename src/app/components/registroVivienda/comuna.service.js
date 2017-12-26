(function () {
  'use strict';

  angular
  .module('app')
  .service('ComunaService', comunaService);

  comunaService.$inject = ['$resource', 'API'];

  function comunaService($resource, API) {
    return $resource(API + 'comuna/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
