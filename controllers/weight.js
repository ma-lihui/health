/**
 * Created by Administrator on 2016/5/11.
 */
export default [
    '$rootScope', '$scope', '$location', '$window', '$interval', 'ngDialog','radialIndicatorInstance','apiService','user','exeSql','select','dbInit','timeStamp2String',
    function ($rootScope, $scope, $location, $window, $interval, ngDialog,radialIndicatorInstance,apiService,User,exeSql,select,dbInit,timeStamp2String) {
        $scope.status=true;
        $scope.title="体重记录";
        $scope.back=true;
        var now=new Date();
        var year=now.getFullYear();
        var month=now.getMonth();
        var end_day=new Date(year,month+1,0);
        // now=new Date(year,month,6);
        var count_days=end_day.getDate();
        // console.log(count_days);
        $scope.legend = ["本月体重变化"];
        $scope.item=[];
        $scope.data=[[0]];
        var sql3="select * from person_info where username='"+$rootScope.user.username+"'";
        select(sql3).then(function (res) {
            if(res.data.length>0){
                $scope.data[0][0]=parseFloat(res.data[0].weight);
            }
        });
        //$scope.item = ['Jan', 'Feb', 'Mar', 'Apr', 'Mar', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        // $scope.data = [
        //     [11,30, 10, 40, 70, 12, 15] //
        // ];
        //$scope.data[0]=[0,"40",90];
        for(var i=1;i<=count_days;i++){
            $scope.item.push(i);
        }
        var sql2="select * from weight where username='"+$rootScope.user.username+"' order by date";
        select(sql2).then(function (res) {
            if(res.data.length>0){
                for(var i=1;i<=count_days;i++){
                    for(var d=0;d<res.data.length;d++){
                        var day=parseInt((res.data[d].date).substr(8,2));
                        if(day==i){
                            $scope.data[0][i]=(parseInt(res.data[d].weight));
                        }
                        // console.log(day)
                    }
                }
                // $scope.data[0]=res.data.weight;
            }
            console.log($scope.data[0]);
        });
        var user=$rootScope.user;
        $scope.save_weight=function () {
            var date=timeStamp2String(now,'date');
            var sql="REPLACE INTO weight (username,weight,user_id,date) VALUES ('"+user.username+"','"+parseFloat($scope.weight)+"', '"+user.user_id+"','"+date+"')";
            exeSql(sql).then(function (res) {
                $scope.weight="";
                app.api.toast({msg:"设置成功"});
                console.log(timeStamp2String(now,'date'));
            });
        };
    }];
