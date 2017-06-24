//主控制器 ===========================================================
var MainCtrl = [
    '$rootScope', '$scope', '$location', '$window', '$interval', 'ngDialog','dbInit','select',
    function ($rootScope, $scope, $location, $window, $interval, ngDialog,dbInit,select) {
        // console.log("hello");
        $scope.goback=function () {
            $window.history.back();
        };
        $scope.route=function (url) {
            $location.path('/'+url);
        };
        var sql="select * from user order by lastlogin desc ";
        select(sql).then(function (res) {
            // app.api.alert({msg:res});
            // console.log(res);
            if (res.status == 1 && res.data.length > 0) {
                if (res.data[0].status == 1) {
                    $rootScope.user = res.data[0];
                }
            }
        });

        var exitApp = function () {
            app.api.addEventListener({
                name: 'keyback'
            }, function (ret, err) {
                if ($location.$$path == '/login' || $location.$$path == '/reg'||$location.$$path == '/status' || $location.$$path == '/me'|| $location.$$path == '/statistics') {
                    app.api.toast({
                        msg: '再按一次退出',
                        duration: 2000,
                        location: 'bottom'
                    });
                    app.api.addEventListener({
                        name: 'keyback'
                    }, function (ret, err) {
                        app.api.closeWidget();
                    });
                }else {
                    window.history.back();
                }
                setTimeout(function () {
                    exitApp();
                }, 2000)
            });
        };
        try
        {
            setTimeout(function () {
                exitApp();
            },500);
        }
        catch(err)
        {
            //在此处理错误
        }
        

    }];
//欢迎页面 ===========================================================
var HelloCtrl = ['$interval', '$rootScope', '$location','exeSql','select','dbInit',
    function ($interval, $rootScope, $location,exeSql,select,dbInit) {
        var time=$interval(function () {
            dbInit('health').then(function (res) {
                console.log(res);
                // app.api.alert({msg:res});
                var sql="select * from user order by lastlogin desc ";
                select(sql).then(function (res) {
                     // app.api.alert({msg:res});
                    // console.log(res);
                    if(res.status==1&&res.data.length>0){
                        if(res.data[0].status==1){
                            $rootScope.user=res.data[0];
                            $location.path('/status');
                        }else {
                            $location.path('/login');

                        }
                    }else {
                        $location.path('/login');
                    }
                });
                $interval.cancel(time);
                // console.log(res);
            });
        },300,20);

    }];


var LoginCtrl = ['$scope', '$rootScope', '$location', 'apiService','exeSql',
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
var RegCtrl = ['$scope', '$rootScope', '$location', 'apiService','exeSql',
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