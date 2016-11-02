/**
 * Created by TOSHIBA on 26/09/2016.
 */
(function () {
    'use strict';

    var LibraryCrtl = function ($rootScope, $scope, $location, $routeParams, $route, collectionService) {

        $scope.isNewCollection = true;
        $scope.newCollection = {};
        $scope.validationError = false;

        $scope.toggleIsNewCollection = function () {
            $scope.isNewCollection = !$scope.isNewCollection;
            $scope.newCollection = {};
        };

        $scope.saveCollection = function () {
            if ($scope.newCollection.name) {
                $scope.validationError = false;
                var res = collectionService.create($scope.newCollection).then(function (data) {
                        if (data.mensaje == "ok") {
                            $scope.collections.push(JSON.parse(data.data)[0]);
                            $scope.isNewCollection = true;
                            $scope.newCollection = {};
                        }
                        else {
                            console.log('ocurrio un error: ' + JSON.stringify(data));
                        }
                    }
                )
            }
            else {
                $scope.mensaje = "el nombre no puede ser vacio";
                $scope.validationError = true;
            }
        };

        $scope.loadCollections = function () {
            var res = collectionService.list().then(function (data) {
                    $scope.collections = data;
                }
            )
        };
        $scope.loadCollections();
    };

    angular.module('freesounds.controllers').controller('LibraryCrtl', ['$rootScope', '$scope', '$location', '$routeParams', '$route', 'collectionService', LibraryCrtl]);
}());