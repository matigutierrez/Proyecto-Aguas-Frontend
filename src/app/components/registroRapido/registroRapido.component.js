(function () {
  'use strict';

  angular
  .module('app')
  .component('registroRapido', {
    templateUrl: 'app/components/registroRapido/registroRapido.html',
    controller: registroRapidoCtr,
    controllerAs: 'vm'
  });

  registroRapidoCtr.$inject = ['UsuarioLogService', 'SubsidioService', 'EstadoService', 'ComunaService', 'EstadoMedidorService', 'ViviendaService', 'MedidorService', 'ClienteService', 'ComiteService', '$state', '$mdDialog', '$rootScope'];

  var dataComit = {};

  function registroRapidoCtr(UsuarioLogService, SubsidioService, EstadoService, ComunaService, EstadoMedidorService, ViviendaService, MedidorService, ClienteService, ComiteService, $state, $mdDialog, $rootScope) {
    var vm = this;

    vm.comuna = [];
    ComunaService.query().$promise.then(function (data) {
      vm.comuna = data;
    });

    vm.estado = [];
    EstadoService.query().$promise.then(function (data) {
      vm.estado = data;
    });

    vm.subsidio = [];
    SubsidioService.query().$promise.then(function (data) {
      vm.subsidio = data;
    });

    vm.comites = [];
    ComiteService.query().$promise.then(function (data) {
      vm.comites = data;
    });

    vm.estadoMedid = [];
    EstadoMedidorService.query().$promise.then(function (data) {
      vm.estadoMedid = data;
    });

    vm.usuario = [];
    UsuarioLogService.get().$promise.then(function (data) {
      vm.usuario = data;
    });

    vm.guardar = function (cliente, vivienda, medidor) {

      var clienteCreado = false;
      var viviendaCreada = false;
      var medidorCreado = false;

      dataComit = $rootScope.datosComite;

      var viviend = {
        direccion: vivienda.direccion,
        estado_id: parseInt(vivienda.estado_id, 10),
        comuna_id: parseInt(vivienda.comuna_id, 10)
      };
      ViviendaService.save(viviend);
      viviendaCreada = true;

      var client = {
        rut_cliente: parseInt(cliente.rut_cliente, 10),
        nombre: cliente.nombre,
        apellido_pater: cliente.apellido_pater,
        apellido_mater: cliente.apellido_mater,
        telefono: cliente.telefono,
        email: cliente.email,
        estado_cliente: 1,
        subsidio_id: parseInt(cliente.subsidio_id, 10)
      };
      ClienteService.save(client);
      clienteCreado = true;

      vm.viviendaid = [];
      ViviendaService.query().$promise.then(function (data) {
        vm.viviendaid = data;

        vm.clienteid = [];
        ClienteService.query().$promise.then(function (data) {
          vm.clienteid = data;

          var ultimoCliente = vm.clienteid[vm.clienteid.length - 1];
          var ultimaVivienda = vm.viviendaid[vm.viviendaid.length - 1];
          
          var clientId = new ClienteService({id: ultimoCliente.id});
          clientId.addVivienda(ultimaVivienda.id);

          if (vm.usuario.superadmin === 1) {
            var medid = {
              num_medidor: medidor.num_medidor,
              marca_medidor: medidor.marca_medidor,
              lectura_inicial: 0,
              vivienda_id: ultimaVivienda.id,
              estado_medidor_id: parseInt(medidor.estado_medidor_id, 10),
              comite_id: dataComit.id
            };
            MedidorService.save(medid);
            medidorCreado = true;
          } else if (vm.usuario.superadmin === 0) {
            var medid = {
              num_medidor: medidor.num_medidor,
              marca_medidor: medidor.marca_medidor,
              lectura_inicial: 0,
              vivienda_id: ultimaVivienda.id,
              estado_medidor_id: parseInt(medidor.estado_medidor_id, 10),
              comite_id: vm.usuario.comite_id
            };
            MedidorService.save(medid);
            medidorCreado = true;
          }

          if(clienteCreado === true && viviendaCreada === true && medidorCreado === true){
            $mdDialog.show(
              $mdDialog.alert()
                  .title('¡Registro Creado Satisfactoriamente!')
                  .textContent('Nombre: ' + cliente.nombre + ' ' + cliente.apellido_pater + ', Dirección: ' + vivienda.direccion + ', Medidor: ' + medidor.num_medidor)
                  .ok('Ok!')
            );

            if (vm.usuario.superadmin === 1){
              $state.go('allClients');
            } else if (vm.usuario.superadmin === 0) {
              $state.go('tabla');
            }

          } else {
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('**ERROR AL REGISTRAR, INTENTE NUEVAMENTE**')
                .ok('Ok!')
            );
            if (vm.usuario.superadmin === 1){
              $state.go('menuAdmin');
            } else if (vm.usuario.superadmin === 0) {
              $state.go('menuRegistros');
            }
            
          }
          
        });
      });
    };
  }
})();
