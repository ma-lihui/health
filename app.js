//ref: http://angular-tips.com/blog/2015/06/using-angular-1-dot-x-with-es6-and-webpack/
import './css/api.css';
import './css/style.css';
import './css/swiper-3.3.1.min.css';
import './css/assets/css/amazeui.min.css';
import './css/assets/css/app.css';

import angular from 'angular';

import './script/jquery/common';
import './script/jquery/jquery_1.9.1';
import './script/jquery/jquery.sha1';
import "./script/radialIndicator/js/radialIndicator.js";
import "./script/radialIndicator/js/angular.radialIndicator";
import './script/swiper-3.3.1.min';
import './script/api';
import './script/base'

import ngTouch from 'angular-touch';
import ngRoute from 'angular-route';
import ngAnimate from 'angular-animate';
import ngDialog from 'ng-dialog';
import Filters from './script/filter';
import map from './model/map';
import appService from './script/service';
import user from './model/user';
import appDb from './script/db';
import common from './model/common';
import echart from './model/echart';

import MainCtrl from './controllers/main';
import HelloCtrl from './controllers/hello';
import MapCtrl from './controllers/map';
import StatusCtrl from './controllers/status';
import FoodCtrl from './controllers/food';
import WaterCtrl from './controllers/water';
import WeightCtrl from './controllers/weight';
import StatisticsCtrl from './controllers/statistics';
import MeCtrl from './controllers/me';
import EditCtrl from './controllers/edit';
import LoginCtrl from './controllers/login';
import RegCtrl from './controllers/reg';


angular.module('health', [
        ngTouch, ngRoute, ngAnimate, ngDialog,'radialIndicator',
        Filters, map,appService,user,appDb,common,echart
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
