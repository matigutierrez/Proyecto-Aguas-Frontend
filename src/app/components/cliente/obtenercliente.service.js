(function () {
  'use strict';

  angular
  .module('app')
  .service('ObtenerClienteService', obtenerclienteService);

  obtenerclienteService.$inject = ['$resource', 'API'];

  function obtenerclienteService($resource, API) {
    return $resource(API + 'obtenerCliente');
  }
})();
