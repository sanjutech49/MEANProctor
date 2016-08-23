var app = angular.module('proctorApp', [
    'ngRoute',   
    //'proctorConfig',
    'proctorappRoutes',
    'proctorController',
    'apiService'
]);

//require.config({
//"baseUrl" : 'public'

//});



app.run(function ($rootScope, $location) {
    rootResource = $rootScope;
    rootResource.socketExam = 'http://localhost:8024';
    rootResource.socketProctor = 'http://localhost:9191';
    rootResource.apiUrl = 'http://localhost:8024/api';

    rootResource.socket_Exam = io(rootResource.socketExam);
    rootResource.socket_Proctor = io(rootResource.socketProctor);


});