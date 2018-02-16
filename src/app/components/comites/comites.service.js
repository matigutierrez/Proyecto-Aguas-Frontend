(function () {
  'use strict';

  angular
  .module('app')
  .service('ComiteService', comiteService);

  comiteService.$inject = ['$resource', 'API', 'ClienteService', 'MedidorService', 'ViviendaService', 'LecturaMensualService', 'ParametrosService'];

  function comiteService($resource, API, ClienteService, MedidorService, ViviendaService, LecturaMensualService, ParametrosService) {
    var comite = $resource(API + 'comite/:id', {id: '@id'},
      {
        update: {
          method: 'PUT'
        }
      }
    );

    var comiteParametros = $resource(API + 'comite/:id/parametros', {id: '@id'});
    comite.prototype.parametros = function () {
      //var parametros = [];
      return comiteParametros.get({id: this.id});
      /*comiteParametros.query({id: this.id}).$promise.then(function (data) {
        for (var i = 0; i < data.length; i++) {
          parametros[i] = new ParametrosService(data[i]);
        }
      });*/
      //return parametros;
    };

    var comiteClientes = $resource(API + 'comite/:id/clientes', {id: '@id'});
    comite.prototype.clientes = function () {
      var clientes = [];
      comiteClientes.query({id: this.id}).$promise.then(function (data) {
        for (var i = 0; i < data.length; i++) {
          clientes[i] = new ClienteService(data[i]);
        }
      });
      return clientes;
    };

    var comiteMedidores = $resource(API + 'comite/:id/medidores', {id: '@id'});
    comite.prototype.medidores = function () {
      var medidores = [];
      comiteMedidores.query({id: this.id}).$promise.then(function (data) {
        for (var i = 0; i < data.length; i++) {
          medidores[i] = new MedidorService(data[i]);
        }
      });
      return medidores;
    };

    var comiteViviendas = $resource(API + 'comite/:id/viviendas', {id: '@id'});
    comite.prototype.viviendas = function () {
      var viviendas = [];
      comiteViviendas.query({id: this.id}).$promise.then(function (data) {
        for (var i = 0; i < data.length; i++) {
          viviendas[i] = new ViviendaService(data[i]);
        }
      });
      return viviendas;
    };

    var comiteViviendaCliente = $resource(API + 'comite/:id/viviendacliente', {id: '@id'});
    comite.prototype.viviendaCliente = function () {
      var viviendaCliente = [];
      comiteViviendaCliente.query({id: this.id}).$promise.then(function (datos) {
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

    var medidorRegistrosMensuales = $resource(API + 'medidor/:id/registrosmensuales', {id: '@id'});
    comite.prototype.registrosmensuales = function () {
      var registrosmensuales = [];
      comiteMedidores.query({id: this.id}).$promise.then(function (data) {
        for (var i = 0; i < data.length; i++) {
          var medidor = new MedidorService(data[i]);
          medidorRegistrosMensuales.query({id: medidor.id}).$promise.then(function (dataRegistrosMensuales) {
            for (var j = 0; j < dataRegistrosMensuales.length; j++) {
              registrosmensuales.push(new LecturaMensualService(dataRegistrosMensuales[j]));
            }
          });
        }
      });
      return registrosmensuales;
    };

    var comiteAddCliente = $resource(API + 'comite/:id/addcliente/:idcliente', {id: '@id', idcliente: '@idcliente'});
    comite.prototype.addCliente = function (idcliente) {
      return comiteAddCliente.get({id: this.id, idcliente: idcliente});
    };

    var comiteRemoveCliente = $resource(API + 'comite/:id/removecliente/:idcliente', {id: '@id', idcliente: '@idcliente'});
    comite.prototype.removeCliente = function (idcliente) {
      return comiteRemoveCliente.get({id: this.id, idcliente: idcliente});
    };

    return comite;
  }
})();
