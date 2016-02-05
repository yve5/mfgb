'use strict';

angular.module('helloApp').controller('FooterCtrl', ['$scope', 'authService',
  function ($scope, authService) {
    var myDate = new Date();
    var currentYear = myDate.getFullYear();
    $scope.myYear = currentYear;

    $scope.showFooter = function () {
      return authService.isAuth();
    };
  }]);
