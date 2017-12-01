(function () {
  'use strict';

  angular
  .module('app')
  .service('UsuarioLogService', usuariologService);

  usuariologService.$inject = ['$resource', 'API'];

  function usuariologService($resource, API) {
    return $resource(API + 'logusuario');
  }
})();
