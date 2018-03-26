var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

/*********** Services *************************/
//Création de la ressource
pokeApp.factory('pokemonResource',function($resource) {
    return $resource('https://pokeapi.co/api/v2/pokedex/1/:pokeid',{pokeid:'@id'},
        {
            queryAll:{
                url:'https://pokeapi.co/api/v2/pokedex/1/',
                method: 'GET',
                cache:false,
                isArray:false
            }
        })
});

//Création du service de pokemon
pokeApp.factory('pokemonService', [function(){
    var factory = {
        id : false,
        name : false
    }
    return factory;
}]);

/*********** Controllers *************************/
pokeApp.controller('formCtrl', ['$scope','$log',function($scope, $log) {
        $scope.data =[{id: '1', name: 'Dogs'},
            {id: '2', name: 'Tutorials'},
            {id: '3', name: 'Cars'}

        ];
    $scope.$log = $log;
    //$scope.option;
}]);

pokeApp.controller('listPokemon',['$scope','pokemonResource','$log',function ($scope,pokemonResource,$log) {
    pokemonResource.queryAll().$promise.then(function(value){
        $scope.resultatResource = value.pokemon_entries;
        $log.warn($scope.resultatResource);
    })
}])

pokeApp.controller('apiform', function($scope, $http) {
    $http({
        method : "GET",
        url : "https://pokeapi.co/api/v2/pokemon/1"
    }).then(function mySuccess(response) {
        $scope.myWelcome = response.data.moves;
        console.log($scope.myWelcome);
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
});

//Recupère les informations relatives au pokemon selectionné

pokeApp.controller("pokeSelectedAffichage",["$scope", "$log", "InfoService", "pokeService", function($scope, $log, InfoService, pokeService){
    $scope.pokeSelected = pokeService;
    $scope.$watch("pokeSelected.id", function(newValue, oldValue) {
        var info = InfoService.get({id: newValue}, function(){
            $log.info(info);
            $scope.poke = {
                id: info.pkdx_id,
                name: info.name,
                moves: info.moves,
                sprites: info.sprites
            };
        });
    });
}]);
