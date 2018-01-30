//欢迎页面 ===========================================================
export default ['$interval', '$rootScope', '$location','exeSql','select','dbInit',
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