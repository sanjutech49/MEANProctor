
angular.module('proctorappRoutes', []).config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        
        $routeProvider.when('/', {
            templateUrl: '/views/proctorView.html',
            controller: 'proctorController'
        });
       
        $routeProvider.otherwise('/', {
            redirectTo: '/'
        });
        
      //  $locationProvider.html5Mode(true);
    }]);
