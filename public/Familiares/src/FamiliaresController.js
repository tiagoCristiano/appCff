(function(){
  'use strict';
angular.module('app')
  .controller('FamiliaresCtrl', ['$scope','StorageData', 'FamiliaresService','$location','Notification',
    function ($scope,StorageData,FamiliaresService,$location,Notification) {

    $scope.familiares = null;
    $scope.familia    = null;
    
    if(StorageData.getFamilia() && $location.path() != '/newFamiliar') {
      FamiliaresService.query(function(data) {
        de(data);

	        $scope.familiares = data._embedded.user;
          $scope.familia = data._embedded.user[0].familia;
      });
    }

    $scope.novoFamiliar = function () {
      $location.path('/newFamiliar');
    };

    $scope.voltar = function() {
      $location.path('/familiares');
    }

    $scope.create = function () {
        $scope.familiar = {
          status : 1,
          nome   : $scope.familiar.nome,
          email  : $scope.familiar.email,
          familia_id : StorageData.getFamilia()
        };
        FamiliaresService.create($scope.familiar, function(success) {
          de(success);
          Notification.success( {message: 'Familiar adicionado com sucesso!', delay: 4000});
          $location.path('/familiares');
        }, function(error) {
          $scope.familiar.email = null;
           Notification.error( {message: 'Email já cadastrado no sistema, informe outro!', delay: 4000});
        });
    };
  
}])

})();

