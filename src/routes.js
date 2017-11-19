angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
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
    });
}
