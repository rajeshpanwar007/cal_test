/**
 * Created by rajesh on 23/5/16.
 */

var app = angular.module('app', []);

console.log("Moducle Alled");


app.controller('testController', ['$scope', '$timeout', function ($scope, $timeout) {

    $scope.settings = {
        operation: '+',
        digits: 1
    };

    $scope.output = {
        correct: 0,
        wrong: 0
    };
    $scope.history = [];
    $scope.options = {
        state: 'start',
        operations: [
            {name: 'plus', value: '+'},
            {name: 'minus', value: '-'},
            {name: 'multiply', value: '*'},
            {name: 'Divide', value: '/'},
        ]
    }


    /* $scope.set = function () {
     $scope.options.state = 'setting_updated';
     };*/

    $scope.setValues = function () {
        var digits = parseInt($scope.settings.digits);
        var powervalue = Math.pow(10, (digits - 1))
        $scope.result = '';
        $scope.value1 = Math.floor(9 * powervalue * Math.random() + powervalue);
        $scope.value2 = Math.floor(9 * powervalue * Math.random() + powervalue);
        $timeout(function () {
            document.getElementById('result').focus();
        })

    }

    $scope.start = function () {
        $scope.options.state = 'start_test';

        $scope.setValues();
        $scope.startTimer();
    }

    $scope.restart = function () {
        $scope.options.state = 'start';
        //$scope.setValues();
        $scope.history = [];
        $scope.output = {
            correct: 0,
            wrong: 0,
            time_spent: 0
        };
    }

    $scope.submit = function () {
        var obj = {value1: $scope.value1, value2: $scope.value2, result: $scope.result, correct: ''};
        if ($scope.settings.operation == '+') {
            obj.correct = $scope.value1 + $scope.value2;
            if ($scope.result == obj.correct) {
                $scope.output.correct += 1;
            } else {
                $scope.output.wrong += 1;
            }
        }
        if ($scope.settings.operation == '-') {
            obj.correct = $scope.value1 - $scope.value2;
            if ($scope.result == obj.correct) {
                $scope.output.correct += 1;
            } else {
                $scope.output.wrong += 1;
            }
        }
        if ($scope.settings.operation == '*') {
            obj.correct = $scope.value1 * $scope.value2;
            if ($scope.result == obj.correct) {
                $scope.output.correct += 1;
            } else {
                $scope.output.wrong += 1;
            }
        }
        if ($scope.settings.operation == '/') {
            obj.correct = $scope.value1 / $scope.value2;
            if ($scope.result == obj.correct) {
                $scope.output.correct += 1;
            } else {
                $scope.output.wrong += 1;
            }
        }
        $scope.history.push(obj);
        $scope.setValues();
    }

    $scope.finish = function () {
        $scope.submit();
        $scope.options.state = 'finish';
        $scope.output.time_spent = $scope.time.time_spent;
    }

    $scope.startTimer = function () {
        $scope.time = {};
        $scope.time.time_spent = 0;
        $scope.time.start = Date.now()
        $scope.clock = "loading clock..."; // initialise the time variable
        $scope.tickInterval = 1000 //ms
        $scope.time_spent = 0;
        var tick = function () {
            var old = $scope.clock;
            $scope.clock = Date.now() // get the current time
            $scope.time.time_spent = Math.round(($scope.clock - $scope.time.start) / 1000)
            $timeout(tick, $scope.tickInterval); // reset the timer
        }
        // Start the timer
        $timeout(tick, $scope.tickInterval);
    }


}]);



