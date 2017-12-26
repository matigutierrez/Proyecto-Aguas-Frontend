(function () {
  'use strict';

  angular
  .module('app')
  .service('LecturaMensualService', lecturaMensualService);

  lecturaMensualService.$inject = ['$resource', 'API'];

  function lecturaMensualService($resource, API) {
    return $resource(API + 'registromensual/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
