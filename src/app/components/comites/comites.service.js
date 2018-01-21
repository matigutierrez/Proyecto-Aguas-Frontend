(function () {
  'use strict';

  angular
  .module('app')
  .service('ComiteService', comiteService);

  comiteService.$inject = ['$resource', 'API'];

  function comiteService($resource, API) {

    var comite = $resource(API + 'comite/:id', {id: '@id'},
    {
      update: {
        method: 'PUT'
      }
    });

    var comiteClientes = $resource(API + 'comite/clientes/:id', {id: '@id'});

    comite.prototype.$clientes = function () {
      return comiteClientes.get({id: this.id});
    }

    return comite;

    /*return $resource(API + 'comite/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });*/
  }
})();
