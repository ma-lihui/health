/**
 * Created by Administrator on 2016/5/3.
 */
export default [
    '$rootScope', '$scope', '$location', '$window', '$interval', 'ngDialog','radialIndicatorInstance','apiService','user','exeSql','select','dbInit',
    function ($rootScope, $scope, $location, $window, $interval, ngDialog,radialIndicatorInstance,apiService,User,exeSql,select,dbInit) {
        $scope.title="编辑个人资料";
        $scope.back=true;
        $scope.info={
            sex:'',
            weight:'',
            height:'',
            age:''
        };
        $scope.save=function (info) {
            var sql2="REPLACE INTO person_info (username,sex,height,weight,age) VALUES ('"+$rootScope.user.username+"','"+info.sex+"','"+info.height+"', '"+info.weight+"','"+info.age+"' )";
            exeSql(sql2).then(function (dat) {
                console.log(dat);
                $location.path('/me');
            });
        }
    }];
