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
angular.module('urgentresponse.services.Camera', []).factory('Camera', ['$q', function($q) {
  return {
    getPicture: function(options) {
      console.log("----CAMERA OPTIONS----",options);
      var deferred = $q.defer();
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        deferred.resolve(result);
      }, function(err) {
        deferred.reject(err);
      }, options);

      return deferred.promise;
    }
  }
}]);
