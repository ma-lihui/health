import angular from 'angular';
export default angular.module('Filters', [])
        .filter('orderObjectBy', function () {
            return function (items, field, reverse) {
                var filtered = [];
                angular.forEach(items, function (item) {
                    filtered.push(item);
                });
                filtered.sort(function (a, b) {
                    return (a[field] > b[field] ? 1 : -1);
                });
                if (reverse)
                    filtered.reverse();
                return filtered;
            };
        })
        .filter('openmark', function () {
            return function (input) {
                return (input == true || input == 'true' || input == '') ? 'On' : 'Off';
            };
        })
        .filter('checkmark', function () {
            return function (input) {
                return input ? '\u2713' : '\u2718';
            };
        })
        .filter('checkmark_with_number', function () {
            return function (input) {
                return (input == 1) ? '\u2713' : '\u2718';
            };
        })
        .filter('syn', ['$rootScope',function ($rootScope) {
            return function (input) {
                if (input == 1 || input == '1') {
                    return $rootScope.language.TIP_SYNCHRONIZED/*'已同步'*/;
                } else if (input == 0 || input == '0') {
                    return $rootScope.language.TIP_NOT_SYNCHRONIZED/*'未同步'*/;
                } else {
                    return $rootScope.language.TIP_UNKNOWN;
                }
            };
        }])
        .filter('check_ico', ['$rootScope',function ($rootScope) {
            return function (input) {
                if (input == 1 || input == '1') {
                    return $rootScope.language.TIP_AUDITED/*'已审核'*/;
                } else if (input == 0 || input == '0') {
                    return $rootScope.language.TIP_NOT_AUDITED/*'未审核'*/;
                } else {
                    return '?';
                }
            };
        }])
//小票是否支付
        .filter('check_is_checkout', ['$rootScope',function ($rootScope) {
            return function (input) {
                if (input == 1 || input == '1') {
                    return $rootScope.language.TIP_PAID/*'已支付'*/;
                } else if (input == 0 || input == '0') {
                    return $rootScope.language.TIP_NOT_PAID/*'未支付'*/;
                } else {
                    return '?';
                }
            };
        }])
//小票是否为退单小票
        .filter('check_is_return', ['$rootScope',function ($rootScope) {
            return function (input) {
                if (input == 1 || input == '1') {
                    return $rootScope.language.TIP_ORDER_RECEIPT_RETURN/*'退票'*/;
                } else if (input == 0 || input == '0') {
                    return '';
                } else {
                    return '';
                }
            };
        }])
        .filter('check_is_sure', ['$rootScope',function ($rootScope) {
            return function (input) {
                if (input == 1 || input == '1') {
                    return $rootScope.language.TIP_CONFIRMED/*'已确认'*/;
                } else if (input == 0 || input == '0') {
                    return $rootScope.language.TIP_UNCONFIRMED/*'未确认'*/;
                } else {
                    return '?';
                }
            };
        }])
        .filter('check_is_execute', ['$rootScope',function ($rootScope) {
            return function (input) {
                if (input == 1 || input == '1') {
                    return '已执行';
                } else if (input == 0 || input == '0') {
                    return '未执行';
                } else {
                    return '?';
                }
            };
        }])
        .filter('check_is_allocate', ['$rootScope',function ($rootScope) {
            return function (input) {
                if (input == 1 || input == '1') {
                    return $rootScope.language.TIP_HAVE_OUTBOUND/*'已出库'*/;
                } else if (input == 0 || input == '0') {
                    return $rootScope.language.TIP_NOT_OUTBOUND/*'未出库'*/;
                } else {
                    return '?';
                }
            };
        }])
        .filter('check_is_stock_in', ['$rootScope',function ($rootScope) {
            return function (input) {
                if (input == 1 || input == '1') {
                    return '已入库';
                } else if (input == 0 || input == '0') {
                    return '未入库';
                } else {
                    return '?';
                }
            };
        }])
        .filter('coupon_type', ['$rootScope',function ($rootScope) {
            return function (input) {
                if (input == 0 || input == '0') {
                    return '抵扣券';
                } else if (input == 1 || input == '1') {
                    return '折扣券';
                } else if (input == 2 || input == '2') {
                    return '赠券';
                } else if (input == 3 || input == '3') {
                    return '随机金额券';
                }
            };
        }])
        .filter('coupon_cancel', ['$rootScope',function ($rootScope) {
            return function (input) {
                if (input == 0 || input == '0') {
                    return $rootScope.language.TIP_NOT_INVALID/*'未作废'*/;
                } else if (input == 1 || input == '1') {
                    return $rootScope.language.TIP_INVALID /*'作废'*/;
                }
            };
        }])
        .filter('coupon_use', ['$rootScope',function ($rootScope) {
            return function (input) {
                if (input == 0 || input == '0') {
                    return $rootScope.language.TIP_NOT_USED/*'未使用'*/;
                } else if (input == 1 || input == '1') {
                    return $rootScope.language.TIP_USED/*'使用'*/;
                }
            };
        }])
        .filter('memberLevel', ['$rootScope',function ($rootScope) {
            return function (input) {
                if (input == '') {
                    return $rootScope.language.TIP_JUNIOR_MEMBER/*'初级会员'*/;
                }else if(input == 1 || input == 'WMLC003'){
                	return $rootScope.language.TIP_MEMBER/*'正式会员'*/;
                }else if(input == 2 || input == 'WMLC002'){
                	return $rootScope.language.TIP_ASSOCIATE_MEMBER/*'准会员'*/;
                }else{
					return input;//如果未在过滤器找到相应值返回文字（目前ipos使用）
				}
            };
        }])
        .filter('shopName', ['$rootScope', function ($rootScope) {
                return function (input) {
                    return $rootScope.current_shop.ShopName;
                };
            }])
        .filter('syn_stock',  ['$rootScope',function ($rootScope) {
             return function (input) {
                if (input == 0) {
                    return $rootScope.language.TIP_SYNCHRONIZED_SUCCESS/*'同步成功'*/;
                }else{   
                	return $rootScope.language.TIP_SYNCHRONIZE_NOW/*'立即同步'*/;
                }
            };
        }])
        .filter('syn_result',  ['$rootScope',function ($rootScope) {
             return function (input) {
                if (input == 0) {
                    return $rootScope.language.TIP_SUCCESS/*'成功'*/;
                }else{   //syn_result
                	return $rootScope.language.TIP_FAILED/*'失败'*/;
                }
            };
        }])
         .filter('num',  function () {
             return function (input) {
                if (input == '' || input == undefined) {
                    return '0';
                }else{
                	return input;
                }
            };
        })
        .filter('patch_version_show', function () {
            return function (input) {
            	if(input == undefined || input == null){
            		return '';
            	}
                return input.replace(/\_/g,'.');
            };
        })

        .filter('trust',['$sce',function($sce){
            return function (content){
                return $sce.trustAsHtml(content);
            }
        }])
        .filter('fix_status',function(){
            return function (input){
                var status='';
                if(input==1){
                    status = '收货';
                }else if(input==2){
                    status = '返修';
                }else if(input==3){
                    status = '接收';
                }else if(input==4){
                    status = '返店';
                }else if(input==5){
                    status = '终止';
                }else if(input==6){
                    status = '完成';
                }else if(input==7){
                    status = '核准';
                }else if(input==8){
                    status = '审批';
                }else if(input==9){
                    status = '已收款';
                }
                return status;
            }
        })
        .filter('check_is_stop', ['$rootScope',function ($rootScope) {
            return function (input) {
                if (input == 1 || input == '1') {
                    return '终止';
                } else if (input == 0 || input == '0') {
                    return '未终止';
                } else {
                    return '?';
                }
            };
        }])
        .filter('brand_name', ['$rootScope',function ($rootScope) {
            return function (input) {
                if (input !='') {
                    return input;
                }else{
                	return '不限';
                }
            };
        }])
        .name
        ;
