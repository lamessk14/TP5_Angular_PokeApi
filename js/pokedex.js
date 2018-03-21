var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'http://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.controller('formCtrl', ['$scope','$log',function($scope, $log) {
        $scope.data =[{id: '1', name: 'Dogs'},
            {id: '2', name: 'Tutorials'},
            {id: '3', name: 'Cars'}

        ];
    $scope.$log = $log;
    //$scope.option;
}]);

pokeApp.controller('apiform', function($scope, $http) {
    $http({
        method : "GET",
        url : "https://pokeapi.co/api/v2/pokedex/1"
    }).then(function mySuccess(response) {
        $scope.myWelcome = response.data.pokemon_entries;
        console.log($scope.myWelcome);
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
});

pokeApp.factory('pokemonResource',function($resource) {
    return $resource('https://pokeapi.co/api/v2/pokedex/1/:pokeid',{pokeid:'@id'},
        {
            queryAll:{
                url:'https://pokeapi.co/api/v2/pokedex/1',
                method: 'GET',
                cache:false,
                isArray:false
            }
        })
});

pokeApp.controller('listPokemon',['$scope','pokemonResource','$log',function ($scope,pokemonResource,$log) {
    pokemonResource.queryAll().$promise.then(function(value){
        console.log(value);
        $scope.resultatResource = value.pokemon_entries;
        $log.warn($scope.resultatResource);
    })
}])
