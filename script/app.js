angular.module('health', [
        'ngTouch', 'ngRoute', 'ngAnimate', 'ngDialog','radialIndicator',
        'Filters', 'map','appService','user','appDb','common','echart'
    ])
    .controller('MainCtrl', MainCtrl)
    .controller('MapCtrl', MapCtrl)
    .controller('StatusCtrl',StatusCtrl)
    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        //路由设置 =============================================
        $routeProvider
            .when('/hello', {templateUrl: 'html/hello.html', controller: HelloCtrl})
            .when('/map', {templateUrl: 'html/map/index.html', controller: MapCtrl})
            .when('/status', {templateUrl: 'html/status/index.html', controller: StatusCtrl})
            .when('/food', {templateUrl: 'html/status/food.html', controller: FoodCtrl})
            .when('/water', {templateUrl: 'html/status/water.html', controller: WaterCtrl})
            .when('/weight', {templateUrl: 'html/status/weight.html', controller: WeightCtrl})
            .when('/statistics', {templateUrl: 'html/statistics/index.html', controller: StatisticsCtrl})
            .when('/me', {templateUrl: 'html/me/index.html', controller: MeCtrl})
            .when('/edit', {templateUrl: 'html/me/edit.html', controller: EditCtrl})
            .when('/login', {templateUrl: 'html/reg_login.html', controller: LoginCtrl})
            .when('/reg', {templateUrl: 'html/reg_login.html', controller: RegCtrl})
            .otherwise({redirectTo: '/hello'});
    }
    ])
;
