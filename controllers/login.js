export default ['$scope', '$rootScope', '$location', 'apiService','exeSql',
function ($scope, $rootScope, $location, apiService,exeSql) {
    $scope.btn_text="登陆";
    $scope.info="没有账号？去注册>>>";
    $scope.username_tip="";
    $scope.password_tip="";
    $scope.place_user="输入您的用户名";
    $scope.place_password="请输入密码";
    $scope.submit=function () {
        if(typeof $scope.username=='undefined'){
            $scope.username_tip="用户名不能为空";
            return
        }else {
            $scope.username_tip="";
        }
        if(typeof $scope.password=='undefined'){
            $scope.password_tip="密码不能为空";
            return
        }else {
            $scope.password_tip="";
        }
        var data = {
            where:{
                username: $scope.username,
                password: $.sha1($scope.password)
            }
        };

        apiService.get("user1",data).then(function (res) {
            console.log(res);
            if(res.data.length>0){
                $rootScope.user=res.data[0];
                console.log($rootScope.user);
                var now=new Date().getTime();
                // console.log(now);
                var sql="REPLACE INTO user (username,password,user_id,status,lastlogin) VALUES ('"+res.data[0].username+"','"+res.data[0].password+"', '"+res.data[0].id+"',1,"+now+" )";
                exeSql(sql).then(function (res) {
                    // console.log(res);
                });
                $location.path('/status');
            }else{
                $scope.username_tip="用户名或密码错误";
            }
        });
        //$location.path('/status');
    };
    $scope.reg_login=function () {
        $location.path('/reg');
    }
}];