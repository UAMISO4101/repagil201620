/**
 * Created by TOSHIBA on 26/09/2016.
 */
(function () {
    'use strict';

    var PiecesCrtl = function ($rootScope, $scope, $location, piecesService, collectionService) {

        $scope.selectedCollection = {};

        var res = piecesService.list().then(function (data) {
            $scope.pieces = data;

            for (var i = 0; i < $scope.pieces.length; i++) {
                $scope.pieces[i].viewCollections = false;
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

        $scope.showCollections = function (piece) {
            piece.viewCollections = !piece.viewCollections;
        };

        $scope.addToCollection = function (piece, collection) {
            collectionService.add({piece_id:piece.pk, collection_id:collection.pk}).then(function (response) {
                console.log(JSON.stringify(response));
                piece.viewCollections = false;
            })
        };
    };

    angular.module('freesounds.controllers').controller('PiecesCrtl', ['$rootScope', '$scope', '$location', 'piecesService', 'collectionService', PiecesCrtl]);
}());