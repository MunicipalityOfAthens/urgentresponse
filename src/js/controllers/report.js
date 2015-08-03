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
angular.module('urgentresponse.controllers.Main').controller("ReportController",['$scope','$rootScope', '$routeParams','$location','$http','DB',
function($scope, $rootScope, $routeParams,$location,$http,DB) { 
$scope.service_request_id = $routeParams.service_request_id;    

$scope.fixDate = function(str){
    if(!str)return null;
    return new Date(str);
  }

//if ($scope.online){
//                        $http({method: 'GET', url: '_REQUESTS_/'+$scope.service_request_id+'.json'})
//                            .success(function(apirequest, status, headers, config) {
//                             $scope.request = apirequest[0];                            
//                            })
//                            .error(function(data, status, headers, config) {
//                              $scope.request={service_notice:"Η Αναφορά δεν υπάρχει στο σύστημα!"}
//                             // throw new Error('Unable to get request');
//                            });
//                    } else
//{
var sql='SELECT * FROM REQUESTS WHERE service_request_id="'+$scope.service_request_id+'"';
DB.query(sql).then(function(result){
                   $scope.request = DB.fetch(result);
                })
//}

$scope.delcount=0;
$scope.delRequest = function(){
$scope.delcount++;
if ($scope.delcount>2){
var sql='DELETE FROM REQUESTS WHERE service_request_id="'+$scope.service_request_id+'"';
DB.query(sql).then(function(result){$location.path('/myreports');});
}
}

}]);
