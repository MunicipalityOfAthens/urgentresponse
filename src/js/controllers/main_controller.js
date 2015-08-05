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

angular.module('urgentresponse.controllers.Main', ['urgentresponse.services.Init','urgentresponse.services.Camera','urgentresponse.services.Request'])
.controller('MainController', ['$location','$timeout','$window','$scope','$rootScope','InitVariables', '$location', '$anchorScroll','Camera','postRequest','DB', function($location,$timeout, $window,$scope, $rootScope, InitVariables,$location, $anchorScroll, Camera, postRequest,DB){


//Check online status
 $scope.deviceonline = navigator.onLine;
 console.log($scope.deviceonline);

//set location search icon
 $scope.locationsearch=true;

/**/
//Init open311 model  
    $scope.open311={
    service_code:"",
    lat:"",
    long:"",
    email:"",
    device_id:"",
    first_name:"",
    last_name:"",
    phone:"",
    description:"",
    media_url:"" 
    };

/**/
//Reset and redirect to home
$scope.reset = function(){ 
    //$rootScope.Ui.turnOff('nosuccess');//Alert
    //$rootScope.Ui.turnOff('requestsuccess');//Overlay
    $scope.open311.service_code="";
    $scope.open311.description="";
    $scope.open311.media_url="";
    InitVariables();
    $location.path('/');
}

/**/
//validate email
$scope.validateEmail = function (email) { 
    var emailre =/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
    return emailre.test(email);
};

/**/
//Watch for geoposition change 
$scope.$watch(function() {return $rootScope.geoposition;}, function() {
     if (typeof ($rootScope.geoposition) !== "undefined"){
            
            if ($rootScope.geoposition!=null){
            $scope.open311.lat = $rootScope.geoposition.coords.latitude;
            $scope.open311.long = $rootScope.geoposition.coords.longitude;
            $scope.locationsearch=false;
            } else 
        {
        $rootScope.Ui.turnOn('onlocationsearch');
        $timeout(function(){ //Retry. TODO beter??? Otan den vriskei location petaei to mhnhma kai kanei auto reload... Na ginetai to reload afou patisei sto koumpi...
         $window.location.reload(); 
        },3000);
        }
        
     }
}, true);


/**/
$scope.$watch('allow',function(){ //Allow is rootScope value...

//TODO an alaksei to wifi tote na kano reload...

//save object to db
console.log("SCOPE ALLOW",$scope.allow); 
if (typeof $scope.allow!='undefined'){  
 var sql='REPLACE INTO ALLOW VALUES(631,\''+JSON.stringify($scope.allow)+'\')';
 console.log(sql);
 DB.query(sql)
        .then(function(result){
            console.log(JSON.stringify(result));
        });
}

}, true);

/**/
//Watch for deviceInfo completition
$scope.$watch(function() {return $rootScope.deviceInfo;}, function() {
           
            if (typeof ($rootScope.deviceInfo) != 'undefined'){
            $scope.open311.email=$rootScope.deviceInfo.account0Name; //TODO other accounts email?
            if (!$scope.validateEmail($scope.open311.email)) $scope.open311.email="";
            
            $scope.open311.device_id=$rootScope.deviceInfo.deviceID;
            
            $scope.open311.phone = $rootScope.deviceInfo.phoneNo; 
            if ($scope.open311.phone=="'TM.ERROR'")$scope.open311.phone="";                                                             } 
}, true);

$window.addEventListener("offline", function () {
        $rootScope.$apply(function() {
          $scope.deviceonline = false;
        });
      }, false);
$window.addEventListener("online", function () {
        $rootScope.$apply(function() {
          //TODO na tsekaro an epitrepei mono wifi...   
          $scope.deviceonline = true;
        });
      }, false);

/**/
//Watch online status and reset variables
$scope.$watch('deviceonline', function(newStatus) {

if(typeof navigator.connection !== 'undefined'){                                      
var networkState = navigator.connection.type;
  setTimeout(function() {
    networkState = navigator.connection.type;
 
     console.log("NAVIGATOR TYPE: "+networkState);
     if (networkState!=Connection.NONE)
        {
         console.log("WE HAVE INTERNET!");
        if($scope.allow.wifi&&networkState!=Connection.WIFI)$scope.online=false;
         else $scope.online=true;
          
      } else $scope.online=false;

     if ($scope.online==false) $location.path('/');
          
     InitVariables($scope.online);                         
   
    },1200);          } else {//On browser
         InitVariables(newStatus);
         $scope.online=newStatus; 
    }                                     
       
                                               });

/**/
//Camera
$scope.getPhoto = function() {
 var options =   {   quality: 50,
                      destinationType: 0,// 0 navigator.camera.DestinationType.DATA_URL,
                      sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
                      encodingType: 0     // 0=JPG 1=PNG
                  };
      //TODO an einai phonegap... alios na girizei panta mia default eikona..h na anigh to select file....
    Camera.getPicture(options).then(function(imageData) {
      $scope.open311.media_url="data:image/jpeg;base64,"+imageData;
    }, function(err) {
      console.err(err);
    })};

/**/
//Post
$scope.post = function(){
    $rootScope.loading = true;
    postRequest($scope.open311).success(function (responce, status, headers, config) {     
    $rootScope.loading = false;
    console.log(responce); //TODO na koita mipos exei error -1 to responce[0].service_request_id
    $rootScope.service_request_id = responce[0].service_request_id;//TODO pio sosta???
    $scope.saveToDB($rootScope.service_request_id,$scope.open311);
    $rootScope.Ui.toggle('requestsuccess'); //TODO toggle error an exei error
    $scope.reset();
    }).error(function(data, status, headers, config) {
         console.log("Post Error",data, status, headers, config);
         $rootScope.POSTerrorCode = data[0].code;
         $rootScope.POSTerrorDescription = data[0].description;
         $rootScope.loading = false;
         //$rootScope.Ui.toggle('nosuccess');
         alert("Υπήρξε πρόβλημα σύνδεσης, παρακαλώ κάντε την αναφορά σας τηλεφωνικά στον αριθμό 1595");
          throw new Error('Unable to post request');
        });
}

/**/
//Save request
$scope.saveToDB = function(service_request_id,open311){
var sql='INSERT INTO REQUESTS VALUES ("'+service_request_id+'","'+open311.service_code+'","'+open311.lat+'","'+open311.long+'","'+open311.email+'","'+open311.phone+'","'+open311.description+'")';
DB.query(sql)
        .then(function(result){
            console.log(JSON.stringify(result));
        })
}

/**/
//Otan kanei focus sro plirofories auto paei epano gia na mporei na fenetai kathos grafei 
//pio sosto tha eitan na elenxo to pliktrologio an emfanizete?
//exei ginei mia prospatheia sto mobileangularui alla fenetai na mhn doulevei...
$scope.scrolltextin = function(hash){
      $location.hash(hash);
      $anchorScroll();  
}

}]).run(function ($timeout,$rootScope,InitVariables,DB) { //  this only runs ONE time
     //    InitVariables(false);                         
//TODO mono to $rootscope einai diathesimo... opote pos pasaro to allow object?

DB.init(function(result){
     console.log("ON DB INIT");
     console.log(result);
    DB.query('SELECT * FROM ALLOW WHERE id=631') //TODO ORDER BY ROWID DESC set focus on latest by set focus true???
        .then(function(result){
            var Allow = DB.fetch(result);
            if (Allow!=null&&Allow.object!="undefined"){
              $rootScope.allow = JSON.parse(Allow.object);
            }else
              $rootScope.allow = {
                                  wifi:false,
                                  phone:false,
                                  email:false
                                 }      
            
        });
    });     


  });
