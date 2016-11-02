/**
 * Created by TOSHIBA on 26/09/2016.
 */
(function () {
    'use strict';

    var PiecesCrtl = function ($rootScope, $scope, $location, piecesService) {

        $rootScope.songs = [];

        var res = piecesService.list().then(function (data) {
            $rootScope.transformToSongs(data);
        }, function (response) {
            $scope.error = true;
            console.log('Error: ' + response);
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

    };

    angular.module('freesounds.controllers').controller('PiecesCrtl', ['$rootScope', '$scope', '$location', 'piecesService', PiecesCrtl]);
}());