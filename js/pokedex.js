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

<<<<<<< HEAD
//Création du service de pokemon
pokeApp.factory('pokemonService', [function(){
    var factory = {
        id : false,
        name : false
    }
    return factory;
}]);

/*********** Controllers *************************/
=======
//recupere tous les pokemon
>>>>>>> master

pokeApp.controller('listPokemon',['$scope','pokemonResource','$log',function ($scope,pokemonResource,$log) {
    pokemonResource.queryAll().$promise.then(function(value){
        $scope.resultatResource = value.pokemon_entries;
        $log.warn($scope.resultatResource);
    })
}])

/**
 * Recupère tous les pokemons
 */
pokeApp.controller("pokeListCrtl",["$scope", "$log", "PokemonsService", "pokeService", function($scope, $log, PokemonsService, pokeService){
    PokemonsService.get().then(function(data){
        $scope.resultatResource = data;
    }, function(msg){
        alert(msg);
    });

    $scope.go = function(){
        var pokeObject = JSON.parse($scope.pokeSelected);
        $log.warn(pokeObject);
    }

    //Ecoute les changements de valeur de "pokeSelected" depuis la vue et met à jour le service "pokeService"
    $scope.$watch("pokeSelected", function(newValue, oldValue) {
        if($scope.pokeSelected){
            var pokeObject = JSON.parse(newValue); //Converti la chaine de caractère renvoyée par la vue en objet
            $log.warn(pokeObject);
            pokeService.id = pokeObject.resource_uri.replace('api/v1/pokemon/', '').replace('/', ''); //Recupère l'id à partir de l'URI
            pokeService.name = pokeObject.name;
            $log.info(pokeService);
        }
    });
}]);

/**
 * Recupère les informations relatives au pokemon selectionné
 */
pokeApp.controller("pokeViewCrtl",["$scope", "$log", "InfoService", "pokeService", function($scope, $log, InfoService, pokeService){
    $scope.pokeSelected = pokeService;
    $scope.$watch("pokeSelected.id", function(newValue, oldValue) {
        var info = InfoService.get({id: newValue}, function(){
            $log.info(info);
            $scope.myWelcome = {
                id: info.pkdx_id,
                name: info.name,
                moves: info.moves,
                sprites: info.sprites
            };
        });
    });
}]);