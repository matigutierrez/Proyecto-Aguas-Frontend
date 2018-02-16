(function () {
  'use strict';

  angular
  .module('app')
  .service('ParametrosService', parametrosService);

  parametrosService.$inject = ['$resource', 'API'];

  function parametrosService($resource, API) {
    return $resource(API + 'parametros/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
