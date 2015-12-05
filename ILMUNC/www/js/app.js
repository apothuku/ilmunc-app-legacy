// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngIOS9UIWebViewPatch'])

.run(function ($ionicPlatform, TwitterLib, $state, $rootScope) {
  $ionicPlatform.ready(function() {
    // initPushwoosh();

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  Parse.initialize('uGyZ1vxsZMfRgEK4z0iQsmtHDXJd6SYciADRlnZd', '0zAB2Mf7j4z9jEaC9PeKlYK7SopFlSUQrxcPEHpz');
  
    var currentUser = Parse.User.current();
    $rootScope.user = null;
    $rootScope.isLoggedIn = false;

    if (currentUser) {
        $rootScope.user = currentUser;
        $rootScope.isLoggedIn = true;
        $rootScope.user_type = $rootScope.user.get("user_type");

        if ($rootScope.user_type === "delegate") {
            $rootScope.committee = $rootScope.user.get("committee");
            $rootScope.position = $rootScope.user.get("position");
            $rootScope.bg_link = $rootScope.user.get("bg_link");
        } else {

        }
        $rootScope.first_name = $rootScope.user.get("first_name");
        $rootScope.last_name = $rootScope.user.get("last_name");
        $rootScope.school = $rootScope.user.get("school");

        $state.go('tab.dashboard');
    }

    // Initialize push notifications!

    // first, lets initialize parse. fill in your parse appId and clientKey
    // parsePlugin.initialize('uGyZ1vxsZMfRgEK4z0iQsmtHDXJd6SYciADRlnZd', 'CLQiaF6zakkJ5SLejcxMJTPaxnWsYUIM5E8nxbH0', function() {
    //   parsePlugin.subscribe($rootScope.user_type, function() {
    //       parsePlugin.getInstallationId(function(id) {
    //           // *
    //           //  * Now you can construct an object and save it to your own services, or Parse, and corrilate users to parse installations
    //           //  * 
    //           //  var install_data = {
    //           //     installation_id: id,
    //           //     channels: ['SampleChannel']
    //           //  }
    //           //  *      
    //       }, function(e) {
    //           alert('error');
    //       });

    //   }, function(e) {
    //       alert('error');
    //   });

    // }, function(e) {
    //     alert('error');
    // });

    // parsePlugin.registerCallback('onNotification', function() {

    //   window.onNotification = function(pnObj) {
    //     // ios pnObj: {"aps": {"alert": message, "sound": "default"},"receivedInForeground":true}
    //     alert(pnObj.aps.alert);
        
    //   };

    // }, function(error) {
    //   alert(error);
    // });

    // var Notification = Parse.Object.extend("Notifications");
    // var notification = new Notification();

    // notification.set("content", "baoiwrgjoeiiooiawrgiohaerwoughoi;ergioregoiarwhgrghoarwhgoiragoarwhgoarehgouhaeuofhdfheuogosueghuoadhgiuerhgpuawrhuo[arehfouarhgo");
    // notification.set("channel", "delegate");
    // notification.save(null, {
    //   success: function () {
    //     alert('success');
    //   },
    //   error: function () {
    //     alert('error');
    //   }
    // });
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  })

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.schedule', {
      url: '/schedule',
      views: {
        'tab-schedule': {
          templateUrl: 'templates/tab-schedule.html'
        }
      }
    })


    .state('tab.maps', {
      url: '/maps',
      views: {
        'tab-maps': {
          templateUrl: 'templates/tab-maps.html'
        }
      }
    })

    .state('tab.conference', {
      url: '/conference',
      views: {
        'tab-conference': {
          templateUrl: 'templates/tab-conference.html'
        }
      }
    })

    .state('tab.updates', {
      url: '/updates',
      views: {
        'tab-updates': {
          templateUrl: 'templates/tab-updates.html',
          controller: 'UpdatesCtrl'
        }
      }
    })

    .state('tab.student_info', {
      url: '/student_info',
      views: {
        'tab-dashboard': {
          templateUrl: 'templates/student_info.html',
          controller: 'InfoCtrl'
        }
      }
    })

    .state('tab.feedback', {
      url: '/feedback',
      views: {
        'tab-dashboard': {
          templateUrl: 'templates/feedback.html',
          controller: 'FeedbackCtrl'
        }
      }
    })

    .state('tab.student_tracker', {
      url: '/student_tracker',
      views: {
        'tab-dashboard': {
          templateUrl: 'templates/student_tracker.html',
          controller: 'TrackerCtrl'
        }
      }
    })

    .state('tab.social_events', {
      url: '/social_events',
      views: {
        'tab-conference': {
          templateUrl: 'templates/social_events.html',
        }
      }
    })

    .state('tab.merchandise', {
      url: '/merchandise',
      views: {
        'tab-conference': {
          templateUrl: 'templates/merchandise.html',
        }
      }
    })

    .state('tab.penn_tours', {
      url: '/penn_tours',
      views: {
        'tab-conference': {
          templateUrl: 'templates/penn_tours.html',
        }
      }
    })

    .state('tab.quick_reference', {
      url: '/quick_reference',
      views: {
        'tab-dashboard': {
          templateUrl: 'templates/quick_reference.html',
        }
      }
    })

    .state('tab.ground_floor', {
      url: '/ground_floor',
      views: {
        'tab-maps': {
          templateUrl: 'templates/ground_floor.html',
        }
      }
    })

    .state('tab.mezzanine_floor', {
      url: '/mezzanine_floor',
      views: {
        'tab-maps': {
          templateUrl: 'templates/mezzanine_floor.html',
        }
      }
    })

    .state('tab.ballroom_floor', {
      url: '/ballroom_floor',
      views: {
        'tab-maps': {
          templateUrl: 'templates/ballroom_floor.html',
        }
      }
    })

    .state('tab.logan_rooms', {
      url: '/logan_rooms',
      views: {
        'tab-maps': {
          templateUrl: 'templates/logan_rooms.html',
        }
      }
    })

    .state('tab.salon_rooms', {
      url: '/salon_rooms',
      views: {
        'tab-maps': {
          templateUrl: 'templates/salon_rooms.html',
        }
      }
    })

    .state('tab.around_hotel', {
      url: '/around_hotel',
      views: {
        'tab-dashboard': {
          templateUrl: 'templates/around_hotel.html',
        }
      }
    })

    .state('tab.dashboard', {
      url: '/dashboard',
      views: {
        'tab-dashboard': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashCtrl'
        }
      }
    });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});



//angular.module('twitter', ['ionic', 'twitterLib'])

//
// HERE ARE THE CONFIGURATION SETTINGS FOR OAUTH
// REPLACE  THESE VALUES WITH YOUR KEYS FROM TWITTER
//
angular.module('starter').constant('myAppConfig', {
    oauthSettings: {
        consumerKey: 'o9PPNGDobkBBXvoHMbOpllKIY',
        consumerSecret: 'gWpc3padhfbSMODFxHHiJj8eu155IUn0mknr32Nf3QzJVlhuss',
        requestTokenUrl: 'https://api.twitter.com/oauth/request_token',
        authorizationUrl: "https://api.twitter.com/oauth/authorize",
        accessTokenUrl: "https://api.twitter.com/oauth/access_token",
        callbackUrl: "callbackUrl"
    }
});