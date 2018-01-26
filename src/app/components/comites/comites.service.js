(function () {
  'use strict';

  angular
  .module('app')
  .service('ComiteService', comiteService);

  comiteService.$inject = ['$resource', 'API', 'ClienteService', 'MedidorService', 'ViviendaService'];

  function comiteService($resource, API, ClienteService, MedidorService, ViviendaService) {

    var comite = $resource(API + 'comite/:id', {id: '@id'},
    {
      update: {
        method: 'PUT'
      }
    });

    var comiteClientes = $resource(API + 'comite/:id/clientes', {id: '@id'});
    comite.prototype.clientes = function () {
      var clientes = comiteClientes.query({id: this.id});
      for (var i = 0; i < clientes.length; i++) {
        clientes[i] = new ClienteService(clientes[i]);
      }
      return clientes;
    };

    var comiteMedidores = $resource(API + 'comite/:id/medidores', {id: '@id'});
    comite.prototype.medidores = function () {
      var medidores = comiteMedidores.query({id: this.id});
      for (var i = 0; i < medidores.length; i++) {
        medidores[i] = new MedidorService(medidores[i]);
      }
      return medidores;
    };

    var comiteViviendas = $resource(API + 'comite/:id/viviendas', {id: '@id'});
    comite.prototype.viviendas = function () {
      var viviendas = comiteViviendas.query({id: this.id});
      for (var i = 0; i < viviendas.length; i++) {
        viviendas[i] = new ViviendaService(viviendas[i]);
      }
      return viviendas;
    };

    var comiteViviendaCliente = $resource(API + 'comite/:id/viviendacliente', {id: '@id'});
    comite.prototype.viviendaCliente = function () {
      var viviendaCliente = [];
      comiteViviendaCliente.query({id: this.id}).$promise.then( function(datos) {
        for (var i = 0; i < datos.length; i++) {
          var vivienda = new ViviendaService(datos[i]);
          var clientes = vivienda.clientes;
          for (var j = 0; j < clientes.length; j++) {
            var cliente = new ClienteService(clientes[j]);

            viviendaCliente.push({
              vivienda: vivienda,
              cliente: cliente
            });
          }
        }
      });
      return viviendaCliente;
    };

    return comite;
  }
})();
