/**
 * Created by TOSHIBA on 26/09/2016.
 */
(function () {
    'use strict';

    var PiecesCrtl = function ($rootScope, $scope, $location, piecesService) {

        $rootScope.songs = [];

        var res = piecesService.list().then(function (data) {
            for (var i = 0; i < data.length; i++) {

                var tempSong = {
                    id: data[i].pk,
                    title: data[i].fields.name,
                    artist: data[i].fields.artist.name,
                    url: data[i].fields.url,
                    duration: data[i].fields.duration,
                    image_cover: data[i].fields.image_cover
                };

                $rootScope.songs.push(tempSong);
            }
        }, function (response) {
            $scope.error = true;
            console.log('Error: ' + response);
        });

        $scope.viewDetail = function (piece_id) {
            $location.url('/pieces/' + piece_id);
        };

    };

    angular.module('freesounds.controllers').controller('PiecesCrtl', ['$rootScope', '$scope', '$location', 'piecesService', PiecesCrtl]);
}());