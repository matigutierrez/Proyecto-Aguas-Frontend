(function () {
  'use strict';

  angular
  .module('app')
  .service('MedidorService', medidorService);

  medidorService.$inject = ['$resource', 'API', 'ViviendaService', 'LecturaMensualService'];

  function medidorService($resource, API, ViviendaService, LecturaMensualService) {
    var medidor = $resource(API + 'medidor/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    /*var viviendaMedidor = $resource(API + 'medidor/:id/vivienda', {id: '@id'});
    medidor.prototype.vivienda = function () {
      return new ViviendaService(viviendaMedidor.get({id: this.id}));
    };*/

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

    return medidor;

  }
})();
