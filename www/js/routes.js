angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.overview', {
    url: '/main',
    views: {
      'side-menu21': {
        templateUrl: 'templates/overview.html',
        controller: 'overviewCtrl'
      }
    }
  })

  .state('menu.sysInfo', {
    url: '/main',
    views: {
      'side-menu21': {
        templateUrl: 'templates/sysInfo.html',
        controller: 'sysInfoCtrl'
      }
    }
  })

  .state('menu.docsis', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/docsis.html',
        controller: 'docsisCtrl'
      }
    }
  })

  .state('menu.dsInfo', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/dsInfo.html',
        controller: 'dsInfoCtrl'
      }
    }
  })

  .state('menu.usInfo', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/usInfo.html',
        controller: 'usInfoCtrl'
      }
    }
  })

  .state('menu.wifiStatus', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/wifiStatus.html',
        controller: 'wifiStatusCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

$urlRouterProvider.otherwise('/side-menu21/main')

  

});