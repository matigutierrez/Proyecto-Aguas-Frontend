(function () {
  'use strict';

  angular
  .module('app')
  .service('ClienteService', clienteService);

  clienteService.$inject = ['$resource', 'API', 'MedidorService', 'ViviendaService'];

  function clienteService($resource, API, MedidorService, ViviendaService) {
    var cliente = $resource(API + 'cliente/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    var clienteAddVivienda = $resource(API + 'cliente/:id/addvivienda/:idviv', {id: '@id', idviv: '@idviv'});
    cliente.prototype.addVivienda = function (idviv) {
      return clienteAddVivienda.get({id: this.id, idviv: idviv});
    };

    var clienteRemoveVivienda = $resource(API + 'cliente/:id/removevivienda/:idviv', {id: '@id', idviv: '@idviv'});
    cliente.prototype.removeVivienda = function (idviv) {
      return clienteRemoveVivienda.get({id: this.id, idviv: idviv});
    };

    var clienteMedidores = $resource(API + 'cliente/:id/medidores', {id: '@id'});
    cliente.prototype.getmedidores = function () {
      var medidores = clienteMedidores.query({id: this.id});
      for (var i = 0; i < medidores.length; i++) {
        medidores[i] = new MedidorService(medidores[i]);
      }
      return medidores;
    };

    var clienteViviendas = $resource(API + 'cliente/:id/viviendas', {id: '@id'});
    cliente.prototype.getviviendas = function () {
      var viviendas = clienteViviendas.query({id: this.id});
      for (var i = 0; i < viviendas.length; i++) {
        viviendas[i] = new ViviendaService(viviendas[i]);
      }
      return viviendas;
    };

    return cliente;
  }
})();
