
angular.module('proctorController', []).controller('proctorController',
 function ($scope, $location, apiService) {
    $scope.examid = 1996;
    $scope.isActive = false;
    $scope.studentImages = ['1458'];
    $scope.examid = 1996;
    
    
    
    $scope.details = { students: [], questions: [] };
    
    
    $scope.questions = [];
    
    //$scope.bindPorctor = function ()
    //{
    //    angular.forEach($scope.student.students, function (student, key) {
    
    //        $scope.details.students.push({
    //            student: student, isLoggedIn: false,questions:
    //              angular.forEach($scope.qa.questions, function (question, key) {
    
    //            $scope.questions.push({ questionid: question.questionid, correctanswer: question.correctanswer, answer: question.questionid });
    
    //        })
    
    //        });
    
    //    });
    
    //    angular.forEach($scope.qa.questions, function (question, key) {
    
    //        $scope.details.questions.push({ questionid: question.questionid, correctanswer: question.correctanswer, answer: question.questionid });
    
    //    });
    //}
    
    
    $scope.bindQuestions = function () {
        return (
        angular.forEach($scope.qa.questions, function (question, key) {
            
            $scope.questions.push({ questionid: question.questionid, correctanswer: question.correctanswer, answer: question.questionid });

        })
)
    }
    
    $scope.bindPorctor = function () {
        
        angular.forEach($scope.qa.questions, function (question, key) {
            
            $scope.details.questions.push({ questionid: question.questionid, correctanswer: question.correctanswer, answer: question.questionid });

        });
        
        angular.forEach($scope.student.students, function (student, key) {
            
            student.questions = angular.copy($scope.details.questions);
            $scope.details.students.push({
                student: student, isLoggedIn: false
            });

        });

    }
    
    
    
    $scope.start = function () {
        var query = "examid=" + $scope.examid;
        apiService.post('getQAStudents', query).then(function (res) {
            if (!res) {
                alert("Invalid examId");
                return;
            }
            else {
                rootResource.qa = res.qa;
                rootResource.student = res.student;
                $scope.qa = rootResource.qa;
                $scope.student = rootResource.student;
                
                localStorage.setItem('exam', JSON.stringify(rootResource.qa));
                localStorage.setItem('student', JSON.stringify(rootResource.student));
                
                $scope.bindPorctor();

                    //$location.path('/exam');
            }
            
            rootResource.socket_Proctor.on('connect', function (data) {
                rootResource.socket_Proctor.emit('join', 'Hello world from client');

           

         //   rootResource.socket_Proctor.emit('loggedinStudents');

            });
            
            rootResource.socket_Exam.on('connectExam', function (data) {
                rootResource.socket_Exam.emit('connectedStudents', 'student is connected');
            });
        });
    }
    
    
    $scope.start();
    
    rootResource.socket_Proctor.on('messages', function (data) {
        //alert(data);
        var d = data;
    });
    
    rootResource.socket_Exam.on('loggedin', function (data) {
      
        alert(data.studentid + " logged in ");
        



    });
    
    
    rootResource.socket_Exam.on('answer', function (data) {
        var found = false;
        alert(data.studentid + " " + data.questionid + " " + data.answer);
        angular.forEach($scope.details.students, function (student, key) {
            if (found == false) {
                if (student.student.studentid == data.studentid) {
                    angular.forEach(student.student.questions, function (question, qk) {
                        if (found == false) {
                            if (question.questionid == data.questionid) {
                                question.answer = data.answer;
                                found = true;
                            }
                        }
                    });
                }
            }
            
        });
        
        
        
        
        $scope.$apply();
    }
    );
    
   

});
