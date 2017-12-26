angular
  .module('app')
  .config(routesConfig)
  .run(middlewareConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('login');

  $stateProvider
    .state('login', {
      url: '/login',
      component: 'login'
    })
    .state('registro', {
      url: '/registro',
      component: 'registro'
    })
    .state('registromedidor', {
      url: '/registromedidor',
      component: 'registromedidor'
    })
    .state('tabla', {
      url: '/tabla',
      component: 'tabla'
    })
    .state('cliente', {
      url: '/cliente',
      component: 'cliente'
    })
    .state('pdf', {
      url: '/pdf',
      component: 'pdf'
    })
    .state('medidores', {
      url: '/medidores',
      component: 'medidores'
    })
    .state('registroPagos', {
      url: '/registroPagos',
      component: 'registroPagos'
    })
    .state('registroMensual', {
      url: '/registroMensual',
      component: 'registroMensual'
    })
    .state('emisionCobranza', {
      url: '/emisionCobranza',
      component: 'emisionCobranza'
    })
    .state('historialCobranza', {
      url: '/historialCobranza',
      component: 'historialCobranza'
    })
    .state('viviendas', {
      url: '/viviendas',
      component: 'viviendas'
    })
    .state('menuRegistros', {
      url: '/menuRegistros',
      component: 'menuRegistros'
    })
    .state('menuListas', {
      url: '/menuListas',
      component: 'menuListas'
    })
    .state('viviendaCliente', {
      url: '/viviendaCliente',
      component: 'viviendaCliente'
    })
    .state('registroVivienda', {
      url: '/registroVivienda',
      component: 'registroVivienda'
    })
    .state('lecturaMensual', {
      url: '/lecturaMensual',
      component: 'lecturaMensual'
    });

  $httpProvider.interceptors.push('InterceptorApi');
}

function middlewareConfig($state, CredentialsService, $transitions) {
  // Funcion cada vez que se intenta acceder a una ruta
  $transitions.onStart({}, function (trans) {
    var isPrivate = trans.$to().isPrivate;
    var to = trans.$to().name;
    // Compruebo si esta logeado para acceder a rutas protegidas, si no esta logeado se va a la pestaña login
    if (isPrivate && !CredentialsService.isLogged()) {
      $state.go('login');
    }

    // Compruebo que quiera entrar a el login cuando ya esta logeado
    if (to === 'login' && CredentialsService.isLogged()) {
      $state.go('app');
    }
  });
}
