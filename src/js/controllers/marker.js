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
angular.module('urgentresponse.controllers.Main').controller("MarkerController", [ '$scope','$rootScope','$location','getGeolocation', function($scope,$rootScope,$location,getGeolocation) {
var grandfather = $scope.$parent.$parent;

   angular.extend($scope, {
        center: {
             autoDiscover: false,
             lat:$rootScope.geoposition.coords.latitude,
             lng:$rootScope.geoposition.coords.longitude,
             zoom: 16
        },
        markers: {
            reportMarker: {
                lat: $rootScope.geoposition.coords.latitude,
                lng: $rootScope.geoposition.coords.longitude,
                message: "Η αναφορά θα γίνει εδώ!",
                focus: true,
                draggable: true
            }
        },
        defaults: {
            scrollWheelZoom: false,
            zoom:1,
            attributionControl:false,
            tileLayerOptions: {
                attribution: '<i class="fa fa-exclamation-circle fa-navbar"></i>'
            },
            tileLayer: 'https://{s}.tiles.mapbox.com/v3/_MAPBOXID_/{z}/{x}/{y}.jpg70'//lower quality for mobile..
        },              
        events: {
            map: {
                enable: ['click','locationfound','dragend'],
                logic: 'emit'
            },
            markers: {
                enable: ['dargend'],
                logic: 'emit'
                }
        }
    })
    
/**/    
$scope.refresh = function(){
grandfather.locationsearch=true;
console.log("On REFRESH");
getGeolocation(function(Geoposition){
        Geoposition.then(function(geoposition){
           if (geoposition==null)$rootScope.Ui.turnOn('onlocationsearch');
           
           
           $rootScope.geoposition = geoposition;
           var center={
           autoDiscover: false, 
           zoom: 16,             
           lat:$rootScope.geoposition.coords.latitude,
           lng:$rootScope.geoposition.coords.longitude
           }
     
      $scope.center=center;
              
      $scope.markers.reportMarker.lat=$scope.center.lat;
      $scope.markers.reportMarker.lng=$scope.center.lng;
      //grandfather.open311.lat=$scope.center.lat;
      //grandfather.open311.long=$scope.center.lng; //iv watch them
      grandfather.locationsearch=false;   

              
            });
       });
}

/**/
$scope.$on('leafletDirectiveMap.click', function(event,pos){
      $scope.markers.reportMarker.lat=pos.leafletEvent.latlng.lat;
      $scope.markers.reportMarker.lng=pos.leafletEvent.latlng.lng;
      grandfather.open311.lat=$scope.markers.reportMarker.lat;
      grandfather.open311.long=$scope.markers.reportMarker.lng;
      grandfather.locationsearch=false;
});
/**/
$scope.$on('leafletDirectiveMarker.dragend', function(event,pos){
      $scope.markers.reportMarker.lat=pos.leafletEvent.latlng.lat;
      $scope.markers.reportMarker.lng=pos.leafletEvent.latlng.lng;
      grandfather.open311.lat=$scope.markers.reportMarker.lat;
      grandfather.open311.long=$scope.markers.reportMarker.lng;
      grandfather.locationsearch=false;
    });
/**/
$scope.$on('leafletDirectiveMap.locationfound', function(event){
      $scope.markers.reportMarker.lat=$scope.center.lat;
      $scope.markers.reportMarker.lng=$scope.center.lng;
      grandfather.open311.lat=$scope.center.lat;
      grandfather.open311.long=$scope.center.lng;
      grandfather.locationsearch=false;
    });
/**/ 
$scope.$on('leafletDirectiveMap.locationerror', function(event){
    $rootScope.Ui.turnOn('onlocationsearch');
});

 
}]);
