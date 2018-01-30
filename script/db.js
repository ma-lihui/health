import angular from 'angular';
export default angular.module('appDb', [])
    //执行sql ===========================================================
    .factory('exeSql', ['$q', function ($q) {
        return function (sql) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var db = openDatabase('health', '1.0', 'health', 2 * 1024 * 1024);
            db.transaction(function (context) {
                context.executeSql(sql);
            },function (err) {
                // console.log(err);
                //app.api.alert({msg:err,title:sql});
                deferred.resolve({status:-1,message:err.message,data:''});
                // deferred.reject({status:-1,message:err.message,data:''});
            },function (success) {
                deferred.resolve({status:1,message:"success",data:''});
            });
            return promise;
        }
    }
    ])
    //查询
    .factory('select', ['$q', function ($q) {
        return function (sql) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var db = openDatabase('health', '1.0', 'health', 2 * 1024 * 1024);
            db.transaction(function (context) {
                context.executeSql(sql, [], function (context,res) {
                    var data=[];
                    for(var i=0;i<res.rows.length;i++){
                        data.push(res.rows.item(i));
                    }
                    //console.log(res.rows.item(0));
                    //app.api.alert({msg:data,title:sql});
                    deferred.resolve({status:1,message:'success',data:data});
                });
            }, function (err) {
                deferred.reject(err);
            }, function (success) {
            });
            return promise;
        }
    }
    ])

    //数据库初始化 =========================================================
    .factory('dbInit', ['$q', '$http','exeSql', function ($q, $http,exeSql) {
        // console.log(23131);
        var installSql;
        var deferredInstall = {};
        var promiseInstall = {};
        var executeSql = function (name, sql, deferredInstall, o) {
            exeSql(sql).then(function (ret) {
                if (!ret.status) {
                    executeSql(name, sql, deferredInstall, o);
                } else {
                    deferredInstall.resolve(o + '执行成功!');
                }
            });
        };
        return function (name) {
            //载入安装sql
            return $http.get('./install/health.json').then(function (response) {
                installSql = response.data;

                //执行安装sql脚本
                for (var o in installSql.sqls) {
                    deferredInstall[o] = $q.defer();
                    promiseInstall[o] = deferredInstall[o].promise;
                    var sql = installSql.sqls[o];
                    executeSql(name, sql, deferredInstall[o], o);
                }
                return $q.all(promiseInstall);
            });
        };
    }])
    .name;

