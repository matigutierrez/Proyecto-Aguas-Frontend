(function () {
  'use strict';

  angular
  .module('app')
  .service('ClienteService', clienteService);

  clienteService.$inject = ['$resource', 'API'];

  function clienteService($resource, API) {
    var cliente = $resource(API + 'cliente/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    var clienteAddVivienda = $resource(API + 'cliente/:id/addvivienda/:idviv', {id: '@id', idviv: '@idviv'});
    cliente.prototype.addVivienda = function (idviv) {
      return clienteAddVivienda.get({id: this.id, idviv: idviv});
    }

    var clienteRemoveVivienda = $resource(API + 'cliente/:id/removevivienda/:idviv', {id: '@id', idviv: '@idviv'});
    cliente.prototype.removeVivienda = function (idviv) {
      return clienteRemoveVivienda.get({id: this.id, idviv: idviv});
    }
    return cliente;
  }
})();
