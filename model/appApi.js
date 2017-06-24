/**
 * Created by Administrator on 2016/5/8.
 */
angular.module('appApi', [])
    .factory('api', [function () {
        var now = Date.now();
        var app_id="A6908810234855";
        var appKey = sha1("A6908810234855"+"UZ"+"F41FF6E8-5353-CFD9-7304-0645F2A96376"+"UZ"+now)+"."+now;
        var get_data=function () {
            $.ajax({
                "url": "https://d.apicloud.com/mcm/api/Company/5436442ca1a14d1c60de3e06",
                "method": "GET",
                "cache": false,
                "headers": {
                    "X-APICloud-AppId": app_id,
                    "X-APICloud-AppKey": appKey
                }
            }).success(function (data, status, header) {
                console.log("success:"+data);
                //success body
            }).fail(function (header, status, errorThrown) {
                console.log("fail:"+header);
                //fail body
            })
        };
        return {
            get_data:get_data
        };
    }])
;