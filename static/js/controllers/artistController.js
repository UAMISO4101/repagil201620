/**
 * Created by Jorge Perea on 01/10/2016.
 * Controlador que se encarga de la ejecución de las diferentes funciones y de la obtención de la respuesta
 */

(function () {
    'use strict';

    var ArtistCrtl = function ($rootScope, $scope, $location, artistService) {

        $rootScope.artists = [];
        $scope.create = function () {
            var res = artistService.create($scope.form).then(function (data) {
                console.log(JSON.stringify(data));
                if (data.mensaje == 'ok') {
                    $scope.success = true;
                    $scope.mensaje = 'Se creo el artista de forma exitosa';
                } else {
                    console.log('Ocurrio un error:' + data);
                    $scope.error = true;
                    $scope.mensaje = data.mensaje;
                }
            })
        };
         $scope.loadArtist = function () {
                artistService.list().then(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        var artist_id = data[i].pk.toString();

                        var tempArtist = {
                            id: artist_id,
                            name: data[i].fields.name,
                            last_name: data[i].fields.last_name,
                            avatar: data[i].fields.avatar,
                            name_artistic: data[i].fields.name_artistic,
                        };
                        $rootScope.artists.push(tempArtist);
                    }
                }, function (response) {
                    $scope.error = true;
                    console.log('Error: ' + response);
                })
            };
            $scope.loadArtist();

    };

    angular.module('freesounds.controllers').controller('ArtistCrtl', ['$rootScope', '$scope', '$location', 'artistService', ArtistCrtl]);
}());
