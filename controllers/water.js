/**
 * Created by Administrator on 2016/5/11.
 */
var WaterCtrl = [
    '$rootScope', '$scope', '$location', '$window', '$interval', 'ngDialog','radialIndicatorInstance','apiService','user','exeSql','select','dbInit',
    function ($rootScope, $scope, $location, $window, $interval, ngDialog,radialIndicatorInstance,apiService,User,exeSql,select,dbInit,$routeParams) {
        $scope.status=true;
        $scope.title="饮水计划";
        $scope.back=true;

    }];
StatusCtrl.$injector = ['$rootScope', '$scope', '$location', '$window', '$interval', 'ngDialog','apiService','User','exeSql','select','dbInit'];