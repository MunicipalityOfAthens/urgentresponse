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
/*init Database and start values for device and geolocation*/
angular.module('urgentresponse.services.Init', ['urgentresponse.services.Cordova','urgentresponse.services.Services','urgentresponse.services.Geolocation','urgentresponse.services.DeviceInfo','urgentresponse.services.DB']).factory('InitVariables', ['deviceReady','getServices','getGeolocation','getDeviceInfo','$rootScope','DB',function(deviceReady,getServices,getGeolocation,getDeviceInfo,$rootScope,DB){
return function(online) {

/**/
deviceReady(function(on){

console.log("on deviceReady");

/**/  
if (on=="phonegap"){
    console.log("on init phonegap");
    getDeviceInfo(function(DeviceInfo){
        DeviceInfo.then(function(deviceInfo){
        $rootScope.deviceInfo = JSON.parse(deviceInfo);
        console.log($rootScope.deviceInfo);    
        });
      });
    }  else {//On browser
        console.log("on init browser");
        $rootScope.deviceInfo = {
            account0Name:'fake@fake.gr',
            deviceID:"631",
            phoneNo:"210123456"
            };
   }

/**/
if (online){
getServices(function(services){
             if (online) $rootScope.services=services;
           });
}

/**/
getGeolocation(function(Geoposition){
        Geoposition.then(function(geoposition){
               $rootScope.geoposition = geoposition;
            });
       });

});

}

/**/
}]);
