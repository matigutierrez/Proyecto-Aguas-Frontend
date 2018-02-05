(function () {
  'use strict';

  angular
  .module('app')
  .service('MedidorService', medidorService);

  medidorService.$inject = ['$resource', 'API', 'ViviendaService'];

  function medidorService($resource, API, ViviendaService) {
    var medidor = $resource(API + 'medidor/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    var viviendaMedidor = $resource(API + 'medidor/:id/vivienda', {id: '@id'});
    medidor.prototype.vivienda = function () {
      return new ViviendaService(viviendaMedidor.query({id: this.id}));
    };

    return medidor;

  }
})();
