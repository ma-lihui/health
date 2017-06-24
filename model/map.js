/**
 * Created by Administrator on 2016/5/4.
 */
angular.module('map', [])
    //执行sql
    .directive("appMap",["$interval","$rootScope" ,function ($interval,$rootScope) {
        return {
            restrict: "E",
            replace: true,
            template: "<div id='allMap'></div>",
            // scope: {
            //     center: "=",		// Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
            //     markers: "=",	   // Array of map markers (e.g. <code>[{ lat: 10, lon: 10, name: "hello" }]</code>).
            //     width: "@",		 // Map width in pixels.
            //     height: "@",		// Map height in pixels.
            //     zoom: "@",		  // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
            //     zoomControl: "@",   // Whether to show a zoom control on the map.
            //     scaleControl: "@",   // Whether to show scale control on the map.
            //     address:"@"
            // },
            // controller:MapCtrl,
            link: function (scope) {
                scope.link=1;
                // console.log(scope.time_status);
                var map;
                // 百度地图API功能
                map = new BMap.Map("allMap");
                map.centerAndZoom(new BMap.Point(116.404, 39.915), 18);  // 初始化地图,设置中心点坐标和地图级别
                map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
                map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
                //map.addControl(new BMap.ZoomControl());
                // 创建地址解析器实例
                var myGeo = new BMap.Geocoder();
                // 将地址解析结果显示在地图上,并调整地图视野
                myGeo.getPoint(scope.address, function(point){
                    if (point) {
                        map.centerAndZoom(point, 16);
                        map.addOverlay(new BMap.Marker(point));
                    }
                }, "");

                //开始定位
                scope.cur_position=function () {
                    var geolocation = new BMap.Geolocation();
                    geolocation.getCurrentPosition(function(r){
                        //console.log(this.getStatus());
                        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                            var mk = new BMap.Marker(r.point);
                            map.addOverlay(mk);
                            map.panTo(r.point);
                        }
                        else {
                            alert('failed'+this.getStatus());
                        }
                    },{enableHighAccuracy: true});
                };
                scope.cur_position();
                //画出路线
                scope.start_get_local = function () {
                    var old_point=0;
                    //每隔多少秒重新读一次位置
                    var time=10;
                    time_l = $interval(function () {
                        //定位
                        var geolocation = new BMap.Geolocation();
                        geolocation.getCurrentPosition(function(r){
            //console.log(this.getStatus());
                            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                                map.panTo(r.point);
                                //画折线
            //console.log(r);
                                if(!old_point){
                                    old_point = r;
            //console.log(r.speed);
                                }
                                //避免定位误差，平均速度小于0.5m/s的不计
                                scope.sport.speed=map.getDistance(old_point.point,r.point)/time<0.1?0:map.getDistance(old_point.point,r.point)/time;
                                scope.sport.distance+=scope.sport.speed>0?map.getDistance(old_point.point,r.point):0;
                                scope.sport.calories+=60*time/3600*(30*scope.sport.speed*60/400);
                                if(scope.sport.speed>0){
                                    var polyline = new BMap.Polyline([
                                            // new BMap.Point(116.405, 39.920),
                                            new BMap.Point(old_point.longitude, old_point.latitude),
                                            new BMap.Point(r.longitude, r.latitude)
                                        ],
                                        {strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5}
                                    );
                                    map.addOverlay(polyline);
                                }

                                old_point = r;
                            }
                            else {
                                alert('failed'+this.getStatus());
                            }
                        },{enableHighAccuracy: true});


                    }, time*1000);
                };

            }
        };
    }
    ]);
