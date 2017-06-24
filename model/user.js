angular.module('user', [])
    //用户登录检查
    .factory('user', ['$location', '$rootScope', function ($location, $rootScope) {
        return function () {
            if (!$rootScope.user) {
                $location.path('/login');
            } else {
            }
        };
    }]);
