/**
 * Created by Administrator on 2016/5/3.
 */
var MeCtrl = [
    '$rootScope', '$scope', '$location', '$window', '$interval', 'ngDialog','exeSql','select',
    function ($rootScope, $scope, $location, $window, $interval, ngDialog,exeSql,select) {
        $scope.me=true;
        $scope.title="我的";
        $scope.edit=true;
        $scope.user=$rootScope.user;
        console.log($scope.user);
        $scope.login_out=function () {
            var sql="update user set status=0";
            exeSql(sql);
            $location.path('/login');
        };
        $scope.person_info=[
            {
                key:"性别",
                value:"未设置"
            },
            {
                key:"身高",
                value:" cm"
            },
            {
                key:"初始体重",
                value:" kg"
            },
            {
                key:"年龄",
                value:""
            }
        ];
        if($rootScope.user!=undefined){
            $sql="select * from person_info where username='"+$rootScope.user.username+"'";
            select($sql).then(function (res) {
                //app.api.alert({msg:res});
                console.log(res);
                if(res.data.length>0){
                    $scope.person_info[0].value=res.data[0].sex;
                    $scope.person_info[1].value=res.data[0].height+" cm";
                    $scope.person_info[2].value=res.data[0].weight+" kg";
                    $scope.person_info[3].value=res.data[0].age;
                }

            });
        }

        $scope.edit=function () {
            $location.path('/edit');
        };

    }];
MeCtrl.$injector = ['$rootScope', '$scope', '$location', '$window', '$interval', 'ngDialog','exeSql','select'];
