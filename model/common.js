/**
 * Created by Administrator on 2016/5/10.
 */
import angular from 'angular';
export default angular.module('common', [])
    //执行sql
    .directive("dialog",["$interval","$rootScope" ,function ($interval,$rootScope) {
        console.log("hello1");
        return {
            restrict: "E",
            replace: false,
            templateUrl: "../html/common/dialog.html",
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
            link: function (scope,element,attrs) {
                console.log("hello2");
                scope.dialog=function () {
                    $('#my-prompt').modal({
                        relatedTarget: this,
                        onConfirm: function (e) {
                            alert('你输入的是：' + e.data || '')
                        },
                        onCancel: function (e) {
                            alert('不想说!');
                        }
                    });
                };
                scope.dialog();
            }
        };
    }
    ])
    .name;
