/**
 * Created by Administrator on 2016/5/3.
 */
export default [
    '$rootScope', '$scope', '$location', '$window', '$interval', 'ngDialog','radialIndicatorInstance','apiService','user','exeSql','select','dbInit',
    function ($rootScope, $scope, $location, $window, $interval, ngDialog,radialIndicatorInstance,apiService,User,exeSql,select,dbInit) {
        $scope.status=true;
        $scope.title="状态";
        //环形指示器
        $scope.indicatorOption = {
            radius: 80,
            percentage: false,
            barWidth:10,
            barColor: "#87CEEB",
            initValue : 0,
            roundCorner:true,
            frameTime:7
        };
        //$scope.indicatorValue = 0;
        $scope.changeValue = function (val) {
            radialIndicatorInstance['indicator1'].animate(val);
        };
        //动画效果
        var animate = $interval(function () {
            if (typeof radialIndicatorInstance['indicator1'] !== 'undefined') {
                $interval.cancel(animate);
                $scope.changeValue(80);
            }
        }, 100, 10);

        //列表内容
        $scope.list_content=[
            {
                icon:'',
                title:'饮食推荐',
                description:'建议饮食...',
                href:'food'
            },
            {
                icon:'',
                title:'饮水计划',
                description:'每天建议8杯水...',
                href:'water'
            },
            {
                icon:'',
                title:'体重记录',
                description:'60公斤',
                href:'weight'
            }
        ];
        var window_id=0;
        window_id = ngDialog.open({
            trapFocus: false,
            template: './html/common/dialog.html',
            disableAnimation: true,
            scope: $scope
        });
        // apiService.get("test").then(function (res) {
        //     console.log(res)
        // });
        // apiService.insert("test",'',{title:'dee',content:'neir'}).then(function (res) {
        //     console.log(res)
        // });
        // apiService.update("test","572f3224f31579f76ce0b8d0",{content:'hello'}).then(function (res) {
        //     console.log(res)
        // });
        // var sql="CREATE TABLE IF NOT EXISTS user (id unique, name)";
        // var sql2="INSERT INTO user(id,name) values(2,222)";
        // var sql3="select * from user";
        // exeSql(sql).then(function (res) {
        //     console.log(res);
        //     exeSql(sql2).then(function (res) {
        //         console.log(res);
        //     })
        // });
        // select(sql3).then(function (data) {
        //     console.log(data);
        // });
        // dbInit('health').then(function (res) {
        //     console.log(res);
        // });

}];
