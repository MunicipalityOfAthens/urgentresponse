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
angular.module('urgentresponse.services.DB', []).factory('DB', function($q) {
var self = this;
    self.db = null;
 
    self.init = function(done) {

         self.db = window.openDatabase('myRequestsDb', '1.0', 'myRequestsDb', 100000);//-1 eos 5mb

         var sql = 'CREATE TABLE IF NOT EXISTS REQUESTS (service_request_id text UNIQUE ON CONFLICT IGNORE,service_code text,lat text,long text ,email text ,phone text,description text)';
         self.query(sql);

         var sql = 'CREATE TABLE IF NOT EXISTS ALLOW (id integer UNIQUE ON CONFLICT IGNORE, object text)';
         self.query(sql);

         done("ok"); 

         //console.log('Table REQUESTS initialized');
    };
    
    self.query = function(query, bindings) {
        //console.log("QUERY",query);
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();
 
        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });
 
        return deferred.promise;
    };
    
    
    self.fetchAll = function(result) {
        var output = [];
 
        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        return output;
    };
 
    self.fetch = function(result) {
        if (result.rows.length>0)
         return result.rows.item(0);
        return null;
    };
 
    return self;

});
