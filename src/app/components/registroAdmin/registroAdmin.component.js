(function () {
  'use strict';

  angular
  .module('app')
  .component('registroAdmin', {
    templateUrl: 'app/components/registroAdmin/registroAdmin.html',
    controller: registroAdminCtr,
    controllerAs: 'vm'
  });

  registroAdminCtr.$inject = ['ComiteService', 'ClienteService', 'UsuarioService', '$state'];

  function registroAdminCtr(ComiteService, ClienteService, UsuarioService, $state) {
    var vm = this;

    vm.cliente = [];
    ClienteService.query().$promise.then(function (data) {
      vm.cliente = data;
    });

    vm.comite = [];
    ComiteService.query().$promise.then(function (data) {
      vm.comite = data;
    });

    vm.crearadmin = function (usuario) {
      var usu = {
        nombre_usu: usuario.nombre_usu,
        password: usuario.password,
        cliente_id: parseInt(usuario.cliente_id, 10),
        comite_id: parseInt(usuario.comite_id, 10)
      };

      UsuarioService.save(usu);
      $state.go('comites');
    };
  }
})();
