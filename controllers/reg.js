export default ['$scope', '$rootScope', '$location', 'apiService','exeSql',
function ($scope, $rootScope, $location, apiService,exeSql) {
    $scope.btn_text="注册";
    $scope.info="已有账号？去登陆>>>";
    $scope.username_tip=" ";
    $scope.password_tip=" ";
    $scope.place_user="2-20位字符";
    $scope.place_password="3-16位字符";
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
        var data={
            username:$scope.username,
            password:$.sha1($scope.password)
        };
        if($scope.username.length<=2){
            $scope.username_tip="用户名长度不能小于2个字符";
            return
        }
        if($scope.username.length>20){
            $scope.username_tip="用户名长度不能大于20个字符";
            return
        }
        if($scope.password.length<6){
            $scope.password_tip="密码长度不能小于6个字符";
            return
        }
        if($scope.password.length>16){
            $scope.password_tip="密码长度不能大于16个字符";
            return
        }

            // console.log(res);
            apiService.get("user1",{where:{username:$scope.username}}).then(function (res1) {
                if(res1.data.length>0){
                    $scope.username_tip="用户名已存在";
                }else {
                    apiService.insert("user1",data).then(function (res) {
                        console.log(res);
                        $rootScope.user=res.data;
                        var now=new Date().getTime();
                        var sql="REPLACE INTO user (username,password,user_id,status,lastlogin) VALUES ('"+res.data.username+"','"+res.data.password+"', '"+res.data.id+"',1 ,"+now+")";
                        exeSql(sql).then(function (res) {
                            // console.log(res);
                        });
                    });

                    $location.path('/status');
                }
            });

        //$location.path('/status');
    };
    $scope.reg_login=function () {
        $location.path('/login');
    }
}];