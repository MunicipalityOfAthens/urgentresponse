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
angular.module('urgentresponse', [
  'ngRoute',
  'ngTouch',
  'mobile-angular-ui',
  'urgentresponse.controllers.Main',
  'leaflet-directive'
])

.config(function($routeProvider,$compileProvider,$httpProvider) {

/**/ 
  $routeProvider.when('/', {templateUrl: 'home.html', reloadOnSearch: false});
  $routeProvider.when('/report', {templateUrl: 'report.html', reloadOnSearch: false});
  $routeProvider.when('/myreports', {templateUrl: 'myreports.html', reloadOnSearch: false});
  $routeProvider.when('/about', {templateUrl: 'about.html', reloadOnSearch: false});
  $routeProvider.when('/source', {templateUrl: 'source.html', reloadOnSearch: false});
  $routeProvider.when('/help', {templateUrl: 'help.html', reloadOnSearch: false});

  $routeProvider.when('/myreport/:service_request_id', {templateUrl: 'myreport.html', reloadOnSearch: false});

  $routeProvider.otherwise({redirectTo: '/'});

/**/  
  //Allow img ng-src from camera, file and data
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(data|https?|ftp|file):/);

/**/  
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

/**/
  /*
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   * reference http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/
   */ 
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
      
    for(name in obj) {
      value = obj[name];
        
      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
      
    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
  
})
.run(["$rootScope", function ($rootScope)  {
      
/**/  
// Needed for the loading screen and to populate own requests map
  $rootScope.$on('$routeChangeStart', function(event, next, current){
    $rootScope.loading = true;
    //if ( next.originalPath === "/myreports") $rootScope.$broadcast('myReportPage');
  });

/**/
  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });
 
}]);



