(function () {
  'use strict';

  angular
  .module('app')
  .service('RegionService', regionService);

  regionService.$inject = ['$resource', 'API'];

  function regionService($resource, API) {
    return $resource(API + 'region/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
