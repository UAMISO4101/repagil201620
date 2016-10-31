/**
 * Created by TOSHIBA on 26/09/2016.
 */
(function () {
    'use strict';

    var AudioPlayerCrtl = function ($rootScope, $scope, $location, piecesService, angularPlayer) {

        $scope.isPlay = true;
        $scope.togglePlayButton = function () {
            $scope.isPlay = !$scope.isPlay;
            console.log($scope.currentPlaying);
        };

        $rootScope.songs = [
            {
                id: 'one',
                title: 'Rain',
                artist: 'Drake',
                url: 'http://www.schillmania.com/projects/soundmanager2/demo/_mp3/rain.mp3',
                name: 'one'
            },
            {
                id: 'two',
                title: 'Walking',
                artist: 'Nicki Minaj',
                url: 'http://www.schillmania.com/projects/soundmanager2/demo/_mp3/walking.mp3',
                name: 'two'
            },
            {
                id: 'three',
                title: 'Barrlping with Carl (featureblend.com)',
                artist: 'Akon',
                url: 'http://www.freshly-ground.com/misc/music/carl-3-barlp.mp3',
                name: 'three'
            },
            {
                id: 'four',
                title: 'Angry cow sound?',
                artist: 'A Cow',
                url: 'http://www.freshly-ground.com/data/audio/binaural/Mak.mp3',
                name: 'four'
            },
            {
                id: 'five',
                title: 'Things that open, close and roll',
                artist: 'Someone',
                url: 'http://www.freshly-ground.com/data/audio/binaural/Things%20that%20open,%20close%20and%20roll.mp3',
                name: 'five'
            }
        ];

    };

    angular.module('freesounds.controllers').controller('AudioPlayerCrtl', ['$rootScope', '$scope', '$location', 'piecesService', 'angularPlayer', AudioPlayerCrtl]);
}());