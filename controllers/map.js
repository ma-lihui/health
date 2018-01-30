/**
 * Created by Administrator on 2016/4/24.
 */
export default [
    '$rootScope', '$scope', '$location', '$window', '$interval', 'ngDialog','exeSql','select','timeStamp2String',
    function ($rootScope, $scope, $location, $window, $interval, ngDialog,exeSql,select,timeStamp2String) {
        $scope.back=true;
        $scope.title="运动轨迹";
        //参数
        $scope.sport={
            'distance':0,
            'speed':0,
            'calories':0
        };
        //运动记时
        var count_time = {
            'hh': '00',
            'mm': '00',
            'ss': '00',
            'time':0,
            'str_time':"00:00:00"
        };
        $scope.count_time={};
        $scope.count_time.str_time="00:00:00";
        $scope.time_status=0;   //0 暂停中  1正在计时
        var time_i;
        //开始计时
        $scope.start_count_time = function () {
            var start_time=new Date().getTime()/1000;
            $scope.time_status = 1;
            time_i = $interval(function () {
                var end_time=new Date().getTime()/1000;
                if (!$scope.time_status) {
                    $interval.cancel(time_i);
                }
                count_time.time = (end_time-start_time).toFixed(0);
                count_time.ss = count_time.time % 60 < 10 ? '0' + count_time.time % 60 : count_time.time % 60;
                count_time.mm = Math.floor(count_time.time / 60) % 60 < 10 ? '0' + Math.floor(count_time.time / 60) % 60 : Math.floor(count_time.time / 60) % 60;
                count_time.hh = Math.floor(count_time.time / 3600) < 10 ? '0' + Math.floor(count_time.time / 3600) : Math.floor(count_time.time / 3600);
                count_time.str_time = count_time.hh + ':' + count_time.mm + ':' + count_time.ss;
                $scope.count_time = count_time;
            }, 1000);
            
            //记录轨迹
            time_m = $interval(function () {
                if($scope.link==1){
                    $interval.cancel(time_m);
                }
                // console.log($scope.sport.distance);
                $scope.cur_position();
                $scope.start_get_local();
            }, 1000);
        };

        //结束记时
        $scope.end_count_time=function () {
            //初始化数据
            var init_sport=function () {
                $scope.time_status=0;
                $interval.cancel(time_i);
                $scope.count_time.str_time="00:00:00";
                $scope.sport={
                    'distance':0,
                    'speed':0,
                    'calories':0
                };
            };
            var now=new Date();
            var date=timeStamp2String(now,'date');
            var distance=0;
            var time=0;
            var calories=0;
            var user=$rootScope.user;
            var sql2="select * from sport where username='"+$rootScope.user.username+"' and date='"+date+"'";
            select(sql2).then(function (res) {
                if(res.data.length>0){
                    distance+=isNaN(parseFloat(res.data[0].distance))?0:parseFloat(res.data[0].distance)+parseFloat($scope.sport.distance);
                    calories+=isNaN(parseFloat(res.data[0].calories))?0:parseFloat(res.data[0].calories)+parseFloat($scope.sport.calories);
                    time+=isNaN(parseFloat(res.data[0].time))?0:parseFloat(res.data[0].time)+parseFloat($scope.count_time.time);
                }
                var sql="REPLACE INTO sport (username,time,user_id,date,distance,calories) VALUES ('"+user.username+"','"+time+"', '"+user.user_id+"','"+date+"','"+distance+"','"+calories+"')";
                init_sport();
                exeSql(sql).then(function (data) {
                    console.log(data)
                });
                console.log(res);
            });

        };


        //$scope.start_get_local();


    }];

