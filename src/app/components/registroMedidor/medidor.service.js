(function () {
  'use strict';

  angular
  .module('app')
  .service('MedidorService', medidorService);

  medidorService.$inject = ['$resource', 'API', 'ViviendaService', 'LecturaMensualService', '$injector'];

  function medidorService($resource, API, ViviendaService, LecturaMensualService, $injector) {
    var medidor = $resource(API + 'medidor/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    var medidorRegistrosMensuales = $resource(API + 'medidor/:id/registrosmensuales', {id: '@id'});
    medidor.prototype.registrosmensuales = function () {
      var regmensuales = [];
      medidorRegistrosMensuales.query({id: this.id}).$promise.then(function (data){
        for (var i = 0; i < data.length; i++) {
          regmensuales[i] = new LecturaMensualService(data[i]);
        }
      });
      return regmensuales;
    };

    var medidorUltimoRegistro = $resource(API + 'medidor/:id/ultimoregistro', {id: '@id'});
    medidor.prototype.ultimoRegistro = function () {
      return new LecturaMensualService(medidorUltimoRegistro.get({id: this.id}));
    };

    var clienteMedidor = $resource(API + 'medidor/:id/clientemedidor', {id: '@id'});
    medidor.prototype.clienteMedidor = function () {
      return clienteMedidor.get({id: this.id}).$promise.then(function (data) {
        return new ($injector.get('ClienteService'))(data);
      });
    };
    return medidor;
  }
})();
