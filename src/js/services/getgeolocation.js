/*
This file is part of UrgentRespose.

    UrgentRespose is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    UrgentRespose is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
*/
angular.module('urgentresponse.services.Geolocation', []).factory('getGeolocation', function($q){ 
  return function (done) {
        var deferred = $q.defer();
        navigator.geolocation.getAccurateCurrentPosition(
        
            function(position) {
                console.log("-----ON GEOPOSITION-----");
                if (typeof position === "undefined") {
                    console.log("-----CAN'T GET GEOPOSITION-----");
                    deferred.resolve(null);
                }
                    else
                deferred.resolve(position);
                },
        
            function(error) { 
                console.log("-----CAN'T GET GEOPOSITION-----");
                deferred.resolve(null);
                },
            function(progress) {
             console.log("ON GEO PROGRESS");
             console.log(progress);
            },
             { maxWait:25000,desiredAccuracy:150, timeout: 60000 }
        );
        done(deferred.promise);
    };
  });

