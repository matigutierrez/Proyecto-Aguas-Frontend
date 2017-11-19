(function () {
  'use strict';

  angular
  .module('app')
  .component('pdf', {
    templateUrl: 'app/components/pdf/pdf.html',
    controller: pdfCtr,
    controllerAs: 'vm'
  });

  function pdfCtr() {}
})();
