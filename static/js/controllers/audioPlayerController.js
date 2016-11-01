/**
 * Created by TOSHIBA on 26/09/2016.
 */
(function () {
    'use strict';

    var AudioPlayerCrtl = function ($rootScope, $scope, $location, piecesService, angularPlayer) {

        $rootScope.isPlay = true;
        $rootScope.togglePlayButton = function () {
            $rootScope.isPlay = !$rootScope.isPlay;
        };
    };

    angular.module('freesounds.controllers').controller('AudioPlayerCrtl', ['$rootScope', '$scope', '$location', 'piecesService', 'angularPlayer', AudioPlayerCrtl]);
}());