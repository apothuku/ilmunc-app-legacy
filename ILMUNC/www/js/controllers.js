angular.module('starter.controllers', [])

.controller('LoginController', function ($scope, $state, $rootScope, $ionicLoading) {
    if ($rootScope.isLoggedIn) {
        $state.go('tab.dashboard');
    }

    $scope.user = {
        username: null,
        password: null
    };

    $scope.error = {};

    $scope.login = function() {

    // var user = new Parse.User();
    // user.set("username", "user@gmail.com");
    // user.set("password", "pass");

    // user.signUp(null, {
    //         success: function(user) {
    //         },
    //         error: function(user, err) {
    //             alert(err.code);
    //         }
    //       });

        $scope.loading = $ionicLoading.show({
            content: 'Logging in',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        var user = $scope.user;

        Parse.User.logIn(('' + user.username).toLowerCase(), user.password, {
            success: function(user) {
                $ionicLoading.hide();
                $rootScope.user = user;
                $rootScope.isLoggedIn = true;
                $rootScope.user_type = $rootScope.user.get("user_type");

                if ($rootScope.user_type === "delegate") {
                    $rootScope.committee = user.get("committee");
                    $rootScope.position = user.get("position");
                    $rootScope.bg_link = user.get("bg_link");
                } else {

                }
                $rootScope.first_name = user.get("first_name");
                $rootScope.last_name = user.get("last_name");
                $rootScope.school = user.get("school");

                $state.go('tab.dashboard', {
                    clear: true
                });

            },
            error: function(user, err) {
                $ionicLoading.hide();
                // The login failed. Check error to see why.
                if (err.code === 101) {
                    $scope.error.message = 'Invalid login credentials';
                } else {
                    alert(err.code);
                    $scope.error.message = 'An unexpected error has ' +
                        'occurred, please try again.';
                }
                $scope.$apply();
            }
        });
    };

    $scope.forgot = function() {
        $state.go('app.forgot');
    };
})

.controller('MainController', function($scope, $state, $rootScope, $stateParams) {

    $scope.logout = function() {
        Parse.User.logOut();
        $rootScope.user = null;
        $rootScope.isLoggedIn = false;
        $state.go('login', {});
    };
})

.controller('UpdatesCtrl', function($scope, $rootScope) {
    $scope.open_twitter = function () {
        cordova.InAppBrowser.open('http://twitter.com/ilmunc', '_blank', 'location=no');
    };

    $scope.open_instagram = function () {
        cordova.InAppBrowser.open('http://instagram.com/ilmunc', '_blank', 'location=no');
    };

    $scope.open_facebook = function () {
        var ref = cordova.InAppBrowser.open('http://facebook.com/ilmunc', '_blank', 'location=no');
    };

    // var query = new Parse.Query("Notifications");
    // query.equalTo("channel", $rootScope.user_type);
    // query.find({
    //     success: function (notifications) {
    //         alert('');
    //         $scope.notifications = notifications;
    //     }
    // });
})

.controller('DashCtrl', function($scope, $state, $rootScope, $ionicLoading) {
    $scope.request_badge = function () {
        var BadgeRequest = Parse.Object.extend("BadgeRequest");
        var badgeRequest = new BadgeRequest();

        badgeRequest.set("name", $rootScope.first_name + " " + $rootScope.last_name);
        badgeRequest.set("committee", $rootScope.committee);
        badgeRequest.set("position", $rootScope.position);

        badgeRequest.save(null, {
            success: function(badgeRequest) {
            alert("Badge requested! Please come to the front desk to get your badge.");
          },
          error: function(badgeRequest, error) {
            alert('Failed to create badge request, with error code: ' + error.message);
          }
        });
    };

    $scope.open_bg = function () {
        cordova.InAppBrowser.open($rootScope.bg_link, '_blank', 'EnableViewPortScale=yes');
    };

    $scope.is_delegate = function () {
        return $rootScope.user_type === "delegate";
    };

    $scope.is_fa = function () {
        return $rootScope.user_type === "fa";
    };
})

.controller('InfoCtrl', function($scope, $state, $rootScope) {
    $scope.full_name = $rootScope.first_name + " " + $rootScope.last_name;
    $scope.committee = $rootScope.committee;
    $scope.position = $rootScope.position;
    $scope.room = $rootScope.user.get("room");
})

.controller('FeedbackCtrl', function($scope, $state, $rootScope) {
    $scope.feedback = {
        answer1: $rootScope.user.get("answer1"),
        answer2: $rootScope.user.get("answer2"),
        answer3: $rootScope.user.get("answer3"),
        answer4: $rootScope.user.get("answer4")
    };

    $scope.submit_form = function () {
        $rootScope.user.set("answer1", $scope.feedback.answer1);
        $rootScope.user.set("answer2", $scope.feedback.answer2);
        $rootScope.user.set("answer3", $scope.feedback.answer3);
        $rootScope.user.set("answer4", $scope.feedback.answer4);

        $rootScope.user.save(null, {
            success: function(user) {
                alert("Your responses have been recorded. Thanks!");
                $state.go('tab.dashboard');
            },
            error: function(user, error) {
                alert('There was a problem. Try again later.');
                $state.go('tab.dashboard');
            }
        });
    };
})

.controller('TrackerCtrl', function($scope, $state, $rootScope) {
    var query = new Parse.Query(Parse.User);
    query.equalTo("school", $rootScope.school);
    query.equalTo("user_type", "delegate");
    query.find({
        success: function(delegates) {
            $scope.delegates = delegates;
        }
    });
});

// .controller('MyCtrl', function ($scope, TwitterLib) {
//         /**
//          *
//          */
//     /*    $scope.doLogin = function () {
//             TwitterLib.init().then(function (_data) {
//                 alert(JSON.stringify(_data));
//             }, function error(_error) {
//                 alert(JSON.stringify(_error));
//             });
//         };
//         /**
//          *
//          */
//     /*    $scope.doLogout = function () {
//             TwitterLib.logOut();
//         };
//         /**
//          *
//          */
//         $scope.doStatus = function () {
//             var options = {
//                 url: "https://api.twitter.com/1.1/statuses/user_timeline.json",
//                 data: {
//                     'screen_name': "ilmunc",
//                     'count': "25"
//                 }
//             };
//             TwitterLib.apiGetCall(options).then(function (_data) {
//                 //alert("doStatus success");
//                 $scope.items = _data;

//             }, function (_error) {
//                 alert("doStatus error" + JSON.stringify(_error));
//             });
//         };
//         /**
//          *
//          */
//      /*   $scope.doTweet = function () {
//             TwitterLib.tweet("Sample tweet " + new Date()).then(function (_data) {
//                 alert("tweet success");

//             }, function (_error) {
//                 alert("tweet error" + JSON.stringify(_error));
//             });
//         };*/
//     });