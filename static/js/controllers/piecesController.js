/**
 * Created by TOSHIBA on 26/09/2016.
 */
(function () {
    'use strict';

    var PiecesCrtl = function ($rootScope, $scope, $location, piecesService, collectionService) {

        $scope.selectedCollection = {};

        $rootScope.songs = [];

        var res = piecesService.list().then(function (data) {
            for (var i = 0; i < data.length; i++) {

                var tempSong = {
                    id: data[i].pk.toString(),
                    title: data[i].fields.name,
                    artist: data[i].fields.artist.name,
                    url: data[i].fields.url,
                    duration: data[i].fields.duration,
                    image_cover: data[i].fields.image_cover,
                    viewCollections: false
                };

                $rootScope.songs.push(tempSong);
            }
        }, function (response) {
            $scope.error = true;
            console.log('Error: ' + response);
        });

        collectionService.list().then(function (data) {
            $scope.availableCollections = data;
        });

        $scope.viewDetail = function (piece_id) {
            $location.url('/pieces/' + piece_id);
        };

        $scope.$on('track:loaded', function (event, data) {
            $rootScope.isPlay = false;
        });

        $scope.$on('track:progress', function (event, data) {
            if (data > 99.9){
                $rootScope.isPlay = true;
            }
        });

        $scope.showCollections = function (piece) {
            piece.viewCollections = !piece.viewCollections;
        };

        $scope.addToCollection = function (piece, collection) {
            collectionService.add({piece_id:piece.id, collection_id:collection.pk}).then(function (response) {
                console.log(JSON.stringify(response));
                piece.viewCollections = false;
            })
        };

        $scope.listByCategory = function (category) {
            //FALTA TODO
            piecesService.categoryQuery()
            
        }
    };

    angular.module('freesounds.controllers').controller('PiecesCrtl', ['$rootScope', '$scope', '$location', 'piecesService', 'collectionService', PiecesCrtl]);
}());