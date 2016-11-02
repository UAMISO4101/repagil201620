/**
 * Created by TOSHIBA on 26/09/2016.
 */
(function () {
    'use strict';

    var LibraryCrtl = function ($rootScope, $scope, $location, $routeParams, $route) {

        $scope.isNewCollection = true;
        $scope.newCollection = {};
        $scope.collections = [];

        $scope.toggleIsNewCollection = function () {
            $scope.isNewCollection = !$scope.isNewCollection;
            $scope.newCollection = {};
        };

        $scope.saveCollection = function () {
            console.log($scope.newCollection);
            $scope.collections.push($scope.newCollection);
            $scope.isNewCollection = true;
        };
    };

    angular.module('freesounds.controllers').controller('LibraryCrtl', ['$rootScope', '$scope', '$location', '$routeParams', '$route', LibraryCrtl]);
}());