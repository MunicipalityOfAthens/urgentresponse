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
/*Post to open311 api */
angular.module('urgentresponse.services.Request', []).factory('postRequest', function($http){ 
  return function(open311Data) {
   console.log("open311data",open311Data);
   //TODO? to serialize tou open311Data edo? h kentrika opos to exo tora?
   return $http({method: 'POST', 
        url: '_REQUESTS_',
        data:open311Data});
    }
  });
