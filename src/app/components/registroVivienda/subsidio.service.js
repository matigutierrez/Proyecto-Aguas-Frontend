(function () {
  'use strict';

  angular
  .module('app')
  .service('SubsidioService', subsidioService);

  subsidioService.$inject = ['$resource', 'API'];

  function subsidioService($resource, API) {
    return $resource(API + 'subsidio/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
