/**
 * HomeService
 *
 * Handles all calls to the /homes endpoint on the server
 * @module HomeService
 */
(function (angular, _) {
'use strict';

function HomeService ($http, HomeModel, API_URL) {
    var URL_ENDPOINT_HOMES = API_URL.CORE + '/homes';

    // TODO Return Homes models
    function getHomes() {
        return $http.get(URL_ENDPOINT_HOMES).
            then(function (response) {
                return _.map(response.data, function (homePayload) {
                    return new HomeModel(homePayload);
                });
            });
    }

    return {
        getHomes : getHomes
    };
}

angular.module('HomeEditor.Services')
    .service('HomeService', HomeService);

})(angular, _);