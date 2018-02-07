(function () {
  'use strict';

  angular
  .module('app')
  .service('MesService', mesService);

  mesService.$inject = ['$resource', 'API'];

  function mesService($resource, API) {
    return $resource(API + 'mes/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
