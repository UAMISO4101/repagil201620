/**
 * Created by Jorge Perea on 01/10/2016.
 * Service para las diferentes funciones definidas para el artista
 */
(function () {
    'use strict';

    var ArtistSvc = function ($resource,$http) {
        var artistService = {
            list: function () {
                var promise = $http.get('/api/search_artist/', {})
                    .then(function (response) {
                        return response.data;
                    });
                return promise;
            },
            create: function (data) {
                var heads = {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/x-www-form-urlencoded',
                };
                var promise = $http.post('/api/createArtist/',
                    {
                        headers: heads,
                        body: data
                    }).then(function (response) {
                    return response.data;
                });
                return promise;
            },
            list_pieces: function (id) {
                var promise = $http.get('/api/search_artist/'+id+'/pieces', {})
                    .then(function (response) {
                        return response.data;
                    });
                return promise;
            },
            findById: function (user_id) {
                var promise = $http.get('/api/artist/'+user_id, {})
                    .then(function (response) {
                        return response.data;
                    });
                return promise;
            }
        };

        return artistService;
    };

    angular.module('freesounds.services').factory('artistService', ['$resource','$http', ArtistSvc]);
}());
