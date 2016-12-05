angular.module('app.controllers', [])
  
.controller('overviewCtrl', ['$scope', '$rootScope','$stateParams','$http','BlankFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $rootScope,$stateParams,$http,BlankFactory) {

    //$scope.modelName = "CGNVM"
    //$scope.hwVer = "0A";
    //$scope.swVer = "4.5.11.8";
    //$scope.sn = "25215A098806";
    //$scope.venderName = "Hitron Technologies";

    var refresh = false;


    var getVersion = function(){
        console.log('get token1:'+$rootScope.RegisterToken);
        $http({
            method: 'GET',
            url: BlankFactory.prefURL+'/1/Device/CM/Version',
            headers: {'ht-app-auth':$rootScope.RegisterToken}
            }).then(function successCallback(response) {
                if (response.data.errCode == "000"){
                    $scope.modelName = response.data.modelName;
                    $scope.hwVer = response.data.HwVersion;
                    $scope.swVer = response.data.SoftwareVersion;
                    $scope.sn = response.data.SerialNum;
                    $scope.venderName = response.data.vendorName;
                }else if (response.data.errMsg = "Please check the ht-app-auth header!"){
                    $rootScope.RegisterToken = null;
                    console.log('Internal error Please try again!');
                };
                if(refresh){
                    $scope.$broadcast('scroll.refreshComplete');
                    refresh = false;
                }     
            }, function errorCallback(response) {
                if(refresh){
                    $scope.$broadcast('scroll.refreshComplete');
                    refresh = false;
                }
            });
    };

    var registeAndRun = function(){
        if(!$rootScope.RegisterToken){
            var promise = BlankFactory.registerAPI();
            promise.then(function(response) {  
                $rootScope.RegisterToken = response.data.token;
                console.log('set token1:'+$rootScope.RegisterToken);
                getVersion();
            }, function(response) {  
                console.log('Register Failed.');
            }); 
        }else{
            getVersion();
        }
    }
    

    $scope.doRefresh = function() {
        refresh = true;
        registeAndRun();

    };
    
    registeAndRun();
    

}])

.controller('sysInfoCtrl', ['$scope', '$rootScope','$stateParams','$http','BlankFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $rootScope,$stateParams,$http,BlankFactory) {


    var refresh = false;


    var getSysInfo = function(){
        console.log('get token1:'+$rootScope.RegisterToken);
        $http({
            method: 'GET',
            url: BlankFactory.prefURL+'/1/Device/Router/SysInfo',
            headers: {'ht-app-auth':$rootScope.RegisterToken}
            }).then(function successCallback(response) {
                if (response.data.errCode == "000"){
                    
                    $scope.time = response.data.sysTime;
                    $scope.timeZone = "UTC " + response.data.tz;
                    $scope.lanIP = response.data.privLanIP;
                    $scope.lanRecv = response.data.lanRx;
                    $scope.lanSend = response.data.lanTx;
                    if(response.data.wanIP.length == 2){
                        $scope.wanIPv4 = response.data.wanIP[0];
                        $scope.wanIPv6 = response.data.wanIP[1];
                    }else if(response.data.wanIP.length == 1){
                        $scope.wanIPv4 = response.data.wanIP[0];
                        $scope.wanIPv6 = ""
                    }
                    
                    $scope.wanRecv = response.data.wanRx;
                    $scope.wanSend = response.data.wanTx;
                    if(response.data.dns.length == 2){
                        $scope.wanDNSv4 = response.data.dns[0];
                        $scope.wanDNSv6 = response.data.dns[1];
                    }else if(response.data.dns.length == 1){
                        $scope.wanDNSv4 = response.data.dns[0];
                        $scope.wanDNSv6 = ""
                    }

                }else if (response.data.errMsg = "Please check the ht-app-auth header!"){
                    $rootScope.RegisterToken = null;
                    console.log('Internal error Please try again!');
                };
                if(refresh){
                    $scope.$broadcast('scroll.refreshComplete');
                    refresh = false;
                }
            }, function errorCallback(response) {
                if(refresh){
                    $scope.$broadcast('scroll.refreshComplete');
                    refresh = false;
                }
            });
        
    };

    var registeAndRun = function(){
        if(!$rootScope.RegisterToken){
            var promise = BlankFactory.registerAPI();
            promise.then(function(response) {  
                $rootScope.RegisterToken = response.data.token;
                console.log('set token1:'+$rootScope.RegisterToken);
                getSysInfo();
            }, function(response) {  
                console.log('Register Failed.');
            }); 
        }else{
            getSysInfo();
        }
    }
    

    $scope.doRefresh = function() {
        refresh = true;
        registeAndRun();
    };
    
    registeAndRun();
    

}])
   
.controller('docsisCtrl', ['$scope','$rootScope','$stateParams','$http','BlankFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$rootScope, $stateParams,$http,BlankFactory) {

//    $scope.networkAccess = "Permitted";
//    $scope.IPv4 = "10.200.5.26";
//    $scope.IPv6 = "2001:0:50:0:9cff:ef43:25dc:9dcb";
//    $scope.mask = "255.255.255.0";
//    $scope.gatewayIP = "10.200.5.254";
//    $scope.dhcpLease = "D: 00 H: 01 M: 00 S: 00";

        var refresh = false;


    var getDocsisStatus = function(){
        console.log('get token1:'+$rootScope.RegisterToken);
        $http({
            method: 'GET',
            url: BlankFactory.prefURL+'/1/Device/CM/SysInfo',
            headers: {'ht-app-auth':$rootScope.RegisterToken}
            }).then(function successCallback(response) {
                if (response.data.errCode == "000"){
                    
                    $scope.networkAccess = response.data.ntAccess;
                    $scope.dhcpLease = response.data.lease;
                    $scope.lanIP = response.data.privLanIP;
                    
                    if(response.data.ip.length == 2){
                        $scope.IPv4 = response.data.ip[0];
                        $scope.IPv6 = response.data.ip[1];
                    }else if(response.data.ip.length == 1){
                        $scope.IPv4 = response.data.ip[0];
                        $scope.IPv6 = ""
                    }
                    
                    $scope.mask = response.data.subMask;
                    $scope.gatewayIP = response.data.gw;
                   

                }else if (response.data.errMsg = "Please check the ht-app-auth header!"){
                    $rootScope.RegisterToken = null;
                    console.log('Internal error Please try again!');
                };
                if(refresh){
                    $scope.$broadcast('scroll.refreshComplete');
                    refresh = false;
                }
            }, function errorCallback(response) {
                if(refresh){
                    $scope.$broadcast('scroll.refreshComplete');
                    refresh = false;
                }
            });
        
    };

    var registeAndRun = function(){
        if(!$rootScope.RegisterToken){
            var promise = BlankFactory.registerAPI();
            promise.then(function(response) {  
                $rootScope.RegisterToken = response.data.token;
                console.log('set token1:'+$rootScope.RegisterToken);
                getDocsisStatus();
            }, function(response) {  
                console.log('Register Failed.');
            }); 
        }else{
            getDocsisStatus();
        }
    }
    

    $scope.doRefresh = function() {
        refresh = true;
        registeAndRun();
    };
    
    registeAndRun();

}])
   
.controller('dsInfoCtrl', ['$scope','$rootScope', '$stateParams','$http','BlankFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$rootScope,$http,BlankFactory) {

    //$scope.dsInfo = [{"frequency":"855000000","modulation":"256QAM","signalStrength":"-15.2","snr":"34.926","channelId":"10","dsoctets":"","correcteds":"","uncorrect":""}]

    $scope.dsInfo = []
    var refresh = false;

    var getdsInfo = function(){
        console.log('get token2:'+$rootScope.RegisterToken);
        $http({
            method: 'GET',
            url: BlankFactory.prefURL+'/1/Device/CM/DsInfo',
            headers: {'ht-app-auth':$rootScope.RegisterToken}
            }).then(function successCallback(response) {
                if (response.status == 200 && response.data.errCode == "000" && response.data.Freq_List.length > 0){
                    if(refresh){
                        $scope.dsInfo = [];
                    }
                    angular.forEach(response.data.Freq_List,function(value,key){
                        console.log(value.modulation);

                        switch(value.modulation){
                            case "0":
                                value.modulation = "16 QAM"
                                break;
                            case "1":
                                value.modulation = "64 QAM"
                                break;
                            case "2":
                                value.modulation = "256 QAM"
                                break;
                            case "3":
                                value.modulation = "1024 QAM"
                                break;
                            case "4":
                                value.modulation = "32 QAM"
                                break;
                            case "5":
                                value.modulation = "128 QAM"
                                break;
                            case "6":
                                value.modulation = "QPSK"
                                break;
                            default:
                                value.modulation = "Unknown"
                        }

                        $scope.dsInfo.push(value);
                    });
                }else if (response.data.errMsg = "Please check the ht-app-auth header!"){
                    $rootScope.RegisterToken = null;
                    console.log('Internal error Please try again!');
                };
                if(refresh){
                    $scope.$broadcast('scroll.refreshComplete');
                    refresh = false;
                }
            }, function errorCallback(response) {
                if(refresh){
                    $scope.$broadcast('scroll.refreshComplete');
                    refresh = false;
                }
            });
    };

    var registeAndRun = function(){
        if(!$rootScope.RegisterToken){
            var promise = BlankFactory.registerAPI();
            promise.then(function(response) {  
                $rootScope.RegisterToken = response.data.token;
                console.log('set token2:'+$rootScope.RegisterToken);
                getdsInfo();
            }, function(response) {  
                console.log('Register Failed.');
            }); 
        }else{
            getdsInfo();
        }
    };

    $scope.doRefresh = function() {
        refresh = true;
        registeAndRun();
    };
    
    registeAndRun();
}])

.controller('usInfoCtrl', ['$scope','$rootScope', '$stateParams','$http','BlankFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$rootScope,$http,BlankFactory) {

    //$scope.usInfo = [{"frequency":"13800000","modulationType":"ATDMA-32 QAM","signalStrength":"48.250","bandwidth":"1600000","channelId":"1"}]

    $scope.usInfo = []
    var refresh = false;

    var getusInfo = function(){
        console.log('get token2:'+$rootScope.RegisterToken);
        $http({
            method: 'GET',
            url: BlankFactory.prefURL+'/1/Device/CM/UsInfo',
            headers: {'ht-app-auth':$rootScope.RegisterToken}
            }).then(function successCallback(response) {
                if (response.status == 200 && response.data.errCode == "000" && response.data.Freq_List.length > 0){
                    if(refresh){
                        $scope.usInfo = [];
                    }
                    angular.forEach(response.data.Freq_List,function(value,key){

                        $scope.usInfo.push(value);
                    });
                }else if (response.data.errMsg = "Please check the ht-app-auth header!"){
                    $rootScope.RegisterToken = null;
                    console.log('Internal error Please try again!');
                };
                if(refresh){
                    $scope.$broadcast('scroll.refreshComplete');
                    refresh = false;
                }
            }, function errorCallback(response) {
                if(refresh){
                    $scope.$broadcast('scroll.refreshComplete');
                    refresh = false;
                }
            });
    };

    var registeAndRun = function(){
        if(!$rootScope.RegisterToken){
            var promise = BlankFactory.registerAPI();
            promise.then(function(response) {  
                $rootScope.RegisterToken = response.data.token;
                console.log('set token2:'+$rootScope.RegisterToken);
                getusInfo();
            }, function(response) {  
                console.log('Register Failed.');
            }); 
        }else{
            getusInfo();
        }
    };

    $scope.doRefresh = function() {
        refresh = true;
        registeAndRun();
    };
    
    registeAndRun();

}])

.controller('wifiStatusCtrl', ['$scope','$rootScope','$stateParams','$http','BlankFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$rootScope,$stateParams,$http,BlankFactory) {

//    $scope.ssid2 = [{"ssidName":"CGNVM-4258","passPhrase":"25215A098806","enable":"on"},
//                    {"ssidName":"CGNVM-4258-1","passPhrase":"25215A098806","enable":"off"},
//                    {"ssidName":"CGNVM-4258-2","passPhrase":"25215A098806","enable":"off"}];
//    $scope.ssid5 = [{"ssidName":"CGNVM-4258-5G","passPhrase":"25215A098806","enable":"on"},
//                    {"ssidName":"CGNVM-4258-5G-1","passPhrase":"25215A098806","enable":"off"},
//                    {"ssidName":"CGNVM-4258-5G-2","passPhrase":"25215A098806","enable":"on"}];

    $scope.ssid2 = [];
    $scope.ssid5 = [];
    var refresh = false;

    var getRSSIs = function(){
        console.log('get token2:'+$rootScope.RegisterToken);
        $http({
            method: 'GET',
            url: BlankFactory.prefURL+'/1/Device/WiFi/SSIDs',
            headers: {'ht-app-auth':$rootScope.RegisterToken}
            }).then(function successCallback(response) {
                if (response.status == 200 && response.data.errCode == "000" && response.data.SSIDs_List.length > 0){
                    if(refresh){
                        $scope.ssid2 = [];
                        $scope.ssid5 = [];
                    }
                    angular.forEach(response.data.SSIDs_List,function(value,key){
                        if(value.band == "2.4G"){
                            $scope.ssid2.push(value);
                        }else if(value.band == "5G"){
                            $scope.ssid5.push(value);
                        }
                    });
                }else if (response.data.errMsg = "Please check the ht-app-auth header!"){
                    $rootScope.RegisterToken = null;
                    console.log('Internal error Please try again!');
                };
                if(refresh){
                    $scope.$broadcast('scroll.refreshComplete');
                    refresh = false;
                }
            }, function errorCallback(response) {
                if(refresh){
                    $scope.$broadcast('scroll.refreshComplete');
                    refresh = false;
                }
            });
    };

    var registeAndRun = function(){
        if(!$rootScope.RegisterToken){
            var promise = BlankFactory.registerAPI();
            promise.then(function(response) {  
                $rootScope.RegisterToken = response.data.token;
                console.log('set token2:'+$rootScope.RegisterToken);
                getRSSIs();
            }, function(response) {  
                console.log('Register Failed.');
            }); 
        }else{
            getRSSIs();
        }
    };

    $scope.doRefresh = function() {
        refresh = true;
        registeAndRun();
    };
    
    registeAndRun();


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 