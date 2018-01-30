//主控制器 ===========================================================
export default [
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