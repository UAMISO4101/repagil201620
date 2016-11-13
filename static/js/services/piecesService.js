/**
 * Created by TOSHIBA on 26/09/2016.
 */
(function () {
        'use strict';

        var PiecesSvc = function ($resource, $http) {

                var piecesService = {
                    list: function () {
                        var promise = $http.get('/api/pieces/', {})
                            .then(function (response) {
                                return response.data;
                            });
                        return promise;
                    },
                    query: function (piece_id) {
                        var promise = $http.get('/api/pieces/' + piece_id, {})
                            .then(function (response) {
                                return response.data;
                            });
                        return promise;
                    },
                    update: function (data) {
                        var heads = {
                            'X-Requested-With': 'XMLHttpRequest',
                            'Content-Type': 'application/x-www-form-urlencoded',
                        };

                        var promise = $http.post('/api/pieces/update',
                            {
                                headers: heads,
                                body: data
                            }
                            )
                            .then(function (response) {
                                return response.data;
                            }, function (error) {
                                console.log(error);
                            });
                        return promise;
                    },
                    add:function (data) {
                        var heads = {
                            'X-Requested-With': 'XMLHttpRequest',
                            'Content-Type': 'application/x-www-form-urlencoded',
                        };

                        var promise = $http.post('/api/pieces/add_piece/',{body:data}

                            )
                            .then(function (response) {
                                return response.data;
                            }, function (error) {
                                console.log("entro en error");
                               return error;
                            });
                        return promise;
                    },
                    getLikes:function (piece_id) {
                        var promise = $http.get('/api/pieces/' + piece_id +'/likes',{})
                            .then(function (response) {
                                return response.data.likes;
                            }, function (error) {
                                console.log("entro en error");
                               return error;
                            });
                        return promise;
                    },
                    wasLiked:function (piece_id, username) {
                        var promise = $http.post('/api/pieces/' + piece_id +'/liked',{username:username})
                            .then(function (response) {
                                return response.data.liked;
                            }, function (error) {
                                console.log("entro en error");
                               return error;
                            });
                        return promise;
                    }

                };

                return piecesService;
            }
            ;

        angular.module('freesounds.services').factory('piecesService', ['$resource', '$http', PiecesSvc]);
    }()
);
