angular.module('appService', [])
    .factory('apiService', ['$rootScope', '$http', '$location',
        function ($rootScope, $http, $location) {
            var now = Date.now();
            var app_id = "A6908810234855";
            var appKey = $.sha1("A6908810234855" + "UZ" + "F41FF6E8-5353-CFD9-7304-0645F2A96376" + "UZ" + now) + "." + now;
            var http = function (table, id, data) {
                // console.log(data);
                return $http({
                        "url": "https://d.apicloud.com/mcm/api/" + table + "/"+id,
                        "dataType": "json",
                        "method": "POST",
                        "cache": false,
                        "headers": {
                            "Content-type": "application/json;charset=UTF-8",
                            "X-APICloud-AppId": app_id,
                            "X-APICloud-AppKey": appKey
                        },
                        "data": data
                    }
                );
            };
            /**获取数据
             * @param table:表名
             * @param filter:过滤条件
             * @example filter={
             *  where:{id:123,name:"tom"},        //条件查询
             *  fields:{name:true,email:true},    //查询字段
             *  limit:5,                          //限制结果数量
             *  order:{id DESC}                   //排序
             * }
             * 文档：http://docs.apicloud.com/云API/data-cloud-api#6
             */
            var get = function (table, filter) {
                if(!filter){
                    filter={}
                }
                return $http({
                        "url": "https://d.apicloud.com/mcm/api/" + table + "?filter=" + encodeURIComponent(JSON.stringify(filter)),
                        "dataType": "json",
                        "method": "GET",
                        "cache": false,
                        "headers": {
                            "Content-type": "application/json;charset=UTF-8",
                            "X-APICloud-AppId": app_id,
                            "X-APICloud-AppKey": appKey
                        }
                    }
                );
            };

            /**
             *
             * */
            var update=function (table,id,data) {
                data._method="PUT";
                return http(table,id,data);
            };
            var insert=function (table,data) {
                var id='';
                return http(table,id,data);
            };

            return {
                get: get,
                update:update,
                insert:insert
            };
            
            //示例
            // apiService.get("test").then(function (res) {
            //     console.log(res)
            // });
            // apiService.insert("test",'',{title:'dee',content:'neir'}).then(function (res) {
            //     console.log(res)
            // });
            // apiService.update("test","572f3224f31579f76ce0b8d0",{content:'hello'}).then(function (res) {
            //     console.log(res)
            // });
        }
])
    /**
     * 格式化时间方法
     * @param {number|date} time 时间戳，0代表当前时间, 其他时间请传入date类型对象
     * @param {string} type 输出类型,支持日期和时间：datetime格式化为2015-05-01 12:12:12; date格式化为2015-05-01
     * @returns {string} 返回时间字符串
     */
    .factory('timeStamp2String', [function () {
        return function (time, type) {
            var datetime = new Date();
            if (0 !== time) {
                //datetime.setTime(time);
                datetime = time;
            }
            if (typeof time === 'string') {
                //替换日期中的-为/
                time = time.replace(/-/g, '/');
                datetime = new Date(time);
            }
            if (typeof time === 'number' && 0 !== time) {
                datetime = new Date(time);

            }

            var year = datetime.getFullYear();
            var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
            var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
            var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
            var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
            var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
            var day = datetime.getDay();
            //返回周几 周日为0
            if (type === 'datetime') {
                return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
            }
            //年月日时分秒 年以2位
            if (type === 'datetime2') {
                return year.toString().substr(2, 2) + "" + month + "" + date + "" + hour + "" + minute + "" + second;
            }
            if (type === 'date') {
                return year + "-" + month + "-" + date;
            }
            if (type === 'time') {
                return (hour + ":" + minute + ' ') + ((hour <= 12) ? 'AM' : 'PM');
            }
            if (type === 'time_2') {
                return (hour + ":" + minute + ' ');
            }
            if (type === 'day') {
                return day == 0 ? 7 : day;
            }
            if (type === 'month') {
                return month;
            }
            if (type === 'month-day') {
                return month + "-" + date;
            }
            if (type === 'birthday') {
                return year + month + date;
            }

        };
    }]);
