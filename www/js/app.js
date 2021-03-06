angular.module('starter', ['ionic',  'ngCordova', 'starter.controllers', 'starter.services','ionic-material', 'ionMdInput',  'satellizer', 'angularPayments'])

.run(function($ionicPlatform , $ionicHistory, $ionicPopup, $cordovaNetwork, $rootScope) {

    $ionicPlatform.ready(function() {

        // Check for network [internet] connection
        if(window.Connection) {
          if(navigator.connection.type == Connection.NONE) {
            $ionicPopup.confirm({
              title: 'No Internet Connection',
              content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
            })
            .then(function(result) {
              if(!result) {
                ionic.Platform.exitApp();
              }
            });
          }
        }
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

    .run(function($rootScope, $ionicPlatform, $ionicHistory, $cordovaToast){
        $ionicPlatform.registerBackButtonAction(function(e){
            if ($rootScope.backButtonPressedOnceToExit) {
                ionic.Platform.exitApp();
            }

            else if ($ionicHistory.backView()) {
                $ionicHistory.goBack();
            }
            else {
                $rootScope.backButtonPressedOnceToExit = true;
                $cordovaToast.showShortCenter("Press back button again to exit",function(a){},function(b){}
                );
                setTimeout(function(){
                    $rootScope.backButtonPressedOnceToExit = false;
                },2000);
            }
            e.preventDefault();
            return false;
        },101);

    })


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $authProvider) {


    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    $stateProvider

    // setup an abstract state for the tabs directive

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })


    .state('app.about', {
        url: '/about',
        views: {
            'menuContent': {
                templateUrl: 'templates/about.html',
                controller: 'AboutCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.inventory', {
        url: '/inventory',
        views: {
            'menuContent': {
                templateUrl: 'templates/inventory.html',
                controller: 'InventoryCtrl'
            },
        }
    })

    .state('app.request', {
        url:'/request/:outlet_id/:name/:lat',
            views: {
                'menuContent': {
                    templateUrl: 'templates/stock_request.html',
                    controller: 'Stock_requestCtrl'
                },'fabContent':{
                    template:'<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>'
                }
            }
        })

     .state('app.outlets', {
            url: '/outlets',
            views: {
                'menuContent': {
                    templateUrl: 'templates/outlets.html',
                    controller: 'OutletsCtrl'
                },
            }
        })

    .state('app.gallery', {
            url:'/gallery/:outlet_id/:name/:lat',
            views:{
                'menuContent':{
                    templateUrl: 'templates/gallery.html',
                    controller: 'GalleryCtrl'
                }
            }
        })



    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.logout', {
        url: '/logout',
        views: {
            'menuContent': {
                templateUrl: 'templates/logout.html',
                controller: 'LogoutCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.recover_password', {
        url: '/recover_password',
        views: {
            'menuContent': {
                templateUrl: 'templates/recover_password.html',
                controller: 'recoverpwdCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })


        .state('app.pos', {
            url:'/pos/:outlet_id/:name/:lat',
            views: {
                'menuContent': {
                    templateUrl: 'templates/pos.html',
                    controller: 'PosController as vm'
                },
             'fabContent': {
                 template: ''
             }
            }
        })

        .state('app.register', {
            url: '/register',
            views: {
                'menuContent': {
                    templateUrl: 'templates/register.html',
                    controller: 'SignupCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })

     .state('app.grid', {
        url: '/grid/:outlet_id/:name/:lat',
        views: {
            'menuContent': {
                templateUrl: 'templates/grid_menu.html',
                controller: 'GridCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

      .state('app.pricing', {
        url: '/pricing/:outlet_id/:name/:lat',
        views: {
            'menuContent': {
                templateUrl: 'templates/pricing.html',
                controller: 'PricingCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/homepage.html',
                controller: 'HomeCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                }
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');

})



