(function () {
  'use strict';

  angular
  .module('app')
  .service('PdfService', pdfService);

  pdfService.$inject = ['$resource', 'API'];

  function pdfService($resource, API) {
    return $resource(API + 'pdf');
  }
})();
