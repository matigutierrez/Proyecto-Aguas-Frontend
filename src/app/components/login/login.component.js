(function () {
  'use strict';

  angular
  .module('app')
  .component('login', {
    templateUrl: 'app/components/login/login.html',
    controller: loginCtrl,
    controllerAs: 'vm'
  });

  loginCtrl.$inject = ['UsuarioLogService', 'LoginService', 'CredentialsService', '$state', '$rootScope', '$mdDialog'];

  function loginCtrl(UsuarioLogService, LoginService, CredentialsService, $state, $rootScope, $mdDialog) {
    var vm = this;
    vm.loginError = false;

    vm.credentials = {};

    vm.login = function (credentials) {
      LoginService.save(credentials, function (data) {
        var message = true;
        CredentialsService.setToken(data.token);
        CredentialsService.setUser(data.nombre_usu);
        CredentialsService.setSide(true);
        $rootScope.$emit('isLogin');
        $rootScope.$broadcast('side', message);

        UsuarioLogService.get().$promise.then(function (data) {
          vm.usuario = data;

          if (vm.usuario.superadmin === 1) {
            $state.go('menuAdmin');
          } else if (vm.usuario.superadmin === 0) {
            $state.go('menuRegistros');
            var confirm = $mdDialog.confirm()
                  .title('¡¡¡AVISO IMPORTANTE!!!')
                  .textContent('ANTES DE COMENZAR A TRABAJAR, DEBE FIJAR LOS PARAMETROS DEL SISTEMA')
                  .ok('ESTABLECER PARAMETROS');

            $mdDialog.show(confirm).then(function () {
              $state.go('parametros');
            });
          }
        });
      }, function () {
        vm.loginError = true;
      });
    };
  }
})();
