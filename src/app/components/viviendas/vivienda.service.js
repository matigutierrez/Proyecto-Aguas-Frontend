(function () {
  'use strict';

  angular
  .module('app')
  .service('ViviendaService', viviendaService);

  viviendaService.$inject = ['$resource', 'API'];

  function viviendaService($resource, API) {
    return $resource(API + 'vivienda/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
