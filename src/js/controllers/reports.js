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
angular.module('urgentresponse.controllers.Main').controller("ReportsController", [ '$scope','$rootScope','$location','DB', function($scope,$rootScope,$location,DB) {

/**/
    angular.extend($scope, {
        center: {
              autoDiscover: false,
              lat:  37.984291,//Athens center
              lng:  23.728259,
              zoom: 12
        },
        markers: {
            reportMarker: {//Nevada Test and Training Range
                lat: 37.263056,
                lng: -115.79302,
                message: "Η αναφορά θα γίνει εδώ!",
                focus: false,
                draggable: false
            } //:)
        },
        defaults: {
            scrollWheelZoom: true,
            zoom: 6,
            attributionControl:false,
            tileLayer: 'https://{s}.tiles.mapbox.com/v3/_MAPBOXID_/{z}/{x}/{y}.jpg70'
        }
    });

/**/

//populate requests list
DB.query('SELECT * FROM REQUESTS') //TODO ORDER BY ROWID DESC set focus on latest by set focus true???
        .then(function(result){
            var Requests = DB.fetchAll(result);
            angular.forEach(Requests,function(Request){
                console.log(JSON.stringify(Request));
             this[Request.service_request_id.replace("-", ".")]={
                lat: parseFloat(Request.lat),
                lng: parseFloat(Request.long),
                //If online then show details link
                message:"<p>"+Request.description+"<hr /><a href='#/myreport/"+ ($scope.online? Request.service_request_id+"'><i class='fa fa-th-list'></i>  Λεπτομέρειες </a>":""),
                focus: false,
                draggable: false
             };
            },$scope.markers);
 
  });


/**/
}]);
