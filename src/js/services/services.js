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
/*Get services from open311 api*/
angular.module('urgentresponse.services.Services', []).factory('getServices', function($http){ 
  return function(done) {
    $http({method: 'GET', url: '_SERVICES_'})
        .success(function(apiservices, status, headers, config) {
           console.log("on getservices success");
           done(apiservices); //service_code  //service_name  //description //metadata //type //keywords
        })
        .error(function(data, status, headers, config) {
            console.log("on getservices failure");
            console.log(data);
            console.log(status);
            console.log(headers);
            console.log(config);
           throw new Error('Unable to get services list');
        });
  };
});
