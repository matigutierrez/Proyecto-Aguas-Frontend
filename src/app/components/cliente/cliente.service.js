(function () {
  'use strict';

  angular
  .module('app')
  .service('ClienteService', clienteService);

  clienteService.$inject = ['$resource', 'API', 'ViviendaService', '$injector'];

  function clienteService($resource, API, ViviendaService, $injector) {
    // var MedidorService = angular.injector(['ng', 'app']).get('MedidorService');
    // var MedidorService = $injector.get('MedidorService');

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
      return clienteMedidores.query({id: this.id}).$promise.then(function (data) {
        for (var i = 0; i < data.length; i++) {
          data[i] = new ($injector.get('MedidorService'))(data[i]);
        }
        return data;
      });
    };

    var clienteViviendas = $resource(API + 'cliente/:id/viviendas', {id: '@id'});
    cliente.prototype.getviviendas = function () {
      var viviendas = clienteViviendas.query({id: this.id}).$promise.then(function (data) {
        for (var i = 0; i < data.length; i++) {
          viviendas[i] = new ViviendaService(data[i]);
        }
      });
      return viviendas;
    };

    return cliente;
  }
})();
