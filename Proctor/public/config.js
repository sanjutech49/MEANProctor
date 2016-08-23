
angular.module('proctorConfig',[]).config('proctorConfig', 
function () {
    return ({
        api : 'http://localhost:9191/api',
        socketProctor: 'http://localhost:8024',
    });
});