(function () {
  'use strict';

  angular
  .module('app')
  .service('URLTokenService', urlTokenService);

  urlTokenService.$inject = ['$resource', 'API'];

  function urlTokenService($resource, API) {
    return $resource(API + 'urltoken');
  }
})();
