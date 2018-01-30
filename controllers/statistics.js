/**
 * Created by Administrator on 2016/5/3.
 */
export default [
    '$rootScope', '$scope', '$location', '$window', '$interval', 'ngDialog','timeStamp2String','select',
    function ($rootScope, $scope, $location, $window, $interval, ngDialog,timeStamp2String,select) {
        $scope.statistics=true;
        $scope.title="统计";
        var now=new Date();
        var year=now.getFullYear();
        var month=now.getMonth();
        var end_day=new Date(year,month+1,0);
        // now=new Date(year,month,6);
        var count_days=end_day.getDate();
        $scope.legend = ["本月运动距离统计"];
        $scope.item=[[]];
        $scope.data=[[]];
        //$scope.item = ['Jan', 'Feb', 'Mar', 'Apr', 'Mar', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        // $scope.data = [
        //     [50,30, 10, 40, 70, 12, 15] //London
        // ];
        for(var i=1;i<=count_days;i++){
            $scope.item.push(i);
            $scope.data[0][i]=0;
        }
        var sql="select * from sport where username='"+$rootScope.user.username+"'";
        select(sql).then(function (res) {
            console.log(res);
            for(var d=0;d<res.data.length;d++){
                var day=parseInt((res.data[d].date).substr(8,2));
                $scope.data[0][day]=(parseInt(res.data[d].distance));
                console.log($scope.data[0])
            }
        });
    }];
