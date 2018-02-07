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
      component: 'registro',
      isPrivate: true
    })
    .state('registromedidor', {
      url: '/registromedidor',
      component: 'registromedidor',
      isPrivate: true
    })
    .state('tabla', {
      url: '/tabla',
      component: 'tabla',
      isPrivate: true
    })
    .state('cliente', {
      url: '/cliente',
      component: 'cliente',
      isPrivate: true
    })
    .state('pdf', {
      url: '/pdf',
      component: 'pdf',
      isPrivate: true
    })
    .state('medidores', {
      url: '/medidores',
      component: 'medidores',
      isPrivate: true
    })
    .state('registroPagos', {
      url: '/registroPagos',
      component: 'registroPagos',
      isPrivate: true
    })
    .state('registroMensual', {
      url: '/registroMensual',
      component: 'registroMensual',
      isPrivate: true
    })
    .state('emisionCobranza', {
      url: '/emisionCobranza',
      component: 'emisionCobranza',
      isPrivate: true
    })
    .state('historialCobranza', {
      url: '/historialCobranza',
      component: 'historialCobranza',
      isPrivate: true
    })
    .state('viviendas', {
      url: '/viviendas',
      component: 'viviendas',
      isPrivate: true
    })
    .state('menuRegistros', {
      url: '/menuRegistros',
      component: 'menuRegistros',
      isPrivate: true
    })
    .state('menuListas', {
      url: '/menuListas',
      component: 'menuListas',
      isPrivate: true
    })
    .state('registroVivienda', {
      url: '/registroVivienda',
      component: 'registroVivienda',
      isPrivate: true
    })
    .state('lecturaMensual', {
      url: '/lecturaMensual',
      component: 'lecturaMensual',
      isPrivate: true
    })
    .state('boletasPendientes', {
      url: '/boletasPendientes',
      component: 'boletasPendientes',
      isPrivate: true
    })
    .state('abonoBoleta', {
      url: '/abonoBoleta',
      component: 'abonoBoleta',
      isPrivate: true
    })
    .state('boletasAbonadas', {
      url: '/boletasAbonadas',
      component: 'boletasAbonadas',
      isPrivate: true
    })
    .state('boletasEmitidas', {
      url: '/boletasEmitidas',
      component: 'boletasEmitidas',
      isPrivate: true
    })
    .state('actualizarMedidor', {
      url: '/actualizarMedidor',
      component: 'actualizarMedidor',
      isPrivate: true
    })
    .state('actualizarVivienda', {
      url: '/actualizarVivienda',
      component: 'actualizarVivienda',
      isPrivate: true
    })
    .state('actualizarCliente', {
      url: '/actualizarCliente',
      component: 'actualizarCliente',
      isPrivate: true
    })
    .state('viviendaCliente', {
      url: '/viviendaCliente',
      component: 'viviendaCliente',
      isPrivate: true
    })
    .state('asignarVivienda', {
      url: '/asignarVivienda',
      component: 'asignarVivienda',
      isPrivate: true
    })
    .state('menuAdmin', {
      url: '/menuAdmin',
      component: 'menuAdmin',
      isPrivate: true
    })
    .state('comites', {
      url: '/comites',
      component: 'comites',
      isPrivate: true
    })
    .state('registroComite', {
      url: '/registroComite',
      component: 'registroComite',
      isPrivate: true
    })
    .state('comiteView', {
      url: '/comiteView',
      component: 'comiteView',
      isPrivate: true
    })
    .state('actualizarComite', {
      url: '/actualizarComite',
      component: 'actualizarComite',
      isPrivate: true
    })
    .state('clienteComite', {
      url: '/clienteComite',
      component: 'clienteComite',
      isPrivate: true
    })
    .state('registroAdmin', {
      url: '/registroAdmin',
      component: 'registroAdmin',
      isPrivate: true
    })
    .state('registroRapidoCliente', {
      url: '/registroRapidoCliente',
      component: 'registroRapidoCliente',
      isPrivate: true
    })
    .state('registroRapidoVivienda', {
      url: '/registroRapidoVivienda',
      component: 'registroRapidoVivienda',
      isPrivate: true
    })
    .state('registroRapidoMedidor', {
      url: '/registroRapidoMedidor',
      component: 'registroRapidoMedidor',
      isPrivate: true
    })
    .state('registroRapidoAsignarVivienda', {
      url: '/registroRapidoAsignarVivienda',
      component: 'registroRapidoAsignarVivienda',
      isPrivate: true
    })
    .state('allClients', {
      url: '/allClients',
      component: 'allClients',
      isPrivate: true
    })
    .state('medidorRegistrosMensuales', {
      url: '/medidorRegistrosMensuales',
      component: 'medidorRegistrosMensuales',
      isPrivate: true
    })
    .state('allClientsActualizarCliente', {
      url: '/allClientsActualizarCliente',
      component: 'allClientsActualizarCliente',
      isPrivate: true
    })
    .state('allClientsActualizarVivienda', {
      url: '/allClientsActualizarVivienda',
      component: 'allClientsActualizarVivienda',
      isPrivate: true
    })
    .state('allClientsActualizarMedidor', {
      url: '/allClientsActualizarMedidor',
      component: 'allClientsActualizarMedidor',
      isPrivate: true
    })
    .state('actualizarRegistroMensual', {
      url: '/actualizarRegistroMensual',
      component: 'actualizarRegistroMensual',
      isPrivate: true
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
