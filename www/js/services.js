angular.module('app.services', [])

.factory('BlankFactory', ['$http','$q', function($http,$q){

	var routerIP = "192.168.0.1";
	var prefURL = "http://"+routerIP;
	var appid = "1234";
	var seckey = "abcd";

	var blankServer = {};
	blankServer.prefURL = prefURL;

	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

	blankServer.registerAPI = function(){
		var deferred = $q.defer();
		var RegisterReq = {
 			method: 'POST',
 			url: prefURL+'/1/Device/API/Register',
 			data: 'model={"appid":"'+appid+'","seckey":"'+seckey+'"}'
		};
		$http(RegisterReq).then(function successCallback(response) {
    		// this callback will be called asynchronously
    		// when the response is available
    		//blankServer.RegisterToken = response.data.token;
    		deferred.resolve(response);
  		}, function errorCallback(response) {
    		// called asynchronously if an error occurs
    		// or server returns response with an error status.
    		deferred.reject(response);
  		});
  		return deferred.promise;
	};

	return blankServer;
}])

.service('BlankService', [function(){

}]);