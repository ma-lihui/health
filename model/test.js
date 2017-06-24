/**
 * Created by plmkz520 on 12/7/15.
 */
angular.module('baisonTest', ['baisonDb', 'baisonService'])
	//执行sql
	.factory('test', ['dbSelect', function (dbSelect) {
		return function (sql){
			return dbSelect('YsPos', sql);
		};
	}])
;