/**
 * Created by TOSHIBA on 26/09/2016.
 */
(function () {
    'use strict';

    var AudioPlayerCrtl = function ($rootScope, $scope, $location, piecesService, angularPlayer) {

        $scope.isPlay = true;
        $scope.togglePlayButton = function () {
            $scope.isPlay = !$scope.isPlay;
        };
    };

    angular.module('freesounds.controllers').controller('AudioPlayerCrtl', ['$rootScope', '$scope', '$location', 'piecesService', 'angularPlayer', AudioPlayerCrtl]);
}());