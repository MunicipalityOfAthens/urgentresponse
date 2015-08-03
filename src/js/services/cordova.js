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
angular.module('urgentresponse.services.Cordova', []).factory('deviceReady', function(){
  return function(done) {    
    if (typeof window.cordova === 'object') {
      document.addEventListener('deviceready', function () {
          console.log("Phonegap Device Ready");
          //prevent backbutton
          document.addEventListener('backbutton', function (event) {
                event.preventDefault();
                event.stopPropagation();
                console.log('on back button');
                //TODO an einai sthn arxikh selida tote exit
                navigator.app.exitApp();
                //An einai se esoterikh tote epistrofh sthn arxikh
               }, false);
          document.addEventListener("menubutton", function (event) {
                event.preventDefault();
                event.stopPropagation();
                console.log('on menu button');
                //TODO na anigei to menou epiloges
               }, false);
          done("phonegap");
      }, false);
    } else {
          console.log("Browser Device Ready");
          done("browser");
    }
  };
});