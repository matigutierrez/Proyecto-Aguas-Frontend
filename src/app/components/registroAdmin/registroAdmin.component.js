(function () {
  'use strict';

  angular
  .module('app')
  .component('registroAdmin', {
    templateUrl: 'app/components/registroAdmin/registroAdmin.html',
    controller: registroAdminCtr,
    controllerAs: 'vm'
  });

  registroAdminCtr.$inject = ['ComiteService', 'ClienteService', 'UsuarioService', '$state', '$mdDialog'];

  function registroAdminCtr(ComiteService, ClienteService, UsuarioService, $state, $mdDialog) {
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

      vm.showAlert(UsuarioService.save(usu), usuario);
      //UsuarioService.save(usu);
      $state.go('comites');
    };

    vm.showAlert = function (ev, usuario) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('¡Administrador Creado Satisfactoriamente!')
          .textContent('Administrador: ' + usuario.nombre_usu)
          .ok('Ok!')
          .targetEvent(ev)
      );
    };
  }
})();
